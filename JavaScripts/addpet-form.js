function getGiveAwayElements() {
    return [
        document.getElementById('fullName'),
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('address'),
        document.getElementById('petName'),
        document.getElementById('petType'),
        document.getElementById('petAge'),
        document.getElementById('petBreed'),
        // document.getElementById('petFeatures1'),
        // document.getElementById('petFeatures2'),
        // document.getElementById('petFeatures3')
    ];
}
function getFeatures() {
    return [
        document.getElementById('petFeatures1'),
        document.getElementById('petFeatures2'),
        document.getElementById('petFeatures3')
    ];
}

function showError(element, message) {
    element.className = 'error';
    const msg = element.parentElement.querySelector('small');
    msg.textContent = message;
}

function showSuccess(element) {
    element.className = 'success';
    const msg = element.parentElement.querySelector('small');
    msg.textContent = '';
}

function checkEmpty(element) {
    if (!element) return true;
    if (element.value.trim() === '') {
        showError(element, 'This field is required.');
        return false;
    } else {
        showSuccess(element);
        return true;
    }
}

function checkPhone(element) {
    if (!/^\+?\d{10,15}$/.test(element.value.trim().replace(/\D/g, ''))) {
        showError(element, 'Please enter a valid phone number.');
        return false;
    } else {
        showSuccess(element);
        return true;
    }
}

function checkMail(element) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(element.value.trim())) {
        showError(element, 'Enter a valid email address.');
        return false;
    } else {
        showSuccess(element);
        return true;
    }
}

function checkGender() {
    const radios = document.getElementsByName('petGender');
    let checked = false;
    for (let radio of radios) {
        if (radio.checked) checked = true;
    }
    const group = radios[0].parentElement.parentElement;
    if (!checked) {
        showError(group, 'Please select a gender.');
        return false;
    } else {
        const group = radios[0].parentElement.parentElement;
        group.className = '';
        const msg = group.parentElement.querySelector('small');
        msg.textContent = '';
        return true;
    }
}

function checkFeatures(feature) {
    let checked = false;
    if (feature.value.trim()) checked = true;
    const group = feature.parentElement;
    if (!checked) {
        showError(group, 'Please add three features.');
        return false;
    } else {
        showSuccess(group);
        return true;
    }
}

const form = document.getElementById('giveAwayForm');

form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const elements = getGiveAwayElements();
    let isValid = true;

    for (let element of elements) {
        isValid = checkEmpty(element) && isValid;
    }

    // Validate email and phone
    isValid = checkMail(elements[1]) && isValid;
    isValid = checkPhone(elements[2]) && isValid;

    // Validate gender
    isValid = checkGender() && isValid;

    // Validate features
    const features = getFeatures();
    for (let feature of features) {
        isValid = checkFeatures(feature) && isValid;
    }

    if (isValid) {
        alert('Thank you for submitting your give away application! We will review it and contact you soon.');
        form.reset();
    }
});

form?.addEventListener('reset', () => {
    const elements = getGiveAwayElements();
    for (let element of elements) {
        if (!element) continue;
        element.className = '';
        const msg = element.parentElement.querySelector('small');
        msg.textContent = '';
    }
    // Clear gender group error
    const radios = document.getElementsByName('petGender');
    if (radios.length) {
        const group = radios[0].parentElement.parentElement;
        group.className = '';
        const msg = group.parentElement.querySelector('small');
        msg.textContent = '';
    }
    // Clear features group error
    const features = getFeatures();
    for (let feature of features) {
        if (!feature) continue;
        feature.parentElement.className = '';
        const msg = feature.parentElement.parentElement.querySelector('small');
        msg.textContent = '';
    }
});

// Blur validation
{
    const elements = getGiveAwayElements();
    elements.forEach(element => {
        if (!element) return;
        element.addEventListener('blur', () => {
            checkEmpty(element);
            if (element.id === 'email') checkMail(element);
            if (element.id === 'phone') checkPhone(element);
        });
    });
    // Gender change
    const radios = document.getElementsByName('petGender');
    radios.forEach(radio => {
        radio.addEventListener('change', checkGender);
    });
    // Features change
    const features = getFeatures();
    features.forEach(feature => {
        feature.addEventListener('blur', () => {
            checkFeatures(feature);
        });
    });
}