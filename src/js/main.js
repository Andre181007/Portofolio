// Import styles
import '../input.css'

// Import modules
import { initDarkMode } from './modules/darkMode.js';
import { initNavigation } from './modules/navigation.js';
import { initHamburgerMenu } from './modules/hamburger.js';
import { PortfolioManager } from './modules/portfolio.js';
import './admin.js';  // Add this line

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  initDarkMode();
  initNavigation();
  initHamburgerMenu();
  
  // Initialize portfolio if on main page
  if (document.querySelector('#portfolioProjects')) {
    const portfolio = new PortfolioManager();
    portfolio.displayProjects();
  }

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all elements with scroll-fade-in class
  document.querySelectorAll('.scroll-fade-in').forEach((el) => observer.observe(el));
});

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    const html = document.querySelector('html');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle hamburger animation
            hamburger.classList.toggle('hamburger-active');
            // Toggle menu
            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('hamburger-active');
                navMenu.classList.add('hidden');
                navMenu.classList.remove('show');
            }
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('hamburger-active');
                navMenu.classList.add('hidden');
                navMenu.classList.remove('show');
            });
        });
    }
}

// Initialize hamburger menu
document.addEventListener('DOMContentLoaded', initHamburgerMenu); 