// Performance-optimized JavaScript
(function() {
    'use strict';
    
    // DOM elements cache
    const elements = {};
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Initialize app when DOM is ready
    function init() {
        cacheElements();
        bindEvents();
        setupValidation();
        setupPasswordToggle();
    }
    
    // Cache DOM elements for better performance
    function cacheElements() {
        elements.form = document.getElementById('registrationForm');
        elements.inputs = document.querySelectorAll('input[required]');
        elements.submitBtn = document.querySelector('.btn-primary');
        elements.passwordField = document.getElementById('psw');
        elements.confirmPasswordField = document.getElementById('psw-repeat');
        elements.successMessage = document.querySelector('.success-message');
        elements.formWrapper = document.querySelector('.form-wrapper');
    }
    
    // Bind event listeners
    function bindEvents() {
        if (elements.form) {
            elements.form.addEventListener('submit', handleSubmit);
        }
        
        // Real-time validation
        elements.inputs.forEach(input => {
            input.addEventListener('blur', debounce(validateField, 300));
            input.addEventListener('input', debounce(clearErrors, 100));
        });
        
        // Password confirmation
        if (elements.confirmPasswordField) {
            elements.confirmPasswordField.addEventListener('input', 
                debounce(validatePasswordMatch, 300));
        }
    }
    
    // Setup form validation
    function setupValidation() {
        // Email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', debounce(validateEmail, 300));
        }
        
        // Mobile validation
        const mobileField = document.getElementById('mobile');
        if (mobileField) {
            mobileField.addEventListener('input', debounce(validateMobile, 300));
        }
    }
    
    // Password visibility toggle (optional enhancement)
    function setupPasswordToggle() {
        // Can be enhanced with password visibility toggle
    }
    
    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateAllFields()) {
            return false;
        }
        
        showLoading();
        
        // Simulate API call (replace with actual endpoint)
        setTimeout(() => {
            hideLoading();
            showSuccess();
        }, 1500);
    }
    
    // Validate individual field
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        clearFieldError(field);
        
        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        switch (field.type) {
            case 'email':
                return validateEmail(e);
            case 'tel':
                return validateMobile(e);
            case 'password':
                return validatePassword(field);
            default:
                return true;
        }
    }
    
    // Email validation
    function validateEmail(e) {
        const field = e.target || e;
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    // Mobile validation
    function validateMobile(e) {
        const field = e.target || e;
        const mobile = field.value.trim();
        const mobileRegex = /^[0-9]{10,15}$/;
        
        if (!mobileRegex.test(mobile)) {
            showFieldError(field, 'Please enter a valid mobile number');
            return false;
        }
        
        return true;
    }
    
    // Password validation
    function validatePassword(field) {
        const password = field.value;
        
        if (password.length < 8) {
            showFieldError(field, 'Password must be at least 8 characters long');
            return false;
        }
        
        return true;
    }
    
    // Password match validation
    function validatePasswordMatch() {
        const password = elements.passwordField.value;
        const confirmPassword = elements.confirmPasswordField.value;
        
        if (confirmPassword && password !== confirmPassword) {
            showFieldError(elements.confirmPasswordField, 'Passwords do not match');
            return false;
        }
        
        clearFieldError(elements.confirmPasswordField);
        return true;
    }
    
    // Validate all fields
    function validateAllFields() {
        let isValid = true;
        
        elements.inputs.forEach(input => {
            const mockEvent = { target: input };
            if (!validateField(mockEvent)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.parentNode.classList.add('has-error');
    }
    
    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('error');
        field.parentNode.classList.remove('has-error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    // Clear all errors
    function clearErrors(e) {
        clearFieldError(e.target);
    }
    
    // Show loading state
    function showLoading() {
        elements.submitBtn.disabled = true;
        elements.form.classList.add('loading');
    }
    
    // Hide loading state
    function hideLoading() {
        elements.submitBtn.disabled = false;
        elements.form.classList.remove('loading');
    }
    
    // Show success message
    function showSuccess() {
        elements.formWrapper.style.display = 'none';
        elements.successMessage.style.display = 'block';
        
        // Scroll to success message
        elements.successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    // Global functions for onclick handlers
    window.showTerms = function() {
        // Can be enhanced with modal or redirect
        alert('Terms & Privacy Policy would be shown here');
    };
    
    window.showSignIn = function() {
        // Can be enhanced with redirect to sign-in page
        alert('Sign-in functionality would redirect here');
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();