//Function for calling all functions that are needed to display information once the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    let UID = window.location.href.substring(window.location.href.lastIndexOf('#') + 1);
    alert(UID);
});