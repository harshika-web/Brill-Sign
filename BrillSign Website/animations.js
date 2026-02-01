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

    // Floating icons animation timing is now handled via stable CSS delays in index.css
    // to ensure a consistent layout on every refresh.

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
                    if (Math.abs(wheelDeltaX) > wheelThreshold) {
                        const currentIndex = getCurrentScenarioIndex();
                        let newIndex = currentIndex;

                        if (wheelDeltaX > 0) {
                            // Swiped left (deltaX positive) - go to next
                            newIndex = Math.min(currentIndex + 1, scenarioSlides.length - 1);
                        } else {
                            // Swiped right (deltaX negative) - go to previous
                            newIndex = Math.max(currentIndex - 1, 0);
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

            if (Math.abs(distance) > minSwipeDistance) {
                const currentIndex = getCurrentScenarioIndex();
                let newIndex = currentIndex;

                if (distance > 0) {
                    // Swiped left - go to next scenario
                    newIndex = Math.min(currentIndex + 1, scenarioSlides.length - 1);
                } else {
                    // Swiped right - go to previous scenario
                    newIndex = Math.max(currentIndex - 1, 0);
                }

                if (newIndex !== currentIndex) {
                    navigateToScenario(newIndex);
                }
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

    // Theme Initialization
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;
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

    // --- Icon Grid Assembly Animation ---
    const heroIcons = document.querySelectorAll('.hero .icon[data-icon-id]');
    const integrationGrid = document.querySelector('.integrations-grid');
    const floatingIconsContainer = document.getElementById('floating-icons');

    if (heroIcons.length > 0 && integrationGrid && floatingIconsContainer) {
        const iconInitialPositions = new Map();
        let positionsCaptured = false;

        const captureInitialPositions = () => {
            // Re-capture positions to ensure alignment with current layout/resize
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            const parentRect = floatingIconsContainer.getBoundingClientRect();
            const parentDocX = parentRect.left + scrollLeft;
            const parentDocY = parentRect.top + scrollTop;

            heroIcons.forEach(icon => {
                // offsetLeft/offsetTop ignore CSS transforms (like floating),
                // ensuring we capture the base layout position accurately.
                const centerX = parentDocX + icon.offsetLeft + icon.offsetWidth / 2;
                const centerY = parentDocY + icon.offsetTop + icon.offsetHeight / 2;

                iconInitialPositions.set(icon, {
                    docX: centerX,
                    docY: centerY,
                    width: icon.offsetWidth,
                    height: icon.offsetHeight
                });
            });

            positionsCaptured = true;
            console.log("BrillSign: Hero icon positions stabilized.");
        };

        const handleIconAssembly = () => {
            if (!positionsCaptured) captureInitialPositions();

            const gridRect = integrationGrid.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            const startThreshold = viewHeight;
            const endThreshold = viewHeight * 0.4;

            let progress = 0;
            if (window.pageYOffset > 0 || document.documentElement.scrollTop > 0) {
                progress = Math.max(0, Math.min(1, (startThreshold - gridRect.top) / (startThreshold - endThreshold)));
            }

            heroIcons.forEach(icon => {
                const targetId = icon.getAttribute('data-icon-id');
                const targetCard = document.querySelector(`.int-card[data-target-id="${targetId}"]`);
                const initial = iconInitialPositions.get(icon);

                if (!targetCard || !initial) return;

                if (progress <= 0) {
                    icon.classList.remove('assembling');
                    icon.style.transform = '';
                    icon.style.opacity = '1';
                    icon.style.visibility = 'visible';
                    icon.style.zIndex = '';
                    targetCard.classList.remove('preparing', 'assembled');
                    return;
                }

                if (progress >= 1) {
                    icon.style.opacity = '0';
                    icon.style.visibility = 'hidden';
                    targetCard.classList.remove('preparing');
                    targetCard.classList.add('assembled');
                    return;
                }

                // Assembly active
                icon.classList.add('assembling');
                icon.style.visibility = 'visible';
                icon.style.zIndex = '1000';
                targetCard.classList.add('preparing');
                targetCard.classList.remove('assembled');
                icon.style.opacity = '1';

                const targetRect = targetCard.getBoundingClientRect();
                const targetDocCenterX = targetRect.left + scrollLeft + targetRect.width / 2;
                const targetDocCenterY = targetRect.top + scrollTop + targetRect.height / 2;

                const deltaX = (targetDocCenterX - initial.docX) * progress;
                const deltaY = (targetDocCenterY - initial.docY) * progress;

                const targetScale = targetRect.width / initial.width;
                const scale = 1 + (targetScale - 1) * progress;

                icon.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
            });
        };

        window.addEventListener('scroll', handleIconAssembly, { passive: true });
        window.addEventListener('resize', () => {
            captureInitialPositions();
            handleIconAssembly();
        });

        // Capture immediately and once again after a short delay for full settlement
        captureInitialPositions();
        window.addEventListener('load', captureInitialPositions);
        setTimeout(captureInitialPositions, 500);
    }
});
