// Modern Interactive JavaScript for Pathsan Pro Website

// Global variables
let isScrolled = false;
let countersAnimated = false;
let currentLoanType = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
    updateCopyrightYear();
});

// Initialize all components
function initializeAll() {
    initializeNavigation();
    initializeAnimations();
    initializeCounters();
    initializeFormValidation();
    initializeModals();
    initializeScrollEffects();
    initializeTooltips();
    initializeAccessibility();
    initializeLoadingStates();
    initializeSearch();
    initializeLoanForm();
    initializeTranslate();
}

// Update copyright year with Devanagari numerals
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear().toString();
    const devanagariNumerals = {
        '0': '०',
        '1': '१',
        '2': '२',
        '3': '३',
        '4': '४',
        '5': '५',
        '6': '६',
        '7': '७',
        '8': '८',
        '9': '९'
    };
    
    const yearInDevanagari = currentYear.split('').map(digit => devanagariNumerals[digit]).join('');
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = yearInDevanagari;
    }
}

// Navigation functionality
function initializeNavigation() {
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            if (!isScrolled) {
                navbar.classList.add('scrolled');
                isScrolled = true;
            }
        } else {
            if (isScrolled) {
                navbar.classList.remove('scrolled');
                isScrolled = false;
            }
        }
    });
}

// Advanced animations with Intersection Observer
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in, .animate-scale-in, .animate-slide-right, .animate-slide-top');
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px) scale(0.9)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(element);
    });
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.counter-container');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Form validation and submission
function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'नाव किमान २ अक्षरांचे असणे आवश्यक आहे';
            }
            break;
        case 'phone':
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'वैध मोबाईल नंबर टाका';
            }
            break;
        case 'email':
            if (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'वैध ईमेल पत्ता टाका';
                }
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'संदेश किमान १० अक्षरांचा असणे आवश्यक आहे';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'message error mt-2';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.classList.add('is-invalid');
}

function clearFieldError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.message.error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('is-invalid');
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
                        isValid = false;
        }
    });
    
    if (!isValid) {
        showMessage('कृपया सर्व फील्ड योग्यरित्या भरा', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showMessage('तुमचा संदेश यशस्वीरित्या पाठवला गेला! आम्ही लवकरच तुमच्याशी संपर्क साधू.', 'success');
        form.reset();
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }, 2000);
}

// Modal functionality
function initializeModals() {
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

function showRateDetails(period, rate) {
    const modal = document.getElementById('rateModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    const rateDetails = {
        '30-45': {
            title: '३०-४५ दिवस ठेव',
            details: `
                <div class="row">
                    <div class="col-md-6">
                        <h5>वैशिष्ट्ये:</h5>
                        <ul>
                            <li>किमान ठेव: ₹१,०००</li>
                            <li>कमाल ठेव: ₹१,००,०००</li>
                            <li>व्याजदर: ४% वार्षिक</li>
                            <li>व्याज भरणा: मासिक</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5>लाभ:</h5>
                        <ul>
                            <li>लवचिक ठेव कालावधी</li>
                            <li>कमीत कमी रक्कम</li>
                            <li>सुरक्षित गुंतवणूक</li>
                            <li>सोपी प्रक्रिया</li>
                        </ul>
                    </div>
                </div>
            `
        },
        '46-90': {
            title: '४६-९० दिवस ठेव',
            details: `
                <div class="row">
                    <div class="col-md-6">
                        <h5>वैशिष्ट्ये:</h5>
                        <ul>
                            <li>किमान ठेव: ₹५,०००</li>
                            <li>कमाल ठेव: ₹५,००,०००</li>
                            <li>व्याजदर: ५.५% वार्षिक</li>
                            <li>व्याज भरणा: त्रैमासिक</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5>लाभ:</h5>
                        <ul>
                            <li>उच्च व्याजदर</li>
                            <li>मध्यम कालावधी</li>
                            <li>नियमित आय</li>
                            <li>कर लाभ</li>
                        </ul>
                    </div>
                </div>
            `
        },
        '91-180': {
            title: '९१-१८० दिवस ठेव',
            details: `
                <div class="row">
                    <div class="col-md-6">
                        <h5>वैशिष्ट्ये:</h5>
                        <ul>
                            <li>किमान ठेव: ₹१०,०००</li>
                            <li>कमाल ठेव: ₹१०,००,०००</li>
                            <li>व्याजदर: ७% वार्षिक</li>
                            <li>व्याज भरणा: अर्धवार्षिक</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5>लाभ:</h5>
                        <ul>
                            <li>आकर्षक व्याजदर</li>
                            <li>दीर्घ कालावधी</li>
                            <li>स्थिर आय</li>
                            <li>कर बचत</li>
                        </ul>
                    </div>
                </div>
            `
        },
        '181-365': {
            title: '१८१-३६५ दिवस ठेव',
            details: `
                <div class="row">
                    <div class="col-md-6">
                        <h5>वैशिष्ट्ये:</h5>
                        <ul>
                            <li>किमान ठेव: ₹२५,०००</li>
                            <li>कमाल ठेव: ₹२५,००,०००</li>
                            <li>व्याजदर: ७.५% वार्षिक</li>
                            <li>व्याज भरणा: वार्षिक</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5>लाभ:</h5>
                        <ul>
                            <li>उच्चतम व्याजदर</li>
                            <li>दीर्घकालीन गुंतवणूक</li>
                            <li>मोठी बचत</li>
                            <li>आर्थिक सुरक्षा</li>
                        </ul>
                    </div>
                </div>
            `
        },
        '1-3': {
            title: '१-३ वर्ष ठेव',
            details: `
                <div class="row">
                    <div class="col-md-6">
                        <h5>वैशिष्ट्ये:</h5>
                        <ul>
                            <li>किमान ठेव: ₹५०,०००</li>
                            <li>कमाल ठेव: कोणतीही</li>
                            <li>व्याजदर: ८% वार्षिक</li>
                            <li>व्याज भरणा: वार्षिक</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h5>लाभ:</h5>
                        <ul>
                            <li>सर्वाधिक व्याजदर</li>
                            <li>दीर्घकालीन योजना</li>
                            <li>मोठी बचत</li>
                            <li>भविष्यातील सुरक्षा</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };
    
    const details = rateDetails[period];
    if (details) {
        title.textContent = details.title;
        content.innerHTML = details.details;
        modal.style.display = 'block';
    }
}

function showLoanDetails(loanType) {
    const modal = document.getElementById('loanModal');
    const modalTitle = document.getElementById('loanModalTitle');
    const modalContent = document.getElementById('loanModalContent');
    
    currentLoanType = loanType; // Store the current loan type
    
    let title = '';
    let content = '';
    
    switch(loanType) {
        case 'gold':
            title = 'सोन्याची साथ - गोल्ड लोन';
            content = `
                <div class="loan-details">
                    <h4>कर्जाची वैशिष्ट्ये:</h4>
                    <ul>
                        <li>कमीत कमी कागदपत्रे</li>
                        <li>कमीत कमी व्याजदर</li>
                        <li>प्रति तोळा सर्वाधिक रक्कम</li>
                        <li>त्वरित मंजुरी</li>
                    </ul>
                    <h4>आवश्यक कागदपत्रे:</h4>
                    <ul>
                        <li>आधार कार्ड</li>
                        <li>पॅन कार्ड</li>
                        <li>फोटो</li>
                        <li>रहिवासी पुरावा</li>
                    </ul>
                </div>`;
            break;
        case 'vehicle':
            title = 'वाहन कर्ज';
            content = `
                <div class="loan-details">
                    <h4>कर्जाची वैशिष्ट्ये:</h4>
                    <ul>
                        <li>सर्व प्रकारची वाहने</li>
                        <li>झटपट मंजुरी</li>
                        <li>सोपी परतफेड</li>
                        <li>परवडणारे व्याजदर</li>
                    </ul>
                    <h4>आवश्यक कागदपत्रे:</h4>
                    <ul>
                        <li>आधार कार्ड</li>
                        <li>पॅन कार्ड</li>
                        <li>फोटो</li>
                        <li>रहिवासी पुरावा</li>
                        <li>उत्पन्नाचा पुरावा</li>
                    </ul>
                </div>`;
            break;
        case 'education':
            title = 'शैक्षणिक कर्ज';
            content = `
                <div class="loan-details">
                    <h4>कर्जाची वैशिष्ट्ये:</h4>
                    <ul>
                        <li>सर्व शैक्षणिक अभ्यासक्रम</li>
                        <li>परवडणारे व्याजदर</li>
                        <li>लवचिक परतफेड</li>
                        <li>विद्यार्थी-हितकारी अटी</li>
                    </ul>
                    <h4>आवश्यक कागदपत्रे:</h4>
                    <ul>
                        <li>आधार कार्ड</li>
                        <li>पॅन कार्ड</li>
                        <li>फोटो</li>
                        <li>शैक्षणिक कागदपत्रे</li>
                        <li>प्रवेश पत्र / फी स्ट्रक्चर</li>
                    </ul>
                </div>`;
            break;
    }
    
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.style.display = 'block';

    // Add event listener for clicking outside the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal('loanModal');
        }
    };
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Reset form if it exists in the modal
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
        // Reset any error states
        const invalidInputs = modal.querySelectorAll('.is-invalid');
        invalidInputs.forEach(input => input.classList.remove('is-invalid'));
        const errorMessages = modal.querySelectorAll('.message.error');
        errorMessages.forEach(msg => msg.remove());
    }
    // Remove the window click event listener
    window.onclick = null;
}

function scrollToLoanApplication(loanType) {
    // Close the modal first
    closeModal('loanModal');
    
    // Set the loan type in the dropdown
    const loanTypeSelect = document.getElementById('loanType');
    if (loanTypeSelect) {
        loanTypeSelect.value = loanType;
    }
    
    // Scroll to the loan application section
    const loanApplicationSection = document.getElementById('loan-application');
    if (loanApplicationSection) {
        loanApplicationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize loan application form
function initializeLoanForm() {
    const loanForm = document.getElementById('loanApplicationForm');
    if (loanForm) {
        loanForm.addEventListener('submit', handleLoanApplicationSubmit);
        
        // Real-time validation
        const inputs = loanForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });

        // Handle loan type selection from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const loanType = urlParams.get('type');
        if (loanType) {
            const loanTypeSelect = document.getElementById('loanType');
            if (loanTypeSelect && ['gold', 'vehicle', 'education'].includes(loanType)) {
                loanTypeSelect.value = loanType;
                // Scroll to the form
                document.getElementById('loan-application').scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

function handleLoanApplicationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validate all fields
    const inputs = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        if (input.required && !value) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                input.classList.add('is-invalid');
            }
        }
        
        if (input.type === 'tel') {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                input.classList.add('is-invalid');
            }
        }
    });
    
    if (!isValid) {
        showMessage('कृपया सर्व फील्ड योग्यरित्या भरा', 'error');
        return;
    }
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        const loanType = document.getElementById('loanType').value;
        let successMessage = '';
        switch(loanType) {
            case 'gold':
                successMessage = 'तुमचा गोल्ड लोन अर्ज यशस्वीरित्या सबमिट झाला आहे. आमचे प्रतिनिधी लवकरच तुमच्याशी संपर्क साधतील.';
                break;
            case 'vehicle':
                successMessage = 'तुमचा वाहन कर्ज अर्ज यशस्वीरित्या सबमिट झाला आहे. आमचे प्रतिनिधी लवकरच तुमच्याशी संपर्क साधतील.';
                break;
            case 'education':
                successMessage = 'तुमचा शैक्षणिक कर्ज अर्ज यशस्वीरित्या सबमिट झाला आहे. आमचे प्रतिनिधी लवकरच तुमच्याशी संपर्क साधतील.';
                break;
        }
        
        showMessage(successMessage, 'success');
        form.reset();
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }, 1500);
}

// Scroll effects
function initializeScrollEffects() {
    // Floating action button visibility
    window.addEventListener('scroll', function() {
        const fab = document.querySelector('.fab');
        if (window.scrollY > 300) {
            fab.style.opacity = '1';
            fab.style.visibility = 'visible';
        } else {
            fab.style.opacity = '0';
            fab.style.visibility = 'hidden';
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Tooltip functionality
function initializeTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltiptext = this.querySelector('.tooltiptext');
            if (tooltiptext) {
                tooltiptext.style.visibility = 'visible';
                tooltiptext.style.opacity = '1';
            }
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltiptext = this.querySelector('.tooltiptext');
            if (tooltiptext) {
                tooltiptext.style.visibility = 'hidden';
                tooltiptext.style.opacity = '0';
            }
        });
    });
}

// Accessibility features
function initializeAccessibility() {
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'मुख्य सामग्रीकडे जा';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;
    document.body.appendChild(skipLink);
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
}

// Loading states
function initializeLoadingStates() {
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
    });
}

// Utility functions
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function applyLoan(loanType) {
    showMessage('कर्ज मागणी यशस्वीरित्या पाठवली गेली! आम्ही लवकरच तुमच्याशी संपर्क साधू.', 'success');
    closeModal('loanModal');
}

function downloadApp() {
    showMessage('अॅप डाउनलोड सुरू झाले आहे...', 'success');
    // Simulate app download
    setTimeout(() => {
        showMessage('अॅप डाउनलोड पूर्ण झाले!', 'success');
    }, 3000);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .loan-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Initialize any remaining components
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
});

// Search functionality
function initializeSearch() {
    // Add search functionality to initialization
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search as user types
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                performSearch(query);
            } else {
                clearSearchResults();
            }
        });
    }
}

function openSearchModal() {
    const modal = document.getElementById('searchModal');
    modal.style.display = 'block';
    
    // Focus on search input
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        searchInput.focus();
    }, 300);
}

function performSearch(query = null) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTerm = query || searchInput.value.trim();
    
    if (!searchTerm) {
        showMessage('कृपया शोध शब्द टाका', 'error');
        return;
    }
    
    // Show loading
    searchResults.innerHTML = `
        <div class="search-loading">
            <div class="loading-spinner"></div>
            <p>शोधत आहे...</p>
        </div>
    `;
    
    // Simulate search delay
    setTimeout(() => {
        const results = searchContent(searchTerm);
        displaySearchResults(results, searchTerm);
    }, 500);
}

function searchContent(query) {
    const searchData = [
        {
            title: 'सोन्याची साथ - गोल्ड लोन',
            content: 'फक्त १० मिनिटात गोल्ड लोन उपलब्ध. कमीत कमी कागदपत्रे, कमीत कमी व्याजदर, प्रति तोळा सर्वाधिक रक्कम.',
            section: 'loans',
            keywords: ['सोने', 'गोल्ड', 'कर्ज', 'लोन', 'दागिने']
        },
        {
            title: 'वाहन कर्ज',
            content: 'इलेक्ट्रिक वाहन कर्ज. सर्व प्रकारची वाहने, झटपट मंजुरी, सोपी परतफेड.',
            section: 'loans',
            keywords: ['वाहन', 'कार', 'बाइक', 'इलेक्ट्रिक', 'कर्ज']
        },
        {
            title: 'शैक्षणिक कर्ज',
            content: 'उच्च शिक्षणासाठी कर्ज. सर्व शैक्षणिक अभ्यासक्रम, परवडणारे व्याजदर, लवचिक परतफेड.',
            section: 'loans',
            keywords: ['शिक्षण', 'शाळा', 'कॉलेज', 'युनिव्हर्सिटी', 'अभ्यास']
        },
        {
            title: 'ठेवीवरील व्याजदर',
            content: '३० दिवस ते ४५ दिवस: ४%, ४६ दिवस ते ९० दिवस: ५.५%, ९१ दिवस ते १८० दिवस: ७%',
            section: 'interest-rates',
            keywords: ['व्याजदर', 'ठेव', 'बचत', 'गुंतवणूक', 'व्याज']
        },
        {
            title: 'संपूर्ण संगणकीकृत कामकाज',
            content: 'आधुनिक तंत्रज्ञान वापरून सर्व कामकाज संगणकीकृत केले आहे.',
            section: 'features',
            keywords: ['संगणक', 'डिजिटल', 'आधुनिक', 'तंत्रज्ञान']
        },
        {
            title: '३६५ दिवस सुरू असणारी पतसंस्था',
            content: 'सर्व दिवस सुरू असणारी सेवा. सोमवार ते रविवार, सर्व सुट्ट्या.',
            section: 'features',
            keywords: ['सेवा', 'दिवस', 'सोमवार', 'रविवार', 'सुट्टी']
        },
        {
            title: 'मोबाईल बँकिंग सेवा',
            content: 'आता तुमच्या मोबाईलवर सर्व बँकिंग सुविधा. २४x७ बँकिंग सुविधा, सुरक्षित व्यवहार.',
            section: 'mobile-banking',
            keywords: ['मोबाईल', 'बँकिंग', 'अॅप', 'व्यवहार', '२४x७']
        },
        {
            title: 'संपर्क माहिती',
            content: 'कार्यालयीन वेळ: सकाळी ८.३० ते दुपारी १२.३०, सायंकाळी ५.३० ते रात्री ८.३०',
            section: 'contact',
            keywords: ['संपर्क', 'फोन', 'ईमेल', 'पत्ता', 'वेळ']
        }
    ];
    
    const results = [];
    const queryLower = query.toLowerCase();
    
    searchData.forEach(item => {
        const titleMatch = item.title.toLowerCase().includes(queryLower);
        const contentMatch = item.content.toLowerCase().includes(queryLower);
        const keywordMatch = item.keywords.some(keyword => 
            keyword.toLowerCase().includes(queryLower)
        );
        
        if (titleMatch || contentMatch || keywordMatch) {
            results.push({
                ...item,
                relevance: (titleMatch ? 3 : 0) + (contentMatch ? 2 : 0) + (keywordMatch ? 1 : 0)
            });
        }
    });
    
    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    
    return results;
}

function displaySearchResults(results, searchTerm) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h5>कोणतेही निकाल सापडले नाहीत</h5>
                <p>"${searchTerm}" साठी कोणतेही निकाल सापडले नाहीत. कृपया वेगळा शोध शब्द वापरा.</p>
            </div>
        `;
        return;
    }
    
    const resultsHtml = results.map(result => {
        const highlightedTitle = highlightText(result.title, searchTerm);
        const highlightedContent = highlightText(result.content, searchTerm);
        
        return `
            <div class="search-result-item" onclick="navigateToSection('${result.section}')">
                <h6>${highlightedTitle}</h6>
                <p>${highlightedContent}</p>
                <small class="text-muted">${getSectionName(result.section)}</small>
            </div>
        `;
    }).join('');
    
    searchResults.innerHTML = `
        <div class="mb-3">
            <small class="text-muted">${results.length} निकाल सापडले</small>
        </div>
        ${resultsHtml}
    `;
}

function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function getSectionName(section) {
    const sectionNames = {
        'loans': 'कर्ज योजना',
        'interest-rates': 'व्याजदर',
        'features': 'वैशिष्ट्ये',
        'mobile-banking': 'मोबाईल बँकिंग',
        'contact': 'संपर्क'
    };
    return sectionNames[section] || section;
}

function navigateToSection(section) {
    closeModal('searchModal');
    
    setTimeout(() => {
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 300);
}

function searchByTag(tag) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = tag;
    performSearch(tag);
}

function clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
}

// Initialize translate functionality
function initializeTranslate() {
    // Add hover effect for dropdown on mobile
    const translateBtn = document.querySelector('.translate-btn');
    if (translateBtn) {
        translateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = document.querySelector('.custom-translate-dropdown');
            if (dropdown) {
                dropdown.style.opacity = dropdown.style.opacity === '1' ? '0' : '1';
                dropdown.style.pointerEvents = dropdown.style.opacity === '1' ? 'auto' : 'none';
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-item.dropdown')) {
                const dropdown = document.querySelector('.custom-translate-dropdown');
                if (dropdown) {
                    dropdown.style.opacity = '0';
                    dropdown.style.pointerEvents = 'none';
                }
            }
        });
    }
}

// Remove custom translate dropdown logic and restore modal-based logic
// Restore openTranslateModal and translatePage functions
function openTranslateModal() {
    document.getElementById('translateModal').style.display = 'block';
}

function translatePage() {
    // This function can be filled with logic to trigger Google Translate if needed
    // For now, it just closes the modal
    closeModal('translateModal');
}

document.addEventListener('DOMContentLoaded', function() {
  // Loan Application Form Submission
  const loanForm = document.getElementById('loanApplicationForm');
  if (loanForm) {
    loanForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = {
        name: loanForm.name.value,
        mobile: loanForm.mobile.value,
        email: loanForm.email.value,
        message: loanForm.message.value,
        loanType: loanForm.loanType ? loanForm.loanType.value : ''
      };
      try {
        const res = await fetch('http://localhost:5000/api/loan-applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
          alert('Loan application submitted successfully!');
          loanForm.reset();
        } else {
          alert('Error: ' + (result.error || 'Could not submit application.'));
        }
      } catch (err) {
        alert('Network error: ' + err.message);
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = {
        name: contactForm.name.value,
        phone: contactForm.phone.value,
        email: contactForm.email.value,
        message: contactForm.message.value
      };
      try {
        const res = await fetch('http://localhost:5000/api/contact-messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        if (res.ok) {
          alert('Message sent successfully!');
          contactForm.reset();
        } else {
          alert('Error: ' + (result.error || 'Could not send message.'));
        }
      } catch (err) {
        alert('Network error: ' + err.message);
      }
    });
  }
});
