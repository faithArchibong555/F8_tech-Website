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