// ==========================================
// BRILL SIGN - UNIQUE HOMEPAGE INTERACTIONS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initThemeToggle();
    initParticleNetwork();
    initStatisticsCounter();
    initMorphingText();
    initSignatureAnimation();
    initCursorEffects();
    initScrollAnimations();
});

// ==========================================
// THEME TOGGLE
// ==========================================
function initThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (systemTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Re-initialize particles with new color if needed
            // (Optional: clear canvas and re-run initParticleNetwork if colors depend on theme)
        });
    }
}

// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#login' && href !== '#signup') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// PARTICLE NETWORK BACKGROUND
// ==========================================
function initParticleNetwork() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(102, 126, 234, 0.4)';
            ctx.fill();
        }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor(canvas.width / 15));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();

        animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrameId);
    });
}

// ==========================================
// STATISTICS COUNTER ANIMATION
// ==========================================
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const isDecimal = end.toString().includes('.');

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }

            if (isDecimal) {
                element.textContent = current.toFixed(2);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    function checkScroll() {
        if (hasAnimated) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                animateValue(stat, 0, target, 2000);
            });
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
}

// ==========================================
// MORPHING TEXT ANIMATION
// ==========================================
function initMorphingText() {
    const morphingElement = document.querySelector('.morphing-text');
    if (!morphingElement) return;

    const textsAttr = morphingElement.getAttribute('data-texts');
    if (!textsAttr) return;

    const texts = JSON.parse(textsAttr);
    let currentIndex = 0;

    function morphText() {
        currentIndex = (currentIndex + 1) % texts.length;
        const newText = texts[currentIndex];

        // Fade out
        morphingElement.style.opacity = '0';
        morphingElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            morphingElement.textContent = newText;
            // Fade in
            morphingElement.style.opacity = '1';
            morphingElement.style.transform = 'translateY(0)';
        }, 300);
    }

    // Add transition
    morphingElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // Change text every 4 seconds
    setInterval(morphText, 4000);
}

// ==========================================
// SIGNATURE ANIMATION
// ==========================================
function initSignatureAnimation() {
    const canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    let progress = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw animated signature path
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';

        // Create a smooth signature-like curve
        const points = 50;
        for (let i = 0; i <= points * progress; i++) {
            const t = i / points;
            const x = centerX + Math.sin(t * Math.PI * 2) * 80 * Math.sin(t * Math.PI);
            const y = centerY + Math.cos(t * Math.PI * 3) * 60 * Math.cos(t * Math.PI * 0.5);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Animate progress
        progress += 0.005;
        if (progress > 1) progress = 0;

        requestAnimationFrame(drawSignature);
    }

    drawSignature();
}

// ==========================================
// CURSOR EFFECTS (3D Tilt)
// ==========================================
function initCursorEffects() {
    const cards = document.querySelectorAll('.feature-card, .holographic-document');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add smooth transition
    cards.forEach(card => {
        card.style.transition = 'transform 0.1s ease-out';
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================
document.querySelectorAll('.btn-unique').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-unique {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
