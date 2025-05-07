// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a navigation link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Show/hide products based on filter
                productCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Gallery Image Switcher
    const thumbnails = document.querySelectorAll('.thumbnail');
    const featuredImage = document.getElementById('featuredImage');
    
    if (thumbnails.length && featuredImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Update featured image
                featuredImage.src = thumbnail.src;
                featuredImage.alt = thumbnail.alt;
                
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    if (testimonialSlides.length) {
        function showSlide(n) {
            // Hide all slides
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Calculate the correct index if overflowing
            currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
            
            // Show the current slide
            testimonialSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Event listeners for controls
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Event listeners for dots
        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }
        
        // Auto-advance testimonials
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto-advance on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            testimonialSlider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Placeholder Image Handling
    function handlePlaceholderImages() {
        const placeholderImages = document.querySelectorAll('.placeholder-image');
        
        placeholderImages.forEach(img => {
            // If image fails to load, replace with appropriate product image
            img.addEventListener('error', function() {
                const altText = this.alt.toLowerCase();
                let replacementImage = '';
                
                if (altText.includes('amla')) {
                    replacementImage = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60';
                } else if (altText.includes('gajar') || altText.includes('carrot')) {
                    replacementImage = 'https://images.unsplash.com/photo-1727018427695-35a6048c91e7';
                } else if (altText.includes('belgiri') || altText.includes('wood apple')) {
                    replacementImage = 'https://images.unsplash.com/photo-1727018792817-2dae98db2294';
                } else if (altText.includes('seb') || altText.includes('apple')) {
                    replacementImage = 'https://images.unsplash.com/photo-1611586315282-e175d4a74bca';
                } else {
                    replacementImage = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60';
                }
                
                this.src = replacementImage;
            });
        });
    }
    
    handlePlaceholderImages();
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .feature, .benefit-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animation properties
    document.querySelectorAll('.product-card, .feature, .benefit-card, .step').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});