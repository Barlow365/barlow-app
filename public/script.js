/**
 * Jonathan Barlow - barlow.app
 * Interactive JavaScript
 */

(function() {
    'use strict';

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
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                submitted_at: new Date().toISOString(),
                source: 'barlow.app'
            };

            try {
                // Send to Vercel serverless function → HubSpot
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        firstname: formData.name.split(' ')[0],
                        lastname: formData.name.split(' ').slice(1).join(' ') || '',
                        message: formData.message,
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
                alert('There was an error sending your message. Please try again or email j@barlow.app directly.');
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
                submitBtn.style.background = '#059669';

                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error('Newsletter error:', error);
                submitBtn.innerHTML = 'Try Again';
                submitBtn.style.background = '#dc2626';
                submitBtn.disabled = false;

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 2000);
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
    // STATS COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const number = parseInt(text);

                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 30;
                    const suffix = text.replace(/[0-9]/g, '');

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(current) + suffix;
                    }, 30);
                }

                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

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

    console.log('barlow.app initialized');

})();
