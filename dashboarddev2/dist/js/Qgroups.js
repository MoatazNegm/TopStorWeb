//input mask bundle ip address
var refresherprop=2;
var refreshergroup=2;
var grouppass="hi";
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
 var allgroups="init";
 var allusers={"results": [{"id" : '0', 'text':'NoUser'}]}
 var allpools="init";
 var selvalues={};
 var usrolddata;
 var myidhash;
 var mytimer;
 var mymodal;
 var cusr={};
 var cgroup={};
 var grouplistflag=0;
 var groupdata="dksfj";
 var oldgroupdata="ksksksks";
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
 var grouplisttable;
 var myid="<?php echo $_REQUEST['myid'] ?>";
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";

var example1_filter = $("#groupList_filter");

function usersrefresh(){
  
  $('.select2.multiple').select2({
    ajax: {
     url: 'api/v1/groups/userlist',
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
function grouplistrefresh(){
  grouplisttable.ajax.reload(function(){
    var option;
    $(".groupusers").each(function(){
      thisgroup=$(this)
      var usrs;
      assignedusrs = thisgroup.data("usrs")
      if(typeof(assignedusrs) == 'number') {
        usrs = [assignedusrs];
      } else {
        usrs = assignedusrs.split(',');
      }
      
      $.each(usrs, function(e,t){
        if(t !="NoUser") {
          var usr = allusers["results"][t];
          option = new Option(usr.text, usr.id, true, true)
          thisgroup.append(option).trigger('change');
        }
      });
      // manually trigger the `select2:select` event
      thisgroup.trigger({
          type: 'select2:select',
          params: {
              allusers: allusers
          }

      });
    });
    usersrefresh();
    $(".select2.groupusers").on('change',function(e){
      usrsval = $(this).data('usrs').toString()
      if(usrsval == 'NoUser') { usrsval = ''}
      if( usrsval !== $(this).val().toString() ){
        
        $("#btn"+$(this).attr('id')).show();
        $(this).data('change', $(this).val().toString());
      }
      else {
        $(this).data('change','');
        $("#btn"+$(this).attr('id')).hide();
      }
      
    });
    $(".select2.groupusers").trigger('change');

    
    
  });
}

function initgrouplist(){
  grouplisttable=$("#groupList").DataTable({
      //"responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
      "order": [[ 1, "desc" ]],
      //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      "ajax" : {
        url: 'api/v1/groups/grouplist',
        async: false,
        type: 'GET',
        dataSrc: 'allgroups'
      },
      "columns": [
        {
          data: "name"
        }, 
        {
          data:"users",
          render: function(data, type, row){
            
            return '<select class="select2 multiple groupusers '+row.name+' form-control"' 
            + ' multiple="multiple" data-name='+row.name+'  onclick="tdisclicked(this)"' 
            + 'data-usrs="'+row.users+'" value=[0] data-change="" id="sel'+row.name+'"></select>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<button onclick="selbtnclickedgroup(this)" id="btnsel'+row.name+'" '
            + 'type="button" data-name='+row.name+'  class="btn btn-primary" > update</button>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<a class="UnixDelgroup" val="groupname" href="javascript:agroupdel(\''+row.name+'\')" >'
            + '<img  src="dist/img/delete.png" alt="cannott upload delete icon">'
            + '</a>';
          }
        },
      ],
      'columnDefs': [
        {
           'createdCell':  function (td, cellData, rowData, row, col) {
                $(td).data('usrs', 'cell-' + cellData); 
            }
        }
      ]
      
    });
    
  grouplisttable.buttons().container().appendTo('#groupList_wrapper .col-6:eq(0)');
  //grouplistrefresh();
  
  
}
initgrouplist();


var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();

function postdata(url,data){
  $.ajax({
    url: url,
    dataType: 'json',
    data: data,
  });
}

function selbtnclickedgroup(ths){
  //$.post("./pump.php", { req:"UnixChangegroup", name:x.id.replace('btnsel',''), passwd:'users'+$("#"+x.id.replace('btn','')).val()+" "+myname });
        var apiurl = 'api/v1/groups/groupchange';
        nam = $(ths).data('name');
        console.log('name',nam)
        var apidata = {'name': nam, "users": $("#sel"+nam).val().toString() };
        postdata(apiurl,apidata);
}
$("#UnixAddgroup").click( function (e){ 
  var apiurl = "api/v1/groups/UnixAddgroup";
  var apidata = {"name": $("#Group").val(), "users":$("#groupusers").val().toString(), "Myname":"mezo"}
  postdata(apiurl,apidata);
  e.preventDefault();
  
});

function agroupdel(){
  var apiurl = "api/v1/groups/groupdel";
  var apidata = {'name': arguments[0], 'Myname':'mezo'}
  postdata(apiurl,apidata);
};

function refreshall(){
  console.log('hi');

  var newallusers='new0';
  $.ajax({
    url: "api/v1/groups/userlist", 
    type: "GET",
    async: false,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newallusers=data; }
   });
   if(JSON.stringify(allusers) != JSON.stringify(newallusers)) {
     allusers = newallusers; 
     console.log('alluserchange',allusers,newallusers)
     usersrefresh();
   }

  var newallpools = 'new0';
  $.ajax({
    url: "api/v1/pools/poolsinfo", 
    type: "GET",
    async: false,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newallpools=data; }
   });
   if(JSON.stringify(allpools) != JSON.stringify(newallpools)) { 
      allpools = newallpools;
      poolsrefresh();
    }
  

  var newallgroups = 'new0';
  $.ajax({
    url: 'api/v1/groups/grouplist',
    async: false,
    type: 'GET',
    dataSrc: 'allgroups',
    success: function(data) {  newallgroups=data; }
  });
  if(JSON.stringify(allgroups) != JSON.stringify(newallgroups)){ 
    allgroups = newallgroups;
    grouplistrefresh(); 
  }
}
setInterval(refreshall, 2000);

