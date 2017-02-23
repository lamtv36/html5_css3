function relStyle(id){
    document.styleSheets
}
//debugger;
function setTypeCalendar(id){
}

function View(){
    var MONTH_YEAR_NAME = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                                    'August', 'September', 'October', 'November', 'December'];
    var NUM_DAY_MONTHS = function(month) {
        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 0: return 31;
            case 2: return 28;//todo: nam nhuan
            case 4:
            case 6:
            case 9:
            case 11:return 30;
            default: throw new Error(month + "not exist in years");
        }
    }
    var curentTime = new Date();
    var curentMonth = curentTime.getMonth();
    var curentDay = curentTime.getTime();
    curentTime.activeDay = curentTime.getDate();
    var calendarView = function(time){
        var year = time.getFullYear();
        var month = time.getMonth();
        var day = time.getDate();
        var dow = new Date(year, month, 1).getDay();
        var activeDay = time.activeDay;
        var isSetActiveDay = false;
        var isSetCurent = false;
        if(dow==0){
            dow = 7;
        }
        // set calendar title
        var calendarTitle = document.getElementById("year");
        calendarTitle.innerHTML = MONTH_YEAR_NAME[month%12] + " - " + year;
        // input days
        var lastDOM = NUM_DAY_MONTHS((month)%12);
        var i, li, att, tmp, newDay;
        var daysTag = document.getElementsByClassName("days");
        tmp = lastDOM - dow;
        var currentTime = new Date();
        var currentMonth = currentTime.getMonth();
        for(i = 0; i < 42; i++){
            newDay = ((i + tmp) % (lastDOM)) + 1;
            if(newDay == lastDOM){
                lastDOM = NUM_DAY_MONTHS((++month)%12)
                tmp = -i-1;
            }
            li = daysTag[0].children[i];
            if(li.hasAttribute("class")){
                li.removeAttribute("class");
            }
            if(li.hasAttribute("id") && li.getAttribute('id') == "activeDay"){
                li.removeAttribute('id');
            }
            if(month == currentMonth + 1 && day == newDay){
                att = document.createAttribute("class");
                att.value = "current";
                li.setAttributeNode(att);
            }

            if(newDay == activeDay && !isSetActiveDay){
                isSetActiveDay = !isSetActiveDay;
                att = document.createAttribute("id");
                att.value = "activeDay";
                li.setAttributeNode(att);
            }
            li.innerHTML = newDay;
        }
    }
    this.nextMonth = function(){
        console.log("next");
        var month = curentTime.getMonth() + 1;
        curentTime.setMonth(month);
        curentTime.activeDay = 1;
        calendarView(curentTime);
        }

    this.prevMonth = function(){
        console.log("prev");
        var month = curentTime.getMonth() - 1;
        curentTime.setMonth(month);
        calendarView(curentTime);
        curentTime.activeDay = 1;
    }
    calendarView(curentTime);

    function setDayActive(e){
        var clickedElement=(window.event)
                        ? window.event.srcElement
                        : e.target,
        tags=document.getElementsByTagName(clickedElement.tagName);
        var parentNode = clickedElement.parentNode
        if((!parentNode.hasAttribute("class")) || (parentNode.getAttribute("class") != "days")) {
            return;
        }
        
        var dayActive = document.getElementById("activeDay");
        dayActive.removeAttribute("id");
        var att = document.createAttribute("id");
        att.value = "activeDay";
        clickedElement.setAttributeNode(att);
    }
    document.onclick = setDayActive;

    function convertSunToMoon(time)
    {
        // todo: convert sun time to moon time
    }
}

var view = new View();
document.getElementById("next").addEventListener("click", view.nextMonth);
document.getElementById("prev").addEventListener("click", view.prevMonth);