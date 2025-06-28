// Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Event listeners for navigation buttons
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play slider
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Start autoplay when page loads
if (slides.length > 0) {
    startAutoplay();
    
    // Pause autoplay on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Service toggles
document.querySelectorAll('.service-toggle').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.service-card');
        const details = card.querySelector('.service-details');
        
        if (details.classList.contains('show')) {
            details.classList.remove('show');
            button.textContent = 'Learn More';
        } else {
            details.classList.add('show');
            button.textContent = 'Show Less';
        }
    });
});

// Package toggles
document.querySelectorAll('.package-toggle').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.package-card');
        const details = card.querySelector('.package-details');
        
        if (details.classList.contains('show')) {
            details.classList.remove('show');
            button.textContent = 'View Specifications';
        } else {
            details.classList.add('show');
            button.textContent = 'Hide Specifications';
        }
    });
});

// FAQ toggles
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Construction Cost Calculator
const packageSelect = document.getElementById('package-select');
const builtupArea = document.getElementById('builtup-area');
const waterSump = document.getElementById('water-sump');
const septicTank = document.getElementById('septic-tank');
const compoundWall = document.getElementById('compound-wall');

const constructionCostEl = document.getElementById('construction-cost');
const sumpCostEl = document.getElementById('sump-cost');
const septicCostEl = document.getElementById('septic-cost');
const wallCostEl = document.getElementById('wall-cost');
const totalCostEl = document.getElementById('total-cost');

function calculateCosts() {
    if (!packageSelect || !builtupArea) return;
    
    const packageRate = parseFloat(packageSelect.value) || 0;
    const area = parseFloat(builtupArea.value) || 0;
    const sumpLiters = parseFloat(waterSump?.value) || 0;
    const septicLiters = parseFloat(septicTank?.value) || 0;
    const wallArea = parseFloat(compoundWall?.value) || 0;
    
    const constructionCost = packageRate * area;
    const sumpCost = sumpLiters * 24;
    const septicCost = septicLiters * 24;
    const wallCost = wallArea * 425;
    const totalCost = constructionCost + sumpCost + septicCost + wallCost;
    
    if (constructionCostEl) constructionCostEl.textContent = `₹${constructionCost.toLocaleString('en-IN')}`;
    if (sumpCostEl) sumpCostEl.textContent = `₹${sumpCost.toLocaleString('en-IN')}`;
    if (septicCostEl) septicCostEl.textContent = `₹${septicCost.toLocaleString('en-IN')}`;
    if (wallCostEl) wallCostEl.textContent = `₹${wallCost.toLocaleString('en-IN')}`;
    if (totalCostEl) totalCostEl.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
}

// Add event listeners for real-time calculation
if (packageSelect && builtupArea) {
    [packageSelect, builtupArea, waterSump, septicTank, compoundWall].forEach(input => {
        if (input) {
            input.addEventListener('input', calculateCosts);
        }
    });
    
    // Initialize calculator
    calculateCosts();
}

// Floor selection handling
document.querySelectorAll('input[name="floors"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        // You can add floor-specific calculations here if needed
        calculateCosts();
    });
});

// Print estimate function
function printEstimate() {
    const printContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #D32F2F; text-align: center;">PremiumBuild Construction</h2>
            <h3 style="text-align: center;">Cost Estimate</h3>
            <hr>
            <div style="margin: 20px 0;">
                <p><strong>Package:</strong> ${packageSelect?.options[packageSelect.selectedIndex]?.text || 'N/A'}</p>
                <p><strong>Built-up Area:</strong> ${builtupArea?.value || '0'} sq ft</p>
                <p><strong>Water Sump:</strong> ${waterSump?.value || '0'} liters</p>
                <p><strong>Septic Tank:</strong> ${septicTank?.value || '0'} liters</p>
                <p><strong>Compound Wall:</strong> ${compoundWall?.value || '0'} sq ft</p>
            </div>
            <hr>
            <div style="margin: 20px 0;">
                <p><strong>Construction Cost:</strong> ${constructionCostEl?.textContent || '₹0'}</p>
                <p><strong>Water Sump Cost:</strong> ${sumpCostEl?.textContent || '₹0'}</p>
                <p><strong>Septic Tank Cost:</strong> ${septicCostEl?.textContent || '₹0'}</p>
                <p><strong>Compound Wall Cost:</strong> ${wallCostEl?.textContent || '₹0'}</p>
                <hr>
                <h3><strong>Total Estimated Cost:</strong> ${totalCostEl?.textContent || '₹0'}</h3>
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 30px;">
                * This is an estimated cost. Final cost may vary based on site conditions, material prices, and customizations.
                <br>* Contact PremiumBuild for detailed quotation and site visit.
            </p>
        </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Construction Cost Estimate</title>
                <style>
                    body { margin: 0; padding: 20px; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Contact Form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !phone || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit Indian mobile number.');
            return;
        }
        
        // Email validation (if provided)
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
        }
        
        // Here you can integrate with services like Formspree, EmailJS, etc.
        // For demonstration, we'll show a success message
        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
        
        // Example integration with Formspree (uncomment and add your form ID):
        /*
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            } else {
                alert('Sorry, there was a problem sending your message. Please try again.');
            }
        }).catch(error => {
            alert('Sorry, there was a problem sending your message. Please try again.');
        });
        */
    });
}

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity for smooth loading
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Add loading animation for images
 
// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .value-card, .service-card, .package-card, .team-card, .info-card').forEach(el => {
    observer.observe(el);
});

// Active navigation highlighting for current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Animate numbers on scroll (for stats section)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize number animations when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/\d/g, '');
                stat.dataset.suffix = suffix;
                animateValue(stat, 0, number, 2000);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Smooth scroll for scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Touch/swipe support for mobile slider
let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
}