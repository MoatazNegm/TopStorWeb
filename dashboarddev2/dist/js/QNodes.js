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
    async: false,
    type: 'GET',
    success: function(data) {  newhosts=data; }
  });

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
      $(".runningnodes").attr('disabled','disabled')
    } else {
      var hostdata = hostsinfo[allhosts[status][selectedhost[status]]['name']]
      $(".runningnodes").attr('disabled', false)
      $("#cBoxName").text(hostdata['alias']);
      $("#cIPAddress").text(hostdata['ip']);
      $("#cMgmt").text(hostdata['cluster']);
      $("#cTZ").text(hostdata['tz'].split('%')[1].replace('!',':').replace(/\^/g,',').replace(/_/g,' '));
      $("#cNTP").text(hostdata['ntp']);
      $("#cGW").text(hostdata['gw']);
      $("#DNSsubmit").data('selected',selectedhost[status])
      
    
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
        $("#RhostForget").attr('disabled',true);
    } else {
      $('img.server.'+status).removeClass("SelectedFreered")
      $('img.server'+status).addClass("SelectedFreewhite");
      $(thisclck).children('img').removeClass("SelectedFreewhite")
      $(thisclck).children('img').addClass("SelectedFreered");
      updaterunninghosts(status);
        $("#RhostForget").attr('disabled',false);
       
    }
  //thisclck.preventDefault();
}

function evacuate(){
  var host = selectedhost['active'];
  var apiurl = "api/v1/hosts/evacuate";
  var apidata = {"name": allhosts['active'][host]['name'], "Myname":"mezo"}
  postdata(apiurl,apidata);
  
}

$("#DNSsubmit").click(function (ev){ 
  ev.preventDefault();
  var tochange = 0;
  var selstatus = $("#DNSsubmit").data('selected')
  hostdata = hostsinfo[allhosts['ready'][selstatus]['name']]
  var hostconfig  = JSON.parse(JSON.stringify(hostdata)); 
  
  hostsubmit = {};
  
  if($("#BoxName").val().length > 3 && $("#BoxName").val() != hostconfig['alias'] ) {
    hostsubmit['alias'] = $("#BoxName").val();
    tochange = 1;
  }
  if($("#IPAddress").val().length > 3 && $("#IPAddress").val().includes('__') < 1 && $("#IPAddress").val() != hostconfig['ip']){
    hostsubmit['ip'] = $("#IPAddress").val();
  }
  if($("#Mgmt").val().length > 3 && $("#Mgmt").val().includes('__') < 1 && ($("#Mgmt").val()+'/'+$("#MgmtSub").val())
   != hostconfig['cluster'] ) {
    hostsubmit["cluster"] = $("#Mgmt").val()+'/'+$("#MgmtSub").val();
    tochange = 1;
  }
  if( $("#TZ").val() != '-100'  && 
      $("#TZ option:selected").text() != 
      hostconfig['tz'].split('%')[1].replace('!',':').replace(/\^/g,',').replace(/_/g,' ')) {

    hostsubmit["tz"] = $("#TZ option:selected").attr('city')+'%'+
          $("#TZ option:selected").text().split(' ').join('_').split(',').join('^').split(':').join('!');
    tochange = 1;

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
  if(tochange > 0){
    hostsubmit['id'] = $("#DNSsubmit").data('selected');
    hostsubmit["user"] = 'mezo';
    hostsubmit['name'] = allhosts['ready'][selstatus]['name'];
    var apiurl = 'api/v1/hosts/config';
    var apidata = hostsubmit;
    postdata(apiurl,apidata);
  }
  
});


setInterval(function(){refreshhosts();},5000);




var example1_filter = $("#example1_filter");
$("#example1").DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
    "order": [[ 1, "desc" ]],
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#example1_wrapper .col-6:eq(0)');
  $("#example1_filter").css("margin-left","10rem");
//$("#example1_filter").css("margin-left","10rem");
