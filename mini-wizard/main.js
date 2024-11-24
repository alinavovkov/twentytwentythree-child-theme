
    function validateName(name) {
        const regex = /^[A-Za-z\s]+$/; 
        return regex.test(name);
    }

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /^\d{10,12}$/; 
        return regex.test(phone);
    }

    function updateFieldValidation(fieldId, isValid, feedbackId, errorMessage, validFeedbackId) {
        const field = document.getElementById(fieldId);
        const feedback = document.getElementById(feedbackId);
        const validFeedback = document.getElementById(validFeedbackId);
        
        if (isValid) {
            feedback.style.display = 'none';
            validFeedback.style.display = 'none';
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            validFeedback.style.display = 'none';
            feedback.textContent = errorMessage;
            feedback.style.display = 'none';
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
        }
    }

    document.getElementById('name').addEventListener('input', function() {
        const name = this.value;
        const isValid = validateName(name);
        updateFieldValidation('name', isValid, 'name-feedback', 'Name must contain only letters and spaces.', 'name-valid-feedback');
    });

    document.getElementById('email').addEventListener('input', function() {
        const email = this.value;
        const isValid = validateEmail(email);
        updateFieldValidation('email', isValid, 'email-feedback', 'Please enter a valid email address.', 'email-valid-feedback');
    });

    document.getElementById('phone').addEventListener('input', function() {
        const phone = this.value;
        const isValid = validatePhone(phone);
        updateFieldValidation('phone', isValid, 'phone-feedback', 'Phone must contain only digits and be 10-12 characters long.', 'phone-valid-feedback');
    });

    document.getElementById('nextStep').addEventListener('click', function() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;

        if (!validateName(name)) {
            document.getElementById('name-feedback').style.display = 'block';
            return;
        }

        if (!validateEmail(email)) {
            document.getElementById('email-feedback').style.display = 'block';
            return;
        }

        if (!validatePhone(phone)) {
            document.getElementById('phone-feedback').style.display = 'block';
            return;
        }

        document.getElementById('step-1').classList.remove('active');
        document.getElementById('step-2').classList.add('active');
        document.getElementById('step-1').style.display = 'none';
        document.getElementById('step-2').style.display = 'block';
        updateStepNavigation(2);  
    });

    document.getElementById('nextStep2').addEventListener('click', function() {
        document.getElementById('step-2').classList.remove('active');
        document.getElementById('step-3').classList.add('active');
        document.getElementById('step-2').style.display = 'none';
        document.getElementById('step-3').style.display = 'block';
        updateStepNavigation(3);  
    });

    document.getElementById('nextStep3').addEventListener('click', function() {
        document.getElementById('step-3').classList.remove('active');
        document.getElementById('step-4').classList.add('active');
        document.getElementById('step-3').style.display = 'none';
        document.getElementById('step-4').style.display = 'block';
        updateStepNavigation(4);  
    });

    function updateStepNavigation(step) {
        for (let i = 1; i <= 4; i++) {
            const stepNav = document.getElementById(`step${i}-nav`);
            if (i === step) {
                stepNav.classList.add('active');
            } else {
                stepNav.classList.remove('active');
            }
        }
    }