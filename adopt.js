// Sample pet data (expanded for variety)
const pets = [
    { id: 1, name: "Luna", type: "Dog", age: "2 years", gender: "Female", image: "images/dog2.jpg" },
    { id: 2, name: "Milo", type: "Cat", age: "1 year", gender: "Male", image: "images/cat2.jpg" },
    { id: 3, name: "Bella", type: "Dog", age: "3 years", gender: "Female", image: "images/dog1.jpg" },
    { id: 4, name: "Oliver", type: "Cat", age: "2 years", gender: "Male", image: "images/cat1.jpg" },
    { id: 5, name: "Hirushan", type: "Dog", age: "1 year", gender: "Male", image: "images/hirushan.jpg" },
    { id: 6, name: "Sophie", type: "Cat", age: "4 years", gender: "Female", image: "images/cat3.jpg" },
    { id: 7, name: "Basil", type: "Dog", age: "0.5 years", gender: "Male", image: "images/basil.jpg" },
    { id: 8, name: "Chloe", type: "Cat", age: "3 years", gender: "Female", image: "images/cat4.jpg" }
];

const PETS_PER_PAGE = 6;
let currentPage = 1;

function displayPets(filteredPets) {
    const petGrid = document.getElementById('petGrid');
    petGrid.innerHTML = '';

    const start = (currentPage - 1) * PETS_PER_PAGE;
    const end = start + PETS_PER_PAGE;
    const paginatedPets = filteredPets.slice(start, end);

    if (paginatedPets.length === 0) {
        petGrid.innerHTML = '<p>No pets match your criteria.</p>';
        return;
    }

    paginatedPets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card');
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}">
            <h3>${pet.name}</h3>
            <p>Type: ${pet.type}</p>
            <p>Age: ${pet.age}</p>
            <p>Gender: ${pet.gender}</p>
            
            <a href="adoption.html?petId=${pet.id}" class="btn btn-spaced">Apply to Adopt</a>
        `;
        petGrid.appendChild(petCard);
    });

    updatePagination(filteredPets.length);
}

function filterPets() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const type = document.getElementById('typeFilter').value;
    const age = document.getElementById('ageFilter').value;
    const gender = document.getElementById('genderFilter').value;

    let filteredPets = pets;

    if (search) {
        filteredPets = filteredPets.filter(pet => pet.name.toLowerCase().includes(search));
    }

    if (type !== 'all') {
        filteredPets = filteredPets.filter(pet => pet.type === type);
    }

    if (age !== 'all') {
        filteredPets = filteredPets.filter(pet => {
            const ageYears = parseFloat(pet.age);
            if (age === '0-1') return ageYears <= 1;
            if (age === '1-3') return ageYears > 1 && ageYears <= 3;
            if (age === '3+') return ageYears > 3;
            return true;
        });
    }

    if (gender !== 'all') {
        filteredPets = filteredPets.filter(pet => pet.gender === gender);
    }

    displayPets(filteredPets);
}

function updatePagination(totalPets) {
    const totalPages = Math.ceil(totalPets / PETS_PER_PAGE);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function filter(){
    currentPage = 1; // Reset to first page on filter
    filterPets();
}

document.getElementById('searchInput').addEventListener('input', filter);
document.getElementById('typeFilter').addEventListener('change', filter);
document.getElementById('ageFilter').addEventListener('change', filter);
document.getElementById('genderFilter').addEventListener('change', filter);

document.getElementById('clearFilters').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('ageFilter').value = 'all';
    document.getElementById('genderFilter').value = 'all';
    currentPage = 1;
    displayPets(pets);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterPets();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = Math.ceil(pets.length / PETS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        filterPets();
    }
});

document.addEventListener('DOMContentLoaded', () => displayPets(pets));