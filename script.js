// ===============================
// Mobile Menu Toggle
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll(".counter");

const runCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const update = () => {
            const increment = Math.ceil(target / 100);

            if (count < target) {
                count += increment;

                if (count > target) count = target;

                counter.innerText = count;

                setTimeout(update, 20);
            } else {
                counter.innerText = target;
            }
        };

        update();
    });
};

const statsSection = document.querySelector(".stats");

if (statsSection) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter();
                observer.unobserve(statsSection);
            }
        });
    });

    observer.observe(statsSection);
}

// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ===============================
// Reveal Animation
// ===============================

const revealItems = document.querySelectorAll(
    ".course-card, .gallery-item, .teacher-card, .stat-box, .about-content"
);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

revealItems.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all .7s ease";

    revealObserver.observe(item);

});

// ===============================
// Close Mobile Menu After Click
// ===============================

navItems.forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});