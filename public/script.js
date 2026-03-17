/**
 * Jonathan Barlow - barlow.app
 * Interactive JavaScript
 */

(function() {
    'use strict';

    // Mark JS as enabled (for CSS fallbacks)
    document.documentElement.classList.add('js-enabled');

    // ============================================
    // PAGE TRANSITIONS
    // ============================================
    document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="javascript"]):not([href^="mailto"])').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (!href || href === '#' || href.startsWith('javascript')) return;
            e.preventDefault();
            document.body.classList.add('page-leaving');
            setTimeout(function() { window.location.href = href; }, 200);
        });
    });

    // Fade in on page load
    window.addEventListener('pageshow', function() {
        document.body.classList.remove('page-leaving');
    });

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Dot follows immediately
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;

            // Ring follows with delay
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .venture-card, .strength-card, .investment-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorRing.style.borderColor = 'rgba(30, 64, 175, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorRing.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            });
        });
    }

    // ============================================
    // NAVIGATION
    // ============================================
    const navHeader = document.querySelector('.nav-header');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // Scroll effect on nav
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navHeader.classList.add('scrolled');
        } else {
            navHeader.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile nav toggle
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            navToggle.classList.toggle('active');

            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (mobileNav.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });

        // Close mobile nav on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    const heroImage = document.querySelector('.hero-image');
    const orbs = document.querySelectorAll('.orb');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Hero image parallax
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
        }

        // Orbs parallax
        orbs.forEach((orb, index) => {
            const speed = 0.05 + (index * 0.02);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Mouse move parallax on hero
    const hero = document.querySelector('.hero');
    if (hero && heroImage) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroImage.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'translate(0, 0)';
        });
    }

    // ============================================
    // CONTACT FORM WITH HUBSPOT INTEGRATION
    // ============================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="60" stroke-dashoffset="20">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                    </circle>
                </svg>
            `;

            // Collect form data
            var nameVal = document.getElementById('name').value;
            var subjectEl = document.getElementById('subject');
            var budgetEl = document.getElementById('budget');
            var timelineEl = document.getElementById('timeline');
            var companyEl = document.getElementById('company');
            var phoneEl = document.getElementById('phone');
            var messageEl = document.getElementById('message');

            var formData = {
                name: nameVal,
                email: document.getElementById('email').value,
                subject: subjectEl ? subjectEl.value : '',
                message: messageEl ? messageEl.value : '',
                submitted_at: new Date().toISOString(),
                source: 'barlow.app'
            };

            // Build full message with form details
            var fullMessage = formData.message || '';
            if (subjectEl && subjectEl.value) fullMessage = 'Inquiry: ' + subjectEl.options[subjectEl.selectedIndex].text + '\n\n' + fullMessage;
            if (companyEl && companyEl.value) fullMessage += '\n\nCompany: ' + companyEl.value;
            if (budgetEl && budgetEl.value) fullMessage += '\nBudget: ' + budgetEl.options[budgetEl.selectedIndex].text;
            if (timelineEl && timelineEl.value) fullMessage += '\nTimeline: ' + timelineEl.options[timelineEl.selectedIndex].text;

            try {
                // Send to Vercel serverless function → HubSpot
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        firstname: nameVal.split(' ')[0],
                        lastname: nameVal.split(' ').slice(1).join(' ') || '',
                        message: fullMessage,
                        phone: phoneEl ? phoneEl.value : '',
                        source: 'barlow.app contact form'
                    })
                });

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const result = await response.json();
                console.log('Contact submitted to HubSpot:', result);

                // Success
                contactForm.style.display = 'none';
                formSuccess.classList.remove('hidden');

                // Show toast notification
                if (window.showToast) {
                    window.showToast('success', 'Message Sent!', 'Thanks for reaching out. I\'ll get back to you soon.');
                }

                // Track event (for analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': formData.subject
                    });
                }

            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Show error toast
                if (window.showToast) {
                    window.showToast('error', 'Error Sending Message', 'Please try again or email j@barlow.app directly.');
                } else {
                    alert('There was an error sending your message. Please try again or email j@barlow.app directly.');
                }
            }
        });
    }

    // ============================================
    // NEWSLETTER FORM WITH HUBSPOT INTEGRATION
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            if (!emailInput.value) return;

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Subscribing...';

            try {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailInput.value,
                        source: 'barlow.app newsletter'
                    })
                });

                if (!response.ok) {
                    throw new Error('Subscription failed');
                }

                // Success
                emailInput.value = '';
                submitBtn.innerHTML = 'Subscribed!';
                submitBtn.classList.add('btn-success');

                // Track newsletter signup
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', { 'event_category': 'engagement', 'event_label': 'barlow.app newsletter' });
                }

                // Show toast notification
                if (window.showToast) {
                    window.showToast('success', 'Subscribed!', 'Welcome aboard! You\'ll receive updates on leadership and innovation.');
                }

                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error('Newsletter error:', error);
                submitBtn.innerHTML = 'Try Again';
                submitBtn.classList.add('btn-error');
                submitBtn.disabled = false;

                // Show error toast
                if (window.showToast) {
                    window.showToast('error', 'Subscription Failed', 'Please try again later.');
                }

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 2000);
            }
        });
    }

    // ============================================
    // TESTIMONIAL FORM SUBMISSION
    // ============================================
    var testimonialForm = document.getElementById('testimonial-form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            var btn = this.querySelector('button[type="submit"]');
            var origText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = 'Submitting...';

            var formData = {
                email: document.getElementById('test-email').value,
                firstname: document.getElementById('test-name').value.split(' ')[0],
                lastname: document.getElementById('test-name').value.split(' ').slice(1).join(' ') || '',
                message: 'TESTIMONIAL SUBMISSION\n\n' +
                    'Name: ' + document.getElementById('test-name').value + '\n' +
                    'Role: ' + (document.getElementById('test-role').value || 'N/A') + '\n' +
                    'Relationship: ' + (document.getElementById('test-relationship').value || 'N/A') + '\n\n' +
                    'Testimonial:\n' + document.getElementById('test-message').value,
                source: 'barlow.app testimonial form'
            };

            try {
                var response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) throw new Error('Failed');
                testimonialForm.style.display = 'none';
                document.getElementById('testimonial-success').classList.add('visible');
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'testimonial_submit', { 'event_category': 'engagement', 'event_label': document.getElementById('test-relationship').value || 'unknown' });
                }
                if (window.showToast) window.showToast('success', 'Thank You!', 'Your testimonial has been submitted.');
            } catch (err) {
                btn.disabled = false;
                btn.innerHTML = origText;
                if (window.showToast) window.showToast('error', 'Error', 'Please try again or email j@barlow.app.');
            }
        });
    }

    // ============================================
    // VENTURE CONSTELLATION ANIMATION
    // ============================================
    const constellationCenter = document.querySelector('.constellation-center');
    const orbitNodes = document.querySelectorAll('.orbit-node');

    // Pause animation on hover
    orbitNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const orbit = node.closest('.constellation-orbit');
            if (orbit) {
                orbit.style.animationPlayState = 'paused';
                node.querySelector('.node-label').style.animationPlayState = 'paused';
            }
        });

        node.addEventListener('mouseleave', () => {
            const orbit = node.closest('.constellation-orbit');
            if (orbit) {
                orbit.style.animationPlayState = 'running';
                node.querySelector('.node-label').style.animationPlayState = 'running';
            }
        });
    });

    // ============================================
    // GALLERY LIGHTBOX (Optional Enhancement)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;

            // Add styles dynamically
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            const overlay = lightbox.querySelector('.lightbox-overlay');
            overlay.style.cssText = `
                position: absolute;
                inset: 0;
                background: rgba(26, 18, 37, 0.95);
            `;

            const content = lightbox.querySelector('.lightbox-content');
            content.style.cssText = `
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                animation: fadeIn 0.3s ease;
            `;

            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 90vh;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            `;

            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                width: 40px;
                height: 40px;
                background: none;
                border: none;
                color: white;
                font-size: 32px;
                cursor: pointer;
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close handlers
            const closeLightbox = () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            };

            overlay.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            }, { once: true });
        });
    });

    // ============================================
    // STATS COUNTER ANIMATION (Enhanced version)
    // ============================================
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');

        // Easing function for dramatic slowdown at end
        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        statNumbers.forEach((el, index) => {
            const target = parseInt(el.dataset.count) || 0;
            const duration = 2500;
            let start = null;

            // Stagger start times
            setTimeout(() => {
                function step(timestamp) {
                    if (!start) start = timestamp;
                    const elapsed = timestamp - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutExpo(progress);
                    const current = Math.floor(easedProgress * target);

                    el.textContent = current;

                    // Add pulse effect at milestones
                    if (current === Math.floor(target * 0.5) || current === target) {
                        el.style.transform = 'scale(1.1)';
                        setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
                    }

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target;
                        el.classList.add('counter-complete');
                    }
                }

                requestAnimationFrame(step);
            }, index * 200); // Stagger by 200ms each
        });
    }

    // Start counters after 1 second
    setTimeout(animateCounters, 1000);

    // ============================================
    // TYPEWRITER EFFECT (Hero Title Enhancement)
    // ============================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            setTimeout(() => {
                line.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        });
    }

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    });

    // ============================================
    // PRELOAD IMAGES
    // ============================================
    const preloadImages = () => {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    };

    // Run after page load
    window.addEventListener('load', preloadImages);

    // ============================================
    // SERVICE WORKER REGISTRATION (PWA)
    // ============================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration.scope);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        });
    }

    // ============================================
    // HUBSPOT INTEGRATION HELPERS
    // ============================================
    window.BarlowForms = {
        // Method to send data to HubSpot (call from backend/serverless)
        submitToHubSpot: async function(formData) {
            // HubSpot Forms API endpoint structure:
            // POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}

            // The actual implementation would be:
            /*
            const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields: [
                        { name: 'email', value: formData.email },
                        { name: 'firstname', value: formData.name.split(' ')[0] },
                        { name: 'lastname', value: formData.name.split(' ').slice(1).join(' ') },
                        { name: 'message', value: formData.message },
                        { name: 'subject', value: formData.subject }
                    ],
                    context: {
                        pageUri: window.location.href,
                        pageName: document.title
                    }
                })
            });
            return response.json();
            */

            console.log('HubSpot integration point - formData:', formData);
            return { success: true };
        },

        // Get stored submissions (for System Brain sync)
        getStoredSubmissions: function() {
            return JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        },

        // Clear stored submissions after sync
        clearStoredSubmissions: function() {
            localStorage.removeItem('contact_submissions');
        }
    };

    // ========== DARK MODE TOGGLE ==========
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;

    // Check for saved theme preference or system preference
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }

    // Initialize theme
    applyTheme(getPreferredTheme());

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(currentTheme);
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        // Smooth scroll to top on click
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== COOKIE CONSENT ==========
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');

    if (cookieConsent && !localStorage.getItem('cookieConsent')) {
        // Show banner after 2 seconds
        setTimeout(() => {
            cookieConsent.classList.add('visible');
        }, 2000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('visible');
            if (typeof loadGA4 === 'function') loadGA4();
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('visible');
        });
    }

    // ========== FORM VALIDATION ENHANCEMENT ==========
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    formInputs.forEach(input => {
        // Add validation styling on blur
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
                if (this.checkValidity()) {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                } else {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                }
            } else {
                this.classList.remove('has-value', 'valid', 'invalid');
            }
        });

        // Remove validation styling on focus
        input.addEventListener('focus', function() {
            this.classList.remove('invalid');
        });
    });

    // ========== SMOOTH ANCHOR SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== PARALLAX EFFECTS ==========
    const parallaxElements = document.querySelectorAll('.hero-image, .orb');

    if (parallaxElements.length > 0 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;

                    parallaxElements.forEach(el => {
                        const speed = el.classList.contains('orb') ? 0.05 : 0.15;
                        const yPos = -(scrollY * speed);
                        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                    });

                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========== ANIMATED TYPING EFFECT ==========
    (function initTypewriter() {
        var el = document.querySelector('.hero-tagline .typing-text');
        if (!el) return;

        var phrases = ['Life Engineer', 'Serial Innovator', 'Community Builder', 'Thought Leader'];
        var phraseIdx = 0;
        var charIdx = phrases[0].length;
        var deleting = true;

        function tick() {
            var phrase = phrases[phraseIdx];

            if (deleting) {
                charIdx--;
                el.textContent = phrase.substring(0, charIdx);
            } else {
                charIdx++;
                el.textContent = phrase.substring(0, charIdx);
            }

            var speed = deleting ? 50 : 100;

            if (!deleting && charIdx === phrase.length) {
                speed = 2000;
                deleting = true;
            } else if (deleting && charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                speed = 500;
            }

            setTimeout(tick, speed);
        }

        // Start after 2 seconds
        setTimeout(tick, 2000);
    })();

    // ========== ICON HOVER MICRO-ANIMATIONS ==========
    const iconContainers = document.querySelectorAll('.service-icon, .contact-icon, .strength-icon');

    iconContainers.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const svg = icon.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1.1) rotate(5deg)';
                svg.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }
        });

        icon.addEventListener('mouseleave', () => {
            const svg = icon.querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ========== READING PROGRESS BAR (Blog Pages) ==========
    const articleContent = document.querySelector('.article-content, .blog-article, .article-body');

    if (articleContent) {
        const readingProgress = document.createElement('div');
        readingProgress.className = 'reading-progress';
        readingProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(135deg, #1e40af 0%, #059669 100%);
            z-index: 10000;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(readingProgress);

        window.addEventListener('scroll', () => {
            const articleTop = articleContent.offsetTop;
            const articleHeight = articleContent.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            const progress = Math.max(0, Math.min(100,
                ((scrollPosition - articleTop + windowHeight * 0.5) / articleHeight) * 100
            ));

            readingProgress.style.width = `${progress}%`;
        }, { passive: true });
    }

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(other => {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // ========== SOCIAL SHARE BUTTONS ==========
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);

            if (btn.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=550,height=420');
            } else if (btn.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=550,height=420');
            } else if (btn.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420');
            } else if (btn.classList.contains('copy')) {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    btn.classList.add('copied');
                    setTimeout(() => btn.classList.remove('copied'), 2000);
                });
            }
        });
    });

    // ========== ENHANCED FORM VALIDATION ==========
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            // Real-time validation on blur
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            // Clear validation on focus
            input.addEventListener('focus', () => {
                input.classList.remove('valid', 'invalid');
                const msg = input.parentElement.querySelector('.validation-message');
                if (msg) msg.classList.remove('visible');
            });
        });

        function validateInput(input) {
            const value = input.value.trim();
            const type = input.type;
            let isValid = true;
            let message = '';

            if (input.required && !value) {
                isValid = false;
                message = 'This field is required';
            } else if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email';
                }
            }

            input.classList.remove('valid', 'invalid');
            input.classList.add(isValid ? 'valid' : 'invalid');

            // Show/hide validation message
            let msgEl = input.parentElement.querySelector('.validation-message');
            if (!msgEl && !isValid) {
                msgEl = document.createElement('span');
                msgEl.className = 'validation-message error';
                input.parentElement.appendChild(msgEl);
            }
            if (msgEl) {
                msgEl.textContent = message;
                msgEl.classList.toggle('visible', !isValid);
            }
        }
    });

    // ========== PARALLAX SCROLL EFFECT ==========
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    if (parallaxBgs.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            parallaxBgs.forEach(bg => {
                const speed = bg.dataset.speed || 0.3;
                bg.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }

    // ========== TOAST NOTIFICATION SYSTEM ==========
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    window.showToast = function(type, title, message, duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            error: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
            info: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
        };

        toast.innerHTML = `
            ${icons[type] || icons.info}
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
        `;

        toastContainer.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });

        // Close handlers
        const closeToast = () => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 400);
        };

        toast.querySelector('.toast-close').addEventListener('click', closeToast);
        setTimeout(closeToast, duration);

        return toast;
    };

    // ========== BUTTON RIPPLE EFFECT ==========
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========== ENHANCED IMAGE LIGHTBOX ==========
    const lightboxImages = document.querySelectorAll('.gallery-item img, .lightbox-trigger, [data-lightbox]');

    if (lightboxImages.length > 0) {
        // Create lightbox modal
        const lightboxModal = document.createElement('div');
        lightboxModal.className = 'lightbox-modal';
        lightboxModal.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-nav lightbox-prev">&larr;</button>
            <button class="lightbox-nav lightbox-next">&rarr;</button>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightboxModal);

        let currentImageIndex = 0;
        const imagesArray = Array.from(lightboxImages);

        const openLightbox = (index) => {
            currentImageIndex = index;
            const img = imagesArray[index];
            const src = img.dataset.full || img.src;
            const caption = img.alt || img.dataset.caption || '';

            lightboxModal.querySelector('img').src = src;
            lightboxModal.querySelector('.lightbox-caption').textContent = caption;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        const nextImage = () => {
            currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
            openLightbox(currentImageIndex);
        };

        const prevImage = () => {
            currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
            openLightbox(currentImageIndex);
        };

        imagesArray.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => openLightbox(index));
        });

        lightboxModal.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightboxModal.querySelector('.lightbox-next').addEventListener('click', nextImage);
        lightboxModal.querySelector('.lightbox-prev').addEventListener('click', prevImage);
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    // ========== VIDEO MODAL ==========
    const videoTriggers = document.querySelectorAll('[data-video], .play-video-btn');

    if (videoTriggers.length > 0) {
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <div class="video-wrapper"></div>
            </div>
        `;
        document.body.appendChild(videoModal);

        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const videoUrl = trigger.dataset.video || trigger.href;
                const wrapper = videoModal.querySelector('.video-wrapper');

                // Check if YouTube
                if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                    const videoId = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/)?.[1];
                    wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                } else if (videoUrl.includes('vimeo.com')) {
                    const videoId = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
                    wrapper.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
                } else {
                    wrapper.innerHTML = `<video src="${videoUrl}" controls autoplay></video>`;
                }

                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeVideoModal = () => {
            videoModal.classList.remove('active');
            videoModal.querySelector('.video-wrapper').innerHTML = '';
            document.body.style.overflow = '';
        };

        videoModal.querySelector('.video-modal-close').addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }

    // ========== TESTIMONIALS CAROUSEL ==========
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    if (testimonialsTrack && testimonialDots.length > 0) {
        let currentSlide = 0;
        const cards = testimonialsTrack.querySelectorAll('.testimonial-card');
        const totalSlides = cards.length;

        const updateCarousel = (index) => {
            const cardWidth = cards[0].offsetWidth + 30; // card + gap
            testimonialsTrack.style.transform = `translateX(-${index * cardWidth}px)`;

            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel(currentSlide);
            });
        });

        // Auto-advance every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel(currentSlide);
        }, 5000);
    }

    // ========== EASTER EGG - KONAMI CODE ==========
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const overlay = document.createElement('div');
        overlay.className = 'easter-egg-overlay';
        overlay.innerHTML = `
            <button class="easter-egg-close">&times;</button>
            <div class="easter-egg-content">
                <div class="easter-egg-emoji">🚀</div>
                <h2 class="easter-egg-text">You Found It!</h2>
                <p class="easter-egg-subtext">Always Fixing the Future - one keystroke at a time</p>
            </div>
        `;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => overlay.classList.add('active'));

        const closeEgg = () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 500);
        };

        overlay.querySelector('.easter-egg-close').addEventListener('click', closeEgg);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeEgg();
        });

        // Show toast
        if (window.showToast) {
            window.showToast('success', 'Easter Egg Found!', 'You discovered the Konami code!');
        }
    }

    // ========== LAZY LOADING IMAGE HANDLER ==========
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        // If already loaded
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // ========== BLOG CATEGORY FILTER ==========
    const blogFilters = document.querySelectorAll('.blog-filter');
    const blogCards = document.querySelectorAll('.blog-card');

    if (blogFilters.length > 0 && blogCards.length > 0) {
        blogFilters.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var filter = this.getAttribute('data-filter');
                blogFilters.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                blogCards.forEach(function(card) {
                    card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? '' : 'none';
                });
            });
        });
    }

    // ========== BLOG SEARCH ==========
    var blogSearchInput = document.getElementById('blog-search');
    if (blogSearchInput && blogCards.length > 0) {
        blogSearchInput.addEventListener('input', function() {
            var query = this.value.toLowerCase().trim();
            blogCards.forEach(function(card) {
                var title = (card.querySelector('h3') || {}).textContent || '';
                var excerpt = (card.querySelector('p') || {}).textContent || '';
                var category = card.getAttribute('data-category') || '';
                var match = !query || title.toLowerCase().includes(query) || excerpt.toLowerCase().includes(query) || category.includes(query);
                card.style.display = match ? '' : 'none';
            });
            // Reset category filter to "All" when searching
            if (query && blogFilters.length > 0) {
                blogFilters.forEach(function(b) { b.classList.remove('active'); });
                var allBtn = document.querySelector('.blog-filter[data-filter="all"]');
                if (allBtn) allBtn.classList.add('active');
            }
        });
    }

    // ========== READING LIST (SAVE FOR LATER) ==========
    var READING_LIST_KEY = 'barlow_reading_list';

    function getReadingList() {
        try { return JSON.parse(localStorage.getItem(READING_LIST_KEY) || '[]'); } catch (e) { return []; }
    }

    function saveReadingList(list) {
        localStorage.setItem(READING_LIST_KEY, JSON.stringify(list));
    }

    function isInReadingList(url) {
        return getReadingList().some(function(item) { return item.url === url; });
    }

    function toggleReadingList(url, title) {
        var list = getReadingList();
        var idx = list.findIndex(function(item) { return item.url === url; });
        if (idx >= 0) {
            list.splice(idx, 1);
        } else {
            list.push({ url: url, title: title, savedAt: new Date().toISOString() });
        }
        saveReadingList(list);
        return idx < 0; // returns true if added
    }

    // Add bookmark buttons to blog cards
    blogCards.forEach(function(card) {
        var link = card.querySelector('.card-link');
        if (!link) return;
        var url = link.getAttribute('href');
        if (!url || url === '#') return;
        var title = (card.querySelector('h3') || {}).textContent || '';

        var bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.setAttribute('aria-label', 'Save to reading list');
        bookmarkBtn.style.cssText = 'position:absolute;top:0.75rem;right:0.75rem;width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,0.9);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2;transition:all 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.1);';

        var saved = isInReadingList(url);
        bookmarkBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (saved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
        if (saved) bookmarkBtn.style.color = '#1e40af';

        bookmarkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var added = toggleReadingList(url, title);
            this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (added ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
            this.style.color = added ? '#1e40af' : '';
            if (window.showToast) {
                window.showToast(added ? 'success' : 'info', added ? 'Saved!' : 'Removed', added ? 'Added to your reading list' : 'Removed from reading list');
            }
        });

        var imageDiv = card.querySelector('.card-image');
        if (imageDiv) {
            imageDiv.style.position = 'relative';
            imageDiv.appendChild(bookmarkBtn);
        }
    });

    // ========== LOGO IMAGE ERROR FALLBACK ==========
    document.querySelectorAll('.venture-logo img, .card-logo, [data-fallback]').forEach(img => {
        img.addEventListener('error', function() {
            var fallback = this.getAttribute('data-fallback') || this.alt.split(' ').map(function(w) { return w[0]; }).join('').substring(0, 3);
            if (fallback === 'hide') {
                this.style.display = 'none';
            } else {
                this.parentElement.textContent = fallback;
            }
        });
    });

    // ========== VENTURE SEARCH/FILTER ==========
    const ventureSearch = document.querySelector('.venture-search input');
    const ventureCards = document.querySelectorAll('.venture-card');

    if (ventureSearch && ventureCards.length > 0) {
        ventureSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            ventureCards.forEach(card => {
                const name = card.querySelector('h4')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                const matches = name.includes(searchTerm) || desc.includes(searchTerm);

                card.classList.toggle('hidden', !matches && searchTerm !== '');
            });
        });
    }

    // ========== SCROLL-TRIGGERED STAT COUNTERS ==========
    const statCards = document.querySelectorAll('.stat-card');

    if (statCards.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => counterObserver.observe(card));
    }

    // ========== READING TIME CALCULATOR ==========
    const articleBody = document.querySelector('.article-body, .article-content');
    const readingTimeEl = document.querySelector('.reading-time span, .reading-time');

    if (articleBody && readingTimeEl) {
        const text = articleBody.textContent || '';
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200); // Average reading speed
        readingTimeEl.textContent = `${minutes} min read`;
    }

    // ========== UPDATE CONTACT FORM TO USE TOAST ==========
    const originalContactForm = document.getElementById('contact-form');
    if (originalContactForm) {
        const originalSubmitHandler = originalContactForm.onsubmit;
        originalContactForm.addEventListener('submit', async function(e) {
            // The original handler should prevent default and handle submission
            // We just add toast notifications
        });
    }

    // ========== SERVICE WORKER REGISTRATION ==========
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered:', registration.scope);

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New version available
                                console.log('New version available');
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }

    // ========== ANALYTICS EVENT TRACKING ==========
    const trackEvent = (category, action, label) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    };

    // Track CTA button clicks
    document.querySelectorAll('.btn-primary, .nav-cta, .chat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const label = btn.textContent?.trim() || btn.getAttribute('aria-label') || 'CTA';
            trackEvent('engagement', 'cta_click', label);
        });
    });

    // Track outbound links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', () => {
            const url = new URL(link.href);
            trackEvent('outbound', 'click', url.hostname);
        });
    });

    // Track scroll depth
    let scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };

    const trackScrollDepth = () => {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

        [25, 50, 75, 100].forEach(threshold => {
            if (scrollPercent >= threshold && !scrollDepthTracked[threshold]) {
                scrollDepthTracked[threshold] = true;
                trackEvent('scroll', 'depth', `${threshold}%`);
            }
        });
    };

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackScrollDepth, 100);
    }, { passive: true });

    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            const formId = form.id || form.className || 'unknown';
            trackEvent('form', 'submit', formId);
        });
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('engagement', 'time_on_page', `${timeSpent}s`);
    });

    // ========== A/B TESTING FRAMEWORK ==========
    window.BarlowAB = (function() {
        const STORAGE_KEY = 'barlow_ab_tests';
        const tests = {};

        // Get or create a consistent visitor ID
        function getVisitorId() {
            let id = localStorage.getItem('barlow_visitor_id');
            if (!id) {
                id = 'v_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('barlow_visitor_id', id);
            }
            return id;
        }

        // Get stored test assignments
        function getAssignments() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            } catch (e) {
                return {};
            }
        }

        // Save test assignments
        function saveAssignments(assignments) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
        }

        // Hash function for consistent assignment
        function hashString(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash);
        }

        // Register a new A/B test
        function registerTest(testId, variants, options = {}) {
            tests[testId] = {
                variants: variants,
                weights: options.weights || variants.map(() => 1 / variants.length),
                active: options.active !== false
            };
        }

        // Get variant for a test (consistent per visitor)
        function getVariant(testId) {
            const test = tests[testId];
            if (!test || !test.active) return null;

            const assignments = getAssignments();

            // Check if already assigned
            if (assignments[testId]) {
                return assignments[testId];
            }

            // Assign based on visitor ID hash
            const visitorId = getVisitorId();
            const hash = hashString(visitorId + testId);
            const normalized = (hash % 100) / 100;

            let cumulative = 0;
            let selectedVariant = test.variants[0];

            for (let i = 0; i < test.variants.length; i++) {
                cumulative += test.weights[i];
                if (normalized < cumulative) {
                    selectedVariant = test.variants[i];
                    break;
                }
            }

            // Store assignment
            assignments[testId] = selectedVariant;
            saveAssignments(assignments);

            // Track assignment
            trackEvent('ab_test', 'assigned', `${testId}:${selectedVariant}`);

            return selectedVariant;
        }

        // Apply variant to page elements
        function applyVariant(testId, variantHandlers) {
            const variant = getVariant(testId);
            if (variant && variantHandlers[variant]) {
                variantHandlers[variant]();
            }
            return variant;
        }

        // Track conversion for a test
        function trackConversion(testId, conversionType = 'default') {
            const assignments = getAssignments();
            const variant = assignments[testId];
            if (variant) {
                trackEvent('ab_test', 'conversion', `${testId}:${variant}:${conversionType}`);
            }
        }

        // Add data attribute to body for CSS-based variants
        function applyBodyClass(testId) {
            const variant = getVariant(testId);
            if (variant) {
                document.body.setAttribute(`data-ab-${testId}`, variant);
            }
            return variant;
        }

        return {
            register: registerTest,
            getVariant: getVariant,
            apply: applyVariant,
            convert: trackConversion,
            applyClass: applyBodyClass,
            getVisitorId: getVisitorId
        };
    })();

    // ========== EXAMPLE A/B TEST SETUP ==========
    // Register available tests (edit these to create new tests)

    // CTA Button Text Test
    BarlowAB.register('cta_text', ['control', 'variant_a', 'variant_b'], {
        weights: [0.34, 0.33, 0.33]
    });

    // Hero Headline Test
    BarlowAB.register('hero_headline', ['original', 'systems', 'impact'], {
        weights: [0.34, 0.33, 0.33]
    });

    // Apply CTA text variants
    BarlowAB.apply('cta_text', {
        control: function() {
            // Default: "Request to Book"
        },
        variant_a: function() {
            document.querySelectorAll('.nav-cta, .hero-cta .btn-primary').forEach(btn => {
                if (btn.textContent.includes('Request to Book') || btn.textContent.includes('Book a Consultation')) {
                    btn.textContent = 'Start a Conversation';
                }
            });
        },
        variant_b: function() {
            document.querySelectorAll('.nav-cta, .hero-cta .btn-primary').forEach(btn => {
                if (btn.textContent.includes('Request to Book') || btn.textContent.includes('Book a Consultation')) {
                    btn.textContent = 'Let\'s Connect';
                }
            });
        }
    });

    // Apply body class for CSS-based A/B testing
    BarlowAB.applyClass('hero_headline');

    // Track conversions on form submit
    const contactFormAB = document.getElementById('contact-form');
    if (contactFormAB) {
        contactFormAB.addEventListener('submit', () => {
            BarlowAB.convert('cta_text', 'form_submit');
            BarlowAB.convert('hero_headline', 'form_submit');
        });
    }

    // Track conversions on booking link click
    document.querySelectorAll('a[href*="calendar.app.google"]').forEach(link => {
        link.addEventListener('click', () => {
            BarlowAB.convert('cta_text', 'book_click');
            BarlowAB.convert('hero_headline', 'book_click');
        });
    });

    console.log('barlow.app initialized');

})();
