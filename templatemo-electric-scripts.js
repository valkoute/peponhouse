// JavaScript Document


// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        // Randomly assign orange or blue color
        const color = Math.random() > 0.5 ? '#00B2FF' : '#FF5E00';
        particle.style.setProperty('--particle-color', color);
        particle.style.background = color;
        fragment.appendChild(particle);
    }
    particlesContainer.appendChild(fragment);
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});
// Event delegation for nav links
navLinks.addEventListener('click', e => {
    if (e.target.classList.contains('nav-link')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;
    let found = false;
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => item.classList.remove('active'));
            const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (currentNav) currentNav.classList.add('active');
            found = true;
            break;
        }
    }
    if (!found) navItems.forEach(item => item.classList.remove('active'));
}

// Navbar scroll effect and active nav update
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
});
// Initial active nav update
updateActiveNav();
// Smooth scrolling for navigation links
document.addEventListener('click', function (e) {
    if (e.target.matches('a[href^="#"]')) {
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Feature tabs functionality (event delegation)
const featuresContainer = document.querySelector('.feature-tabs');
const panels = document.querySelectorAll('.content-panel');
featuresContainer.addEventListener('click', e => {
    const tab = e.target.closest('.tab-item');
    if (!tab) return;
    const tabId = tab.getAttribute('data-tab');
    featuresContainer.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tabId).classList.add('active');
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    this.reset();
});

// Initialize particles
createParticles();

// Text rotation with character animation
const textSets = document.querySelectorAll('.text-set');
let currentIndex = 0;
let isAnimating = false;
function wrapTextInSpans(element) {
    const text = element.textContent;
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.animationDelay = (i * 0.05) + 's';
        span.innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
        element.appendChild(span);
    }
}
function animateTextIn(textSet) {
    const glitchText = textSet.querySelector('.glitch-text');
    const subtitle = textSet.querySelector('.subtitle');
    wrapTextInSpans(glitchText);
    glitchText.setAttribute('data-text', glitchText.textContent);
    setTimeout(() => subtitle.classList.add('visible'), 800);
}
function animateTextOut(textSet) {
    const chars = textSet.querySelectorAll('.char');
    const subtitle = textSet.querySelector('.subtitle');
    chars.forEach((char, i) => {
        char.style.animationDelay = (i * 0.02) + 's';
        char.classList.add('out');
    });
    subtitle.classList.remove('visible');
}
function rotateText() {
    if (isAnimating) return;
    isAnimating = true;
    const currentSet = textSets[currentIndex];
    const nextIndex = (currentIndex + 1) % textSets.length;
    const nextSet = textSets[nextIndex];
    animateTextOut(currentSet);
    setTimeout(() => {
        currentSet.classList.remove('active');
        nextSet.classList.add('active');
        animateTextIn(nextSet);
        currentIndex = nextIndex;
        isAnimating = false;
    }, 600);
}
// Initialize first text set
textSets[0].classList.add('active');
animateTextIn(textSets[0]);
// Start rotation after initial display
setTimeout(() => {
    setInterval(rotateText, 5000);
}, 4000);
// Add random glitch effect
setInterval(() => {
    document.querySelectorAll('.glitch-text').forEach(text => {
        if (Math.random() > 0.95) {
            text.style.animation = 'none';
            setTimeout(() => { text.style.animation = ''; }, 200);
        }
    });
}, 3000);