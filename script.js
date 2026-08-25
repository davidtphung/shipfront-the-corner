// THE CORNER - 80ms rest-is-image. Section enter once. No spring. No GSAP.

document.addEventListener("DOMContentLoaded", function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const form = document.getElementById("quote-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const box = document.getElementById("form-message");
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const company = document.getElementById("company").value;

            if (name && email && company) {
                box.className = "form-message show success";
                box.innerHTML =
                    "<strong>This preview does not send.</strong><br><br>" +
                    "Your request would go to <a href=\"mailto:info@myshipfront.com\">info@myshipfront.com</a> with Name: " +
                    escapeHtml(name) + ", Email: " + escapeHtml(email) + ", Company: " + escapeHtml(company) + ".";
                form.reset();
            } else {
                box.className = "form-message show";
                box.innerHTML = "<strong>Please fill out all fields.</strong>";
            }
        });
    }

    document.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("focus", function () {
            this.parentElement.classList.add("focused");
        });
        input.addEventListener("blur", function () {
            this.parentElement.classList.remove("focused");
        });
    });

    const nodes = document.querySelectorAll(".reveal");
    const tiles = document.querySelectorAll(".bento-tile");

    if (reduce || !("IntersectionObserver" in window)) {
        nodes.forEach(function (node) { node.classList.add("is-in"); });
        tiles.forEach(function (tile) { tile.classList.add("is-in"); });
        return;
    }

    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-in");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.01, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (node) { io.observe(node); });
    tiles.forEach(function (tile) { io.observe(tile); });

    tiles.forEach(function (tile) {
        tile.addEventListener("pointermove", function (e) {
            const box = tile.getBoundingClientRect();
            const x = (e.clientX - box.left) / box.width;
            const y = (e.clientY - box.top) / box.height;
            const ry = Math.max(-4, Math.min(4, (x - 0.5) * 8));
            const rx = Math.max(-4, Math.min(4, (0.5 - y) * 8));
            tile.style.setProperty("--ry", ry + "deg");
            tile.style.setProperty("--rx", rx + "deg");
        });
        tile.addEventListener("pointerleave", function () {
            tile.style.setProperty("--rx", "0deg");
            tile.style.setProperty("--ry", "0deg");
        });
    });
});

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
        return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[m];
    });
}

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
        const id = this.getAttribute("href");
        if (id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const header = document.querySelector(".site-head");
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        if (reduce || id !== "#why") {
            window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
            return;
        }
        const start = window.scrollY;
        const dist = top - start;
        const dur = 200;
        const t0 = performance.now();
        function step(now) {
            const t = Math.min(1, (now - t0) / dur);
            window.scrollTo(0, start + dist * t);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });
});
