document.getElementById('adoptionForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const petId = document.getElementById('petId').value;
    const reason = document.getElementById('reason').value.trim();

    // Validation
    if (!fullName || !email || !phone || !address || !petId || !reason) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!/^\+?\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Simulate form submission
    alert('Thank you for your adoption application! We will review it and contact you soon.');
    document.getElementById('adoptionForm').reset();
});

function addPetIds(){
    const petSelect = document.getElementById('petId');

    petSelect.innerHTML = '<option value="">Select a Pet</option>'

    pets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.id;
        option.textContent = `${pet.name}(${pet.type})`;
        petSelect.appendChild(option);
    });
}

// Preselect pet based on query parameter
document.addEventListener('DOMContentLoaded', () => {
    addPetIds()
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('petId');
    if (petId) {
        const petSelect = document.getElementById('petId');
        petSelect.value = petId;
    }
});