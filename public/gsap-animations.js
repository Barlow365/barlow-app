/**
 * barlow.app — Premium GSAP Animations
 * Requires: Lenis, GSAP Core, ScrollTrigger (loaded via CDN)
 *
 * Modules:
 * 1. Lenis Smooth Scroll
 * 2. Hero Text Split
 * 3. Section Heading Word Reveal
 * 4. Card Staggered Entrance
 * 5. Parallax Depth
 * 6. Stats Counter
 * 7. Marquee Speed Boost
 * 8. Magnetic Buttons
 */

(function () {
    'use strict';

    // ═══════════════════════════════════════════
    // GUARD CLAUSES
    // ═══════════════════════════════════════════

    if (typeof gsap === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;
    const isTouch = 'ontouchstart' in window;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const hasFineCursor = window.matchMedia('(pointer: fine)').matches;

    // Shared easing
    const EASE_REVEAL = 'power4.out';
    const EASE_SMOOTH = 'power3.out';
    const EASE_SPRING = 'back.out(1.4)';


    // ═══════════════════════════════════════════
    // 1. LENIS SMOOTH SCROLL
    // ═══════════════════════════════════════════

    if (typeof Lenis !== 'undefined' && !isIOS) {
        const lenis = new Lenis({
            lerp: isMobile ? 0.06 : 0.1,
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add(function (time) {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Expose for anchor clicks
        window.__lenis = lenis;
    }


    // ═══════════════════════════════════════════
    // 2. HERO TEXT SPLIT ANIMATION
    // ═══════════════════════════════════════════

    function initHeroSplit() {
        var titleLines = document.querySelectorAll('.hero-title .title-line');
        if (!titleLines.length) return;

        var heroSubtitle = document.querySelector('.hero-subtitle');
        var heroActions = document.querySelectorAll('.hero-actions .btn');
        var heroMotto = document.querySelector('.hero-motto');
        var heroTagline = document.querySelector('.hero-tagline');

        // Immediately hide elements before animation
        gsap.set(titleLines, { opacity: 1 }); // Override existing reveal
        gsap.set([heroSubtitle, heroMotto, heroTagline], { opacity: 0, y: 30 });
        gsap.set(heroActions, { opacity: 0, y: 40 });

        if (!isMobile) {
            // Desktop: Character-by-character split
            titleLines.forEach(function (line) {
                var text = line.textContent;
                var html = '';
                for (var i = 0; i < text.length; i++) {
                    var char = text[i] === ' ' ? '&nbsp;' : text[i];
                    html += '<span class="gsap-char" style="display:inline-block;opacity:0;transform:translateY(100%)">' + char + '</span>';
                }
                line.innerHTML = html;
                line.style.overflow = 'hidden';
                line.style.opacity = '1';
            });

            var allChars = document.querySelectorAll('.gsap-char');
            var tl = gsap.timeline({ delay: 0.3 });

            // Characters rise from bottom
            tl.to(allChars, {
                y: '0%',
                opacity: 1,
                duration: 0.9,
                stagger: 0.025,
                ease: EASE_REVEAL,
            });

            // Tagline fades in
            if (heroTagline) {
                tl.to(heroTagline, {
                    opacity: 1, y: 0, duration: 0.6, ease: EASE_SMOOTH
                }, '-=0.4');
            }

            // Subtitle slides up
            if (heroSubtitle) {
                tl.to(heroSubtitle, {
                    opacity: 1, y: 0, duration: 0.7, ease: EASE_SMOOTH
                }, '-=0.3');
            }

            // CTA buttons spring in
            if (heroActions.length) {
                tl.to(heroActions, {
                    opacity: 1, y: 0, duration: 0.6,
                    stagger: 0.12,
                    ease: EASE_SPRING,
                }, '-=0.3');
            }

            // Motto fades in
            if (heroMotto) {
                tl.to(heroMotto, {
                    opacity: 1, y: 0, duration: 0.5, ease: EASE_SMOOTH
                }, '-=0.2');
            }

        } else {
            // Mobile: Simple staggered fade
            var tl = gsap.timeline({ delay: 0.2 });
            tl.to(titleLines, {
                opacity: 1, duration: 0.6, stagger: 0.15, ease: EASE_SMOOTH
            });
            if (heroTagline) tl.to(heroTagline, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
            if (heroSubtitle) tl.to(heroSubtitle, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
            if (heroActions.length) tl.to(heroActions, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.2');
            if (heroMotto) tl.to(heroMotto, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');
        }
    }


    // ═══════════════════════════════════════════
    // 3. SECTION HEADING WORD REVEAL
    // ═══════════════════════════════════════════

    function initWordReveal() {
        var titles = document.querySelectorAll('.section-title');

        titles.forEach(function (title) {
            // Skip if inside hero (handled by hero animation)
            if (title.closest('.hero')) return;

            var words = title.textContent.trim().split(/\s+/);
            var html = '';

            words.forEach(function (word) {
                html += '<span class="gsap-word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.1em;">' +
                    '<span class="gsap-word" style="display:inline-block;transform:translateY(110%)">' + word + '</span>' +
                    '</span> ';
            });

            title.innerHTML = html;
            title.style.opacity = '1';

            var wordEls = title.querySelectorAll('.gsap-word');

            gsap.to(wordEls, {
                y: '0%',
                duration: 0.7,
                stagger: 0.04,
                ease: EASE_SMOOTH,
                scrollTrigger: {
                    trigger: title,
                    start: 'top 88%',
                    end: 'top 55%',
                    scrub: isMobile ? false : 1,
                    once: isMobile,
                }
            });
        });
    }


    // ═══════════════════════════════════════════
    // 4. CARD STAGGERED ENTRANCE
    // ═══════════════════════════════════════════

    function initCardEntrance() {
        var containers = document.querySelectorAll(
            '.strengths-grid, .advisor-cards, .venture-cards, .ventures-grid, ' +
            '.blog-grid, .press-grid-enhanced, .entities-grid, .beta-features'
        );

        containers.forEach(function (container) {
            var cards = container.children;
            if (!cards.length) return;

            gsap.from(cards, {
                y: isMobile ? 40 : 70,
                opacity: 0,
                rotation: isMobile ? 0 : 1.5,
                duration: isMobile ? 0.6 : 0.85,
                stagger: isMobile ? 0.06 : 0.1,
                ease: EASE_SMOOTH,
                scrollTrigger: {
                    trigger: container,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
                overwrite: 'auto',
            });
        });
    }


    // ═══════════════════════════════════════════
    // 5. PARALLAX DEPTH
    // ═══════════════════════════════════════════

    function initParallax() {
        if (isMobile) return;

        // Hero portrait
        var heroImg = document.querySelector('.profile-img');
        if (heroImg) {
            gsap.to(heroImg, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroImg.closest('.hero'),
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }

        // About section images
        var aboutImgs = document.querySelectorAll('.about-feature-images img');
        aboutImgs.forEach(function (img, i) {
            gsap.to(img, {
                yPercent: -(8 + i * 6),
                ease: 'none',
                scrollTrigger: {
                    trigger: img.closest('section'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });

        // Floating stats gentle float
        var statCards = document.querySelectorAll('.floating-stats .stat-card');
        statCards.forEach(function (card, i) {
            gsap.to(card, {
                yPercent: -(5 + i * 4),
                ease: 'none',
                scrollTrigger: {
                    trigger: card.closest('.hero'),
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        });
    }


    // ═══════════════════════════════════════════
    // 6. STATS COUNTER (Scroll-Triggered)
    // ═══════════════════════════════════════════

    function initStatsCounter() {
        var stats = document.querySelectorAll('.stat-number[data-count]');
        if (!stats.length) return;

        // Immediately reset to 0 (overrides existing setTimeout counter)
        stats.forEach(function (el) {
            el.textContent = '0';
        });

        var floatingStats = document.querySelector('.floating-stats');
        if (!floatingStats) return;

        stats.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-count'), 10);
            var obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 2.5,
                ease: 'power2.out',
                onUpdate: function () {
                    el.textContent = Math.round(obj.val);
                },
                onComplete: function () {
                    // Pulse on completion
                    gsap.fromTo(el, { scale: 1 }, {
                        scale: 1.2,
                        duration: 0.2,
                        yoyo: true,
                        repeat: 1,
                        ease: 'power2.inOut',
                    });
                },
                scrollTrigger: {
                    trigger: floatingStats,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }


    // ═══════════════════════════════════════════
    // 7. MARQUEE SPEED BOOST
    // ═══════════════════════════════════════════

    function initMarquee() {
        var tracks = document.querySelectorAll('.marquee-logos');
        if (!tracks.length) return;

        // Pause native CSS animation
        tracks.forEach(function (track) {
            track.style.animationPlayState = 'paused';
            track.style.animation = 'none';
        });

        // Drive with GSAP
        var marqueeTl = gsap.to(tracks, {
            xPercent: -50,
            duration: 25,
            ease: 'none',
            repeat: -1,
        });

        // Boost speed on scroll
        var speedMultiplier = 1;

        ScrollTrigger.create({
            trigger: document.querySelector('.client-marquee'),
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: function (self) {
                var v = Math.abs(self.getVelocity());
                var target = 1 + v / 400;
                speedMultiplier += (target - speedMultiplier) * 0.1;
                marqueeTl.timeScale(Math.min(speedMultiplier, 4));
            },
        });

        // Decay speed back to 1
        gsap.ticker.add(function () {
            if (speedMultiplier > 1.01) {
                speedMultiplier += (1 - speedMultiplier) * 0.03;
                marqueeTl.timeScale(speedMultiplier);
            }
        });
    }


    // ═══════════════════════════════════════════
    // 8. MAGNETIC BUTTONS
    // ═══════════════════════════════════════════

    function initMagnetic() {
        if (!hasFineCursor || isMobile) return;

        var buttons = document.querySelectorAll('.btn-primary, .nav-cta, .chat-btn');

        buttons.forEach(function (btn) {
            var strength = 0.3;
            var returnEase = 'elastic.out(1, 0.3)';

            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var cx = rect.left + rect.width / 2;
                var cy = rect.top + rect.height / 2;
                var dx = e.clientX - cx;
                var dy = e.clientY - cy;

                gsap.to(btn, {
                    x: dx * strength,
                    y: dy * strength,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            });

            btn.addEventListener('mouseleave', function () {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: returnEase,
                    overwrite: 'auto',
                });
            });
        });
    }


    // ═══════════════════════════════════════════
    // BONUS: SECTION DIVIDER LINES
    // ═══════════════════════════════════════════

    function initDividers() {
        var dividers = document.querySelectorAll('.category-title, .section-header');

        dividers.forEach(function (el) {
            var border = el.querySelector('hr, .divider');
            if (!border) return;

            gsap.from(border, {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: 0.8,
                ease: EASE_SMOOTH,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }


    // ═══════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════

    // Wait for DOM + existing scripts to initialize
    function init() {
        initHeroSplit();
        initWordReveal();
        initCardEntrance();
        initParallax();
        initStatsCounter();
        initMarquee();
        initMagnetic();
        initDividers();
    }

    // Run after a micro-delay to ensure script.min.js has finished
    if (document.readyState === 'complete') {
        setTimeout(init, 50);
    } else {
        window.addEventListener('load', function () {
            setTimeout(init, 50);
        });
    }

})();
