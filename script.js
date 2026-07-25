document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Handler
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
            }
        }, 1200); // Gives time for watercolor brush effect
    });

    // 2. Hero Parallax Effect
    const heroBg = document.getElementById('heroBg');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
        }
    });

    // 3. Navbar Scroll & Blur Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 4. Memory Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 30;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const counterSection = document.getElementById('counter');
    window.addEventListener('scroll', () => {
        if (!counterSection) return;
        const sectionTop = counterSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100 && !animated) {
            animated = true;
            animateCounters();
        }
    });

    // 5. Timeline Scroll Progress & Active Chapter
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineCards = document.querySelectorAll('.timeline-card');

    window.addEventListener('scroll', () => {
        const timelineSection = document.getElementById('timeline');
        if (!timelineSection) return;

        const rect = timelineSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const visibleHeight = window.innerHeight - rect.top;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            let percentage = (visibleHeight / (sectionHeight + window.innerHeight)) * 100;
            percentage = Math.max(0, Math.min(100, percentage));
            if (timelineProgress) timelineProgress.style.height = `${percentage}%`;
        }

        timelineCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight * 0.75) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    });
});
