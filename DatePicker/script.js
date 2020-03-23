//Create modyle body
let datePickerBody = document.createElement('div');
let datePickerStyle = document.createElement('style');
datePickerStyle.innerHTML = "#datepicker-body{transition:.3s;color:#03734d;background-color:#8fd1bb;border:1px solid #19a979;border-radius:5px;width:150px;height:180px;display:grid;grid-template-rows:1fr 1fr 4fr;grid-template-areas:'year year year' 'mounth mounth mounth' 'day day day'}#datepicker-body p{cursor:pointer;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none}#datepicker-year{border-bottom:1px solid #19a979;display:grid;grid-template-columns:1fr 3fr 1fr;grid-area:year}#datepicker-year div{display:flex;align-items:center;justify-content:center}#datepicker-year p{padding:0;margin:0}#datepicker-mounth{border-bottom:1px solid #19a979;display:grid;grid-template-columns:1fr 3fr 1fr;grid-area:mounth}#datepicker-mounth div{display:flex;align-items:center;justify-content:center}#datepicker-mounth p{padding:0;margin:0}#datepicker-day{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;grid-area:day}#datepicker-day div{transition:.3s;display:flex;align-items:center}#datepicker-day div:hover{background-color:#66c2a3;border-radius:20px;transform:scale(1.3)}#datepicker-day p{transition:.3s;font-size:13px;margin:0 auto;padding:0;text-align:center}#datepicker-day p:hover{transform:scale(1.3)}.datapicker-arrow{transition:.3s;font-size:22px;margin:0;padding:0}.datapicker-arrow-div{transition:.3s}.datapicker-arrow-div:hover{transform:scale(1.05);background-color:#66c2a3;border-radius:30px}";
datePickerBody.id = 'datepicker-body';
datePickerBody.style.display = 'none';
datePickerBody.style.position = 'absolute';
datePickerBody.innerHTML = "	<div id='datepicker-year'></div><div id='datepicker-mounth'></div>	<div id='datepicker-day'></div>";
document.body.appendChild(datePickerBody);
document.head.appendChild(datePickerStyle);

// Position datePickerBody
let datepickerInput = document.getElementById('datePicker'); // Get input TAG
	 function getOffsetSumTop(elem) { // Find positson top elements in document
  let top = 0;
  while (elem) {
    top = top + parseInt(elem.offsetTop);
    elem = elem.offsetParent;
  }
  return top; 

}
	 function getOffsetSumLeft(elem) { // Find positson left elements in document
  let left = 0;
  while (elem) {
    left = left + parseInt(elem.offsetLeft);
    elem = elem.offsetParent;
  }
  return left; 
}
// Find children DIV
let datepickerYearDiv = document.getElementById('datepicker-year');
let datepickerMounthDiv = document.getElementById('datepicker-mounth');
let datepickerDayDiv = document.getElementById('datepicker-day');
// Create innerHTML children DIV
for (let i = 0; i < 31; i++) {
	datepickerDayDiv.innerHTML = datepickerDayDiv.innerHTML+('<div onclick="pickDay('+i+')"><p>'+(i+1)+'</p></div>');
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
	dpInputArr[2] = Number(datepickerYear.innerText);                         //Edit year in INPUT tag
datepickerInput.value =dpInputArr[0] +' '+ dpInputArr[1]+' '+dpInputArr[2]; //
}
function rightYear() {
datepickerYear.innerText = Number(datepickerYear.innerText)+1;
	dpInputArr[2] = Number(datepickerYear.innerText);                         //Edit year in INPUT tag
datepickerInput.value =dpInputArr[0] +' '+ dpInputArr[1]+' '+dpInputArr[2]; //                                 
}
// Insert valid mounth
let datepickerMounth = datepickerMounthDiv.firstElementChild.nextElementSibling.firstElementChild;
let datepickerMounthArr = ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
datepickerMounth.innerText = datepickerMounthArr[Number(datepickerDate.getMonth())];
// Button edit mounth
function leftMounth() {
	dpIteratorMounth--;
	if (dpIteratorMounth<0) {
		dpIteratorMounth = 11;
	}
	datepickerMounth.innerText = datepickerMounthArr[dpIteratorMounth];
	dpInputArr[1] = datepickerMounthArr[dpIteratorMounth]; //Edit mounth in INPUT tag
	datepickerInput.value =dpInputArr[0] +' '+ dpInputArr[1]+' '+dpInputArr[2]; //Edit mounth in INPUT tag
}
let dpIteratorMounth = Number(datepickerDate.getMonth());
function rightMounth() {
	dpIteratorMounth++;
	if (dpIteratorMounth>11) {
		dpIteratorMounth = 0;
	}
	datepickerMounth.innerText = datepickerMounthArr[dpIteratorMounth];
	dpInputArr[1] = datepickerMounthArr[dpIteratorMounth]; //Edit mounth in INPUT tag
	datepickerInput.value =dpInputArr[0] +' '+ dpInputArr[1]+' '+dpInputArr[2]; //Edit mounth in INPUT tag
}
// Focus to INPUT tag

// Input arr
let	dpInputArr = ['',datepickerMounthArr[Number(datepickerDate.getMonth())],datepickerDate.getFullYear()];
// When user Focus
datepickerInput.onfocus = function() {
	datePickerBody.style.left = getOffsetSumLeft(datepickerInput)+'px'; // Position
	datePickerBody.style.top = getOffsetSumTop(datepickerInput)+datepickerInput.offsetHeight+10+'px'; // Position
	if (datepickerInput.value == '') {
	datePickerBody.style.display = '';
	datepickerInput.value = dpInputArr[1]+' '+dpInputArr[2];
} else {
	datePickerBody.style.display = '';
}
}
// Pick date day
function pickDay(numb) {
dpInputArr[0] = datepickerDayDiv.children[numb].firstElementChild.innerText; //Edit day in INPUT tag
	datepickerInput.value =dpInputArr[0] +' '+ dpInputArr[1]+' '+dpInputArr[2]; //Edit mounth in INPUT tag
datePickerBody.style.display = 'none';
}

