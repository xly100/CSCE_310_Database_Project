//Function for calling all functions that are needed to display information once the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    let Usertype = determine_type();
});

determine_type(editID){
    runPHP("selectfrompatient.php", {"userid":UID}, retrievePatientInfo, alert); //Need a generic SELECT Query
}