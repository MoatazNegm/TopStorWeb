//input mask bundle ip address
var refresherprop=2;
var refresheruser=2;
var userpass="hi";
var proptime="55:55:55";
var olddata=0;
var propdata='hi';
var oldproprdata="dakfj";
var proptimenew="33:333:33";
var prop={};
var prop2={};
var selprop=0
var hostips={} 
var DNS=1;
var oldcurrentinfo='dlkfajsdl;';
 var redflag="";
 var mydate;
 var tempvar;
 var allusers="init";
 var allgroups={"results": [{"id" : '0', 'text':'NoGroup'}]}
 var allpools="init";
 var selvalues={};
 var grpolddata;
 var myidhash;
 var mytimer;
 var mymodal;
 var cgrp={};
 var cuser={};
 var userlistflag=0;
 var userdata="dksfj";
 var olduserdata="ksksksks";
 var voldata='hihihi';
 var oldvoldata='n;nolnlnn';
 var volumes={'NoHome': 'NoHome'};
 var idletill=480000;
 var oldhdata="dkd";
 var oldpdata="dkedfd";
 var oldddata="dkjlf";
 var oldrdata="kfld";
 var selhosts="";
 var seldhosts="";
 var modaltill=idletill-120000
 var userlisttable;
 var myid="<?php echo $_REQUEST['myid'] ?>";
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";
var example1_filter = $("#UserList_filter");
$("#UnixAddUser").prop('disabled',true);
$("#UserPass").change(function(e){
 if($("#User").val().length > 2 && $("#UserPass").val().length > 2) { $("#UnixAddUser").prop('disabled',false); }
 else { $("#UnixAddUser").prop('disabled',true); }
});
$("#User").change(function(e){
  if($("#User").val().length > 2 && $("#UserPass").val().length > 2) { $("#UnixAddUser").prop('disabled',false); }
  else { $("#UnixAddUser").prop('disabled',true); }
 });
function groupsrefresh(){
  
  $('.select2.multiple').select2({
    ajax: {
     url: 'api/v1/users/grouplist',
     dataType: 'json',
     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
     type: 'GET',
     async: false,
   }
 });
}
function poolsrefresh(){
 
 $('.select2.pool').select2({
   ajax: {
    url: 'api/v1/pools/poolsinfo',
    dataType: 'json',
    // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
    type: 'GET',
    async: false,
  }
 });
 
}
function userlistrefresh(){
  userlisttable.ajax.reload(function(){
    var option;
    $(".usergroups").each(function(){
      var thisuser=$(this)
      var grps;
      assignedgrps = thisuser.data("grps")
      if(typeof(assignedgrps) == 'number') {
        grps = [assignedgrps];
      } else {
        grps = assignedgrps.split(',');
      }
      $.each(grps, function(e,t){
        if(t !="NoGroup") {
          var grp = allgroups["results"][t];
          option = new Option(grp.text, grp.id, true, true)
          thisuser.append(option).trigger('change');
        }
      });
      // manually trigger the `select2:select` event
      thisuser.trigger({
          type: 'select2:select',
          params: {
              allgroups: allgroups
          }

      });
      $(".chgpasswd").click(function(e){
        userofpass=$(this).data('username');
       });
    });
    groupsrefresh();
    $(".select2.usergroups").on('change',function(e){
      grpsval = $(this).data('grps').toString()
      if(grpsval == 'NoGroup') { grpsval = ''}
      if( grpsval !== $(this).val().toString() ){
        
        $("#btn"+$(this).attr('id')).show();
        $(this).data('change', $(this).val().toString());
      }
      else {
        $(this).data('change','');
        $("#btn"+$(this).attr('id')).hide();
      }
      
    });
    $(".select2.usergroups").trigger('change');

    
    
  });
}

function initUserlist(){
  userlisttable=$("#UserList").DataTable({
      //"responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
      "order": [[ 1, "desc" ]],
      //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      "ajax" : {
        url: 'api/v1/users/userlist',
        async: false,
        type: 'GET',
        dataSrc: 'allusers'
      },
      "columns": [
        {
          data: "name"
        }, {data:"pool"}, {data:"size"},
        {
          data:"groups",
          render: function(data, type, row){
            return '<select class="select2 multiple usergroups '+row.name+' form-control"' 
            + ' multiple="multiple" data-name='+row.name+'  onclick="tdisclicked(this)"' 
            + 'data-grps="'+row.groups+'" value=[0] data-change="" id="sel'+row.name+'"></select>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<button onclick="selbtnclickeduser(this)" id="btnsel'+row.name+'" '
            + 'type="button" data-name='+row.name+'  class="btn btn-primary" > update</button>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<a href="#modal-sm" data-username="'+row.name+'" data-toggle="modal" data-target="#modal-sm" class="chgpasswd">'
            + '<img src="dist/img/edit.png" alt="cannott upload edit icon">'
            + '</a>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<a class="UnixDelUser" val="username" href="javascript:auserdel(\''+row.name+'\')" >'
            + '<img  src="dist/img/delete.png" alt="cannott upload delete icon">'
            + '</a>';
          }
        },
      ],
      'columnDefs': [
        {
           'createdCell':  function (td, cellData, rowData, row, col) {
                $(td).data('grps', 'cell-' + cellData); 
            }
        }
      ]
      
    });
  userlisttable.buttons().container().appendTo('#UserList_wrapper .col-6:eq(0)');
  //userlistrefresh();
  
  
}
initUserlist();


var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();

function selbtnclickeduser(ths){
  //$.post("./pump.php", { req:"UnixChangeUser", name:x.id.replace('btnsel',''), passwd:'groups'+$("#"+x.id.replace('btn','')).val()+" "+myname });
        var apiurl = 'api/v1/users/userchange';
        nam = $(ths).data('name');
        console.log('name',nam)
        var apidata = {'name': nam, "groups": $("#sel"+nam).val().toString() };
        postdata(apiurl,apidata);
}
$("#UnixAddUser").click( function (e){ 
  var apiurl = "api/v1/users/UnixAddUser";
  var ipaddr = $("#HomeAddress").val();
  if($("#HomeAddress").val() == ""){ ipaddr = 'NoAddress'}
  var apidata = {"name": $("#User").val(), "Volpool": $("#UserVol").val(), "groups":$("#Usergroups").val().toString(), 
            "Password": $("#UserPass").val(), "Volsize": $("#volsize").val(), 
            "HomeAddress": ipaddr, "HomeSubnet": $("#HomeSubnet").val(), "Myname":"mezo"}
  postdata(apiurl,apidata);
 
  e.preventDefault();
  
});


function auserdel(){
  var apiurl = "api/v1/users/userdel";
  var apidata = {'name': arguments[0], 'Myname':'mezo'}
  postdata(apiurl,apidata);
};

function refreshall(){

  var newallgroups='new0';
  $(".odd").css("background-color","rgba(41,57,198,.1)");
  updatetasks();
  $.ajax({
    url: "api/v1/users/grouplist", 
    type: "GET",
    async: true,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newallgroups=data; 
      if(JSON.stringify(allgroups) != JSON.stringify(newallgroups)) {
        allgroups = newallgroups; 
        console.log('allgroupchange',allgroups,newallgroups)
        groupsrefresh();
     }
    }
   });
  var newallpools = 'new0';
  $.ajax({
    url: "api/v1/pools/poolsinfo", 
    type: "GET",
    async: true,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newallpools=data; 
      if(JSON.stringify(allpools) != JSON.stringify(newallpools)) { 
         allpools = newallpools;
         poolsrefresh();
      }
    } 
  });

  var newallusers = 'new0';
  $.ajax({
    url: 'api/v1/users/userlist',
    async: true,
    type: 'GET',
    dataSrc: 'allusers',
    success: function(data) {  newallusers=data; 
     if(JSON.stringify(allusers) != JSON.stringify(newallusers)){ 
       allusers = newallusers;
       userlistrefresh(); 
     }   
    }
   });
}
setInterval(refreshall, 2000);
$(".chgpasswd").click(function(e){
  userofpass=$(this).data('username');
 });

