var allusers = 'init';
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


function users(){
  var newallusers;
   $.ajax({
     url: '/api/v1/users/userlist',
     dataType: 'json',
     timeout: 3000,
     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
     type: 'GET',
     async: false,
     DataSrc: 'usersnohome',
     success: function(data){ newallusers = data['allusers'];}
   });
   if(JSON.stringify(allusers) != JSON.stringify(newallusers)) {
     allusers = JSON.parse(JSON.stringify(newallusers)); 
     $.each(allusers,function(e,v){
       allusers[e]['text'] = allusers[e]['name']
     });
     $('.select2.users option').remove();
     var selectusers = {'results':allusers}
     $('.select2.users').select2({
       placeholder: "Select a user",
       data: allusers
     });
   }
 }
 users();
 $("#SubmitPriv").click(function(e){
   var auths = []
   $.each($('.checkboxy'),function(e,t){
    if($(t).prop('checked') == true){
      auths.push($(t).data('auth'));
    }
    
   });
   console.log(auths);
   apiurl = 'api/v1/users/usersauth';
  apidata = {'user': allusers[$('#UserList').val()]['name'], 'auths':auths.join(),'token':hypetoken }
  postdata(apiurl,apidata)
     
 })

  
