/**
 * Vercel Serverless Function: Newsletter Signup → HubSpot
 *
 * Adds newsletter subscribers to HubSpot with proper list assignment.
 *
 * Required env vars:
 * - HUBSPOT_ACCESS_TOKEN: HubSpot private app access token
 */

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://barlow.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, source } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

    if (!HUBSPOT_TOKEN) {
        console.error('HUBSPOT_ACCESS_TOKEN not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // Check if contact exists
        const searchResponse = await fetch(
            'https://api.hubapi.com/crm/v3/objects/contacts/search',
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

        const cleanSource = source ? String(source).trim().replace(/<[^>]*>/g, '').substring(0, 200) : 'barlow.app newsletter';
        const properties = {
            email: email.trim().toLowerCase(),
            hs_lead_status: 'NEWSLETTER_SUBSCRIBER',
            lifecyclestage: 'subscriber',
            leadsource: cleanSource
        };

        let contactId;
        let action;

        if (existingContact) {
            contactId = existingContact.id;
            action = 'updated';

            // Update to mark as newsletter subscriber
            await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        properties: {
                            hs_lead_status: 'NEWSLETTER_SUBSCRIBER'
                        }
                    })
                }
            );
        } else {
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

        console.log(`Newsletter subscriber ${action}: ${email} (ID: ${contactId})`);

        return res.status(200).json({
            success: true,
            action,
            message: 'Successfully subscribed to newsletter'
        });

    } catch (error) {
        console.error('HubSpot API error:', error);
        return res.status(500).json({
            error: 'Failed to subscribe'
        });
    }
}
