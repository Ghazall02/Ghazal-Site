document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       HAMBURGER MENU
    ========================== */

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    function toggleMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuToggle.setAttribute(
            'aria-expanded',
            menuToggle.classList.contains('active')
        );
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', toggleMenu);

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                const targetId = this.getAttribute('href');

                // Only smooth scroll if it's an internal section
                if (targetId.startsWith('#')) {
                    event.preventDefault();

                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        if (navMenu.classList.contains('active')) {
                            toggleMenu();
                        }

                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /* =========================
       CONTACT FORM
    ========================== */

    const contactForm = document.querySelector('form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');

            if (!nameInput || !emailInput) return;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (name && email) {
                alert(`Thank you ${name}! Your message has been received. We will contact you at ${email} soon.`);
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    /* =========================
       FILTER PROJECTS
    ========================== */

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(category) {

        // Update active button
        filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });

        // Filter cards - use empty string to let CSS Grid work properly
        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === 'all' || cardCategory === category) {
                card.style.display = '';  // Reset to CSS default (grid item)
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const category = this.dataset.category;
                filterProjects(category);
            });
        });
    }

});
