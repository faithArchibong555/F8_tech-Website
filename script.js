// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// close menu when a nav link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('show'); // Close the menu
    });
});


// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Scroll Animation Trigger
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title, .project-card, .about-content, .contact-form');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


 const form = document.querySelector('.contact-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // "Don't reload the page!"
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true; // "Freeze the button!"
    submitBtn.textContent = 'Sending...'; // "Change button text"
    
    try {
      // Send data to Formspree
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      // Success!
      if (response.ok) {
        form.innerHTML = '<p class="success">✅ Message sent!</p>';
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      // Error!
      form.innerHTML = '<p class="error">❌ Failed. Email me directly!</p>';
    }
  });
// ===== FORM VALIDATION CODE =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return; // Only run if form exists
    
    const messageTextarea = contactForm.querySelector('textarea[name="message"]');
    const charCount = document.getElementById('charCount');
    
    // Character counter functionality
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            if (length < 10) {
                charCount.style.color = 'red';
            } else {
                charCount.style.color = 'green';
            }
        });
    }
    
    // Enhanced form validation
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="_replyto"]').value.trim();
        const message = messageTextarea ? messageTextarea.value.trim() : '';
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (name.length < 2) {
            showError('Please enter a valid name (at least 2 characters)');
            return;
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Validate message
        if (message.length < 10) {
            showError('Please enter at least 10 characters in your message');
            return;
        }
        
        if (message.length > 500) {
            showError('Message cannot exceed 500 characters');
            return;
        }
        
        // If all validations pass, submit the form
        submitForm(contactForm);
    });
});

// Helper functions 
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    contactForm.insertBefore(errorDiv, submitButton);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function clearErrors() {
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
}

async function submitForm(contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            contactForm.innerHTML = `
                <div class="success-message">
                    <h3>✅ Message Sent Successfully!</h3>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                </div>
            `;
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        contactForm.innerHTML = `
            <div class="error-message">
                <h3>❌ Sending Failed</h3>
                <p>Please try again or email me directly</p>
                <button onclick="location.reload()" class="btn">Try Again</button>
            </div>
        `;
    }
}
