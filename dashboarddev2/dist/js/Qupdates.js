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
   $.ajax({
     url: '/api/v1/software/versions',
     dataType: 'json',
     timeout: 3000,
     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
     type: 'GET',
     async: false,
     DataSrc: 'usersnohome',
     success: function(data){ cversion = data['current'];
                               newallversions = data['versions'];}
   });
   if(JSON.stringify(allversions) != JSON.stringify(newallversions)){
     allversions = JSON.parse(JSON.stringify(newallversions)); 
     $('.select2.versions option').remove();
     $.each(allversions,function(e,t){
        $("#softs").append("<option>"+t['text']+"</option>")
     });
     $("#soft").text(cversion);
   }
 }
 
 $("#ApplyAvailable").click(function(e){

  apiurl = 'api/v1/software/apply';
  apidata = {'version': $('#soft').text() }
  postdata(apiurl,apidata)
     
 })
 
 getversions()
 setInterval(function(){ updatetasks(); getversions();},2000);

  
