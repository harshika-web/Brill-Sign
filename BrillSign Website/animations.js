document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                const decimals = parseInt(entry.target.getAttribute('data-decimals') || 0);
                const duration = 2000; // 2 seconds
                let start = 0;
                const startTime = performance.now();

                const animate = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = start + (target - start) * progress;

                    entry.target.innerText = current.toFixed(decimals);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        entry.target.classList.add('counted');
                    }
                };
                requestAnimationFrame(animate);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Randomize floating icons initial positions slightly and speeds
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        const randomX = Math.random() * 20 - 10; // -10 to 10
        const randomDelay = Math.random() * 5;
        const randomDuration = 5 + Math.random() * 5;

        icon.style.setProperty('--random-x', `${randomX}px`);
        icon.style.animationDelay = `${randomDelay}s`;
        icon.style.animationDuration = `${randomDuration}s`;
    });

    // Carousel Logic
    const carouselTrack = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentIndex = 0;

    const updateCarousel = () => {
        if (!carouselTrack || cards.length === 0) return;
        const cardWidth = cards[0].offsetWidth + 30; // card width + gap
        carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        cards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        });
    }

    // Testimonials Carousel
    const testTrack = document.getElementById('testTrack');
    const testSlides = document.querySelectorAll('.test-slide');
    const testNext = document.getElementById('testNext');
    const testPrev = document.getElementById('testPrev');
    const dots = document.querySelectorAll('.dot');

    let testIndex = 0;

    const updateTestimonials = () => {
        if (!testTrack || testSlides.length === 0) return;

        testTrack.style.transform = `translateX(-${testIndex * 100}%)`;

        testSlides.forEach((slide, index) => {
            if (index === testIndex) slide.classList.add('active');
            else slide.classList.remove('active');
        });

        dots.forEach((dot, index) => {
            if (index === testIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    };

    if (testNext) {
        testNext.addEventListener('click', () => {
            testIndex = (testIndex + 1) % testSlides.length;
            updateTestimonials();
        });
    }

    if (testPrev) {
        testPrev.addEventListener('click', () => {
            testIndex = (testIndex - 1 + testSlides.length) % testSlides.length;
            updateTestimonials();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            testIndex = index;
            updateTestimonials();
        });
    });

    // Auto-slide Testimonials
    setInterval(() => {
        if (!document.hidden) {
            testIndex = (testIndex + 1) % testSlides.length;
            updateTestimonials();
        }
    }, 8000);

    window.addEventListener('resize', updateCarousel);

    // Sticky Scroll Scenario Logic
    const scenarioWrapper = document.getElementById('scenarioWrapper');
    const scenarioSlides = document.querySelectorAll('.scenario-slide');
    const scenarioTabs = document.querySelectorAll('.tab');
    const scenarioBackgrounds = [
        'https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&q=80&w=2000', // Legal (Signing tablet)
        'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=2000', // Real Estate (Contract on mobile)
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000', // Tech (Security/Verification)
        'https://images.unsplash.com/photo-1454165833767-02753a498d6f?auto=format&fit=crop&q=80&w=2000'  // Enterprise (Signature Dashboard)
    ];

    const handleScenarioScroll = () => {
        if (!scenarioWrapper) return;

        const rect = scenarioWrapper.getBoundingClientRect();
        const wrapperHeight = scenarioWrapper.offsetHeight;

        // Only trigger when the section is at the top of the viewport
        if (rect.top > 0) {
            updateActiveScenario(0);
            return;
        }

        const scrollDistance = -rect.top;
        const progress = Math.max(0, Math.min(scrollDistance / (wrapperHeight - window.innerHeight), 1));

        const activeIndex = Math.min(
            Math.floor(progress * scenarioSlides.length),
            scenarioSlides.length - 1
        );

        updateActiveScenario(activeIndex);

        // Subtly change background brightness or opacity based on progress
        const bgOverlay = document.querySelector('.scenario-bg-overlay');
        if (bgOverlay) {
            bgOverlay.style.opacity = 0.4 + (progress * 0.3);

            // Update background image if it changed
            const currentImg = bgOverlay.style.backgroundImage;
            const targetImg = `url("${scenarioBackgrounds[activeIndex]}")`;
            if (!currentImg.includes(scenarioBackgrounds[activeIndex])) {
                bgOverlay.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${targetImg}`;
            }
        }
    };

    const updateActiveScenario = (index) => {
        scenarioSlides.forEach((slide, i) => {
            if (i === index) slide.classList.add('active');
            else slide.classList.remove('active');
        });

        scenarioTabs.forEach((tab, i) => {
            if (i === index) tab.classList.add('active');
            else tab.classList.remove('active');
        });
    };

    window.addEventListener('scroll', handleScenarioScroll);
    handleScenarioScroll(); // Initialize state

    // Tab clicks for scenarios
    scenarioTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            if (!scenarioWrapper) return;
            const wrapperHeight = scenarioWrapper.offsetHeight;
            const sectionTop = window.pageYOffset + scenarioWrapper.getBoundingClientRect().top;
            const targetScroll = sectionTop + (index / scenarioSlides.length) * (wrapperHeight - window.innerHeight);

            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        });
    });

    // Testimonials Carousel 2.0 Logic
    const trackV2 = document.getElementById('testimonialV2Track');
    const prevBtnV2 = document.getElementById('prevTestimonialV2');
    const nextBtnV2 = document.getElementById('nextTestimonialV2');

    if (trackV2 && prevBtnV2 && nextBtnV2) {
        let currentPos = 0;
        const visibleWrapper = document.querySelector('.testimonial-v2-track-wrapper');

        const updateCarouselV2 = () => {
            const card = document.querySelector('.testimonial-v2-card');
            if (!card) return;

            const cardWidth = card.offsetWidth + 30; // card width + gap
            const maxScroll = trackV2.scrollWidth - visibleWrapper.offsetWidth;
            currentPos = Math.max(0, Math.min(currentPos, maxScroll));
            trackV2.style.transform = `translateX(-${currentPos}px)`;
        };

        nextBtnV2.addEventListener('click', () => {
            const card = document.querySelector('.testimonial-v2-card');
            if (!card) return;
            const cardWidth = card.offsetWidth + 30;
            const maxScroll = trackV2.scrollWidth - visibleWrapper.offsetWidth;
            currentPos = Math.min(currentPos + cardWidth, maxScroll);
            trackV2.style.transform = `translateX(-${currentPos}px)`;
        });

        prevBtnV2.addEventListener('click', () => {
            const card = document.querySelector('.testimonial-v2-card');
            if (!card) return;
            const cardWidth = card.offsetWidth + 30;
            currentPos = Math.max(currentPos - cardWidth, 0);
            trackV2.style.transform = `translateX(-${currentPos}px)`;
        });

        window.addEventListener('resize', updateCarouselV2);
    }
});
