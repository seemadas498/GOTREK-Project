document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
});

$(document).ready(function () {
    // Toggle password visibility
    $('#togglePassword').on('click', function () {
        const passwordField = $('#password');
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    $('#toggleConfirmPassword').on('click', function () {
        const confirmPasswordField = $('#confirmPassword');
        const type = confirmPasswordField.attr('type') === 'password' ? 'text' : 'password';
        confirmPasswordField.attr('type', type);
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    // Function to display error message
    function showError(fieldId, message) {
        $('#' + fieldId + 'Error').text(message).show();
    }

    // Function to hide error message
    function hideError(fieldId) {
        $('#' + fieldId + 'Error').text('').hide();
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate phone number format (simple check for digits)
    function isValidPhone(phone) {
        const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        return phoneRegex.test(phone);
    }

    // Function to validate Aadhar file (basic check for size and type)
    function isValidAadhar(fileInput) {
        if (fileInput.files.length === 0) {
            return 'Please upload your Aadhar card.';
        }
        const file = fileInput.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            return 'File size exceeds 5MB.';
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            return 'Only JPG, PNG, and PDF files are allowed.';
        }
        return ''; // No error
    }

    // Real-time validation for input fields
    $('#firstName').on('input', function() {
        const firstName = $(this).val().trim();
        if (firstName.length < 2) {
            showError('firstName', 'First name must be at least 2 characters.');
        } else {
            hideError('firstName');
        }
    });

    $('#lastName').on('input', function() {
        const lastName = $(this).val().trim();
        if (lastName.length < 2) {
            showError('lastName', 'Last name must be at least 2 characters.');
        } else {
            hideError('lastName');
        }
    });

    $('#email').on('input', function() {
        const email = $(this).val().trim();
        if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address.');
        } else {
            hideError('email');
        }
    });

    $('#address').on('input', function() {
        const address = $(this).val().trim();
        if (address.length < 5) {
            showError('address', 'Address must be at least 5 characters.');
        } else {
            hideError('address');
        }
    });

    $('#phone').on('input', function() {
        const phone = $(this).val().trim();
        if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid 10-digit phone number.');
        } else {
            hideError('phone');
        }
    });

    $('#aadhar').on('change', function() {
        const errorMessage = isValidAadhar(this);
        if (errorMessage) {
            showError('aadhar', errorMessage);
        } else {
            hideError('aadhar');
        }
    });

    $('#password').on('input', function() {
        const password = $(this).val();
        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters long.');
        } else {
            hideError('password');
        }
        // Also validate confirm password if password changes
        if ($('#confirmPassword').val() !== '') {
             if (password !== $('#confirmPassword').val()) {
                showError('confirmPassword', 'Passwords do not match.');
            } else {
                hideError('confirmPassword');
            }
        }
    });

    $('#confirmPassword').on('input', function() {
        const password = $('#password').val();
        const confirmPassword = $(this).val();
        if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match.');
        } else {
            hideError('confirmPassword');
        }
    });

    $('#terms').on('change', function() {
        if (!$(this).is(':checked')) {
            showError('terms', 'You must accept the terms and conditions.');
        } else {
            hideError('terms');
        }
    });


    // Form submission validation
    $('#signupForm').on('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Validate First Name
        const firstName = $('#firstName').val().trim();
        if (firstName === '' || firstName.length < 2) {
            showError('firstName', 'First name is required and must be at least 2 characters.');
            isValid = false;
        } else {
            hideError('firstName');
        }

        // Validate Last Name
        const lastName = $('#lastName').val().trim();
        if (lastName === '' || lastName.length < 2) {
            showError('lastName', 'Last name is required and must be at least 2 characters.');
            isValid = false;
        } else {
            hideError('lastName');
        }

        // Validate Email
        const email = $('#email').val().trim();
        if (email === '') {
            showError('email', 'Email address is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError('email');
        }

        // Validate Address
        const address = $('#address').val().trim();
        if (address === '' || address.length < 5) {
            showError('address', 'Address is required and must be at least 5 characters.');
            isValid = false;
        } else {
            hideError('address');
        }

        // Validate Phone Number
        const phone = $('#phone').val().trim();
        if (phone === '') {
            showError('phone', 'Phone number is required.');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid 10-digit phone number.');
            isValid = false;
        } else {
            hideError('phone');
        }

        // Validate Aadhar Upload
        const aadharErrorMessage = isValidAadhar($('#aadhar')[0]); // Pass the DOM element
        if (aadharErrorMessage) {
            showError('aadhar', aadharErrorMessage);
            isValid = false;
        } else {
            hideError('aadhar');
        }

        // Validate Password
        const password = $('#password').val();
        if (password === '') {
            showError('password', 'Password is required.');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters long.');
            isValid = false;
        } else {
            hideError('password');
        }

        // Validate Confirm Password
        const confirmPassword = $('#confirmPassword').val();
        if (confirmPassword === '') {
            showError('confirmPassword', 'Confirm password is required.');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match.');
            isValid = false;
        } else {
            hideError('confirmPassword');
        }

        // Validate Terms and Conditions checkbox
        if (!$('#terms').is(':checked')) {
            showError('terms', 'You must accept the terms and conditions.');
            isValid = false;
        } else {
            hideError('terms');
        }


        if (isValid) {
            // If all validations pass, you can submit the form via AJAX or proceed with normal submission
            alert('Form submitted successfully!'); // Replace with your actual form submission logic (e.g., AJAX call)
            // Example: $(this).off('submit').submit(); // To submit the form normally after validation
        }
    });
});




 document.addEventListener('DOMContentLoaded', function () {
        const loginForm = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const togglePassword = document.getElementById('togglePassword');

        // Function to validate email format
        function isValidEmail(email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        }

        // Event listener for form submission
        loginForm.addEventListener('submit', function (event) {
          event.preventDefault(); // Prevent default form submission

          let isValid = true;

          // Clear previous error messages
          emailError.textContent = '';
          passwordError.textContent = '';
          emailInput.classList.remove('is-invalid');
          passwordInput.classList.remove('is-invalid');

          // Validate Email
          if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email address is required.';
            emailInput.classList.add('is-invalid');
            isValid = false;
          } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('is-invalid');
            isValid = false;
          }

          // Validate Password
          if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required.';
            passwordInput.classList.add('is-invalid');
            isValid = false;
          } else if (passwordInput.value.trim().length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            passwordInput.classList.add('is-invalid');
            isValid = false;
          }

          if (isValid) {
            // If the form is valid, you can proceed with form submission (e.g., via AJAX)
            // For this example, we'll just log a success message and redirect
            console.log('Form submitted successfully!');
            // In a real application, you'd send this data to your server
            window.location.href = './index.html'; // Redirect to index.html on successful login
          }
        });

        // Toggle password visibility
        togglePassword.addEventListener('click', function () {
          const type =
            passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordInput.setAttribute('type', type);

          // Toggle the eye icon
          this.classList.toggle('fa-eye');
          this.classList.toggle('fa-eye-slash');
        });
      });

// carousel part //

 document.addEventListener('DOMContentLoaded', function() {
    const bikeContainers = document.querySelectorAll('.bike-item-container');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    
    // Initialize first card as active
    updateActiveCard();
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex + 1) % bikeContainers.length;
      updateActiveCard();
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex - 1 + bikeContainers.length) % bikeContainers.length;
      updateActiveCard();
    });
    
    // Dot click handlers
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        currentIndex = parseInt(this.getAttribute('data-index'));
        updateActiveCard();
      });
    });
    
    // Update active card and dots
    function updateActiveCard() {
      bikeContainers.forEach((container, index) => {
        if (index === currentIndex) {
          container.classList.add('active');
        } else {
          container.classList.remove('active');
        }
      });
      
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % bikeContainers.length;
      updateActiveCard();
    }, 5000);
  });