// THE CORNER - capability tiles. 80ms rest-is-image dissolve, pointer-down press,
// critically damped settle on release. Transitions only, so every move is
// interruptible from its live presentation value. No spring library, no GSAP.

document.addEventListener("DOMContentLoaded", function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduce) {
        document.documentElement.classList.add("js-motion");
    }

    bindPress();
    bindHead();
    bindForm();
    bindEnter(reduce);
});

/* Feedback lands on pointer-down, never on click. Release drops the class and the
   element springs back from wherever the scale currently sits, so a drag off the
   target or a second press mid-settle both read as one continuous move. */
function bindPress() {
    const targets = ".cta, button[type=\"submit\"], .cap-tile, .still-plate";
    let held = null;

    const release = function () {
        if (!held) return;
        held.classList.remove("is-press");
        held = null;
    };

    const take = function (node) {
        if (held === node) return;
        release();
        if (!node) return;
        held = node;
        node.classList.add("is-press");
    };

    document.addEventListener("pointerdown", function (e) {
        take(e.target.closest(targets));
    }, { passive: true });

    document.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("blur", release);

    // A pointer that slides off the target mid-press has to let go of the bite.
    document.addEventListener("pointermove", function (e) {
        if (held && !held.contains(e.target)) release();
    }, { passive: true });

    // Keyboard activation gets the same bite, so Enter and a click feel alike.
    document.addEventListener("keydown", function (e) {
        const hit = e.target.closest(targets);
        if (!hit) return;
        const isButton = hit.tagName === "BUTTON";
        if (e.key === "Enter" || (isButton && e.key === " ")) take(hit);
    });

    document.addEventListener("keyup", release);
}

function bindHead() {
    const head = document.querySelector(".site-head");
    if (!head) return;

    const setStuck = function () {
        head.classList.toggle("is-stuck", window.scrollY > 24);
    };

    setStuck();
    window.addEventListener("scroll", setStuck, { passive: true });
}

/* The confirmation is a sheet. It enters and exits along the same path, damping 1.0,
   and a keystroke in any field sends the stale panel back out the way it came. */
function openSheet(box) {
    box.classList.add("show");
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            box.classList.add("is-open");
        });
    });
}

function closeSheet(box) {
    if (!box.classList.contains("show")) return;
    box.classList.remove("is-open");
    const done = function (e) {
        if (e && e.propertyName !== "opacity") return;
        box.classList.remove("show", "error", "success");
        box.innerHTML = "";
        box.removeEventListener("transitionend", done);
    };
    box.addEventListener("transitionend", done);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) done();
}

function bindForm() {
    const form = document.getElementById("quote-form");

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
            const box = document.getElementById("form-message");
            if (box && box.classList.contains("success")) closeSheet(box);
        });
    });

    if (!form) return;

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

        // A panel that is already up swaps its copy in place. It does not blink out.
        const open = box.classList.contains("is-open") ? " show is-open" : "";

        if (firstBad) {
            box.className = "form-message error" + open;
            box.removeAttribute("role");
            box.innerHTML = "<strong>Check the fields above.</strong> Name, email, and company are required.";
            openSheet(box);
            firstBad.focus();
            return;
        }

        box.className = "form-message success" + open;
        box.setAttribute("role", "status");
        box.innerHTML =
            "<strong>This preview does not send.</strong><br><br>" +
            "Your request would go to <a href=\"mailto:info@myshipfront.com\">info@myshipfront.com</a> with Name: " +
            escapeHtml(name.value.trim()) + ", Email: " + escapeHtml(email.value.trim()) + ", Company: " +
            escapeHtml(company.value.trim()) + ".";
        openSheet(box);
        form.reset();
        [name, email, company].forEach(function (field) { setFieldError(field, ""); });
        box.focus();
    });
}

/* Section enter, swept off scroll rather than watched by an IntersectionObserver.
   An observer never reports a section that a jump scroll skipped over, and a section
   that is never reported sits at opacity 0 forever. A sweep marks anything whose top
   has crossed the line, including anything already above the fold. */
function bindEnter(reduce) {
    const nodes = [].slice.call(document.querySelectorAll(".reveal, .cap-tile, .pitch-item, .why-row"));

    /* Once a tile has finished arriving it is marked is-set, which drops the enter
       stagger so a press never waits on the enter timeline before it springs back. */
    const settle = function (node) {
        if (!node.classList.contains("cap-tile")) return;
        node.addEventListener("transitionend", function (e) {
            if (e.propertyName === "opacity") node.classList.add("is-set");
        });
        setTimeout(function () { node.classList.add("is-set"); }, 1600);
    };

    if (reduce) {
        nodes.forEach(function (node) { node.classList.add("is-in", "is-set"); });
        return;
    }

    nodes.forEach(settle);

    let pending = nodes.slice();
    let queued = false;

    const sweep = function () {
        queued = false;
        const line = window.innerHeight * 0.92;
        pending = pending.filter(function (node) {
            if (node.getBoundingClientRect().top >= line) return true;
            node.classList.add("is-in");
            return false;
        });
        if (pending.length) return;
        window.removeEventListener("scroll", request);
        window.removeEventListener("resize", request);
    };

    const request = function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(sweep);
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    window.addEventListener("load", request);
    sweep();
}

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
        window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
        target.focus({ preventScroll: true });
    });
});
