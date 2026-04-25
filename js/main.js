document.addEventListener('DOMContentLoaded', () => {
    // Hero Banner Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderContainer = document.getElementById('main-slider');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 5000;

        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        const prevSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        const startSlider = () => { slideInterval = setInterval(nextSlide, intervalTime); };
        const stopSlider = () => { clearInterval(slideInterval); };
        const resetSlider = (fn) => { fn(); stopSlider(); startSlider(); };

        if (nextBtn) nextBtn.addEventListener('click', () => resetSlider(nextSlide));
        if (prevBtn) prevBtn.addEventListener('click', () => resetSlider(prevSlide));

        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }

        startSlider();
    }

    // Productions Slider (main page)
    const prodSlides = document.querySelectorAll('.prod-banner');
    const prodPrevBtn = document.getElementById('prod-prev-btn');
    const prodNextBtn = document.getElementById('prod-next-btn');

    if (prodSlides.length > 0) {
        let currentProd = 0;

        const showProd = (next) => {
            prodSlides[currentProd].classList.remove('active');
            currentProd = (currentProd + next + prodSlides.length) % prodSlides.length;
            prodSlides[currentProd].classList.add('active');
        };

        if (prodNextBtn) prodNextBtn.addEventListener('click', () => showProd(1));
        if (prodPrevBtn) prodPrevBtn.addEventListener('click', () => showProd(-1));
    }

    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.about-snippet, .productions-highlight, .partnerships').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 3D Carousel (productions page)
    const carouselCards = document.querySelectorAll('.carousel-card');
    const cPrevBtn = document.getElementById('c-prev');
    const cNextBtn = document.getElementById('c-next');

    if (carouselCards.length > 0) {
        let currentIndex = 0;
        const total = carouselCards.length;

        const updateCarousel = () => {
            carouselCards.forEach((card, i) => {
                const diff = (i - currentIndex + total) % total;
                card.className = 'carousel-card';
                if (diff === 0) card.classList.add('active');
                else if (diff === 1) card.classList.add('next');
                else if (diff === total - 1) card.classList.add('prev');
            });
        };

        const goNext = () => { currentIndex = (currentIndex + 1) % total; updateCarousel(); };
        const goPrev = () => { currentIndex = (currentIndex - 1 + total) % total; updateCarousel(); };

        if (cNextBtn) cNextBtn.addEventListener('click', goNext);
        if (cPrevBtn) cPrevBtn.addEventListener('click', goPrev);

        carouselCards.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('active')) {
                    const url = card.getAttribute('data-url');
                    if (url && url !== '#') window.location.href = url;
                } else if (card.classList.contains('next')) {
                    goNext();
                } else if (card.classList.contains('prev')) {
                    goPrev();
                }
            });
        });

        updateCarousel();
    }
});
