// MATTHEW CHANG 828004952

/* GLOBAL VARS */
REF_DATE = new Date(); //the reference date for the current week on the calendar (day of week is always Sunday)
REF_DATE.setDate(REF_DATE.getDate() - REF_DATE.getDay()); //ensure week begins on Sunday
TABLE_CELLS = []
SELECTED_DOCTOR = -1;
CURRENT_APPT_DATE = new Date();
SELECTED_CELL = null;
SELECTED_CELL_ORIG_COLOR = "";

/* coookie variables passed during session */
USERID = "";
USERTYPE = ""; // patient, doctor, or admin
DCL_RUN = false;


/* update global variable for change on doctor menu */
window.addEventListener("DOMContentLoaded", function() {

	if(DCL_RUN){return;}
	DCL_RUN = true;
	document.getElementById("doctor-dropdown").addEventListener("change", function() { 
	  SELECTED_DOCTOR = document.getElementById("doctor-dropdown").value;
	  loadWeek();
	});
	
	/* * Generates calendar cells * */
var table = document.getElementById("cal_table");
	
for (i = 17; i >= 8; i--) {
	var row = table.insertRow(1);
	row.insertCell(0).innerHTML = i + ":00";
	
	for (j = 1; j < 8; j++){
	
		c_obj = row.insertCell(j)
	
		c_obj.innerHTML = "";
		c_obj.id = (j - 1) + "_" + i 
			TABLE_CELLS.push(c_obj);
		}
}

		
	populateDoctors();
loadWeek();

USERID = getUserId();
USERTYPE = getUserType() === "p" ? "patient" : (getUserType() === "d" ? "doctor" : "admin");




/* click listeners for each cell */
document.querySelectorAll('#cal_table td')
.forEach(e => e.addEventListener("click", function() {
	
	if(SELECTED_DOCTOR == -1){
		alert("Select a doctor!");
		return;
	}
	
	if (e.style.backgroundColor == "gray"){ // unavailable
		alert("Sorry. This spot is already reserved..");
	} else if (e.style.backgroundColor == "white"){ // available
		// doctor can only create appt for themself
		if (USERTYPE === "doctor" && SELECTED_DOCTOR != USERID){
				alert("Sorry. You can't create an appointment for another doctor.");
				return;
		}
		// add appointment
		else{
			if(SELECTED_CELL !== null){
				SELECTED_CELL.style.backgroundColor = SELECTED_CELL_ORIG_COLOR;
			}
			SELECTED_CELL = e;
			SELECTED_CELL_ORIG_COLOR = e.style.backgroundColor;
			SELECTED_CELL.style.backgroundColor = "lightgreen";
			tempDate = new Date(REF_DATE.getTime());
			tempDate.setDate(tempDate.getDate() + e.cellIndex - 1);
			tempDate.setHours(e.closest('tr').rowIndex + 7,0,0,0);

			document.getElementById('view-appt').style.display = "none";
			document.getElementById('create-appts').style.display = "block";
			if(USERTYPE !== "patient"){
				document.getElementById('patient-dropdown').style.display = "block";
				
				runPHP("getallpatients.php", {}, function(result){
					
					parsed_array = JSON.parse(result);
					
				for (let i = 0; i < parsed_array.length; i++){
					opt = document.createElement('option');
					opt.value = parsed_array[i]["username"]
					opt.innerHTML = parsed_array[i]["firstname"] + " " + parsed_array[i]["lastname"] + " (" + parsed_array[i]["username"] + ")";
					document.getElementById('patient-dropdown').appendChild(opt);
				}
					
				}, alert);
				
			}
			
			CURRENT_APPT_DATE = new Date(tempDate.getTime());
			
			document.getElementById('cna-title').innerHTML = "Create new appointment for " + tempDate;
		}
	} else if (e.style.backgroundColor == "orange"){ // your appointment
		// TODO: open appointment info
		if(SELECTED_CELL !== null){
				SELECTED_CELL.style.backgroundColor = SELECTED_CELL_ORIG_COLOR;
			}
			SELECTED_CELL = e;
			SELECTED_CELL_ORIG_COLOR = e.style.backgroundColor;
			SELECTED_CELL.style.backgroundColor = "lightgreen";
		apptDate = new Date(REF_DATE.getTime());
		apptDate.setDate(apptDate.getDate() + e.cellIndex - 1);
		apptDate.setHours(e.closest('tr').rowIndex + 7,0,0,0);
		
		document.getElementById('create-appts').style.display = "none";
		document.getElementById('view-appt').style.display = "block";
		
		if(getUserType() == "d"){
			document.getElementById("edit-treatment").style.display = "block";
		}
		
		
		
		runPHP("getappointmentbytime.php", {"timestamp": formatDate(apptDate), "doctorid": SELECTED_DOCTOR}, function(a){
				parsed_dict = JSON.parse(result)[0];
				apptid = parsed_dict["appointmentid"];
				creatorid = parsed_dict["creatorid"];
				patientid = parsed_dict["patientid"];
				timestamp = parsed_dict["timestamp"];
				doctorid = parsed_dict["doctorid"];
				description = parsed_dict["description"];
				treatmentnote = parsed_dict["treatment_note"];
				document.getElementById("appt-id").innerHTML = "Appointment ID: " + apptid;
				document.getElementById("appt-time").innerHTML = "Date and time: " + timestamp;
				document.getElementById("appt-desc").innerHTML = "Request description: " + description;
				document.getElementById("appt-treatment").innerHTML = "Treatment note: " + treatmentnote;
				
				
				runPHP("getuser.php", {"userid":creatorid}, function(res){
					
					arr2 = JSON.parse(res)[0];
					
					document.getElementById("appt-creator").innerHTML = "Creator: " + arr2["firstname"] + " " + arr2["lastname"];
					
					runPHP("getuser.php", {"userid":patientid}, function(res){
					
						arr3 = JSON.parse(res)[0];
					
						document.getElementById("appt-patient").innerHTML = "Patient: " + arr3["firstname"] + " " + arr3["lastname"];
					
				
						runPHP("getuser.php", {"userid":doctorid}, function(res){
						
						arr4 = JSON.parse(res)[0];
						
						document.getElementById("appt-doctor").innerHTML = "Patient: " + arr4["firstname"] + " " + arr4["lastname"];
						

						}, alert);

					}, alert);
					
				}, alert);
				
		}, alert);
	}



  }));
});


// patient sees orange for his appointments and gray or white depending on the availability of selected doctor
// doctor sees orange for his appointments and white otherwise
// admin sees all appointments as orange


/* Date string utility methods */
function dateStringNoYear(dateObject, separator){
	return String(dateObject.getMonth() + 1).padStart(2, '0')+separator+String(dateObject.getDate()).padStart(2, '0');
}

function dateStringWithYear(dateObject, separator){
	return String(dateObject.getMonth() + 1).padStart(2, '0')+separator+String(dateObject.getDate()).padStart(2, '0')+separator+dateObject.getFullYear();
}

function dateStringYYYYMMDD(dateObject, separator){
	return dateObject.getFullYear()+separator+String(dateObject.getMonth() + 1).padStart(2, '0')+separator+String(dateObject.getDate()).padStart(2, '0');
}


/* Refreshes the calendar view */
function loadWeek(){
	// reset cells
	TABLE_CELLS.forEach(element => element.innerHTML = "");
	TABLE_CELLS.forEach(element => element.style.backgroundColor = "white");

	document.getElementById('week_heading').innerHTML = "Week of "+dateStringWithYear(REF_DATE, "/");
	weekstart = new Date(REF_DATE.setDate(REF_DATE.getDate() - REF_DATE.getDay() + (REF_DATE.getDay() === 0 ? 0 : 1)));
	CURRENT_WEEK_START = weekstart;
	document.getElementById('col_0').innerHTML = "Sunday " + dateStringNoYear(weekstart,"/");

	days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

	retrieveAppointments(dateStringYYYYMMDD(weekstart,"-"), 0); // retrieve appointments for sunday

	// retrieve appointments for monday thru saturday
	for(i = 1; i <= 6; i++){
		weekstart.setDate(weekstart.getDate() + 1);
		document.getElementById('col_' + i).innerHTML = days[i - 1] + " " + dateStringNoYear(weekstart,"/"); // "Saturday 12/03"
		retrieveAppointments(dateStringYYYYMMDD(weekstart,"-"), i); 
	}
}

/* generate dropdown of doctors */
function populateDoctors(){
	let dropdown = document.getElementById('doctor-dropdown');
	dropdown.length = 0;
	
	let defaultOption = document.createElement('option');
	defaultOption.text = 'Choose a Doctor';
	defaultOption.value = -1;
	
	dropdown.add(defaultOption);
	dropdown.selectedIndex = 0;

	var req = new XMLHttpRequest();
    req.open("GET", "https://csce310database.000webhostapp.com/calendar.php?userid=" + USERID + "&usertype=" + USERTYPE + "&date="+"null" + "&command=1" + "&doctorid=" + "null", true);
	
	req.onload = function() {
		if (req.status == 200) {
			
		  const data = JSON.parse(req.responseText);
		  let option;
		  for (let i = 0; i < data.length; i++) {
			e = data[i];
			id = e[0];
			firstname = e[1];
			lastname = e[2];
			specialty = e[3];
			option = document.createElement('option');
			option.text = firstname + " " + lastname + " (" + specialty + ")";
			option.value = id;
			dropdown.add(option);
		  }
		 } else {
		  // Empty
			
		}   
	  }

    req.send();
}



// back button
function goBackOneWeek(){
	REF_DATE.setDate(REF_DATE.getDate() - 7);
	loadWeek();
}

//forward button
function goForwardOneWeek(){
	REF_DATE.setDate(REF_DATE.getDate() + 7);
	loadWeek();
}


/* Retireve all appointments from database */
function retrieveAppointments(date, dayOfWeek){
	var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
	  jsonArr = JSON.parse(this.responseText);
	  
	  for(i = 0; i < jsonArr.length; i++){

	  	e = jsonArr[i];
		rawTime = e[2];
		description = e[3];
		doctorid = e[4];
		patientid = e[5];

		// get specified cell
		hour = rawTime.substr(rawTime.indexOf(" ") + 1,2);
		cell = document.getElementById(dayOfWeek+"_"+parseInt(hour, 10));

		// if userid = doctorid or patient id, then set color to orange (your appt) and show description
		if (USERID == doctorid || USERID == patientid || USERTYPE == "admin"){
			cell.innerHTML += description+"<br>";
			cell.style.backgroundColor = "orange";
		}
		// else set color to gray (unavailable)
		else {
			cell.style.backgroundColor = "gray";
		}
	  
	  }
      }
    };
    req.open("GET", "https://csce310database.000webhostapp.com/calendar.php?userid=" + USERID + "&usertype=" + USERTYPE + "&date="+date + "&command=0" + "&doctorid="+SELECTED_DOCTOR, true);
    req.send();
}


/* Get time of day from cell id */
function getTimeFromId(id_){

splitUp = id_.split("_");
return splitUp[1] + ":" + splitUp[2]+" " + splitUp[3];

}


/* Get date string from cell id */
function getDateFromId(id_){
	splitUp = id_.split("_");
	dayOfWeek = splitUp[0];
	weekstart = new Date(REF_DATE.setDate(REF_DATE.getDate() - REF_DATE.getDay() + (REF_DATE.getDay() === 0 ? 0 : 1)));
	weekstart.setDate(weekstart.getDate() + parseInt(dayOfWeek));

	return dateStringYYYYMMDD(weekstart, "-");

}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      (date.getDate()).toString().padStart(2, '0'),
    ].join('-') +
    ' ' +
    [
      (date.getHours()).toString().padStart(2, '0'),
      (date.getMinutes()).toString().padStart(2, '0'),
      (date.getSeconds()).toString().padStart(2, '0'),
    ].join(':')
  );

}

function createNewAppointment(){
	
	creatorid = getUserId();
	timestamp = formatDate(CURRENT_APPT_DATE);
	description = document.getElementById('inputDescription').value;
	doctorid = SELECTED_DOCTOR + "";
	
	if(getUserType() !== "p"){
		patientid = document.getElementById('patient-dropdown').options[document.getElementById('patient-dropdown').selectedIndex].innerHTML;
	patientuser = patientid.substring(patientid.indexOf('(')+1, patientid.length - 1);

	runPHP("getpatientbyusername.php", {"username":patientuser}, function(result){
					
		parsed_array = JSON.parse(result);
		patient_userid = parsed_array[0]["userid"];
				
		runPHP("addappointment.php", {"creatorid": creatorid, "timestamp": timestamp, "description": description, "doctorid": doctorid, "patientid": patient_userid}, function(a){
			alert("Appointment created!");
			loadWeek();
			document.getElementById('create-appts').style.display = "none";}, alert);
				
	}, alert);
	} else{
		runPHP("addappointment.php", {"creatorid": creatorid, "timestamp": timestamp, "description": description, "doctorid": doctorid, "patientid": getUserId()}, function(a){
			alert("Appointment created!");
			loadWeek();
			document.getElementById('create-appts').style.display = "none";}, alert);
		
		
	}
	
}


function doctorEditTreatmentNote(){
	let new_note = prompt("Please enter treatment:", "");
	apptid = document.getElementById('appt-id').innerHTML;
	apptid = apptid.substring(apptid.indexOf(":") + 2);
  if (new_note == null || new_note == "") {
    //do nothing
  } else {
	 runPHP("updatetreatment.php", {"appointmentid":apptid,"treatment":new_note}, console.log, alert);
	 	document.getElementById("appt-treatment").innerHTML = "Treatment note: " + new_note;
  }
}

