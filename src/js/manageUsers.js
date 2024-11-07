var putUserForm = {};
const formPutDocument = document.getElementById('putDocument');
const formPutName = document.getElementById('putName');
const formPutLastName = document.getElementById('putLastName');
const formPutEmail = document.getElementById('putEmail');
const formPutPassword = document.getElementById('putPassword');
const formPutPhoneNumber = document.getElementById('putPhoneNumber');


// POST LOGIC

async function handlePostSubmit() {
    const postForm = document.getElementById('postForm');

    if (!postForm.checkValidity()) {
        postForm.classList.add('was-validated');
        return;
    }

    const postFormData = {
        document: document.getElementById('postDocument').value,
        name: document.getElementById('postName').value,
        last_name: document.getElementById('postLastName').value,
        email: document.getElementById('postEmail').value,
        password: document.getElementById('postPassword').value,
        phone_number: document.getElementById('postPhoneNumber').value,
        rol: document.querySelector('input[name="rol"]:checked').value
    };

    postUser(postFormData, postForm);
}

async function postUser(postFormData, postForm) {
    try {
        // Enviar los datos usando fetch
        const response = await fetch('/postUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postFormData)
        });

        if (response.ok) {
            alert("Form submitted successfully!");
            postForm.reset(); // Opcional: Limpia el formulario
            postForm.classList.remove('was-validated');
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.message || "An error occurred"));
        }
    } catch (error) {
        console.error("Error submitting form", error);
        alert("There was an error submitting the form");
    }
}


// GET LOGIC

async function getUsers(url) {
    const urlString = (url).toString();

    try {
        const response = await fetch(urlString);
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error('Error to get Pet Owners data');
        }
    
        populateTable(data, urlString);
        collapse();
    } catch (error) {
      console.error('Error:', error);
    }
}

function createTableRow(data) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <th scope="row">${data.document}</th>
        <td>${data.name}</td>
        <td>${data.last_name}</td>
        <td>${data.email}</td>
        <td>${data.phone_number}</td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-info btn-lg edit-btn" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsePutUser" aria-expanded="false"
                    aria-controls="collapsePutUser">
                    Edit
                </button>
            </p>
        </td>
        <td>
            <p class="d-inline-flex gap-1">
                <button class="btn btn-outline-danger btn-lg delete-btn" type="button" aria-expanded="false" onclick="deleteAlert()">
                    Delete
                </button>
            </p>
        </td>
    `;

    addEventListeners(data, row);

    return row;
}

// {/* <p class="d-inline-flex gap-1">
//                 <button class="btn btn-outline-danger btn-lg delete-btn" type="button" data-bs-toggle="collapse"
//                     data-bs-target="#collapseVisualizeVeterinarians" aria-expanded="false"
//                     aria-controls="collapseVisualizeVeterinarians">
//                     Delete
//                 </button>
//             </p> */}

function addEventListeners(data, row){
    const editButton = row.querySelector('.edit-btn');
    editButton.addEventListener('click', () => populateForm(data));
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => deleteUser(data));
}

function populateTable(data, url) {
    const id = chooseIdByGetUrl(url);
    const table = chooseTableByGetUrl(url);

    const tableBody = document.getElementById(id);
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = createTableRow({
            document: item.document,
            name: item.name,
            last_name: item.last_name,
            email: item.email,
            phone_number: item.phone_number,
            table: table
        });
        tableBody.appendChild(row);
    });
}

function chooseIdByGetUrl(url){
    if (url == '/getPetOwners'){
        return ('petOwnerTableBody').toString();
    } else {
        return ('veterinarianTableBody').toString();
    }
}

function chooseTableByGetUrl(url) {
    if (url == '/getPetOwners'){
        return ('pet_owner').toString();
    } else {
        return ('veterinarian').toString();
    }
}


// DELETE LOGIC

async function deleteUser(data) {
    const url = chooseDeleteUrl(data.table);

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                //'Accept': 'application/json'
            },
            body: JSON.stringify({
                document: data.document
            })
        });
    
        if (!response.ok) {
            throw new Error(`Error deleting user: ${response.statusText}`);
        }

        reloadWindow();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

function chooseDeleteUrl(table){
    if (table == 'pet_owner'){
        return ('/deletePetOwner').toString(); 
    } else {
        return ('/deleteVeterinarian').toString(); 
    }
}


// PUT LOGIC 

async function handlePutSubmit() {
    const putForm = document.getElementById('putForm');

    if (!putForm.checkValidity()) {
        putForm.classList.add('was-validated');
        return;
    }

    const postFormData = {
        document: document.getElementById('postDocument').value,
        name: document.getElementById('postName').value,
        last_name: document.getElementById('postLastName').value,
        email: document.getElementById('postEmail').value,
        password: document.getElementById('postPassword').value,
        phone_number: document.getElementById('postPhoneNumber').value,
        rol: document.querySelector('input[name="rol"]:checked').value
    };

    postUser(postFormData, postForm);
}

function populateForm(data){
    formPutDocument.value = data.document;
    formPutName.value = data.name;
    formPutLastName.value = data.last_name;
    formPutEmail.value = data.email;
    formPutPhoneNumber.value = data.phone_number;

    putUserForm = {
        putDocument: data.document,
        putName: data.name,
        putLastName: data.last_name,
        putEmail: data.email,
        putPassword: data.password,
        putPhoneNumber: data.phone_number,
        table: data.table
    }
}

function putAction(){
    var newPutUserForm = {
        newPutDocument: formPutDocument.value,
        newPutName: formPutName.value,
        newPutLastName: formPutLastName.value,
        newPutEmail: formPutEmail.value,
        newPutPassword: formPutPassword.value,
        newPutPhoneNumber: formPutPhoneNumber.value
    }

    putUser(putUserForm, newPutUserForm);
}

async function putUser(putUserForm, newPutUserForm) {
    const url = choosePutUrl(putUserForm.table);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                putUserForm,
                newPutUserForm
            })
        });
    
        if (!response.ok) {
            throw new Error(`Error updating user: ${response.statusText}`);
        }

        reloadWindow();
    
        // const data = await response.json();
        // console.log(data.message);
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

function reloadWindow(){
    setTimeout(function() {
        location.reload();
    }, 2000);
}

function choosePutUrl(table){
    if (table == 'pet_owner'){
        return ('/putPetOwner').toString(); 
    } else {
        return ('/putVeterinarian').toString(); 
    }
}



document.addEventListener('DOMContentLoaded', function() {
    collapse();
});

function collapse() {
    const collapseButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
    
    collapseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el ID del colapso que se va a abrir
            const targetId = this.getAttribute('data-bs-target');

            // Cerrar otros colapsos
            collapseButtons.forEach(btn => {
                const otherTargetId = btn.getAttribute('data-bs-target');
                if (otherTargetId !== targetId) {
                    const collapseElement = document.querySelector(otherTargetId);
                    const collapse = bootstrap.Collapse.getInstance(collapseElement);
                    if (collapse) {
                        collapse.hide(); // Cerrar el colapso
                    }
                }
            });
        });
    });
}


//buttons animations

// $('#postUsersButton').click(function(){
//     Swal.fire({
//         icon: "success",
//         title: "User has been saved",
//         showConfirmButton: false,
//         timer: 1500
//     });
// });

$('#cancelPostUsersButton').click(function(){
    Swal.fire("The creation of a user was cancelled");
});

$('#putUserButton').click(function(){
    Swal.fire({
        icon: "success",
        title: "User has been updated",
        showConfirmButton: false,
        timer: 1500
      });
});

$('#cancelPutUserButton').click(function(){
    Swal.fire("The updated of a user was cancelled");
});

function deleteAlert(){
    Swal.fire({
        icon: "success",
        title: "User deleted successfully",
        showConfirmButton: false,
        timer: 1500
    });
}

document.getElementById('postForm').addEventListener('submit', function(event) {
    // Activa la validación de Bootstrap
    this.classList.add('was-validated');

    // Si el formulario no es válido, se evita el envío
    if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
});


// document.getElementById('postForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Evita el envío del formulario

//     // Activa la validación de Bootstrap
//     this.classList.add('was-validated');
//   });

// $('.delete-btn').click(function(){
//     Swal.fire({
//         title: 'Are you sure you want to delete the user?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes',
//         cancelButtonText: 'No',
//         customClass: {
//             confirmButton: 'btn-confirm',
//             cancelButton: 'btn-cancel'
//         }
//     }).then(result => {
//         if (result.isConfirmed) {
//             Swal.fire("User deleted successfully")
//         }
//     });
// });

// collapseButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Obtener el ID del colapso que se va a abrir
//         var targetId = this.getAttribute('data-bs-target');

//         // Cerrar otros colapsos
//         collapseButtons.forEach(btn => {
//             var otherTargetId = btn.getAttribute('data-bs-target');
//             if (otherTargetId !== targetId) {
//                 var collapseElement = document.querySelector(otherTargetId);
//                 var collapse = bootstrap.Collapse.getInstance(collapseElement);
//                 if (collapse) {
//                     collapse.hide(); // Cerrar el colapso
//                 }
//             }
//         });
//     });
// });




// const create = document.getElementById('create');

// create.addEventListener('click', () => {
//     // Obtener los valores del formulario
//     const doc = document.getElementById('floatingDocument').value;
//     const name = document.getElementById('floatingUserName').value;
//     const lastName = document.getElementById('floatingUserLastName').value;
//     const rol = document.getElementById('selectRole').value;
//     const email = document.getElementById('floatingUserEmail').value;
//     const password = document.getElementById('floatingUserPassword').value;
//     const phone = document.getElementById('floatingUserPhone').value;

//     // Enviar una solicitud al servidor para crear un nuevo usuario
//     createUser(doc, name, lastName, rol, email, password, phone);
// });

// async function createUser(document, name, lastName, rol, email, password, phoneNumber) {
//     const url = chooseUrl(rol);
    
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json' // Set appropriate content type
//         },
//         body: JSON.stringify({ // Send data as JSON
//           document,
//           name,
//           lastName, // Use camelCase for consistency
//           email,
//           password,
//           phoneNumber
//         })
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error creating user: ${response.statusText}`);
//       }
  
//       const data = await response.json(); // Parse response as JSON if applicable
//       console.log(data.message); // Example: "New user inserted with ID: ..."
//     } catch (error) {
//       console.error('Error creating user:', error);
//     }
//   }

// async function chooseUrl(rol){
//     if (rol == 'Veterinarian'){
//         return '/veterinarian/create'; // Replace with your actual endpoint URL
//     } else {
//         return '/petowner/create'; // Replace with your actual endpoint URL
//     }
// }

// // Función para obtener todas las personas
// function readUser() {
//     fetch('/person/read/:document')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error en la petición');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Personas:', data);
//             displayPersons(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// // Función para mostrar las personas en una tabla
// function displayPersons(persons) {
//     const tableBody = document.getElementById('personsTable');
//     tableBody.innerHTML = ''; // Limpiar tabla

//     persons.forEach(person => {
//         const row = `
//             <tr>
//                 <td>${person.document}</td>
//                 <td>${person.name}</td>
//                 <td>${person.last_name}</td>
//                 <td>${person.email}</td>
//                 <td>${person.password}</td>
//                 <td>${person.phone_number}</td>
//                 <td>
//                     <button onclick="editPerson(${person.id})">Editar</button>
//                     <button onclick="deletePerson(${person.id})">Eliminar</button>
//                 </td>
//             </tr>
//         `;
//         tableBody.innerHTML += row;
//     });
// }