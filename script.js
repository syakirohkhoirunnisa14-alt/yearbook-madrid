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
});
