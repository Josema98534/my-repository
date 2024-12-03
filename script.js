document.addEventListener("DOMContentLoaded", () => {
    const formSection = document.getElementById("form-section");
    const showFormBtn = document.getElementById("show-form-btn");
    const formCancelBtn = document.getElementById("form-cancel-btn");
    const submitBtn = document.getElementById("submit-btn");
    const form = document.getElementById("record-form");
    const dataTable = document.getElementById("data-table").querySelector("tbody");

    let editMode = false; 
    let rowBeingEdited = null; 

    // Mostrar formulario al presionar el botón "Formulario"
    showFormBtn.addEventListener("click", () => {
        formSection.classList.toggle("hidden");
        form.reset();
        editMode = false; 
        rowBeingEdited = null;
    });

    // Ocultar formulario al presionar "Cancelar"
    formCancelBtn.addEventListener("click", () => {
        formSection.classList.add("hidden");
        form.reset();
    });

    // Almacenar datos en la tabla al presionar "Guardar"
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const dom = document.getElementById("dom").value;
        const city = document.getElementById("city").value;

        if (editMode && rowBeingEdited) {
            rowBeingEdited.children[0].textContent = name;
            rowBeingEdited.children[1].textContent = lastName;
            rowBeingEdited.children[2].textContent = email;
            rowBeingEdited.children[3].textContent = dom;
            rowBeingEdited.children[4].textContent = city;
        } else {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${name}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${dom}</td>
                <td>${city}</td>
                <td>
                    <button class="btn btn-update">Actualizar</button>
                    <button class="btn btn-delete">Eliminar</button>
                </td>
            `;

            const updateBtn = newRow.querySelector(".btn-update");
            const deleteBtn = newRow.querySelector(".btn-delete");

            updateBtn.addEventListener("click", () => editRow(newRow));
            deleteBtn.addEventListener("click", () => deleteRow(newRow));

            dataTable.appendChild(newRow);
        }

        formSection.classList.add("hidden");
        form.reset();
        editMode = false;
        rowBeingEdited = null;
    });

    function editRow(row) {
        document.getElementById("name").value = row.children[0].textContent;
        document.getElementById("last-name").value = row.children[1].textContent;
        document.getElementById("email").value = row.children[2].textContent;
        document.getElementById("dom").value = row.children[3].textContent;
        document.getElementById("city").value = row.children[4].textContent;

        formSection.classList.remove("hidden");
        editMode = true;
        rowBeingEdited = row;
    }

    function deleteRow(row) {
        dataTable.removeChild(row);
    }
});