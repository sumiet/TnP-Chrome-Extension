document.addEventListener('DOMContentLoaded', function () {
  initialize();
});

var XMLHttpRequestObject = false;
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
                var content= document.getElementById("content");
                var table= document.getElementById("updates");
                for (var i = 0; i < myJsonObj.length ; i++) {
                    var row = document.createElement("tr");
                    row.setAttribute('class','notice');
                    var sno= document.createElement("td");
                    var notice= document.createElement("td");
                    var link = document.createElement("a");
                    table.appendChild(content);
                    content.appendChild(row);
                    row.appendChild(sno);
                    sno.innerHTML=i+1;
                    row.appendChild(notice);
                    notice.appendChild(link);
                    link.setAttribute('href',"https://bitmesra.ac.in/student/default.asp");
                    link.setAttribute('target',"_blank");
                    link.innerHTML=myJsonObj[i].topic;
                  };

                  var footer = document.createElement("h6");
                  document.body.appendChild(footer);
                  footer.innerHTML="<center style='color:#999;'>Developed by Sumit Agarwal(2k11) & Koushik MLN(2k12)</center>";
                  $('#updates').DataTable({
                      ordering:false,
                      searching:false,
                      pageLength:5,
                      lengthChange:false
                    });
                  var body= document.body;
                  var loading = document.getElementById('loading');
                  body.removeChild(loading);
                  $('#tab').css({visibility:'visible'});
            }
        }
        XMLHttpRequestObject.send(null);
    }   
}

function initialize() 
{ 
  localStorage.setItem("timeStamp",timeStamp());
  localStorage.setItem("count","0");
  chrome.browserAction.setBadgeText({text: ''});
  //console.log(localStorage.getItem("timeStamp"));
  var loading = document.createElement('div');
  document.body.appendChild(loading);
  loading.setAttribute('id','loading');
  loading.innerHTML="<center><img src='./images/loading.gif'></center>";
  getData("https://bitmesra.ac.in/phpcon/process.php");
  
}
    
