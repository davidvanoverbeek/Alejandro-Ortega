/* ---------- Elementos DOM --------- */

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const header = document.querySelector("header");


/* ---------- Menu responsive ---------- */

if (burger && nav) {

    burger.addEventListener("click", () => {

        nav.classList.toggle("active");
        document.body.classList.toggle("menu-open");

        burger.textContent = nav.classList.contains("active")
            ? "✕"
            : "☰";

    });

}


/* ----------- CERRAR MENÚ ---------- */

function closeMenu() {

    nav.classList.remove("active");

    document.body.classList.remove("menu-open");

    burger.textContent = "☰";

}


/* ---------- CERRAR AL PULSAR UN ENLACE ---------- */

document.querySelectorAll("#nav a").forEach(link => {

    link.addEventListener("click", closeMenu);

});


/* ---------- CERRAR HACIENDO CLICK FUERA ---------- */

document.addEventListener("click", e => {

    if (!nav.classList.contains("active")) return;

    if (
        !nav.contains(e.target) &&
        !burger.contains(e.target)
    ) {

        closeMenu();

    }

});


/* ---------- CERRAR CON ESC ----------- */

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeMenu();

    }

});


/* ----------- CERRAR AL VOLVER A ESCRITORIO ----------- */

window.addEventListener("resize", () => {

    if (window.innerWidth > 860) {

        closeMenu();

    }

});


/* ---------- HEADER SCROLL ---------- */

window.addEventListener("scroll", () => {

    header.classList.toggle(

        "scrolled",

        window.scrollY > 50

    );

});


/* ----------- SCROLL SUAVE ----------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(

            this.getAttribute("href")

        );

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

});


/* ----------- SCROLL REVEAL ----------- */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("in-view");

        revealObserver.unobserve(entry.target);

    });

}, {

    threshold: 0.15

});

reveals.forEach(el => revealObserver.observe(el));


/* ----------- CONTADORES ----------- */

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.count);

        const suffix = counter.dataset.suffix || "";

        let current = 0;

        const duration = 1800;

        const step = target / (duration / 16);

        function update() {

            current += step;

            if (current < target) {

                counter.textContent = Math.floor(current);

                requestAnimationFrame(update);

            } else {

                counter.textContent = target + suffix;

            }

        }

        update();

        counterObserver.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});