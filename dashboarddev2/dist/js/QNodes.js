//input mask bundle ip address

var hosts=["init"];
selectedhost = "-1";

$("#BoxName").inputmask('Regex', {regex: '(.*[a-z]){3}', "clearIncomplete": true });
function refreshhosts(){
  var newhosts="init";
  $.ajax({
    url: 'api/v1/hosts/info',
    async: false,
    type: 'GET',
    success: function(data) {  newhosts=data; }
  });
  
  if( JSON.stringify(newhosts) !=  JSON.stringify(hosts)){
    $(".hosts").remove();
    hosts = newhosts;
    $.each(hosts,function(e,host){
      $("#hosts").append(
        '<div id="'+host.name+'" class="hosts col-2 '+host.name+'"> ' 
        +'  <a  href="javascript:memberclick(\''+e+'\')"  class="img-clck" data-htname="'+e+'"> '
        +'   <img class="img-responsive server SelectedFreewhite" style="object-fit:cover; max-width:80%;" ' 
        +'   class="server" src="img/Server1-On.png" /> '
        +'   <p class="psize1" style="font-size: 0.7rem; color:green;">'+host.name+':'+host.ip+'</p>'
        +'  </a>'
        +'</div>'
      );
      $("#hosts").append(
        '<div id="'+host.name+'2" class="hosts col-2 '+host.name+'"> ' 
        +'  <a  href="javascript:memberclick(\''+e+'\')"  class="img-clck" data-htname="'+e+'"> '
        +'   <img class="img-responsive server SelectedFreewhite" style="object-fit:cover; max-width:80%;" ' 
        +'   class="server" src="img/Server1-On.png" /> '
        +'   <p class="psize1" style="font-size: 0.7rem; color:green;">'+host.name+':'+host.ip+'</p>'
        +'  </a>'
        +'</div>'
      );
    });
    updaterunninghosts();
  }
}

refreshhosts();

function updaterunninghosts(){
  if (selectedhost=="-1"){
    $("#cBoxName").css("font-size","0.8rem").text("select a node...");
    $("#cIPAddress").css("font-size","0.8rem").text("select a node...");
    $("#cMgmt").css("font-size","0.8rem").text("select a node...");
    $("#cTZ").css("font-size","0.8rem").text("select a node...");
    $("#cNTP").css("font-size","0.8rem").text("select a node...");
    $("#cGW").css("font-size","0.8rem").text("select a node...");
    $(".runningnodes").attr('disabled','disabled')
  } else {
    $(".runningnodes").attr('disabled', false)
    $("#cBoxName").text(hosts[selectedhost]['name']);
    $("#cIPAddress").text(hosts[selectedhost]['ip']);
    $("#cMgmt").text(hosts[selectedhost]['cluster']);
    $("#cTZ").text(hosts[selectedhost]['tz']);
    $("#cNTP").text(hosts[selectedhost]['ntp']);
    $("#cGW").text(hosts[selectedhost]['gw']);
   
  }
}

function memberclick(thisclck){
    hname=$(thisclck).attr('data-htname');
    selectedhost=hname
    console.log('hname',selectedhost)

    if($(thisclck).children('img').hasClass("SelectedFreered") > 0 ) {
        $(thisclck).children('img').removeClass("SelectedFreered")
        $(thisclck).children('img').addClass("SelectedFreewhite");
        selectedhost="-1";
        $(".collapse").collapse('hide');
        updaterunninghosts();
        $("#RhostForget").attr('disabled',true);
    } else {
      $('img.server').removeClass("SelectedFreered")
      $('img.server').addClass("SelectedFreewhite");
      $(thisclck).children('img').removeClass("SelectedFreewhite")
      $(thisclck).children('img').addClass("SelectedFreered");
      updaterunninghosts();
        $("#RhostForget").attr('disabled',false);
       
    }
}

$(".img-clck").click(function(ev) {
  memberclick(this);
  ev.preventDefault();
});

$("#DNSsubmit").click(function (ev){ 
  ev.preventDefault();
  var tochange = 0;
  var hostconfig  = JSON.parse(JSON.stringify(hosts[selectedhost])); 
  hostconfig['id'] = selectedhost;
  if($("#BoxName").val().length > 3 && $("#BoxName").val() != hostconfig['name'] ) {
    hostconfig['alias'] = $("#BoxName").val();
    tochange = 1;
  }
  if($("#IPAddress").val().length > 3 && $("#IPAddress").val().includes('__') < 1 && $("#IPAddress").val() != hostconfig['ip']){
    hostconfig['ip'] = $("#IPAddress").val();
  }
  if($("#Mgmt").val().length > 3 && $("#Mgmt").val().includes('__') < 1 && $("#Mgmt").val() != hostconfig['cluster'] ) {
    hostconfig["cluster"] = $("#Mgmt").val();
    tochange = 1;
  }
  if( $("#TZ").val() != '-100'  && $("#TZ").val() != hostconfig['tz']) {
    console.log('hi')
    hostconfig["tz"] = $("#TZ option:selected").attr('city')+'%'+$("#TZ option:selected").text().split(' ').join('_').split(',').join('^').split(':').join('!');
    tochange = 1;
    console.log('I am here');
  }
  if($("#NTP").val().length > 3 && $("#NTP").val().includes('__') < 1 && $("#NTP").val() != hostconfig['ntp']) {
    hostconfig["ntp"] = $("#NTP").val();
    tochange = 1;
  }
  if($("#GW").val().length > 3 && $("#GW").val().includes('__') < 1 && $("#GW").val() != hostconfig['gw']) {
    hostconfig["gw"] = $("#GW").val();
    tochange = 1;
  }
  if(tochange > 0){
    hostconfig["user"] = 'mezo';
    var apiurl = 'api/v1/host/config';
    var apidata = hostconfig;
    postdata(apiurl,apidata);
  }
  
});

var example1_filter = $("#example1_filter");
$("#example1").DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
    "order": [[ 1, "desc" ]],
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#example1_wrapper .col-6:eq(0)');
  $("#example1_filter").css("margin-left","10rem");
//$("#example1_filter").css("margin-left","10rem");
