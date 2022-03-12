//input mask bundle ip address

var allhosts= {};
var selectedhost = {};
var hoststata = ['ready', 'active', 'possible', 'lost'];
$.each(hoststata, function(e,t){
  selectedhost[t] = '-1';
  allhosts[t] = [];
});
var hostsinfo = 'init';

$("#BoxName").inputmask('Regex', {regex: '(.*[a-z]){3}', "clearIncomplete": true });
function refreshhosts(){
  $.ajax({
    url: 'api/v1/hosts/allinfo',
    async: true,
    type: 'GET',
    success: function(data) {  newhostref(data); }
  });
 }
function newhostref(newhosts){
  if(JSON.stringify(hostsinfo) !=  JSON.stringify(newhosts['all'])) {
    hostsinfo = JSON.parse(JSON.stringify(newhosts['all']));
    $.each(hoststata, function (e,status){
      allhosts[status] = 'reinit';
    })
  }
  $.each(hoststata, function(hoststataid, status){
    if(JSON.stringify(allhosts[status]) !=  JSON.stringify(newhosts[status])){
      $(".hosts"+status).remove();
      allhosts[status] = JSON.parse(JSON.stringify(newhosts[status]));
      hosts = allhosts[status];
      var imgstatus;
      $.each(hosts,function(e,host){
        imgstatus = 'On';
        if( status == 'active' && JSON.stringify(newhosts['lost']).includes(host.name) ){
          imgstatus = 'Off';
        }

        $("#hosts"+status).append(
          '<div id="'+host.name+'" class="hosts'+status+' col-2 '+host.name+'"> ' 
          +'  <div onclick="memberclick(this,\''+status+'\')" class="img-clck '+e+'" data-htname="'+e+'"> '
          +'   <img class="img-responsive server '+status+ 'SelectedFreewhite" style="object-fit:cover; max-width:80%;" ' 
          +'   class="server" src="dist/img/Server1-'+imgstatus+'.png" /> '
          +'   <p class="psize1" style="font-size: 0.7rem; color:green;">'+host.name+':'+host.ip+'</p>'
          +'  </div>'
          +'</div>'
        );
      });
      updaterunninghosts(status);
      if(selectedhost[status] !='-1'){
        memberclick($(".runninghost"+selectedhost[status]));
      }
    

    }
  });

  
  var newhosts="init";
 
  
 
}

refreshhosts();

function updaterunninghosts(status){
  if(status=='ready'){
    if (selectedhost[status]=="-1"){
      $("#cBoxName").css("font-size","0.8rem").text("select a node...");
      $("#cIPAddress").css("font-size","0.8rem").text("select a node...");
      $("#cMgmt").css("font-size","0.8rem").text("select a node...");
      $("#cTZ").css("font-size","0.8rem").text("select a node...");
      $("#cNTP").css("font-size","0.8rem").text("select a node...");
      $("#cGW").css("font-size","0.8rem").text("select a node...");
      $("#customSwitch1").prop('checked',false);
      $(".runningnodes").attr('disabled','disabled')
    } else {
      var hostdata = hostsinfo[allhosts[status][selectedhost[status]]['name']]
      $(".runningnodes").attr('disabled', false)
      $("#cBoxName").text(hostdata['alias']);
      $("#cIPAddress").text(hostdata['ipaddr']+'/'+hostdata['ipaddrsubnet']);
      $("#cMgmt").text(hostdata['cluster']);
      try {
      $("#cTZ").text(hostdata['tz'].split('%')[1].replace('!',':').replace(/\^/g,',').replace(/_/g,' '));
       } catch {
          $("#cTZ").text('not set yet');
      }
      $("#cNTP").text(hostdata['ntp']);
      $("#cGW").text(hostdata['gw']);
      if (hostdata['configured'] == 'no') { $("#customSwitch1").prop('checked',true);}
      else{ $("#customSwitch1").prop('checked',false); }
      $("#readysubmit").data('selected',selectedhost[status])
      
    
    }
  }
}

function memberclick(thisclck,status){
    hname=$(thisclck).attr('data-htname');
    selectedhost[status]=hname;

    if($(thisclck).children('img').hasClass("SelectedFreered") > 0 ) {
        $(thisclck).children('img').removeClass("SelectedFreered")
        $(thisclck).children('img').addClass("SelectedFreewhite");
        selectedhost[status]="-1";
        $(".collapse").collapse('hide');
        updaterunninghosts(status);
        $("#"+status+"submit").attr('disabled',true);
    } else {
      $('img.server').removeClass("SelectedFreered")
      $('img.server').addClass("SelectedFreewhite");
      $(thisclck).children('img').removeClass("SelectedFreewhite")
      $(thisclck).children('img').addClass("SelectedFreered");
      updaterunninghosts(status);
      $("#"+status+"submit").attr('disabled',false);
      if((allhosts.ready.length - allhosts.possible.length) < 2){ $("#activesubmit").attr('disabled',true);}
      if($(thisclck).children('img').prop('src').includes('Off') > 0){ $("#activesubmit").attr('disabled',false);}
    }
  //thisclck.preventDefault();
}

function evacuate(){
  var host = selectedhost['active'];
  var apiurl = "api/v1/hosts/evacuate";
  var apidata = {"name": allhosts['active'][host]['name']}
  postdata(apiurl,apidata);
  
}

$("#possiblesubmit").click(function(e){
  var host = selectedhost['possible'];
  var apiurl = "api/v1/hosts/joincluster";
  var apidata = {"name": allhosts['possible'][host]['name']}
  postdata(apiurl,apidata);
  
});

$("#readysubmit").click(function (ev){ 
  ev.preventDefault();
  var tochange = 0;
  var selstatus = $("#readysubmit").data('selected')
  hostdata = hostsinfo[allhosts['ready'][selstatus]['name']]
  var hostconfig  = JSON.parse(JSON.stringify(hostdata)); 
  
  hostsubmit = {};
  
  if($("#BoxName").val().length > 3 && $("#BoxName").val() != hostconfig['alias'] ) {
    hostsubmit['alias'] = $("#BoxName").val();
    tochange = 1;
  }
  if($("#IPAddress").val().length > 3 && $("#IPAddress").val().includes('__') < 1 && $("#IPAddress").val() != hostconfig['ipaddr']){
    hostsubmit['ipaddr'] = $("#IPAddress").val();
    hostsubmit['ipaddrsubnet'] = $("#ipaddrsubnet").val()
    tochange = 1;
  }
  if( $("#ipaddrsubnet").val() != hostconfig['ipaddrsubnet']){
    if($("#IPAddress").val().length > 3 && $("#IPAddress").val().includes('__') < 1 ){
      hostsubmit['ipaddr'] = $("#IPAddress").val();
      hostsubmit['ipaddrsubnet'] = $("#ipaddrsubnet").val()
      tochange = 1;
    }
  }
  if($("#Mgmt").val().length > 3 && $("#Mgmt").val().includes('__') < 1 && ($("#Mgmt").val()+'/'+$("#MgmtSub").val())
   != hostconfig['cluster'] ) {
    hostsubmit["cluster"] = $("#Mgmt").val()+'/'+$("#MgmtSub").val();
    tochange = 1;
  }
  
   
  if( $("#TZ").val() != '-100' ){ 
      var tzflag = 0
      try {  
       if($("#TZ option:selected").text() != 
        hostconfig['tz'].split('%')[1].replace('!',':').replace(/\^/g,',').replace(/_/g,' ')) {
          tzflag = 1
         }
      } catch {
          tzflag = 1
      }
      if(tzflag > 0){

    hostsubmit["tz"] = $("#TZ option:selected").attr('city')+'%'+
         $("#TZ option:selected").text().split(' ').join('_').split(',').join('^').split(':').join('!');
    tochange = 1;
    }
  }
  if($("#NTP").val().length > 3 && $("#NTP").val().includes('__') < 1 && $("#NTP").val() != hostconfig['ntp']) {
    hostsubmit["ntp"] = $("#NTP").val();
    tochange = 1;
  }
  if($("#NTPname").val().length > 3 && $("#NTPname").val() != hostconfig['ntp']) {
    hostsubmit["ntp"] = $("#NTPname").val();
    tochange = 1;
  }
  if($("#GW").val().length > 3 && $("#GW").val().includes('__') < 1 && $("#GW").val() != hostconfig['gw']) {
    hostsubmit["gw"] = $("#GW").val();
    tochange = 1;
  }
  if($("#customSwitch1").prop('checked') == false && hostconfig['configured'] == 'no'){
    hostsubmit["configured"] = 'yes';
    tochange = 1;
  }
  if($("#customSwitch1").prop('checked') == true && hostconfig['configured'] != 'no') {
    hostsubmit["configured"] = 'no';
    tochange = 1;
  }
  if(tochange > 0){
    hostsubmit['id'] = $("#readysubmit").data('selected');
    hostsubmit["user"] = 'mezo';
    hostsubmit['name'] = allhosts['ready'][selstatus]['name'];
    var apiurl = 'api/v1/hosts/config';
    var apidata = hostsubmit;
    postdata(apiurl,apidata);
  }
  
});



setInterval(function(){
  updatetasks();
  $("#runninghosts > form > div:nth-child(5) > span > span.selection > span").css('margin-top','0.1rem');
  $('#runninghosts > form > div:nth-child(5) > span > span.selection > span').css('height','97%');
  $('#select2-TZ-container').css('margin-top','0.2rem');
  $('#runninghosts > form > div:nth-child(5) > span > span.selection > span > span.select2-selection__arrow').css('margin-top','0.2rem');

  refreshhosts();
 
},5000);



var example1_filter = $("#example1_filter");
$("#example1").DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
    "order": [[ 1, "desc" ]],
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#example1_wrapper .col-6:eq(0)');
  $("#example1_filter").css("margin-left","10rem");
//$("#example1_filter").css("margin-left","10rem");
