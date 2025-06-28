// Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

// Show menu
navToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
});

// Hide menu
navClose.addEventListener('click', () => {
    navMenu.classList.remove('show');
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Smooth scrolling and active link management
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to target
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Update active navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
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
    const packageRate = parseFloat(packageSelect.value) || 0;
    const area = parseFloat(builtupArea.value) || 0;
    const sumpLiters = parseFloat(waterSump.value) || 0;
    const septicLiters = parseFloat(septicTank.value) || 0;
    const wallArea = parseFloat(compoundWall.value) || 0;
    
    const constructionCost = packageRate * area;
    const sumpCost = sumpLiters * 24;
    const septicCost = septicLiters * 24;
    const wallCost = wallArea * 425;
    const totalCost = constructionCost + sumpCost + septicCost + wallCost;
    
    constructionCostEl.textContent = `₹${constructionCost.toLocaleString('en-IN')}`;
    sumpCostEl.textContent = `₹${sumpCost.toLocaleString('en-IN')}`;
    septicCostEl.textContent = `₹${septicCost.toLocaleString('en-IN')}`;
    wallCostEl.textContent = `₹${wallCost.toLocaleString('en-IN')}`;
    totalCostEl.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
}

// Add event listeners for real-time calculation
[packageSelect, builtupArea, waterSump, septicTank, compoundWall].forEach(input => {
    input.addEventListener('input', calculateCosts);
});

// Initialize calculator
calculateCosts();

// Contact Form
const contactForm = document.getElementById('contact-form');

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

// Floor selection handling
document.querySelectorAll('input[name="floors"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        // You can add floor-specific calculations here if needed
        calculateCosts();
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

// Animate numbers on scroll (for cost calculator)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = `₹${current.toLocaleString('en-IN')}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize animations when calculator section is visible
const calculatorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger calculation with animation
            setTimeout(() => {
                calculateCosts();
            }, 500);
        }
    });
}, { threshold: 0.5 });

const calculatorSection = document.querySelector('#calculator');
if (calculatorSection) {
    calculatorObserver.observe(calculatorSection);
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
});

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';