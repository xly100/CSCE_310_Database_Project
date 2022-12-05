window.addEventListener('DOMContentLoaded', (event) => {
    populateComments();
});

function populateComments(){

    var id = '4';
    var time = '11/09/2022 9:23:12';
    var comment = 'No, U';
    var name = 'Joe Mama';
    var type = 'Doctor';
    var appointment = '1';

    var row = document.createElement('tr');

    row.innerHTML = "<th scope='row'>" + id + "<\/th><td>" + time + "<\/td><td>" + comment + "<\/td><td>" 
    + name + "<\/td><td>" + type + "<\/td><td>" + appointment + "<\/td>";

    const table = document.getElementById('commentTable');
    table.appendChild(row);
}