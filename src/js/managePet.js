// insert
const inputName = document.getElementById('floatingName');
const selectSpecies = document.getElementById('select-species');
const inputAge = document.getElementById('floatingAge');
const inputWeight = document.getElementById('floatingWeight');
const inputPhoto = document.getElementById('pet-photo');
const inputPetOwnerDocument = document.getElementById('floating-pet-owner-document');
const selectNames = document.getElementById('select-name');

// update and delete
const selectNameUpdate = document.getElementById('select-name-update');
const selectSpeciesUpdate = document.getElementById('select-species-update');
const inputAgeUpdate = document.getElementById('floating-age-update');
const inputWeightUpdate = document.getElementById('floating-weight-update');
const inputPhotoUpdate = document.getElementById('pet-photo-update');

const registerButton = document.getElementById('btnRegisterPet');
const collapseButtonVisualize = document.getElementById('btn-collapse-visualize');
const collapseButtonUpdate = document.getElementById('btn-collapse-update');
const deleteButton = document.getElementById('btn-delete-pet');

const tableBody = document.querySelector('#tbody-visualize-pet');

registerButton.addEventListener('click', InsertPet);

// INSERT
function InsertPet() {
    let pets = {    // los atributos deben coincidir con los nombres de las columnas en la tabla
        name: inputName.value,
        species: selectSpecies.options[selectSpecies.selectedIndex].text,
        age: inputAge.value,
        weight: inputWeight.value,
        photo: inputPhoto.value,    // modificarlo para que sea un archivo
        pet_owner_document: inputPetOwnerDocument.value
    };

    fetch('http://localhost:3007/pet/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pets)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network error: ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            alert('Pet registered successfully');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was no possible to register the pet');
        });

    inputName.value = '';
    selectSpecies.selectedIndex = 0;
    inputAge.value = '';
    inputWeight.value = '';
    inputPhoto.value = '';
    inputPetOwnerDocument.value = '';
}

// filter pet by name
selectNames.addEventListener('click', GetNames(selectNames));
collapseButtonUpdate.addEventListener('click', GetNames(selectNameUpdate));

function GetNames(selectElement) {

    // const existingOption = Array.from(selectElement.options).find(option => option.text === "Select a pet");
    // if (!existingOption) {
    //     const option = document.createElement('option');
    //     option.textContent = "Select a pet";
    //     option.value = ""; // También puedes establecer un valor vacío si es necesario
    //     selectElement.appendChild(option);
    // }

    fetch('http://localhost:3007/pet/read')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network error: ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            selectElement.innerHTML = ''; // Clear existing options
            data.forEach(pet => {
                AddPetOption(pet, selectElement);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            console.error('There was no possible to fetch the names');
        });
}

function AddPetOption(pet, selectElement) {
    const option = document.createElement('option');
    option.textContent = pet.name;
    selectElement.appendChild(option);
}

// READ
collapseButtonVisualize.addEventListener('click', VisualizeData);

function VisualizeData() {
    fetch('http://localhost:3007/pet/read')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network error: ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            tableBody.innerHTML = ''; // Clear existing rows
            data.forEach(pet => {
                AddPetRow(pet);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            console.error('There was no possible to fetch the pets');
        });
}

function AddPetRow(pet) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${pet.name}</td> 
    <td>${pet.species}</td> 
    <td>${pet.age}</td> 
    <td>${pet.weight}</td> 
    <td>${pet.photo}</td>   
    <td>${pet.pet_owner_document}</td>
    `;
    tableBody.appendChild(row);
}

selectNameUpdate.addEventListener('change', updateForm);

function updateForm() {
    let name = selectNameUpdate.options[selectNameUpdate.selectedIndex].text;

    fetch(`http://localhost:3007/pet/read/${name}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network error: ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {

            console.log(data);
            // update form
            inputName.value = data.name;
            inputAgeUpdate.value = data.age;
            inputWeightUpdate.value = data.weight;


            // Suponiendo que data.species contiene el valor que deseas seleccionar
            const speciesValue = data.species;

            // Encuentra la opción en el select que tiene el valor correspondiente
            const options = selectSpeciesUpdate.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === speciesValue) {
                    selectSpeciesUpdate.selectedIndex = i;
                    break;
                }
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            console.error('There was no possible to fetch the pet');
        });
}

// DELETE
deleteButton.addEventListener('click', DeletePet);

function DeletePet() {

    const confirm = prompt('Please type "yes" to confirm the deletion of the pet');

    if (confirm !== 'yes') {
        return;
    }

    let name = selectNameUpdate.options[selectNameUpdate.selectedIndex].text;

    fetch(`http://localhost:3007/pet/delete/${name}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            alert('Pet deleted successfully');
            GetNames(selectNames);
            GetNames(selectNameUpdate);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was no possible to delete the pet');
        });
}

