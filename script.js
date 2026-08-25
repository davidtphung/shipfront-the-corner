// THE CORNER - 80ms rest-is-image. Section enter once. No spring. No GSAP.

document.addEventListener("DOMContentLoaded", function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduce) {
        document.documentElement.classList.add("js-motion");
    }

    const form = document.getElementById("quote-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const box = document.getElementById("form-message");
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const company = document.getElementById("company");
            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

            setFieldError(name, name.value.trim() ? "" : "Enter your name.");
            setFieldError(email, email.value.trim() ? (emailOk ? "" : "Enter an email with an @ and a domain.") : "Enter your email.");
            setFieldError(company, company.value.trim() ? "" : "Enter your company.");

            const firstBad = [name, email, company].find(function (field) {
                return field.getAttribute("aria-invalid") === "true";
            });

            if (firstBad) {
                box.className = "form-message show error";
                box.removeAttribute("role");
                box.innerHTML = "<strong>Check the fields above.</strong> Name, email, and company are required.";
                firstBad.focus();
                return;
            }

            box.className = "form-message show success";
            box.setAttribute("role", "status");
            box.innerHTML =
                "<strong>This preview does not send.</strong><br><br>" +
                "Your request would go to <a href=\"mailto:info@myshipfront.com\">info@myshipfront.com</a> with Name: " +
                escapeHtml(name.value.trim()) + ", Email: " + escapeHtml(email.value.trim()) + ", Company: " +
                escapeHtml(company.value.trim()) + ".";
            form.reset();
            [name, email, company].forEach(function (field) { setFieldError(field, ""); });
            box.focus();
        });
    }

    document.querySelectorAll("input").forEach(function (input) {
        input.addEventListener("focus", function () {
            this.parentElement.classList.add("focused");
        });
        input.addEventListener("blur", function () {
            this.parentElement.classList.remove("focused");
        });
        input.addEventListener("input", function () {
            if (this.getAttribute("aria-invalid") === "true") {
                setFieldError(this, "");
            }
        });
    });

    const head = document.querySelector(".site-head");
    if (head) {
        const setStuck = function () {
            head.classList.toggle("is-stuck", window.scrollY > 24);
        };
        setStuck();
        window.addEventListener("scroll", setStuck, { passive: true });
    }

    document.querySelectorAll("[data-chip-fold]").forEach(function (fold) {
        const extras = fold.querySelectorAll("[data-extra]");
        const btn = fold.querySelector(".chip-toggle");
        if (!btn || !extras.length) return;
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            const open = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", open ? "false" : "true");
            btn.textContent = open ? "More" : "Less";
            extras.forEach(function (item) { item.hidden = open; });
        });
    });

    const nodes = document.querySelectorAll(".reveal");
    const tiles = document.querySelectorAll(".card");
    const rows = document.querySelectorAll(".why-row");

    if (reduce || !("IntersectionObserver" in window)) {
        nodes.forEach(function (node) { node.classList.add("is-in"); });
        tiles.forEach(function (tile) { tile.classList.add("is-in"); });
        rows.forEach(function (row) { row.classList.add("is-in"); });
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
    rows.forEach(function (row) { io.observe(row); });
    tiles.forEach(function (tile) {
        io.observe(tile);
        const box = tile.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
            tile.classList.add("is-in");
            io.unobserve(tile);
        }
    });

});

function setFieldError(input, message) {
    const err = document.getElementById(input.id + "-error");
    if (!err) return;
    if (message) {
        input.setAttribute("aria-invalid", "true");
        err.textContent = message;
    } else {
        input.removeAttribute("aria-invalid");
        err.textContent = "";
    }
}

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
        target.setAttribute("tabindex", "-1");
        if (reduce || id !== "#why") {
            window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
            target.focus({ preventScroll: true });
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
            else target.focus({ preventScroll: true });
        }
        requestAnimationFrame(step);
    });
});
