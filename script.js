/**
 * Jonathan Barlow - barlow.app
 * Interactive functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initGallery();
    initForm();
    initParallax();
});

/**
 * Navigation
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // nav height
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;

                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Initial hero animations
    setTimeout(() => {
        document.querySelectorAll('.hero [data-animate]').forEach(el => {
            const delay = el.dataset.delay || 0;
            setTimeout(() => {
                el.classList.add('animated');
            }, parseInt(delay));
        });
    }, 300);
}

/**
 * Gallery infinite scroll
 */
function initGallery() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    // Clone items for seamless loop
    const items = track.querySelectorAll('.gallery-item');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

/**
 * Contact form handling
 */
function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success state
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        submitBtn.style.background = '#22c55e';

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });

    // Input focus effects
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Subtle parallax effects
 */
function initParallax() {
    const geoElements = document.querySelectorAll('.geo');
    const heroLines = document.querySelectorAll('.h-line');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                // Move geometric elements
                geoElements.forEach((el, index) => {
                    const speed = 0.05 + (index * 0.02);
                    const yPos = scrollY * speed;
                    el.style.transform = `translateY(${yPos}px) rotate(${el.dataset.rotate || 0}deg)`;
                });

                // Move hero lines
                heroLines.forEach((line, index) => {
                    const speed = 0.03 + (index * 0.01);
                    line.style.transform = `translateY(${scrollY * speed}px)`;
                });

                ticking = false;
            });

            ticking = true;
        }
    });

    // Mouse move effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            const imageFrame = hero.querySelector('.image-frame');
            if (imageFrame) {
                imageFrame.style.transform = `
                    perspective(1000px)
                    rotateY(${xPercent * 3}deg)
                    rotateX(${-yPercent * 3}deg)
                `;
            }
        });

        hero.addEventListener('mouseleave', () => {
            const imageFrame = hero.querySelector('.image-frame');
            if (imageFrame) {
                imageFrame.style.transform = '';
            }
        });
    }
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
