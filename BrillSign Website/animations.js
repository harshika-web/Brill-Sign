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
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
            resetAutoPlay(); // Reset timer on click
        });
    }

    // Auto-Scroll Logic
    let autoPlayInterval;
    const startAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }, 2000); // 2 seconds
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    // Pause on hover
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', stopAutoPlay);
        carouselTrack.addEventListener('mouseleave', startAutoPlay);
    }

    // Start auto-play initially
    startAutoPlay();

    // Touch/Swipe Support for Carousel
    if (carouselTrack) {
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50; // minimum distance for a swipe

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        // Also support mouse/trackpad swipe
        let mouseStartX = 0;
        let mouseEndX = 0;
        let isMouseDown = false;

        carouselTrack.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseStartX = e.screenX;
        });

        carouselTrack.addEventListener('mouseup', (e) => {
            if (isMouseDown) {
                mouseEndX = e.screenX;
                handleSwipe(true);
                isMouseDown = false;
            }
        });

        carouselTrack.addEventListener('mouseleave', () => {
            isMouseDown = false;
        });

        function handleSwipe(isMouse = false) {
            const startX = isMouse ? mouseStartX : touchStartX;
            const endX = isMouse ? mouseEndX : touchEndX;
            const distance = startX - endX;

            if (Math.abs(distance) > minSwipeDistance) {
                if (distance > 0) {
                    // Swiped left - go to next
                    currentIndex = (currentIndex + 1) % cards.length;
                } else {
                    // Swiped right - go to previous
                    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                }
                updateCarousel();
            }
        }
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
        const header = document.querySelector('.scenario-header');
        const stickyContent = document.querySelector('.sticky-content');

        // Logic for "Box Reveal" animation
        // When section comes into view (rect.top > 0), scale width 90% -> 100% and radius 40px -> 0
        if (rect.top > 0) {
            updateActiveScenario(0);
            if (header) header.style.transform = 'translateY(0px)';

            // Calculate reveal progress
            // Start revealing when top is within viewport height
            const viewHeight = window.innerHeight;
            if (rect.top <= viewHeight) {
                const revealProgress = 1 - (rect.top / viewHeight); // 0 to 1
                const clampedProgress = Math.max(0, Math.min(revealProgress, 1));

                // Animate Width: 75% -> 100%
                const width = 75 + (25 * clampedProgress);
                // Animate Radius: 40px -> 0px
                const radius = 40 - (40 * clampedProgress);

                if (stickyContent) {
                    stickyContent.style.width = `${width}%`;
                    stickyContent.style.borderRadius = `${radius}px`;
                }
            } else {
                // Reset if out of view
                if (stickyContent) {
                    stickyContent.style.width = '75%';
                    stickyContent.style.borderRadius = '40px';
                }
            }
            return;
        } else {
            // Once pinned (rect.top <= 0), ensure full width/sharp corners
            if (stickyContent) {
                stickyContent.style.width = '100%';
                stickyContent.style.borderRadius = '0px';
            }
        }

        const scrollDistance = -rect.top;
        const progress = Math.max(0, Math.min(scrollDistance / (wrapperHeight - window.innerHeight), 1));

        const activeIndex = Math.min(
            Math.floor(progress * scenarioSlides.length),
            scenarioSlides.length - 1
        );

        updateActiveScenario(activeIndex);

        // Header parallax effect: Move up slowly as user scrolls
        // Max movement: -50px when fully scrolled
        if (header) {
            const parallaxY = -50 * progress;
            header.style.transform = `translateY(${parallaxY}px)`;
        }

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

        // Move the marker
        const marker = document.querySelector('.nav-marker');
        if (marker && scenarioTabs[index]) {
            const activeTab = scenarioTabs[index];
            marker.style.width = `${activeTab.offsetWidth}px`;
            marker.style.left = `${activeTab.offsetLeft}px`;
        }
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

    // Scenario Navigation Helper Functions
    const getCurrentScenarioIndex = () => {
        return Array.from(scenarioSlides).findIndex(slide => slide.classList.contains('active'));
    };

    const navigateToScenario = (index) => {
        if (index < 0 || index >= scenarioSlides.length || !scenarioWrapper) return;

        const wrapperHeight = scenarioWrapper.offsetHeight;
        const sectionTop = window.pageYOffset + scenarioWrapper.getBoundingClientRect().top;
        const targetScroll = sectionTop + (index / scenarioSlides.length) * (wrapperHeight - window.innerHeight);

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    // Touch/Swipe Support for Scenarios
    const scenarioVisualTrack = document.getElementById('scenarioVisuals');
    if (scenarioVisualTrack && scenarioSlides.length > 0) {
        let touchStartX = 0;
        let touchEndX = 0;
        let mouseStartX = 0;
        let mouseEndX = 0;
        let isMouseDown = false;
        const minSwipeDistance = 50;

        // Touch events
        scenarioVisualTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        scenarioVisualTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleScenarioSwipe();
        }, { passive: true });

        // Mouse/trackpad events
        scenarioVisualTrack.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseStartX = e.clientX;
            scenarioVisualTrack.style.cursor = 'grabbing';
            e.preventDefault(); // Prevent text selection
        });

        scenarioVisualTrack.addEventListener('mouseup', (e) => {
            if (isMouseDown) {
                mouseEndX = e.clientX;
                handleScenarioSwipe(true);
                isMouseDown = false;
                scenarioVisualTrack.style.cursor = 'grab';
            }
        });

        scenarioVisualTrack.addEventListener('mouseleave', () => {
            if (isMouseDown) {
                scenarioVisualTrack.style.cursor = 'grab';
            }
            isMouseDown = false;
        });

        // Add grab cursor hint and prevent text selection
        scenarioVisualTrack.style.cursor = 'grab';
        scenarioVisualTrack.style.userSelect = 'none';

        // Two-finger trackpad swipe support (wheel event)
        let wheelTimeout;
        let wheelDeltaX = 0;
        const wheelThreshold = 50; // Minimum horizontal scroll to trigger navigation

        scenarioVisualTrack.addEventListener('wheel', (e) => {
            // Only respond to horizontal wheel events (two-finger swipe left/right)
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault(); // Prevent horizontal scrolling

                wheelDeltaX += e.deltaX;

                // Clear previous timeout
                clearTimeout(wheelTimeout);

                // Wait for swipe to complete
                wheelTimeout = setTimeout(() => {
                    console.log('Trackpad swipe detected:', { deltaX: wheelDeltaX, threshold: wheelThreshold });

                    if (Math.abs(wheelDeltaX) > wheelThreshold) {
                        const currentIndex = getCurrentScenarioIndex();
                        let newIndex = currentIndex;

                        if (wheelDeltaX > 0) {
                            // Swiped left (deltaX positive) - go to next
                            newIndex = Math.min(currentIndex + 1, scenarioSlides.length - 1);
                            console.log('→ Two-finger swipe LEFT: Next scenario', newIndex);
                        } else {
                            // Swiped right (deltaX negative) - go to previous
                            newIndex = Math.max(currentIndex - 1, 0);
                            console.log('← Two-finger swipe RIGHT: Previous scenario', newIndex);
                        }

                        if (newIndex !== currentIndex) {
                            navigateToScenario(newIndex);
                        }
                    }

                    // Reset delta
                    wheelDeltaX = 0;
                }, 150); // Wait 150ms after last wheel event
            }
        }, { passive: false });

        function handleScenarioSwipe(isMouse = false) {
            const startX = isMouse ? mouseStartX : touchStartX;
            const endX = isMouse ? mouseEndX : touchEndX;
            const distance = startX - endX;

            console.log('Swipe attempt:', { startX, endX, distance, minRequired: minSwipeDistance, isMouse });

            if (Math.abs(distance) > minSwipeDistance) {
                const currentIndex = getCurrentScenarioIndex();
                let newIndex = currentIndex;

                console.log('Current scenario index:', currentIndex);

                if (distance > 0) {
                    // Swiped left - go to next scenario
                    newIndex = Math.min(currentIndex + 1, scenarioSlides.length - 1);
                    console.log('→ Swiping to NEXT scenario:', newIndex);
                } else {
                    // Swiped right - go to previous scenario
                    newIndex = Math.max(currentIndex - 1, 0);
                    console.log('← Swiping to PREVIOUS scenario:', newIndex);
                }

                if (newIndex !== currentIndex) {
                    navigateToScenario(newIndex);
                } else {
                    console.log('Already at boundary, cannot navigate further');
                }
            } else {
                console.log('Swipe distance too small, ignoring');
            }
        }
    }

    // Testimonials Carousel 2.0 Logic
    const trackV2 = document.getElementById('testimonialV2Track');
    const prevBtnV2 = document.getElementById('prevTestimonialV2');
    const nextBtnV2 = document.getElementById('nextTestimonialV2');
    const cardsV2 = document.querySelectorAll('.testimonial-v2-card');

    if (trackV2 && prevBtnV2 && nextBtnV2 && cardsV2.length > 0) {
        let currentIndexV2 = 0;
        const totalCards = cardsV2.length;
        let maxIndexV2 = totalCards - 1;

        const wrapperV2 = document.querySelector('.testimonial-v2-track-wrapper');

        const updateMetricsV2 = () => {
            if (!wrapperV2 || cardsV2.length === 0) return;
            const card = cardsV2[0];
            const style = window.getComputedStyle(trackV2);
            const gap = parseFloat(style.gap) || 30;
            const cardWidth = card.offsetWidth + gap;
            const visibleWidth = wrapperV2.offsetWidth;

            // Calculate how many cards fit fully or partially
            // We want to stop when the last card is visible.
            // Total width needed = totalCards * cardWidth - gap (approx)
            // But we use discrete steps.
            // Max index = Total - Visible.
            // If visible is 3.2. Floor is 3. Max index = 8 - 3 = 5.
            const visibleCards = Math.floor(visibleWidth / cardWidth);
            maxIndexV2 = Math.max(0, totalCards - visibleCards);

            if (currentIndexV2 > maxIndexV2) {
                currentIndexV2 = maxIndexV2;
                updateCarouselV2();
            }
        };

        const updateCarouselV2 = () => {
            const card = cardsV2[0];
            const style = window.getComputedStyle(trackV2);
            const gap = parseFloat(style.gap) || 30;
            const cardWidth = card.offsetWidth + gap;

            trackV2.style.transform = `translateX(-${currentIndexV2 * cardWidth}px)`;
        };

        const nextSlideV2 = () => {
            if (currentIndexV2 >= maxIndexV2) {
                currentIndexV2 = 0; // Return to first
            } else {
                currentIndexV2++;
            }
            updateCarouselV2();
        };

        const prevSlideV2 = () => {
            if (currentIndexV2 <= 0) {
                currentIndexV2 = maxIndexV2; // Go to last valid position
            } else {
                currentIndexV2--;
            }
            updateCarouselV2();
        };

        nextBtnV2.addEventListener('click', () => {
            nextSlideV2();
            resetAutoPlayV2();
        });

        prevBtnV2.addEventListener('click', () => {
            prevSlideV2();
            resetAutoPlayV2();
        });

        // Auto-Scroll Logic
        let autoPlayIntervalV2;
        const startAutoPlayV2 = () => {
            clearInterval(autoPlayIntervalV2);
            autoPlayIntervalV2 = setInterval(nextSlideV2, 1500); // 1.5 seconds
        };

        const stopAutoPlayV2 = () => {
            clearInterval(autoPlayIntervalV2);
        };

        const resetAutoPlayV2 = () => {
            stopAutoPlayV2();
            startAutoPlayV2();
        };

        // Pause on hover
        trackV2.addEventListener('mouseenter', stopAutoPlayV2);
        trackV2.addEventListener('mouseleave', startAutoPlayV2);

        // Start auto-play initially
        updateMetricsV2(); // Calc initial max
        startAutoPlayV2();

        window.addEventListener('resize', () => {
            updateMetricsV2();
            updateCarouselV2();
        });
    }


    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const sunIcon = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggleBtn.innerHTML = sunIcon;
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update Icon
            themeToggleBtn.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
        });
    }
});
