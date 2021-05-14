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
$("#UserList").DataTable({
    //"responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
    "order": [[ 1, "desc" ]],
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#UserList_wrapper .col-6:eq(0)');
 

var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();
function getuserlist() {

  // Instantiate an new XHR Object


 $.ajax({
   url: "api/v1/users/userlist", 
   type: "GET",
   async: false,
   //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
   
   success: function(data) {  allusers=data;  console.log('Success!' + allusers[0]); }
});
$.ajax({
 url: "api/v1/users/grouplist", 
 type: "GET",
 async: false,
 //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
 
 success: function(data) {  allgroups=data;  console.log('Success!' + allgroups); }
});
 
  
}

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



  $("#UserList tbody tr").remove();
  $.each(allusers, function(k,v){
   username=allusers[k]['name'].replace('usersinfo/','')
   usersize=allusers[k]['prop'].split('/')[3]
   userpool=allusers[k]['prop'].split('/')[1]
   if (username!='NoUser') { 
    $("#UserList").append(''
      + '<tr class="dontdelete" > '
      + '<td>'+username+'</td> '
      + '  <td>'+userpool+'</td> '
      + '  <td>'+usersize+'</td> '
      + ' <td> '  
      + '    <select style="width: 100%;" onclick="tdisclicked(this)" id="sel'+username+'" '
      + '      title="No Group" size=2 data-container="body" data-width="auto" class="select2 '+username+' selectpicker " '
      + '      multiple data-actions-box="true" data-live-search="true"> '
      + '    </select> '
      + '  </td> '
      + '  <td> '
      + '    <button onclick="selbtnclickeduser(this)" id="btnsel'+username+'" type="button" '
      + '    class="btn btn-primary" >update '
      + '    </button> '
      + '  </td> '
      + '  <td class="text-center"> '
      + '    <a href="javascript:userPassword(\''+username+'\')" > '
      + '      <img src="dist/img/edit.png" alt="cannott upload edit icon"> '
      + '    </a> '
      + '  </td> '
      + '  <td class="text-center"> '
      + '    <a class="UnixDelUser" val="'+username+'" href="javascript:auserdel('+username+')" > '
      + '      <img  src="dist/img/delete.png" alt="cannott upload delete icon"> '
      + '    </a> '
      + '  </td> '
      + '</tr>'
      );

    $("#btnsel"+username).hide();
    cgrp[username]=[]
    $.each(allgroups, function(k,v){
     evgroup=allgroups[k]['prop'].split('/')[2]
     grpname=allgroups[k]['name'].replace('usersigroup/','')
     selecteds='';
     if (evgroup.includes(username) > 0) {
      selecteds='selected'
      cgrp[username].push(grpname)
     }
     if(grpname!='Everyone') {
      $("#sel"+username).append("<option value='"+grpname+"' "+selecteds+">"+grpname+"</option>");
     }
    });
    $("button").css("height","2.3rem");
    $(".dropdown").css("width","100%");
    $('#sel'+username).on('changed.bs.select',function(e,c,iss,pv){
     if (cgrp[this.id.replace('sel','')].toString()==$('#'+this.id).val()) {
      $('#btn'+this.id).hide();
     } else {
      $("#btn"+this.id).show();
     }
    
     if (cgrp[this.id.replace('sel','')].length==0 && $('#'+this.id).val()==null) {
      $('#btn'+this.id).hide();
     }
    });
   }
  });
  //$(".selectpicker").selectpicker("refresh");
  $("#GroupList tbody tr").remove();
  $.each(allgroups, function(k,v){
   username=allgroups[k]['name'].replace('usersigroup/','')
   grpuserlist=allgroups[k]['prop'].split('/')[2]
   if (username!='Everyone'){
    $("#GroupList").append('<tr class="dontdelete" > <td style="width:25%;">'+username+'</td><td style="width:25%;"><select style="width: 100%;" onclick="tdisclicked(this)" id="sel'+username+'" title="No User" data-container="body" data-width="auto" class="'+username+' selectpicker grp" multiple data-actions-box="true" data-live-search="true"></select></td><td class="text-center" style="width: 20%;"><button onclick="selbtnclickedgroup(this)" id="btnsel'+username+'" type="button" class="btn btn-primary" >update</button></td><td style="width: 15%;" class="text-center"><a class="UnixDelGroup" val="'+username+'" href="javascript:agroupdel(\''+username+'\')" ><img  src="assets/images/delete.png" alt="cannott upload delete icon"></a></td></tr>');
    $("#btnsel"+username).hide();
    cuser[username]=[]
    $.each(allusers, function(k,v){
     evuser=allusers[k]['name'].replace('usersinfo/','')
     selecteds='';
     if (grpuserlist.includes(evuser) > 0) {
      selecteds='selected'
      cuser[username].push(evuser)
     }
     if(evuser!='NoUser'){
      $("#sel"+username).append("<option value='"+evuser+"' "+selecteds+">"+evuser+"</option>");
     }
    });
    $("button").css("height","2.3rem");
    $(".dropdown").css("width","100%");
    $('#sel'+username).on('changed.bs.select',function(e,c,iss,pv){
     if (cuser[this.id.replace('sel','')].toString()==$('#'+this.id).val()) {
      $('#btn'+this.id).hide();
     } else {
      $("#btn"+this.id).show();
     }
     if (cuser[this.id.replace('sel','')].length==0 && $('#'+this.id).val()==null) {
      $('#btn'+this.id).hide();
     }
    });
   }
  });
 // $(".selectpicker").selectpicker("refresh");
 }
 //let fetchBtn = document.getElementById("fetchBtn");
  
 //fetchBtn.addEventListener("click", buttonclickhandler);

 
 getuserlist();
 refreshUserList();
 refreshgroups();
 $('.select2').select2()