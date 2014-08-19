/*Copyright Sumit Agarwal and Koushik MLN , before using any of the 
content available here do take permissions by writing us at sumagarwal93@gmail.com*/

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
                var table= document.getElementById("updates");
                for (var i = 0; i < 5 ; i++) {
                    var row = document.createElement("tr");
                    row.setAttribute('class','notice');
                    var sno= document.createElement("td");
                    var notice= document.createElement("td");
                    var link = document.createElement("a");
                    document.body.appendChild(table);
                    table.appendChild(row);
                    row.appendChild(sno);
                    sno.innerHTML=i+1;
                    row.appendChild(notice);
                    notice.appendChild(link);
                    link.setAttribute('href',"https://bitmesra.ac.in/student/"+myJsonObj[i].link);
                    link.setAttribute('target',"_blank");
                    link.innerHTML=myJsonObj[i].topic;
                  };
                  var footer = document.createElement("h4");
                  document.body.appendChild(footer);
                  footer.innerHTML="<center style='color:#999;'>Developed by Sumit Agarwal(2k11) & Koushik MLN(2k12)</center>";
                  var body= document.body;
                  var loading = document.getElementById('loading');
                  body.removeChild(loading);
            }
        }
        XMLHttpRequestObject.send(null);
    }   
}

function initialize() 
{
  var loading = document.createElement('div');
  document.body.appendChild(loading);
  loading.setAttribute('id','loading');
  loading.innerHTML="<center><img src='./images/loading.gif'></center>";
  getData("http://www.litsocbitm.in/tnp/process.php");
  
}
