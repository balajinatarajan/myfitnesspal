var diffInDays;

function setCookie(cname, cvalue, months) {
    var d = new Date();
    d.setMonth(d.getMonth() + months);
    document.cookie = cname +"=" + cvalue + ";expires=" + d.toUTCString()
                  + ";domain=." + window.location.hostname +";path=/";
}

function updateCookie(cname, cvalue) {
    document.cookie = cname +"=" + cvalue;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function updateView(startdate) {
    //init
    $("#yesterday").addClass("hide");
    $("#workout-complete-alert").addClass("hide");
    $("#workout-not-started-alert").addClass("hide");
    $("#view").addClass("hide"); 
    
    var today = new Date();
    diffInDays = Math.floor((today-startdate)/(1000*60*60*24));
    if(diffInDays >= 0 && diffInDays < data.length) {
        var completePercent = Math.ceil((diffInDays/data.length)*100);
        $('#totalprogress').html('<div class="progress-bar" role="progressbar" aria-valuenow="'+completePercent+'" aria-valuemin="0" aria-valuemax="100" style="width:'+completePercent+'%">'+completePercent+'%</div>');
        
        $("#today h1").html(data[diffInDays]);
        $("#tomorrow h4").html(data[diffInDays+1]);
        var next5days = '';
        for(i=diffInDays+1;i<(data.length > diffInDays+6 ? diffInDays+6 : data.length);i++){
            next5days += data[i] + ", ";
        }
        $("#next5days h4").html(next5days);
        if(diffInDays !=0) {
            $("#yesterday h4").html(data[diffInDays-1]);
            $("#yesterday").removeClass("hide");
        }
        $("#view").removeClass("hide");   
    } else if(diffInDays >= data.length){
        $("#workout-complete-alert").removeClass("hide");
        
        // congratulate user
        // T25 complete .. YAY
    } else {
        $("#workout-not-started-alert").removeClass("hide");
    }
}

function parseDate(str) {
    if(str.indexOf("-")!=-1){
        var mdy = str.split('-');
        return new Date(mdy[0], mdy[1]-1, mdy[2]);
    } else {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0]-1, mdy[1]);
    }
}

$(document).ready(function(){
    var startdate = getCookie("triostartdate");

    if(startdate == ""){
        $('#myModal').modal();
    } else {
        updateView(new Date(startdate));
    }
    
    $("#setstartdate").click(function(){
        $(".navbar-collapse").removeClass("in");
        updateCookie("triostartdate",parseDate($("#startdateinput").val())); 
        updateView(parseDate($("#startdateinput").val()));
    });
});