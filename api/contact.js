/**
 * Vercel Serverless Function: Contact Form → HubSpot
 *
 * Receives form submissions and creates/updates contacts in HubSpot CRM.
 * Data is then accessible via System Brain MCP tools.
 *
 * Required env vars:
 * - HUBSPOT_ACCESS_TOKEN: HubSpot private app access token
 */

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://barlow.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, firstname, lastname, message, source, phone } = req.body;

    // Validate required fields
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Sanitize inputs
    const sanitize = (str, maxLen = 500) => {
        if (!str) return '';
        return String(str).trim().replace(/<[^>]*>/g, '').substring(0, maxLen);
    };
    const cleanFirstname = sanitize(firstname, 100);
    const cleanLastname = sanitize(lastname, 100);
    const cleanMessage = sanitize(message, 5000);
    const cleanPhone = sanitize(phone, 20);
    const cleanSource = sanitize(source, 200);

    const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!HUBSPOT_TOKEN) {
        console.error('HUBSPOT_ACCESS_TOKEN not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // First, check if contact exists
        const searchResponse = await fetch(
            `https://api.hubapi.com/crm/v3/objects/contacts/search`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filterGroups: [{
                        filters: [{
                            propertyName: 'email',
                            operator: 'EQ',
                            value: email
                        }]
                    }]
                })
            }
        );

        const searchData = await searchResponse.json();
        const existingContact = searchData.results?.[0];

        // Build properties object
        const properties = {
            email: email.trim().toLowerCase(),
            firstname: cleanFirstname,
            lastname: cleanLastname,
            phone: cleanPhone,
            hs_lead_status: 'NEW',
            lifecyclestage: 'lead'
        };

        // Add source tracking
        if (cleanSource) {
            properties.leadsource = cleanSource;
        }

        let contactId;
        let action;

        if (existingContact) {
            // Update existing contact
            contactId = existingContact.id;
            action = 'updated';

            await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ properties })
                }
            );
        } else {
            // Create new contact
            action = 'created';

            const createResponse = await fetch(
                'https://api.hubapi.com/crm/v3/objects/contacts',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ properties })
                }
            );

            const createData = await createResponse.json();
            contactId = createData.id;
        }

        // If there's a message, create an engagement note
        if (cleanMessage && contactId) {
            const noteBody = `Website Contact Form Submission:\n\n${cleanMessage}\n\nSource: ${cleanSource || 'barlow.app'}`;

            await fetch(
                'https://api.hubapi.com/crm/v3/objects/notes',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        properties: {
                            hs_note_body: noteBody,
                            hs_timestamp: Date.now()
                        },
                        associations: [{
                            to: { id: contactId },
                            types: [{
                                associationCategory: 'HUBSPOT_DEFINED',
                                associationTypeId: 202  // Note to Contact
                            }]
                        }]
                    })
                }
            );
        }

        // Log for System Brain (if local logging is desired)
        console.log(`Contact ${action}: ${email} (ID: ${contactId})`);

        return res.status(200).json({
            success: true,
            action,
            contactId,
            message: `Contact ${action} successfully`
        });

    } catch (error) {
        console.error('HubSpot API error:', error);
        return res.status(500).json({
            error: 'Failed to process contact'
        });
    }
}
