/**
 * Form validation and performance monitoring JavaScript
 * Loaded asynchronously for better page load performance
 */

(function() {
    'use strict';
    
    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
                console.log('Navigation timing:', {
                    'DNS Lookup': entry.domainLookupEnd - entry.domainLookupStart,
                    'TCP Connection': entry.connectEnd - entry.connectStart,
                    'Server Response': entry.responseEnd - entry.requestStart,
                    'DOM Processing': entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
                    'Page Load': entry.loadEventEnd - entry.loadEventStart
                });
            }
        }
    });
    
    if ('PerformanceObserver' in window) {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    }
    
    // Form validation
    class FormValidator {
        constructor(formId) {
            this.form = document.getElementById(formId);
            this.init();
        }
        
        init() {
            if (!this.form) return;
            
            this.setupValidation();
            this.setupRealTimeValidation();
            this.setupPasswordStrength();
        }
        
        setupValidation() {
            this.form.addEventListener('submit', (e) => {
                if (!this.validateForm()) {
                    e.preventDefault();
                    this.showErrors();
                }
            });
        }
        
        setupRealTimeValidation() {
            const inputs = this.form.querySelectorAll('input[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
        
        setupPasswordStrength() {
            const passwordInput = this.form.querySelector('#psw');
            if (passwordInput) {
                passwordInput.addEventListener('input', (e) => {
                    this.updatePasswordStrength(e.target.value);
                });
            }
        }
        
        validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';
            
            // Remove existing error styling
            this.clearFieldError(field);
            
            // Required field validation
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            }
            
            // Pattern validation
            if (field.hasAttribute('pattern') && value) {
                const pattern = new RegExp(field.getAttribute('pattern'));
                if (!pattern.test(value)) {
                    isValid = false;
                    errorMessage = field.getAttribute('title') || 'Invalid format';
                }
            }
            
            // Email validation
            if (field.type === 'email' && value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            }
            
            // Password confirmation validation
            if (field.id === 'psw-repeat') {
                const password = this.form.querySelector('#psw').value;
                if (value !== password) {
                    isValid = false;
                    errorMessage = 'Passwords do not match';
                }
            }
            
            if (!isValid) {
                this.showFieldError(field, errorMessage);
            }
            
            return isValid;
        }
        
        validateForm() {
            const requiredFields = this.form.querySelectorAll('input[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }
        
        showFieldError(field, message) {
            field.classList.add('error');
            
            // Create or update error message
            let errorElement = field.parentNode.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
        }
        
        clearFieldError(field) {
            field.classList.remove('error');
            const errorElement = field.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
        
        showErrors() {
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
        
        updatePasswordStrength(password) {
            let strength = 0;
            let feedback = '';
            
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[@$!%*?&]/.test(password)) strength++;
            
            switch (strength) {
                case 0:
                case 1:
                    feedback = 'Very Weak';
                    break;
                case 2:
                    feedback = 'Weak';
                    break;
                case 3:
                    feedback = 'Fair';
                    break;
                case 4:
                    feedback = 'Good';
                    break;
                case 5:
                    feedback = 'Strong';
                    break;
            }
            
            // Update password strength indicator if it exists
            let strengthIndicator = document.getElementById('password-strength');
            if (!strengthIndicator) {
                strengthIndicator = document.createElement('div');
                strengthIndicator.id = 'password-strength';
                strengthIndicator.style.cssText = 'margin-top: 0.5rem; font-size: 0.875rem;';
                const passwordField = this.form.querySelector('#psw');
                passwordField.parentNode.appendChild(strengthIndicator);
            }
            
            strengthIndicator.textContent = `Password Strength: ${feedback}`;
            strengthIndicator.style.color = strength < 3 ? '#dc3545' : strength < 4 ? '#ffc107' : '#28a745';
        }
    }
    
    // Initialize form validation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new FormValidator('registrationForm');
        });
    } else {
        new FormValidator('registrationForm');
    }
    
    // Service Worker registration for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
})();