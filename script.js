const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;
let autoSlideInterval;
let isAnimating = false;

function showSlide(index, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    const currentSlideElement = slides[currentSlide];
    const nextSlideElement = slides[index];

    // Remove all transition classes
    slides.forEach(slide => {
        slide.classList.remove('active', 'previous');
    });

    // Set initial positions
    if (direction === 'next') {
        currentSlideElement.classList.add('previous');
        nextSlideElement.classList.add('active');
    } else {
        currentSlideElement.classList.add('previous');
        nextSlideElement.classList.add('active');
    }

    // Update current slide index
    currentSlide = index;

    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex, 'next');
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex, 'prev');
}

// Event listeners
prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Auto-slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize auto-slide
startAutoSlide();

// Pause auto-slide when user hovers over the slider
document.querySelector('.slider-container').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Resume auto-slide when user leaves the slider
document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    startAutoSlide();
});