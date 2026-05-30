const webhookUrl = 'https://hook.eu1.make.com/gchvwboxdsxg86w42klumpvpv3wtx1jy';

const form = document.getElementById('complaintForm');
const imageInput = document.getElementById('image');
const successMessage = document.getElementById('successMessage');

if (form) {
    form.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    clearErrors();

    if (!validateForm()) {
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        const formData = new FormData();
        formData.append('fullName', document.getElementById('fullName').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('description', document.getElementById('description').value);

        if (imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            mode: 'cors',
            body: formData,
        });

        const responseText = await response.text();
        if (response.ok) {
            showSuccessMessage();
            form.reset();
            submitBtn.textContent = 'Submit Complaint';
        } else {
            console.error('Webhook error:', response.status, responseText);
            alert(`An error occurred (${response.status}). Please try again.`);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert(`A network error occurred: ${error.message}`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Complaint';
    }
}

function validateForm() {
    let isValid = true;

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const description = document.getElementById('description').value.trim();

    if (fullName.length < 2) {
        showError('errorFullName', 'Please enter a valid full name');
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('errorEmail', 'Please enter a valid email address');
        isValid = false;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showError('errorPhone', 'Please enter a valid phone number');
        isValid = false;
    }

    if (description.length < 10) {
        showError('errorDescription', 'Please enter a complaint description');
        isValid = false;
    }

    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];

        if (file.size > 5 * 1024 * 1024) {
            showError('errorImage', 'File size exceeds 5MB. Please choose a smaller image.');
            isValid = false;
        }

        if (!file.type.startsWith('image/')) {
            showError('errorImage', 'Only image files are supported');
            isValid = false;
        }
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.textContent = '');
}

function showSuccessMessage() {
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}
