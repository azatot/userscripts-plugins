//Create modyle body
let datePickerBody = document.createElement('div');
datePickerBody.id = 'datepicker-body';
datePickerBody.innerHTML = "	<div id='datepicker-year'></div><div id='datepicker-mounth'></div>	<div id='datepicker-day'></div>";
document.body.appendChild(datePickerBody);
// Find children DIV
let datepickerYearDiv = document.getElementById('datepicker-year');
let datepickerMounthDiv = document.getElementById('datepicker-mounth');
let datepickerDayDiv = document.getElementById('datepicker-day');
// Create innerHTML children DIV
for (let i = 0; i < 31; i++) {
	datepickerDayDiv.innerHTML = datepickerDayDiv.innerHTML+("<div><p>"+(i+1)+"</p></div>");
}

datepickerYearDiv.innerHTML = '<div onclick="leftYear()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8249</p></div><div><p></p></div><div onclick="rightYear()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8250;</p></div>';
datepickerMounthDiv.innerHTML = '<div onclick="leftMounth()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8249</p></div><div><p></p></div><div onclick="rightMounth()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8250;</p></div>';
// logic
// Insert valid year
let datepickerYear = datepickerYearDiv.firstElementChild.nextElementSibling.firstElementChild;
let datepickerDate = new Date();
datepickerYear.innerText = datepickerDate.getFullYear();
// Button edit year
let datepickerLeftYear = datepickerYearDiv.firstElementChild;
function leftYear() {
datepickerYear.innerText = Number(datepickerYear.innerText)-1;
}
function rightYear() {
datepickerYear.innerText = Number(datepickerYear.innerText)+1;
}
// Insert valid mounth
let datepickerMounth = datepickerMounthDiv.firstElementChild.nextElementSibling.firstElementChild;
let datepickerMounthArr = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
console.log(datepickerMounthArr);
datepickerMounth.innerText = datepickerMounthArr[Number(datepickerDate.getMonth())];
// Button edit mounth
function leftMounth() {
datepickerMounth.innerText = datepickerMounthArr[Number(datepickerDate.getMonth())-1];
console.log("МІСЯЦЬ НАЗАД");
}
function rightMounth() {
console.log("МІСЯЦЬ ВПЕРЕД");
}
// Livereload
document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');