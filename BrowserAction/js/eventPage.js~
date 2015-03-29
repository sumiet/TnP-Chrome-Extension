var XMLHttpRequestObject = false;
var count;
try
{
    // Opera 8.0+, Firefox, Safari
    XMLHttpRequestObject = new XMLHttpRequest();
}catch (e)
{
   // Internet Explorer Browsers
   try
   {
      XMLHttpRequestObject = new ActiveXObject("MSXML2.XMLHTTP");
   }catch (e)
   {
      try
      {
         XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
      }catch (e)
      {
         // Something went wrong
         XMLHttpRequestObject = false;
         alert("Your browser broke!");
      }
   }
}
setInterval(function(){getData("https://bitmesra.ac.in/phpcon/process.php");},900000);

function getData(dataSource)
{
    if(XMLHttpRequestObject)
    {
        XMLHttpRequestObject.open("GET",dataSource);
        XMLHttpRequestObject.onreadystatechange = function()
        {

            if(XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
            {
                var jsontext = XMLHttpRequestObject.responseText;
                var myJsonObj = JSON.parse(jsontext);
                for (var i = 0; i < myJsonObj.length ; i++) {
                    compareTimeStamp(localStorage.getItem("timeStamp"),myJsonObj[i].time_stamp);
		     
                }
		//alert(localStorage.getItem("count"));
		if(parseInt(localStorage.getItem("count"))>0){
                	chrome.browserAction.setBadgeText({text: localStorage.getItem("count")});
			localStorage.setItem("count","0");
		}
		//console.log("15");

            }
        }
        XMLHttpRequestObject.send(null);
    }
}

function compareTimeStamp(timestamp1,timestamp2){
	//timestamp1 = "Jan 16 2015  12:00PM";
	//alert(timestamp1);
	//alert(timestamp2);
	var time1=timestamp1.split(" ");
	var time2=timestamp2.split(" ");
	var month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var year1=(time1[2]);
	var year2=(time2[2]);
	var month1=(month.indexOf(time1[0]));
	var month2=(month.indexOf(time2[0]));
	var day1=(time1[1]);
	var day2=(time2[1]);
	var hour1=time1[4];
	if(time2[3]=='')
		var hour2=time2[4];
	else
		var hour2=time2[3];
	var hour11=hour1.split(":");
	var hour22=hour2.split(":");
	console.log(timestamp1);
	console.log(timestamp2);
	//alert(hour22);
	if(parseInt(hour11[0])==12){
		hour11[0]="0";	
	}
	if(parseInt(hour22[0])==12){
		hour22[0]="0";	
	}
	if(parseInt(year1)>parseInt(year2)){
		//console.log(year1,year2);
		return 0;
	}
	else if(parseInt(year1)<parseInt(year2)){
		count=parseInt(localStorage.getItem("count"));
		count++;		
		localStorage.setItem("count",count.toString());
		//console.log(count);
		return 0;
	}
	else if(parseInt(month1)>parseInt(month2)){
		//console.log(month1,month2);
		return 0;
	}
	else if(parseInt(month1)<parseInt(month2)){
		count=parseInt(localStorage.getItem("count"));
		count++;		
		localStorage.setItem("count",count.toString());
		//console.log(count);
		return 0;
	}
	else if(parseInt(day1)>parseInt(day2)){
		//console.log(day1,day2);
		return 0;
	}
	else if(parseInt(day1)<parseInt(day2)){
		count=parseInt(localStorage.getItem("count"));
		count++;		
		localStorage.setItem("count",count.toString());
		//console.log(count);
		return 0;
	}
	else if(hour11[1].match("PM") && hour22[1].match("AM")){
		//console.log("PM AM");		
		return 0;
	}
	else if(hour11[1].match("AM") && hour22[1].match("PM")){
		count=parseInt(localStorage.getItem("count"));
		count++;		
		localStorage.setItem("count",count.toString());
		//console.log(count);		
		return 0;
	}
	else if(parseInt(hour11[0])>parseInt(hour22[0])){
		//console.log(hour11[0],hour22[0]);
		return 0;
	}
	else if(parseInt(hour11[0])<parseInt(hour22[0])){
		count=parseInt(localStorage.getItem("count"));
		count++;		
		localStorage.setItem("count",count.toString());
		//console.log(count);
		return 0;
	}
	else if(hour11[1]>hour22[1]){
		//console.log(hour11[1],hour22[1]);
		return 0;
	}
	else{
		count=parseInt(localStorage.getItem("count"));
		count++;		
		localStorage.setItem("count",count.toString());
		//console.log(count);
		return 0;		
	}
}
function timeStamp() {
  var now = new Date();
  var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var date = [ month[now.getMonth()], now.getDate(), now.getFullYear() ];
  var time = [ now.getHours(), now.getMinutes()];
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;
  for ( var i = 1; i < 2; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
  return date.join(" ") + "  " + time.join(":") + suffix;
}
chrome.runtime.onInstalled.addListener(function(details){
	localStorage.setItem("timeStamp","Dec 21 2012  12:00AM");
	localStorage.setItem("count","0");
        getData("https://bitmesra.ac.in/phpcon/process.php");
});
