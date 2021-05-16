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
 var allgroups="init";
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
 var myid="<?php echo $_REQUEST['myid'] ?>";
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";

var example1_filter = $("#UserList_filter");

function getgrplst() {

$.ajax({
 url: "api/v1/users/grouplist", 
 type: "GET",
 async: false,
 //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
 
 success: function(data) {  allgroups=data;  console.log('Success!' + allgroups); }
});
 
  
}
function getpoollst() {

  $.ajax({
   url: "api/v1/pools/poolsinfo", 
   type: "GET",
   async: false,
   //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
   
   success: function(data) {  allpools=data;  console.log('Success!' + allpools); }
  });
   
    
  }


function initUserlist(){
  getgrplst();
  getpoollst();
  $("#UserList").DataTable({
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
            return '<select class="select2 multiple usergroups '+row.name+' form-control"  multiple="multiple" onclick="tdisclicked(this)"'
            + 'data-grps="'+row.groups+'" value=[0] id="sel'+row.name+'"></select>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<button onclick="selbtnclickeduser(this)" id="btnsel'+row.name+'" '
            + 'type="button" class="btn btn-primary" hidden="True"> update</button>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<a href="javascript:userPassword(\''+row.name+'\')" >'
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
      
    }).buttons().container().appendTo('#UserList_wrapper .col-6:eq(0)');
  var option;
  $(".usergroups").each(function(){
    thisuser=$(this)
    assignedgrps = thisuser.data("grps")
    if(typeof(assignedgrps) == 'number') {
      grps = [assignedgrps];
    } else {
      grps = assignedgrps.split(',');
    }
    $.each(grps, function(e,t){
      if(t !="NoGroup") {
        grp = allgroups["results"][t];
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
  });
  
  
}
initUserlist();

var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();

function refreshgroups() {
  
   var grpname;
   userlistflag=1;
   $("#Usergroups option").remove();
   var grpname="dkfj"
   $.each(allgroups, function(k,v){
    grpname=allgroups[k]['name'].replace('usersigroup/','')
    if (grpname!="Everyone") {
     $("#Usergroups ").append("<option value='"+grpname+"' >"+grpname+"</option>");
    }
   });  
  }

function refreshUserList(){
 
 
  if (typeof(allgroups)=="undefined" || typeof(allusers)=="undefined"){
   return
  }
  console.log('allusers',allusers);
  var jdata;
  var username;
  var usersize;
  var userpool;
  var evgroup;
  var grpname;
  var selecteds;
  var grpuserlist;
  var evuser; 



  
  //$(".selectpicker").selectpicker("refresh");
 
 // $(".selectpicker").selectpicker("refresh");
 }
 
 
 $('.select2.multiple').select2({
   ajax: {
    url: 'api/v1/users/grouplist',
    dataType: 'json',
    // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
    type: 'GET',
    async: false,
  }
});

$('.select2.pool').select2({
  ajax: {
   url: 'api/v1/pools/poolsinfo',
   dataType: 'json',
   // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
   type: 'GET',
   async: false,
 }
});

$("#UnixAddUser").click( function (e){ 
  var apiurl = "api/v1/users/UnixAddUser";
  var apidata = {"name": $("#User").val(), "Volpool": $("#UserVol").val(), "groups":$("#Usergroups").val().toString(), 
            "Password": $("#UserPass").val(), "Volsize": $("#volsize").val(), 
            "HomeAddress": $("#HomeAddress").val(), "HomeSubnet": $("#HomeSubnet").val(), "Myname":"mezo"}
  $.ajax({
    url: apiurl,
    dataType: 'json',
    data: apidata,

  });
 
  e.preventDefault();
  console.log('hi',apiurl,apidata);
});
