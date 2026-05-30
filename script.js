// Translations
const translations = {
    en: {
        title: "Report a Complaint",
        subtitle: "Help us improve our city by reporting issues",
        languageLabel: "Language:",
        labelFullName: "Full Name",
        placeholderFullName: "Enter your full name",
        labelEmail: "Email Address",
        placeholderEmail: "your@email.com",
        labelPhone: "Phone Number",
        placeholderPhone: "+1 (555) 000-0000",
        labelDescription: "Complaint Description",
        placeholderDescription: "Please describe the issue in detail...",
        labelImage: "Attach Image (Optional)",
        helpImage: "Supported formats: JPG, PNG, GIF (Max 5MB)",
        submitBtn: "Submit Complaint",
        successText: "Thank you! Your complaint has been submitted successfully.",
        errorFullName: "Please enter a valid full name",
        errorEmail: "Please enter a valid email address",
        errorPhone: "Please enter a valid phone number",
        errorDescription: "Please enter a complaint description",
        errorImage: "File size exceeds 5MB. Please choose a smaller image.",
        errorImageFormat: "Only image files are supported",
    },
    es: {
        title: "Reportar una Queja",
        subtitle: "Ayúdanos a mejorar nuestra ciudad informando problemas",
        languageLabel: "Idioma:",
        labelFullName: "Nombre Completo",
        placeholderFullName: "Ingrese su nombre completo",
        labelEmail: "Dirección de Correo Electrónico",
        placeholderEmail: "su@correo.com",
        labelPhone: "Número de Teléfono",
        placeholderPhone: "+1 (555) 000-0000",
        labelDescription: "Descripción de la Queja",
        placeholderDescription: "Por favor, describa el problema en detalle...",
        labelImage: "Adjuntar Imagen (Opcional)",
        helpImage: "Formatos admitidos: JPG, PNG, GIF (Máx 5MB)",
        submitBtn: "Enviar Queja",
        successText: "¡Gracias! Su queja ha sido enviada exitosamente.",
        errorFullName: "Por favor, ingrese un nombre completo válido",
        errorEmail: "Por favor, ingrese una dirección de correo válida",
        errorPhone: "Por favor, ingrese un número de teléfono válido",
        errorDescription: "Por favor, ingrese una descripción de queja",
        errorImage: "El tamaño del archivo excede 5MB. Por favor, elija una imagen más pequeña.",
        errorImageFormat: "Solo se admiten archivos de imagen",
    },
    zh: {
        title: "提交投诉",
        subtitle: "通过报告问题帮助我们改善城市",
        languageLabel: "语言:",
        labelFullName: "全名",
        placeholderFullName: "输入您的全名",
        labelEmail: "电子邮件地址",
        placeholderEmail: "您的@邮箱.com",
        labelPhone: "电话号码",
        placeholderPhone: "+1 (555) 000-0000",
        labelDescription: "投诉说明",
        placeholderDescription: "请详细描述问题...",
        labelImage: "上传图片（可选）",
        helpImage: "支持格式：JPG、PNG、GIF（最大5MB）",
        submitBtn: "提交投诉",
        successText: "感谢您！您的投诉已成功提交。",
        errorFullName: "请输入有效的全名",
        errorEmail: "请输入有效的电子邮件地址",
        errorPhone: "请输入有效的电话号码",
        errorDescription: "请输入投诉说明",
        errorImage: "文件大小超过5MB。请选择较小的图片。",
        errorImageFormat: "仅支持图像文件",
    }
};

// Current language
let currentLanguage = 'en';

// DOM Elements
const languageSelect = document.getElementById('language');
const form = document.getElementById('complaintForm');
const imageInput = document.getElementById('image');
const successMessage = document.getElementById('successMessage');

// Language change event
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    updateLanguage();
});

// Update UI based on language
function updateLanguage() {
    const trans = translations[currentLanguage];
    
    document.getElementById('title').textContent = trans.title;
    document.getElementById('subtitle').textContent = trans.subtitle;
    document.getElementById('languageLabel').textContent = trans.languageLabel;
    
    document.getElementById('labelFullName').textContent = trans.labelFullName;
    document.getElementById('fullName').placeholder = trans.placeholderFullName;
    
    document.getElementById('labelEmail').textContent = trans.labelEmail;
    document.getElementById('email').placeholder = trans.placeholderEmail;
    
    document.getElementById('labelPhone').textContent = trans.labelPhone;
    document.getElementById('phone').placeholder = trans.placeholderPhone;
    
    document.getElementById('labelDescription').textContent = trans.labelDescription;
    document.getElementById('description').placeholder = trans.placeholderDescription;
    
    document.getElementById('labelImage').textContent = trans.labelImage;
    document.getElementById('helpImage').textContent = trans.helpImage;
    
    document.getElementById('submitBtn').textContent = trans.submitBtn;
}

// Form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Disable submit button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        // Prepare form data
        const formData = new FormData();
        formData.append('fullName', document.getElementById('fullName').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('language', currentLanguage);
        
        // Add image if present
        if (imageInput.files.length > 0) {
            formData.append('image', imageInput.files[0]);
        }
        
        // Send to webhook (via Make.com or your API)
        // Replace with your actual webhook URL
        const webhookUrl = 'https://hook.eu1.make.com/gchvwboxdsxg86w42klumpvpv3wtx1jy';
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData,
        });
        
        if (response.ok) {
            // Show success message
            showSuccessMessage();
            form.reset();
            languageSelect.value = 'en';
            currentLanguage = 'en';
            updateLanguage();
        } else {
            alert('An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        const trans = translations[currentLanguage];
        submitBtn.textContent = trans.submitBtn;
    }
}

// Validate form fields
function validateForm() {
    const trans = translations[currentLanguage];
    let isValid = true;
    
    // Full Name
    const fullName = document.getElementById('fullName').value.trim();
    if (fullName.length < 2) {
        showError('errorFullName', trans.errorFullName);
        isValid = false;
    }
    
    // Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('errorEmail', trans.errorEmail);
        isValid = false;
    }
    
    // Phone
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showError('errorPhone', trans.errorPhone);
        isValid = false;
    }
    
    // Description
    const description = document.getElementById('description').value.trim();
    if (description.length < 10) {
        showError('errorDescription', trans.errorDescription);
        isValid = false;
    }
    
    // Image validation
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        
        // Check file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            showError('errorImage', trans.errorImage);
            isValid = false;
        }
        
        // Check file type
        if (!file.type.startsWith('image/')) {
            showError('errorImage', trans.errorImageFormat);
            isValid = false;
        }
    }
    
    return isValid;
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.textContent = '');
}

// Show success message
function showSuccessMessage() {
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// Initialize language on page load
window.addEventListener('load', () => {
    updateLanguage();
});
