$(document).ready(function(){
    populateUsers();
}
)

function populateUsers(){

    //id
    const id = document.createElement('td');
    id.textContent = '3';

    const name = document.createElement('td');
    name.textContent = 'Jorge Bosh';

    const phone = document.createElement('td');
    phone.textContent = '1236549870';

    const role = document.createElement('td');
    role.textContent = 'Doctor';

    const editIcon = document.createElement('i');
    editIcon.setAttribute("class", "material-icons");
    editIcon.innerHTML  = '&#xE8B8;';

    const edit = document.createElement('a');
    edit.setAttribute("href", "#");
    edit.setAttribute("class", "settings");
    edit.setAttribute("title", "Settings");
    edit.setAttribute("data-toggle", "tooltip");
    edit.setAttribute("data-original-title", "Settings")
    edit.appendChild(editIcon);

    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute("class", "material-icons");
    deleteIcon.innerHTML  = '&#xE5C9;';

    const remove = document.createElement('a');
    remove.setAttribute("href", "#");
    remove.setAttribute("class", "delete");
    remove.setAttribute("title", "Delete");
    remove.setAttribute("data-toggle", "tooltip");
    remove.setAttribute("data-original-title", "Delete")
    remove.appendChild(deleteIcon);

    const action = document.createElement('td');
    action.appendChild(edit);
    action.appendChild(remove);

    const tr = document.createElement('tr');
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(phone);
    tr.appendChild(role);
    tr.appendChild(action);


    
    const table = document.getElementById('userTable');
    table.appendChild(tr);


    
    //id.textContent = 'Jorge Bosh';
    


}

function deleteUsers(){

}

function editUserProfile(){

    
}