// THE CORNER - Shipfront Terminal
// Rho craft map: critically damped springs (bounce 0, response 0.3-0.4), no bounce, no glass

// Critically damped spring (damping 1.0, response 0.3-0.4)
class Spring {
    constructor(response = 0.35) {
        this.damping = 1.0;
        this.response = response;
        this.velocity = 0;
        this.value = 0;
        this.target = 0;
    }

    update(deltaTime) {
        const omega = 2 * Math.PI / this.response;
        const displacement = this.value - this.target;
        
        const springForce = -omega * omega * displacement;
        const dampingForce = -2 * omega * this.velocity;
        const acceleration = springForce + dampingForce;
        
        this.velocity += acceleration * deltaTime;
        this.value += this.velocity * deltaTime;
        
        return Math.abs(this.velocity) > 0.001 || Math.abs(displacement) > 0.001;
    }

    setTarget(target, velocity = 0) {
        this.target = target;
        if (velocity !== 0) {
            this.velocity = velocity;
        }
    }
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const quoteForm = document.getElementById('quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('form-message');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            
            if (name && email && company) {
                formMessage.className = 'form-message show success';
                formMessage.innerHTML = `
                    <strong>This preview does not send.</strong><br><br>
                    Your request would be sent to <a href="mailto:info@myshipfront.com" style="color: #FF6A00;">info@myshipfront.com</a> with the following details:<br><br>
                    Name: ${escapeHtml(name)}<br>
                    Email: ${escapeHtml(email)}<br>
                    Company: ${escapeHtml(company)}
                `;
                
                quoteForm.reset();
            } else {
                formMessage.className = 'form-message show';
                formMessage.innerHTML = '<strong>Please fill out all fields.</strong>';
            }
        });
    }

    // CTA pointer-down feedback with critically damped spring (bounce 0, response 0.3-0.4)
    document.querySelectorAll('.cta-button, button[type="submit"]').forEach(button => {
        if (prefersReducedMotion) {
            // Reduced motion: instant opacity change
            button.addEventListener('pointerdown', function() {
                this.style.opacity = '0.85';
            });
            button.addEventListener('pointerup', function() {
                this.style.opacity = '1';
            });
            button.addEventListener('pointerleave', function() {
                this.style.opacity = '1';
            });
        } else {
            // Full motion: critically damped spring
            let animationId = null;
            const scaleSpring = new Spring(0.35);
            scaleSpring.value = 1.0;
            scaleSpring.target = 1.0;

            function animate() {
                const deltaTime = 1 / 60;
                const needsUpdate = scaleSpring.update(deltaTime);
                button.style.transform = `scale(${scaleSpring.value})`;

                if (needsUpdate) {
                    animationId = requestAnimationFrame(animate);
                } else {
                    animationId = null;
                }
            }

            button.addEventListener('pointerdown', function() {
                scaleSpring.setTarget(0.97);
                if (!animationId) {
                    animationId = requestAnimationFrame(animate);
                }
            });

            button.addEventListener('pointerup', function() {
                scaleSpring.setTarget(1.0);
                if (!animationId) {
                    animationId = requestAnimationFrame(animate);
                }
            });

            button.addEventListener('pointerleave', function() {
                scaleSpring.setTarget(1.0);
            });

            button.addEventListener('pointercancel', function() {
                scaleSpring.setTarget(1.0);
            });
        }
    });

    // Card interactions - 80ms card focus, no spring on stills
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // 80ms cross-fade only, no spring on stills
        card.addEventListener('pointerenter', function() {
            const overlay = this.querySelector('.card-overlay');
            if (overlay) overlay.style.opacity = '1';
        });

        card.addEventListener('pointerleave', function() {
            const overlay = this.querySelector('.card-overlay');
            if (overlay) overlay.style.opacity = '0';
        });

        card.addEventListener('focus', function() {
            const overlay = this.querySelector('.card-overlay');
            if (overlay) overlay.style.opacity = '1';
        });

        card.addEventListener('blur', function() {
            const overlay = this.querySelector('.card-overlay');
            if (overlay) overlay.style.opacity = '0';
        });
    });

    // Form input focus feedback
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Helper function to escape HTML
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

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
            
            if (target.hasAttribute('tabindex')) {
                target.focus();
            }
        }
    });
});
