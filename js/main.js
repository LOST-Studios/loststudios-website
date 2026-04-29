document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('career-header');
    const hero = document.getElementById('career-hero');

    if (header && hero) {
        // Show header when hero logo is no longer visible
        const checkScroll = () => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            if (heroBottom <= 200) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    }
});
