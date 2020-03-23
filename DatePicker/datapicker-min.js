let datePickerBody=document.createElement("div"),datePickerStyle=document.createElement("style");datePickerStyle.innerHTML="#datepicker-body{transition:.3s;color:#03734d;background-color:#8fd1bb;border:1px solid #19a979;border-radius:5px;width:150px;height:180px;display:grid;grid-template-rows:1fr 1fr 4fr;grid-template-areas:'year year year' 'mounth mounth mounth' 'day day day'}#datepicker-body p{cursor:pointer;-moz-user-select:none;-khtml-user-select:none;-webkit-user-select:none}#datepicker-year{border-bottom:1px solid #19a979;display:grid;grid-template-columns:1fr 3fr 1fr;grid-area:year}#datepicker-year div{display:flex;align-items:center;justify-content:center}#datepicker-year p{padding:0;margin:0}#datepicker-mounth{border-bottom:1px solid #19a979;display:grid;grid-template-columns:1fr 3fr 1fr;grid-area:mounth}#datepicker-mounth div{display:flex;align-items:center;justify-content:center}#datepicker-mounth p{padding:0;margin:0}#datepicker-day{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;grid-area:day}#datepicker-day div{transition:.3s;display:flex;align-items:center}#datepicker-day div:hover{background-color:#66c2a3;border-radius:20px;transform:scale(1.3)}#datepicker-day p{transition:.3s;font-size:13px;margin:0 auto;padding:0;text-align:center}#datepicker-day p:hover{transform:scale(1.3)}.datapicker-arrow{transition:.3s;font-size:22px;margin:0;padding:0}.datapicker-arrow-div{transition:.3s}.datapicker-arrow-div:hover{transform:scale(1.05);background-color:#66c2a3;border-radius:30px}",datePickerBody.id="datepicker-body",datePickerBody.style.display="none",datePickerBody.style.position="absolute",datePickerBody.innerHTML="\t<div id='datepicker-year'></div><div id='datepicker-mounth'></div>\t<div id='datepicker-day'></div>",document.body.appendChild(datePickerBody),document.head.appendChild(datePickerStyle);let datepickerInput=document.getElementById("datePicker");function getOffsetSumTop(e){let t=0;for(;e;)t+=parseInt(e.offsetTop),e=e.offsetParent;return t}function getOffsetSumLeft(e){let t=0;for(;e;)t+=parseInt(e.offsetLeft),e=e.offsetParent;return t}let datepickerYearDiv=document.getElementById("datepicker-year"),datepickerMounthDiv=document.getElementById("datepicker-mounth"),datepickerDayDiv=document.getElementById("datepicker-day");for(let e=0;e<31;e++)datepickerDayDiv.innerHTML=datepickerDayDiv.innerHTML+'<div onclick="pickDay('+e+')"><p>'+(e+1)+"</p></div>";datepickerYearDiv.innerHTML='<div onclick="leftYear()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8249</p></div><div><p></p></div><div onclick="rightYear()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8250;</p></div>',datepickerMounthDiv.innerHTML='<div onclick="leftMounth()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8249</p></div><div><p></p></div><div onclick="rightMounth()" class="datapicker-arrow-div"><p class="datapicker-arrow">&#8250;</p></div>';let datepickerYear=datepickerYearDiv.firstElementChild.nextElementSibling.firstElementChild,datepickerDate=new Date;datepickerYear.innerText=datepickerDate.getFullYear();let datepickerLeftYear=datepickerYearDiv.firstElementChild;function leftYear(){datepickerYear.innerText=Number(datepickerYear.innerText)-1,dpInputArr[2]=Number(datepickerYear.innerText),datepickerInput.value=dpInputArr[0]+" "+dpInputArr[1]+" "+dpInputArr[2]}function rightYear(){datepickerYear.innerText=Number(datepickerYear.innerText)+1,dpInputArr[2]=Number(datepickerYear.innerText),datepickerInput.value=dpInputArr[0]+" "+dpInputArr[1]+" "+dpInputArr[2]}let datepickerMounth=datepickerMounthDiv.firstElementChild.nextElementSibling.firstElementChild,datepickerMounthArr=["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];function leftMounth(){--dpIteratorMounth<0&&(dpIteratorMounth=11),datepickerMounth.innerText=datepickerMounthArr[dpIteratorMounth],dpInputArr[1]=datepickerMounthArr[dpIteratorMounth],datepickerInput.value=dpInputArr[0]+" "+dpInputArr[1]+" "+dpInputArr[2]}datepickerMounth.innerText=datepickerMounthArr[Number(datepickerDate.getMonth())];let dpIteratorMounth=Number(datepickerDate.getMonth());function rightMounth(){++dpIteratorMounth>11&&(dpIteratorMounth=0),datepickerMounth.innerText=datepickerMounthArr[dpIteratorMounth],dpInputArr[1]=datepickerMounthArr[dpIteratorMounth],datepickerInput.value=dpInputArr[0]+" "+dpInputArr[1]+" "+dpInputArr[2]}let dpInputArr=["",datepickerMounthArr[Number(datepickerDate.getMonth())],datepickerDate.getFullYear()];function pickDay(e){dpInputArr[0]=datepickerDayDiv.children[e].firstElementChild.innerText,datepickerInput.value=dpInputArr[0]+" "+dpInputArr[1]+" "+dpInputArr[2],datePickerBody.style.display="none"}datepickerInput.onfocus=function(){datePickerBody.style.left=getOffsetSumLeft(datepickerInput)+"px",datePickerBody.style.top=getOffsetSumTop(datepickerInput)+datepickerInput.offsetHeight+10+"px",""==datepickerInput.value?(datePickerBody.style.display="",datepickerInput.value=dpInputArr[1]+" "+dpInputArr[2]):datePickerBody.style.display=""};