/**
 * barlow.app — Premium GSAP Animations
 * BOLD, VISIBLE, DRAMATIC — Awwwards-quality motion
 */

(function () {
    'use strict';

    if (typeof gsap === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    var isMobile = window.innerWidth < 768;
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var hasFine = window.matchMedia('(pointer: fine)').matches;


    // ═══════════════════════════════════════════
    // KILL EXISTING REVEAL SYSTEM — GSAP takes over
    // ═══════════════════════════════════════════

    // Remove data-reveal from elements GSAP will handle
    // This prevents the existing IntersectionObserver from
    // animating them with CSS transitions
    document.querySelectorAll('[data-reveal]').forEach(function(el) {
        el.removeAttribute('data-reveal');
        el.classList.remove('revealed');
    });

    // Override the CSS reveal transition
    var killStyle = document.createElement('style');
    killStyle.textContent = '[data-reveal],.revealed{opacity:1!important;transform:none!important;transition:none!important;}';
    document.head.appendChild(killStyle);


    // ═══════════════════════════════════════════
    // 1. LENIS SMOOTH SCROLL
    // ═══════════════════════════════════════════

    if (typeof Lenis !== 'undefined' && !isIOS) {
        var lenis = new Lenis({
            lerp: isMobile ? 0.07 : 0.09,
            duration: 1.4,
            smoothWheel: true,
            wheelMultiplier: 0.9,
        });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function(t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
        window.__lenis = lenis;
    }


    // ═══════════════════════════════════════════
    // 2. HERO — DRAMATIC ENTRANCE
    // ═══════════════════════════════════════════

    var heroTitle = document.querySelector('.hero-title');
    var heroLines = document.querySelectorAll('.hero-title .title-line');
    var heroSub = document.querySelector('.hero-subtitle');
    var heroBtns = document.querySelectorAll('.hero-actions .btn');
    var heroMotto = document.querySelector('.hero-motto');
    var heroTag = document.querySelector('.hero-tagline');
    var heroImage = document.querySelector('.hero-image');
    var profileImg = document.querySelector('.profile-img');
    var statCards = document.querySelectorAll('.floating-stats .stat-card');

    // Hide everything immediately
    gsap.set([heroLines, heroSub, heroBtns, heroMotto, heroTag], {
        opacity: 0, y: 80
    });
    if (heroImage) gsap.set(heroImage, { opacity: 0, scale: 0.85, x: 60 });

    if (!isMobile && heroLines.length) {
        // CHARACTER SPLIT — each char flies up from below
        heroLines.forEach(function(line) {
            var txt = line.textContent;
            var html = '';
            for (var i = 0; i < txt.length; i++) {
                var ch = txt[i] === ' ' ? '&nbsp;' : txt[i];
                html += '<span style="display:inline-block;opacity:0;transform:translateY(120%) rotate(8deg)">' + ch + '</span>';
            }
            line.innerHTML = html;
            line.style.overflow = 'hidden';
            line.style.opacity = '1';
        });

        var chars = document.querySelectorAll('.hero-title .title-line span');
        var tl = gsap.timeline({ delay: 0.4 });

        // Chars fly in with rotation
        tl.to(chars, {
            y: '0%', rotation: 0, opacity: 1,
            duration: 1,
            stagger: 0.02,
            ease: 'power4.out',
        })
        // Hero image scales in from right
        .to(heroImage, {
            opacity: 1, scale: 1, x: 0,
            duration: 1.2,
            ease: 'power3.out',
        }, 0.3)
        // Tagline
        .to(heroTag, {
            opacity: 1, y: 0, duration: 0.7,
            ease: 'power3.out',
        }, '-=0.7')
        // Subtitle
        .to(heroSub, {
            opacity: 1, y: 0, duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5')
        // Buttons fly in with spring
        .to(heroBtns, {
            opacity: 1, y: 0,
            duration: 0.7, stagger: 0.15,
            ease: 'back.out(1.7)',
        }, '-=0.4')
        // Motto
        .to(heroMotto, {
            opacity: 1, y: 0, duration: 0.5,
        }, '-=0.3')
        // Stat cards pop in
        .from(statCards, {
            scale: 0, opacity: 0,
            duration: 0.6, stagger: 0.15,
            ease: 'back.out(2)',
        }, '-=0.4');

    } else {
        // Mobile: simpler but still dramatic
        var mtl = gsap.timeline({ delay: 0.2 });
        mtl.to(heroLines, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' })
           .to(heroImage, { opacity: 1, scale: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
           .to(heroTag, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
           .to(heroSub, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
           .to(heroBtns, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.2')
           .to(heroMotto, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');
    }


    // ═══════════════════════════════════════════
    // 3. SECTION LABELS — SLIDE IN FROM LEFT
    // ═══════════════════════════════════════════

    document.querySelectorAll('.section-label').forEach(function(label) {
        gsap.from(label, {
            x: -60, opacity: 0, duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: label, start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });
    });


    // ═══════════════════════════════════════════
    // 4. SECTION TITLES — WORD-BY-WORD CLIP REVEAL
    // ═══════════════════════════════════════════

    document.querySelectorAll('.section-title').forEach(function(title) {
        if (title.closest('.hero') || title.closest('.blog-header')) return;

        var words = title.textContent.trim().split(/\s+/);
        var html = '';
        words.forEach(function(w) {
            html += '<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.05em;">' +
                '<span class="gw" style="display:inline-block">' + w + '</span></span> ';
        });
        title.innerHTML = html;

        gsap.from(title.querySelectorAll('.gw'), {
            yPercent: 120,
            duration: 0.9,
            stagger: 0.06,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
    });


    // ═══════════════════════════════════════════
    // 5. SECTION SUBTITLES — FADE UP
    // ═══════════════════════════════════════════

    document.querySelectorAll('.section-subtitle, .section-desc, .about-description, .page-subtitle').forEach(function(el) {
        if (el.closest('.hero')) return;
        gsap.from(el, {
            y: 40, opacity: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el, start: 'top 88%',
                toggleActions: 'play none none none',
            },
        });
    });


    // ═══════════════════════════════════════════
    // 6. CARDS — STAGGERED FLY-IN WITH ROTATION
    // ═══════════════════════════════════════════

    var cardContainers = document.querySelectorAll(
        '.strengths-grid, .advisor-cards, .venture-cards, .ventures-grid, ' +
        '.blog-grid, .press-grid-enhanced, .entities-grid, .beta-features, ' +
        '.advisor-features, .ventures-list, .media-logos'
    );

    cardContainers.forEach(function(container) {
        var kids = container.children;
        if (!kids.length) return;

        gsap.from(kids, {
            y: isMobile ? 50 : 100,
            opacity: 0,
            rotation: isMobile ? 0 : 3,
            scale: 0.92,
            duration: isMobile ? 0.5 : 0.9,
            stagger: isMobile ? 0.05 : 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container,
                start: 'top 90%',
                toggleActions: 'play none none none',
            },
            overwrite: 'auto',
        });
    });


    // ═══════════════════════════════════════════
    // 7. PARALLAX — VISIBLE DEPTH MOVEMENT
    // ═══════════════════════════════════════════

    if (!isMobile) {
        // Hero image parallax
        if (profileImg) {
            gsap.to(profileImg, {
                yPercent: -18, ease: 'none',
                scrollTrigger: {
                    trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true,
                },
            });
        }

        // About images
        document.querySelectorAll('.about-feature-images img').forEach(function(img, i) {
            gsap.to(img, {
                yPercent: -(10 + i * 8), ease: 'none',
                scrollTrigger: {
                    trigger: img.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true,
                },
            });
        });

        // Orbs parallax (enhance existing)
        document.querySelectorAll('.orb').forEach(function(orb, i) {
            gsap.to(orb, {
                yPercent: -(20 + i * 15), ease: 'none',
                scrollTrigger: {
                    trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true,
                },
            });
        });
    }


    // ═══════════════════════════════════════════
    // 8. STATS COUNTER — SCROLL TRIGGERED
    // ═══════════════════════════════════════════

    var statNums = document.querySelectorAll('.stat-number[data-count]');
    if (statNums.length) {
        // Reset to 0 immediately
        statNums.forEach(function(el) { el.textContent = '0'; });

        var trigger = document.querySelector('.floating-stats');
        if (trigger) {
            statNums.forEach(function(el) {
                var target = parseInt(el.getAttribute('data-count'), 10);
                var obj = { v: 0 };
                gsap.to(obj, {
                    v: target, duration: 2.5, ease: 'power2.out',
                    onUpdate: function() { el.textContent = Math.round(obj.v); },
                    onComplete: function() {
                        gsap.to(el, { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' });
                    },
                    scrollTrigger: {
                        trigger: trigger, start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            });
        }
    }


    // ═══════════════════════════════════════════
    // 9. MARQUEE — GSAP-DRIVEN WITH SPEED BOOST
    // ═══════════════════════════════════════════

    var marqueeLogos = document.querySelectorAll('.marquee-logos');
    if (marqueeLogos.length) {
        marqueeLogos.forEach(function(track) {
            track.style.animation = 'none';
        });

        var mtl = gsap.to(marqueeLogos, {
            xPercent: -50, duration: 22, ease: 'none', repeat: -1,
        });

        var speed = 1;
        ScrollTrigger.create({
            trigger: '.client-marquee',
            start: 'top bottom', end: 'bottom top',
            onUpdate: function(self) {
                speed = 1 + Math.abs(self.getVelocity()) / 300;
                mtl.timeScale(Math.min(speed, 5));
            },
        });

        gsap.ticker.add(function() {
            if (speed > 1.02) {
                speed += (1 - speed) * 0.04;
                mtl.timeScale(speed);
            }
        });
    }


    // ═══════════════════════════════════════════
    // 10. MAGNETIC BUTTONS — CURSOR ATTRACTION
    // ═══════════════════════════════════════════

    if (hasFine && !isMobile) {
        document.querySelectorAll('.btn-primary, .nav-cta, .chat-btn').forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                var r = btn.getBoundingClientRect();
                var dx = e.clientX - r.left - r.width / 2;
                var dy = e.clientY - r.top - r.height / 2;
                gsap.to(btn, { x: dx * 0.35, y: dy * 0.35, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
            });
            btn.addEventListener('mouseleave', function() {
                gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
            });
        });
    }


    // ═══════════════════════════════════════════
    // 11. IMAGES — SCALE-IN ON SCROLL
    // ═══════════════════════════════════════════

    document.querySelectorAll('.highlight-images img, .speaker-intro-image img, .featured-image img, .card-image img').forEach(function(img) {
        gsap.from(img, {
            scale: 1.15, opacity: 0, duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: img, start: 'top 90%',
                toggleActions: 'play none none none',
            },
        });
    });


    // ═══════════════════════════════════════════
    // 12. CONTACT SECTION — SLIDE IN FROM SIDES
    // ═══════════════════════════════════════════

    var contactInfo = document.querySelector('.contact-info');
    var contactForm = document.querySelector('.contact-form-wrapper');

    if (contactInfo) {
        gsap.from(contactInfo, {
            x: -80, opacity: 0, duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: contactInfo, start: 'top 85%', toggleActions: 'play none none none' },
        });
    }
    if (contactForm) {
        gsap.from(contactForm, {
            x: 80, opacity: 0, duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: contactForm, start: 'top 85%', toggleActions: 'play none none none' },
        });
    }


    // ═══════════════════════════════════════════
    // 13. FOOTER — RISE UP
    // ═══════════════════════════════════════════

    var footer = document.querySelector('.footer');
    if (footer) {
        gsap.from(footer.children, {
            y: 60, opacity: 0, duration: 0.8,
            stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: footer, start: 'top 95%', toggleActions: 'play none none none' },
        });
    }


    // ═══════════════════════════════════════════
    // 14. NAV — ENTRANCE
    // ═══════════════════════════════════════════

    var navLinks = document.querySelectorAll('.nav-link');
    var navCta = document.querySelector('.nav-cta');
    var navLogo = document.querySelector('.nav-logo');

    if (navLogo) {
        gsap.from(navLogo, { x: -30, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' });
    }
    if (navLinks.length) {
        gsap.from(navLinks, { y: -20, opacity: 0, duration: 0.5, stagger: 0.06, delay: 0.2, ease: 'power3.out' });
    }
    if (navCta) {
        gsap.from(navCta, { scale: 0.8, opacity: 0, duration: 0.5, delay: 0.5, ease: 'back.out(1.7)' });
    }


    // ═══════════════════════════════════════════
    // 15. HORIZONTAL SCROLL REVEAL LINES
    // ═══════════════════════════════════════════

    document.querySelectorAll('.category-title').forEach(function(el) {
        gsap.from(el, {
            x: -40, opacity: 0, duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
    });


    // ═══════════════════════════════════════════
    // 16. TESTIMONIAL CARDS — FAN IN
    // ═══════════════════════════════════════════

    var testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length) {
        gsap.from(testimonials, {
            y: 80, opacity: 0, rotation: -3, scale: 0.9,
            duration: 0.9, stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: testimonials[0].closest('section'),
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });
    }


    // ═══════════════════════════════════════════
    // 17. FAQ ACCORDION — SLIDE IN
    // ═══════════════════════════════════════════

    document.querySelectorAll('.faq-item').forEach(function(item, i) {
        gsap.from(item, {
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0, duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        });
    });


    // ═══════════════════════════════════════════
    // 18. BETA CTA — DRAMATIC ENTRANCE
    // ═══════════════════════════════════════════

    var betaCta = document.querySelector('.beta-cta-section');
    if (betaCta) {
        var betaContent = betaCta.querySelector('.beta-cta-content');
        var betaVisual = betaCta.querySelector('.beta-cta-visual');

        if (betaContent) gsap.from(betaContent, {
            x: -100, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: betaCta, start: 'top 80%', toggleActions: 'play none none none' },
        });
        if (betaVisual) gsap.from(betaVisual, {
            x: 100, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: betaCta, start: 'top 80%', toggleActions: 'play none none none' },
        });
    }

})();
