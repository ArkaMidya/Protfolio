// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced border lighting effect on mouse movement for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
        
        const border = card.querySelector('.card-border');
        if (border) {
            border.style.transform = `rotate(${angle}deg)`;
        }
        
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;
        
        card.style.setProperty('--glow-x', `${glowX}%`);
        card.style.setProperty('--glow-y', `${glowY}%`);
        
        const hue = (x / rect.width) * 360;
        card.style.setProperty('--dynamic-hue', `${hue}`);
    });
    
    card.addEventListener('mouseleave', () => {
        const border = card.querySelector('.card-border');
        if (border) {
            border.style.transform = 'rotate(0deg)';
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Typing effect for hero text
const heroText = document.querySelector('.hero h1');
if(heroText) {
    const originalText = heroText.textContent;
    heroText.textContent = '';
    heroText.style.minHeight = '4.2rem';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Counter animation for achievement numbers
const achievementNumbers = document.querySelectorAll('.achievement-number');
if(achievementNumbers.length > 0) {
    const observerCounter = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target;
                const originalText = target.textContent;
                const finalValue = parseInt(originalText.replace('+', ''));
                const duration = 2000;
                const step = finalValue / (duration / 16);
                let currentValue = 0;
                
                const counter = setInterval(() => {
                    currentValue += step;
                    if(currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue) + '+';
                    }
                }, 16);
                
                observerCounter.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    achievementNumbers.forEach(number => {
        observerCounter.observe(number);
    });
}

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navMenuLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        
        if(window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navMenuLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

navMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenuLinks.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});



// ============================================
// SCROLL ANIMATIONS & ACTIVE NAVIGATION
// ============================================

// Create scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// Update progress bar on scroll
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================
// MAKE HERO SECTION VISIBLE IMMEDIATELY
// ============================================

// Hero section is already visible from CSS, no need to modify

// ============================================
// REANIMATE ELEMENTS ON SCROLL (KEEP THEM VISIBLE)
// ============================================

function animateElementsOnScroll() {
    const sections = document.querySelectorAll(
        '.about, .skills, .projects, .achievements, .education, .contact'
    );

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const isVisible = rect.top < windowHeight - 100 && rect.bottom > 100;

        if (isVisible) {
            // ✅ Add animation
            section.classList.add('visible');
        } else {
            // ✅ Remove when out of view (so it can re-animate)
            section.classList.remove('visible');
        }
    });
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

const allSections = document.querySelectorAll('section');
const allNavLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// THROTTLE FUNCTION
// ============================================

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

// Initial call to check which sections are visible on load
setTimeout(() => {
    animateElementsOnScroll();
}, 100);

// Set up scroll animations
window.addEventListener('scroll', throttle(() => {
    animateElementsOnScroll();
    updateActiveNav();
}, 100));

// Initial active nav update
updateActiveNav();

// ============================================
// SMOOTH SCROLL WITH OFFSET
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            history.pushState(null, null, targetId);
        }
    });
});

// ============================================
// ADD HOVER EFFECTS TO NAVIGATION
// ============================================

allNavLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (!link.classList.contains('active')) {
            link.style.transform = 'translateY(-2px)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = '';
    });
});

// ============================================
// ADD CSS FOR SCROLL PROGRESS BAR
// ============================================

const scrollStyle = document.createElement('style');
scrollStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #0ea5e9);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
    
    /* Ensure all elements have transitions */
    .skill-category, .project-card, .achievement-card, 
    .contact-form-container, .social-connect-container, 
    .platform-link, .education-item, .about-text, 
    .about-image, .section-title, .section-subtitle {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Hero section specific */
    .hero-content, .hero-image {
        transition: all 0.8s ease;
    }
    
    /* Hover effects */
    .skill-category:hover,
    .project-card:hover,
    .achievement-card:hover {
        transform: translateY(-10px) scale(1.02) !important;
        transition: all 0.3s ease !important;
    }
`;
document.head.appendChild(scrollStyle);

// ============================================
// ENSURE SECTIONS STAY VISIBLE AFTER SCROLLING UP
// ============================================

// Force check all sections after load
window.addEventListener('load', () => {
    // Add visible class to any section that is in view
    const sections = document.querySelectorAll('.about, .skills, .projects, .achievements, .education, .contact');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
    console.log('%c✨ Sections will stay visible once scrolled to!', 'color: #10b981; font-size: 12px;');
});

// ============================================
// CONSOLE LOG
// ============================================

console.log('%c✨ Website Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c🏠 Hero section is visible immediately!', 'color: #10b981; font-size: 12px;');
console.log('%c🎯 Other sections animate in and STAY VISIBLE when scrolled!', 'color: #f59e0b; font-size: 12px;');
console.log('%c🔄 Sections remain visible even when scrolling back up!', 'color: #ef4444; font-size: 12px;');

// ============================================
// EMAILJS CONTACT FORM WITH YOUR CREDENTIALS
// ============================================

// Initialize EmailJS with your public key
(function() {
    emailjs.init("h-UmwzMbPjV6E3eU4");
})();

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const userName = document.getElementById('user-name').value;
        const userEmail = document.getElementById('user-email').value;
        const userMessage = document.getElementById('user-message').value;
        
        // Validate form
        if (!userName || !userEmail || !userMessage) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const sendBtn = document.querySelector('.send-btn');
        const originalBtnText = sendBtn.innerHTML;
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        sendBtn.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            from_name: userName,
            from_email: userEmail,
            message: userMessage,
            to_email: 'arkamidya516@gmail.com'
        };
        
        // Send email using EmailJS with your service and template IDs
        emailjs.send('service_lzxuutq', 'template_7bkxxam', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                showMessage('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                setTimeout(() => {
                    sendBtn.innerHTML = originalBtnText;
                    sendBtn.disabled = false;
                }, 2000);
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                showMessage('✗ Failed to send message. Please try again or email me directly at arkamidya516@gmail.com', 'error');
                
                // Reset button
                setTimeout(() => {
                    sendBtn.innerHTML = originalBtnText;
                    sendBtn.disabled = false;
                }, 2000);
            });
    });
}

// Helper function to show messages
function showMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Social items click
const socialItems = document.querySelectorAll('.social-item');
socialItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        const link = item.querySelector('a');
        if (link && link.href) {
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
            
            setTimeout(() => {
                window.open(link.href, '_blank');
            }, 100);
        }
    });
});

// Add floating animation to contact cards
const contactCards = document.querySelectorAll('.contact-form-container, .social-connect-container');
contactCards.forEach((card, index) => {
    card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.2}s`;
});

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    .contact-form-container, .social-connect-container {
        opacity: 0;
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .form-message {
        margin-top: 20px;
        padding: 12px 16px;
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        display: none;
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-message.success {
        background: rgba(16, 185, 129, 0.15);
        border: 1px solid #10b981;
        color: #10b981;
    }
    
    .form-message.error {
        background: rgba(239, 68, 68, 0.15);
        border: 1px solid #ef4444;
        color: #ef4444;
    }
    
    .send-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(styleSheet);

// Download resume functionality
// ============================================
// RESUME FUNCTIONALITY WITH OPTIONS
// ============================================

const downloadResumeBtn = document.querySelector('.btn-secondary');
if(downloadResumeBtn && downloadResumeBtn.textContent.includes('Download Resume')) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create a modal with options
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        modal.innerHTML = `
            <div style="background: var(--dark-light); padding: 35px; border-radius: 20px; max-width: 500px; width: 90%; border: 1px solid var(--primary); text-align: center;">
                <i class="fas fa-file-alt" style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;"></i>
                <h3 style="color: var(--light); margin-bottom: 15px;">My Resume</h3>
                <p style="color: var(--gray); margin-bottom: 25px;">Choose how you'd like to access my resume:</p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <button id="viewResume" style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; border: none; padding: 12px 25px; border-radius: 10px; cursor: pointer;">
                        <i class="fas fa-eye"></i> View Resume
                    </button>
                    <button id="downloadResume" style="background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 12px 25px; border-radius: 10px; cursor: pointer;">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button id="closeModal" style="background: transparent; color: var(--gray); border: 1px solid var(--gray); padding: 12px 25px; border-radius: 10px; cursor: pointer;">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // View Resume - Opens in Google Drive
        document.getElementById('viewResume').addEventListener('click', () => {
            window.open('https://drive.google.com/file/d/1uiX3B75WddM9BbQ-3Oy7SWMPNc0_wX5o/view?usp=drivesdk', '_blank');
            document.body.removeChild(modal);
        });
        
        // Download Resume - Direct download
        document.getElementById('downloadResume').addEventListener('click', () => {
            window.open('https://drive.google.com/uc?export=download&id=1uiX3B75WddM9BbQ-3Oy7SWMPNc0_wX5o', '_blank');
            document.body.removeChild(modal);
        });
        
        document.getElementById('closeModal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    });
}

// Dynamic copyright year
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright');
if(copyrightElement) {
    const yearMatch = copyrightElement.textContent.match(/\d{4}/);
    if (yearMatch) {
        copyrightElement.textContent = copyrightElement.textContent.replace(yearMatch[0], currentYear);
    }
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.id = 'scrollToTop';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
});



console.log('%c👋 Portfolio Loaded!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c📧 Contact: arkamidya516@gmail.com', 'color: #10b981; font-size: 12px;');
console.log('%c🔑 EmailJS Configured Successfully!', 'color: #10b981; font-size: 12px;');
console.log('%c📨 Service ID: service_lzxuutq', 'color: #f59e0b; font-size: 11px;');
console.log('%c📝 Template ID: __ejs-test-mail-service__', 'color: #f59e0b; font-size: 11px;');