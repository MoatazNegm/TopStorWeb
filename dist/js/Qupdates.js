var allversions = ['init'];
var cversion = 'init';
$(".checkboxy").css("margin-top","0.36rem");
$(".form-check").css("margin-bottom","0.6rem");
function sortsofts(){
var options = $('#softs option');
var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
arr.sort(function(o1, o2) { return o1.t < o2.t ? 1 : o1.t > o2.t ? -1 : 0; });
options.each(function(i, o) {
  o.value = arr[i].v;
  $(o).text(arr[i].t);
});
}
sortsofts();



function getversions(){
  var newallusers;
  var newallversions = "";

   $.ajax({
     url: '/api/v1/software/versions',
     dataType: 'json',
     data: { 'token': hypetoken },
     timeout: 3000,
     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
     type: 'GET',
     async: false,
     success: function(data){ cversion = data['current'];
                               newallversions = data['versions'];
			       console.log('current_version',data['current'])
				}
   });
   if(JSON.stringify(allversions) != JSON.stringify(newallversions)){
     allversions = JSON.parse(JSON.stringify(newallversions)); 
     $('.select2.versions option').remove();
     $.each(allversions,function(e,t){
        $("#softs").append("<option>"+t['text']+"</option>")
     });
   }

     $('#soft').text(cversion);
 }
 
 $("#ApplyAvailableSW").click(function(e){

  apiurl = 'api/v1/software/apply';
  apidata = {'version': $('#softs').val().split(',')[0] }
  console.log('apiapi',apidata)
  postdata(apiurl,apidata)
     
 })

 $("#DownloadHTTPs").click(function(e){
  e.preventDefault();
  var apiurl = "/api/v1/software/update";
  var apidata = {
    "source-type": "https", 
    "source":  $("#sourceHttps").val()
  }

  postdata(apiurl, apidata);
});
 
$("#DownloadNFS").click(function(e){
  e.preventDefault();
  var apiurl = "/api/v1/software/update";
  var apidata = {
    "source-type": "nfs", 
    "source":  $("#sourceNFS").val(), 
    "location": $("#locationNFS").val(), 
    "version": $("#versionNFS").val()
  }

  postdata(apiurl, apidata);
});

$("#DownloadCIFS").click(function(e){
  e.preventDefault();
  var apiurl = "/api/v1/software/update";
  var apidata = {
    "source-type": "cifs", 
    "source": $("#sourceCIFS").val(), 
    "location": $("#locationCIFS").val(), 
    "version": $("#versionCIFS").val(),  
    "username": $("#usernameCIFS").val(), 
    "password": $("#passwordCIFS").val()
  }

  postdata(apiurl, apidata);
});

$("#DownloadLocal").click(function(e){
  e.preventDefault();
  var apiurl = "/api/v1/software/update";
  var apidata = {
    "source-type": "local", 
    "source":  $("#localDirectory").val(), 
    "version": $("#localVersion").val()
   }

  postdata(apiurl, apidata);
});

 updatetasks();
 getversions();
 //setInterval(function(){ updatetasks(); getversions();},10000);

  
