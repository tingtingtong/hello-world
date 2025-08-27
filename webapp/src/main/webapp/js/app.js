/**
 * Optimized JavaScript for Registration Form
 * Features: Form validation, performance optimizations, modern ES6+ syntax
 */

// Use strict mode for better performance and error catching
'use strict';

// DOM Content Loaded with performance optimization
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements for better performance
  const form = document.querySelector('form');
  const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
  const submitBtn = document.querySelector('.registerbtn');
  
  // Form validation configuration
  const validators = {
    name: {
      pattern: /^[a-zA-Z\s]{2,50}$/,
      message: 'Name must be 2-50 characters, letters and spaces only'
    },
    mobile: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Please enter a valid mobile number'
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    password: {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
      message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
    }
  };

  // Performance optimization: Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Form validation function
  const validateField = (input) => {
    const fieldName = input.name.toLowerCase();
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error messages
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Required field validation
    if (!value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (validators[fieldName]) {
      // Pattern validation
      if (!validators[fieldName].pattern.test(value)) {
        isValid = false;
        errorMessage = validators[fieldName].message;
      }
    }

    // Special validation for password repeat
    if (fieldName === 'psw-repeat') {
      const password = document.querySelector('input[name="psw"]').value;
      if (value !== password) {
        isValid = false;
        errorMessage = 'Passwords do not match';
      }
    }

    // Display error message if validation fails
    if (!isValid) {
      showError(input, errorMessage);
    } else {
      input.classList.remove('error');
      input.classList.add('valid');
    }

    return isValid;
  };

  // Show error message
  const showError = (input, message) => {
    input.classList.add('error');
    input.classList.remove('valid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  };

  // Debounced validation for better performance
  const debouncedValidation = debounce((input) => {
    validateField(input);
  }, 300);

  // Add event listeners with performance optimizations
  inputs.forEach(input => {
    // Use input event for real-time validation
    input.addEventListener('input', () => {
      debouncedValidation(input);
    });

    // Use blur event for immediate validation on field exit
    input.addEventListener('blur', () => {
      validateField(input);
    });

    // Use focus event to remove error styling
    input.addEventListener('focus', () => {
      input.classList.remove('error');
      const errorMessage = input.parentNode.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    });
  });

  // Form submission with validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Processing...';
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Simulate form submission (replace with actual submission logic)
      setTimeout(() => {
        showSuccess();
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Register';
      }, 1500);
    } else {
      // Remove loading state if validation fails
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Register';
      
      // Scroll to first error
      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Success message display
  const showSuccess = () => {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <div style="text-align: center; padding: 20px; background: #f0fff4; border: 1px solid #68d391; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #38a169; margin-bottom: 10px;">Registration Successful!</h3>
        <p style="color: #2f855a;">Thank you for registering. You will receive a confirmation email shortly.</p>
      </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Performance optimization: Intersection Observer for lazy loading
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe form elements for animation
    const formElements = document.querySelectorAll('.container, input, .registerbtn');
    formElements.forEach(el => observer.observe(el));
  }

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .container, input, .registerbtn {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
    }
    
    .visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .success-message {
      animation: slideIn 0.5s ease-out;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

// Service Worker registration for offline support and caching
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