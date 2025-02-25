export const initNavigation = () => {
  const hamburger = document.querySelector('#hamburger');
  const navMenu = document.querySelector('#nav-menu');
  
  // Navigation logic here...
};

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Fungsi untuk scroll ke section
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Handle click pada nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                // Update active state
                navLinks.forEach(nl => nl.classList.remove('active'));
                link.classList.add('active');
                
                // Scroll ke section
                scrollToSection(targetId);
            }
        });
    });

    // Update active section saat scroll
    function updateActiveSection() {
        const headerHeight = header.offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100; // Tambah offset untuk trigger lebih awal

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = `#${section.id}`;
                
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === sectionId);
                });
            }
        });
    }

    // Throttle scroll event untuk performa
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Initial check untuk active section
    updateActiveSection();

    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');

    // Hamburger menu functionality
    hamburger?.addEventListener('click', function() {
        // Toggle hamburger active class
        hamburger.classList.toggle('hamburger-active');
        // Toggle nav menu visibility
        navMenu?.classList.toggle('hidden');
        navMenu?.classList.toggle('slide-up');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('hamburger-active');
            navMenu?.classList.add('hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger?.contains(e.target) && 
            !navMenu?.contains(e.target) && 
            !navMenu?.classList.contains('hidden')) {
            hamburger?.classList.remove('hamburger-active');
            navMenu?.classList.add('hidden');
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            navMenu?.classList.remove('hidden');
            hamburger?.classList.remove('hamburger-active');
            document.body.style.overflow = '';
        } else {
            if (!hamburger?.classList.contains('hamburger-active')) {
                navMenu?.classList.add('hidden');
            }
        }
    });
});