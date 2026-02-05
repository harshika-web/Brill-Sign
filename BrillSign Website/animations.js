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
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600', // Logic / Audit
        'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=1600', // Compliance / Structure
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600', // Zero Knowledge / Data
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600', // Jurisdiction / Global
        'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1600', // Identity / Bio
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600'  // Exit Safe / High-Tech Storage Vault
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

        // Use a small epsilon (0.01) to make the final slide's activation a bit more generous at the scroll boundary
        const activeIndex = Math.min(
            Math.floor((progress + 0.01) * scenarioSlides.length),
            scenarioSlides.length - 1
        );

        updateActiveScenario(activeIndex);

        if (header) {
            header.style.transform = 'translateY(0)';
        }

        // Subtly change background brightness or opacity based on progress
        const bgOverlay = document.querySelector('.scenario-bg-overlay');
        if (bgOverlay) {
            // Update background image if it changed with a smooth transition
            const currentImg = bgOverlay.style.backgroundImage;
            const targetImgUrl = scenarioBackgrounds[activeIndex];

            if (!currentImg.includes(targetImgUrl)) {
                let overlayGradient = '';

                // Per-slide sensitivity configuration
                if (activeIndex === 1 || activeIndex === 2) {
                    // dark images (Compliance/Zero-K) need LIGHT overlay for visibility
                    overlayGradient = `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)`;
                } else if (activeIndex === 3 || activeIndex === 4) {
                    // bright images (Jurisdiction/Identity) need DARK overlay for dimming
                    overlayGradient = `linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.7) 100%)`;
                } else {
                    // default images (Audit/Exit) need BALANCED overlay
                    overlayGradient = `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)`;
                }

                bgOverlay.style.backgroundImage = `${overlayGradient}, url("${targetImgUrl}")`;
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
            // Add a tiny offset to ensure Math.floor hits the correct index due to float precision
            const targetScroll = sectionTop + (index / scenarioSlides.length) * (wrapperHeight - window.innerHeight) + 2;

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
        // Add a tiny offset to ensure Math.floor hits the correct index due to float precision
        const targetScroll = sectionTop + (index / scenarioSlides.length) * (wrapperHeight - window.innerHeight) + 2;

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
        const iconPositionData = new Map();
        let positionsCaptured = false;
        let ticking = false;

        const capturePositions = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            const parentRect = floatingIconsContainer.getBoundingClientRect();
            const parentDocX = parentRect.left + scrollLeft;
            const parentDocY = parentRect.top + scrollTop;

            heroIcons.forEach(icon => {
                const targetId = icon.getAttribute('data-icon-id');
                const targetCard = document.querySelector(`.int-card[data-target-id="${targetId}"]`);

                if (!targetCard) return;

                const targetRect = targetCard.getBoundingClientRect();

                iconPositionData.set(icon, {
                    // Initial floating center
                    initialX: parentDocX + icon.offsetLeft + icon.offsetWidth / 2,
                    initialY: parentDocY + icon.offsetTop + icon.offsetHeight / 2,
                    initialWidth: icon.offsetWidth,
                    // Target grid center
                    targetX: targetRect.left + scrollLeft + targetRect.width / 2,
                    targetY: targetRect.top + scrollTop + targetRect.height / 2,
                    targetScale: targetRect.width / icon.offsetWidth,
                    targetCard: targetCard
                });
            });

            positionsCaptured = true;
            console.log("BrillSign: Hero icon positions pre-calculated.");
        };

        const handleIconAssembly = () => {
            if (!positionsCaptured) capturePositions();

            const maxScroll = 300;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

            heroIcons.forEach(icon => {
                const data = iconPositionData.get(icon);
                if (!data) return;

                if (progress <= 0) {
                    icon.classList.remove('assembling');
                    icon.style.transform = '';
                    icon.style.opacity = '1';
                    icon.style.visibility = 'visible';
                    icon.style.zIndex = '';
                    data.targetCard.classList.remove('preparing', 'assembled');
                    return;
                }

                if (progress >= 1) {
                    icon.style.opacity = '0';
                    icon.style.visibility = 'hidden';
                    data.targetCard.classList.remove('preparing');
                    data.targetCard.classList.add('assembled');
                    return;
                }

                // Assembly active
                icon.classList.add('assembling');
                icon.style.visibility = 'visible';
                icon.style.zIndex = '1000';
                data.targetCard.classList.add('preparing');
                data.targetCard.classList.remove('assembled');
                icon.style.opacity = '1';

                const deltaX = (data.targetX - data.initialX) * progress;
                const deltaY = (data.targetY - data.initialY) * progress;
                const scale = 1 + (data.targetScale - 1) * progress;

                icon.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
            });

            // Shift hero content up slightly to make room for grid
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                const contentShift = -100 * progress;
                heroContent.style.transform = `translateY(${contentShift}px)`;
            }
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleIconAssembly();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        window.addEventListener('resize', () => {
            capturePositions();
            handleIconAssembly();
        });

        // Capture immediately and once again after a short delay for full settlement
        capturePositions();
        window.addEventListener('load', capturePositions);
        setTimeout(capturePositions, 500);
    }
    // --- Strategic Section Auto-Switching ---
    const strategicCards = document.querySelectorAll('.strategic-card');
    const visualItems = document.querySelectorAll('.visual-item');
    const progressFill = document.getElementById('stratProgressFill');
    let strategicIndex = 0;
    let strategicTimer;
    let startTime;
    const strategicDuration = 5000; // 5 seconds per feature

    const updateStrategicDisplay = (index) => {
        strategicCards.forEach((card, i) => {
            if (i === index) card.classList.add('active');
            else card.classList.remove('active');
        });

        visualItems.forEach((item, i) => {
            if (i === index) item.classList.add('active');
            else item.classList.remove('active');
        });

        // Rotate the orbit rings
        const orbitRings = document.querySelectorAll('.expanded-orbit .orbit-circle');
        orbitRings.forEach((ring, i) => {
            const speeds = [150, 120, -60, 90];
            const rotation = index * (speeds[i] || 90);
            ring.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        });
    };

    const startStrategicTimer = () => {
        startTime = performance.now();
        cancelAnimationFrame(strategicTimer);

        const animateProgress = (now) => {
            const elapsed = now - startTime;

            if (elapsed < strategicDuration) {
                strategicTimer = requestAnimationFrame(animateProgress);
            } else {
                strategicIndex = (strategicIndex + 1) % strategicCards.length;
                updateStrategicDisplay(strategicIndex);
                startStrategicTimer();
            }
        };
        strategicTimer = requestAnimationFrame(animateProgress);
    };

    const stopStrategicTimer = () => {
        cancelAnimationFrame(strategicTimer);
    };

    // Initialize
    if (strategicCards.length > 0) {
        updateStrategicDisplay(0);

        // Start when in view
        const strategicSection = document.querySelector('.strategic-section');
        const stratObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startStrategicTimer();
                } else {
                    stopStrategicTimer();
                }
            });
        }, { threshold: 0.2 });

        if (strategicSection) stratObserver.observe(strategicSection);

        // Click to manual switch
        strategicCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                strategicIndex = index;
                updateStrategicDisplay(strategicIndex);
                startStrategicTimer(); // Reset timer
            });
        });
    }

    // --- New Testimonials V3 Carousel Logic ---
    const testTrackV3 = document.getElementById('test-track');
    const testPrevV3 = document.getElementById('test-prev');
    const testNextV3 = document.getElementById('test-next');
    const testCardsV3 = document.querySelectorAll('.test-card-v3');
    const testDotsV3Container = document.getElementById('test-dots');

    if (testTrackV3 && testCardsV3.length > 0) {
        let testIndexV3 = 0;
        const totalCardsV3 = testCardsV3.length;

        // Create Dots
        testCardsV3.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                testIndexV3 = i;
                updateTestV3();
            });
            testDotsV3Container.appendChild(dot);
        });

        const updateTestV3 = () => {
            const card = testCardsV3[0];
            const gap = 30;
            const trackWrapper = testTrackV3.parentElement;
            if (!trackWrapper) return;

            const cardWidth = card.offsetWidth;

            // Width layout: always 1 card visible
            const cardsVisible = 1;

            const maxIndex = totalCardsV3 - cardsVisible;
            if (testIndexV3 > maxIndex) testIndexV3 = maxIndex;
            if (testIndexV3 < 0) testIndexV3 = 0;

            const offset = testIndexV3 * (cardWidth + gap);
            testTrackV3.style.transform = `translateX(-${offset}px)`;

            // Update dots
            const allDots = testDotsV3Container.querySelectorAll('.dot');
            allDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === testIndexV3);
            });
        };

        let autoScrollInterval;

        const startAutoScroll = () => {
            stopAutoScroll();
            autoScrollInterval = setInterval(() => {
                const maxIndex = totalCardsV3 - 1;
                if (testIndexV3 >= maxIndex) {
                    testIndexV3 = 0;
                } else {
                    testIndexV3++;
                }
                updateTestV3();
            }, 5000); // Scroll every 5 seconds
        };

        const stopAutoScroll = () => {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        };

        if (testNextV3) {
            testNextV3.addEventListener('click', () => {
                const maxIndex = totalCardsV3 - 1;

                if (testIndexV3 >= maxIndex) {
                    testIndexV3 = 0;
                } else {
                    testIndexV3++;
                }
                updateTestV3();
                startAutoScroll(); // Reset timer on click
            });
        }

        if (testPrevV3) {
            testPrevV3.addEventListener('click', () => {
                const maxIndex = totalCardsV3 - 1;

                if (testIndexV3 <= 0) {
                    testIndexV3 = maxIndex;
                } else {
                    testIndexV3--;
                }
                updateTestV3();
                startAutoScroll(); // Reset timer on click
            });
        }

        // Add pause on hover
        const carouselContainer = document.querySelector('.testimonials-v3-track-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoScroll);
            carouselContainer.addEventListener('mouseleave', startAutoScroll);
        }

        window.addEventListener('resize', updateTestV3);
        // Initial call
        setTimeout(() => {
            updateTestV3();
            startAutoScroll();
        }, 100);
    }
});

// ===========================
// Testimonials V2 Auto-Scroll
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonialV2Track');
    if (!track) return;

    const cards = Array.from(track.children);
    const cardWidth = 350; // min-width from CSS
    const gap = 30; // gap from CSS
    const scrollSpeed = 3000; // 3 seconds per card

    let currentIndex = 0;
    let autoScrollTimer = null;

    const updateCarousel = () => {
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollTimer = setInterval(nextSlide, scrollSpeed);
    };

    const stopAutoScroll = () => {
        if (autoScrollTimer) {
            clearInterval(autoScrollTimer);
            autoScrollTimer = null;
        }
    };

    // Start auto-scroll
    startAutoScroll();
});

