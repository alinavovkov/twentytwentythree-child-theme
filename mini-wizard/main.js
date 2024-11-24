
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

function validateQuantity(quantity) {
    const regex = /^[1-9]?\d{1,3}$/;
    return regex.test(quantity);

}

function updateFieldValidation(fieldId, isValid, feedbackId, validFeedbackId) {
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
        feedback.style.display = 'none';
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    }
}

function calculatePrice(quantity) {
    let price = 0;
    if (quantity >= 1 && quantity <= 10) {
        price = 10;
    } else if (quantity >= 11 && quantity <= 100) {
        price = 10;
    } else if (quantity >= 101 && quantity <= 1000) {
        price = 1000;
    }
    return price;
}

document.getElementById('name').addEventListener('input', function () {
    const name = this.value;
    const isValid = validateName(name);
    updateFieldValidation('name', isValid, 'name-feedback', 'name-valid-feedback');
});

document.getElementById('email').addEventListener('input', function () {
    const email = this.value;
    const isValid = validateEmail(email);
    updateFieldValidation('email', isValid, 'email-feedback', 'email-valid-feedback');
});

document.getElementById('phone').addEventListener('input', function () {
    const phone = this.value;
    const isValid = validatePhone(phone);
    updateFieldValidation('phone', isValid, 'phone-feedback', 'phone-valid-feedback');
});

document.getElementById('quantity').addEventListener('input', function () {
    const quantity = this.value;
    const regex = /^[1-9]?\d{1,3}$/;
    const isValid = regex.test(quantity) && Number(quantity) <= 1000;
    updateFieldValidation('quantity', isValid, 'quantity-feedback', 'quantity-valid-feedback');
});

document.getElementById('nextStep').addEventListener('click', function () {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    if (!validateName(name)) {
        return;
    }

    if (!validateEmail(email)) {
        return;
    }

    if (!validatePhone(phone)) {
        return;
    }

    document.getElementById('step-1').classList.remove('active');
    document.getElementById('step-2').classList.add('active');
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    updateStepNavigation(2);
});

document.getElementById('nextStep2').addEventListener('click', function () {
    var quantity = document.getElementById('quantity').value;
    if (!validateQuantity(quantity)) {
        return;
    }
    const price = calculatePrice(quantity);
    document.getElementById('price').innerHTML = `$${price}`;
    document.getElementById('step-2').classList.remove('active');
    document.getElementById('step-3').classList.add('active');
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';
    updateStepNavigation(3);
});

document.getElementById('prevStep3').addEventListener('click', function () {
    document.getElementById('step-3').classList.remove('active');
    document.getElementById('step-2').classList.add('active');
    document.getElementById('step-3').style.display = 'none';
    document.getElementById('step-2').style.display = 'block';
    updateStepNavigation(2);
});

document.getElementById('nextStep3').addEventListener('click', function () {


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