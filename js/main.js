var data = ["Cardio","Speed 1.0","Total Body Circuit","AB Intervals","Cardio & Lower Focus","Log Weight","Stretch","Cardio","Total Body Circuit","Speed 1.0","Cardio","Lower Focus & AB Intervals","Log Weight","Stretch","Total Body Circuit","Speed 1.0","Lower Focus","Cardio","Total Body Circuit & AB Intervals","Log Weight","Stretch","Cardio","Total Body Circuit","Lower Focus","Total Body Circuit","AB Intervals & Speed 1.0","Log Weight","Stretch","Total Body Circuit","AB Intervals","Total Body Circuit","Cardio","Total Body Circuit & Lower Focus","Log Weight","Stretch","Core Cardio","Speed 2.0","Ript Circuit","Dynamic Core","Upper Focus & Core Cardio","Log Weight","Stretch","Dynamic Core","Core Cardio","Ript Circuit","Upper Focus","Ript Circuit & Speed 2.0","Log Weight","Stretch","Core Cardio","Upper Focus","Speed 2.0","Ript Circuit","Dynamic Core & Speed 2.0","Log Weight","Stretch","Ript Circuit","Dynamic Core","Core Cardio","Dynamic Core","Speed 2.0 & Upper Focus","Log Weight","Stretch","Ript Circuit","Core Cardio","Ript Circuit","Dynamic Core","Ript Circuit & Speed 2.0","Log Weight","Stretch","Speed 3.0","Ript Up","Extreme Circuit","The Pyramid","Speed 3.0","Log Weight","Stretch","Ript Up","Extreme Circuit","Speed 3.0","The Pyramid","Ript Up","Log Weight","Stretch","The Pyramid","Speed 3.0","Ript Up","Extreme Circuit","the Pyramid","Log Weight","Stretch","Extreme Circuit","Ript Up","Speed 3.0","The Pyramid","Extreme Circuit"];

var diffInDays;

function setCookie(cname, cvalue, months) {
    var d = new Date();
    d.setMonth(d.getMonth() + months);
    document.cookie = cname +"=" + cvalue + ";expires=" + d.toUTCString()
                  + ";domain=." + window.location.hostname +";path=/";
}

function updateCookie(cname, cvalue) {
    setCookie(cname,cvalue,12);
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
        
        // alpha progress
        if(diffInDays < 34){
            var alphaComplete = Math.ceil((diffInDays/34)*100);
            $('#alphaprogress').html('<div class="progress-bar" role="progressbar" aria-valuenow="'+alphaComplete+'" aria-valuemin="0" aria-valuemax="100" style="width:'+alphaComplete+'%">'+alphaComplete+'%</div>');
        } else {
            // congratulate
            //TODO
            $('#alphaprogress').html('<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="34" style="width:100%">100%</div>');
        }
        
        // beta progress
        if(diffInDays > 34) {
            if(diffInDays < 69){
                var betaComplete = Math.ceil(((diffInDays-34)/34)*100);
                $('#betaprogress').html('<div class="progress-bar" role="progressbar" aria-valuenow="'+betaComplete+'" aria-valuemin="0" aria-valuemax="100" style="width:'+betaComplete+'%">'+betaComplete+'%</div>');
            } else {
                // congratulate
                //TODO
                $('#betaprogress').html('<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="34" aria-valuemin="0" aria-valuemax="34" style="width:100%">100%</div>');
            }
        }
        
        // gamma progress
        if(diffInDays > 69) {
            if(diffInDays < data.length) {
                var gammaComplete = Math.ceil(((diffInDays-69)/27)*100);
                $('#gammaprogress').html('<div class="progress-bar" role="progressbar" aria-valuenow="'+gammaComplete+'" aria-valuemin="0" aria-valuemax="100" style="width:'+gammaComplete+'%">'+gammaComplete+'%</div>');
            } 
        }
        // not writing else block as it wont come in here
        
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
    var startdate = getCookie("startdate");

    if(startdate == ""){
        $('#myModal').modal();
    } else {
        updateView(new Date(startdate));
    }
    
    $("#setstartdate").click(function(){
        $(".navbar-collapse").removeClass("in");
        updateCookie("startdate",parseDate($("#startdateinput").val())); 
        updateView(parseDate($("#startdateinput").val()));
    });
});