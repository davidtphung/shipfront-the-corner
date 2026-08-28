document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quote-form');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formMessage = document.getElementById('form-message');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;

            if (name && email && company) {
                formMessage.className = 'form-message show';
                formMessage.innerHTML = [
                    '<strong>This preview does not send.</strong><br><br>',
                    'Your request would be sent to <a href="mailto:info@myshipfront.com">info@myshipfront.com</a> with the following details:<br><br>',
                    'Name: ' + escapeHtml(name) + '<br>',
                    'Email: ' + escapeHtml(email) + '<br>',
                    'Company: ' + escapeHtml(company)
                ].join('');

                quoteForm.reset();
            } else {
                formMessage.className = 'form-message show';
                formMessage.innerHTML = '<strong>Please fill out all fields.</strong>';
            }
        });
    }
});

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    });
});
