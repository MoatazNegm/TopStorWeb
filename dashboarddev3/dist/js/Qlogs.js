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
 var logstable;
 myidhash=myid;
 var myname="<?php echo $_REQUEST['name'] ?>";

var example1_filter = $("#UserList_filter");


function initlogs(){
  logstable=$("#logs").DataTable({
      //"responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
      "order": [[ 0, "desc" ],[ 1, "desc"]],
      //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      "ajax" : {
        url: 'api/v1/info/logs',
        async: false,
        type: 'GET',
        dataSrc: 'alllogs'
      },
      "columns": [
        {
          data: "date"
        }, {data:"time"}, {data:"user"},{data: "host"},
        {
          data: 'msgbody',
          render: function(data, type, row){
            return row.msgbody
          
          }
       },
       {data: 'type'},
       {data:'msgcode'}
      ],
      'rowCallback': function(row, data, index){
        if(data.type == 'info'){
            $(row).css('color', 'blue');
        }
        if(data.type == 'warning'){
            $(row).css('color', '#c2c237');
        }
        if(data.type == 'error'){
          $(row).css('color', 'red');
        }
      },
      'columnDefs': [
        {
           'createdCell':  function (td, cellData, rowData, row, col) {
                $(td).data('msgcode', 'cell-' + cellData); 
                $(td).css('color','blue');
            }
        }
      ]
      
    });
  logstable.buttons().container().appendTo('#logs_wrapper .col-6:eq(0)');
  //userlistrefresh();
  
  
}
initlogs();

function refreshall(){

  $(".odd").css("background-color","rgba(41,57,198,.1)");
  updatetasks();
  if(dirtylog > 0) {
    console.log('hi');
    logstable.ajax.reload();
  }

}
setInterval(refreshall, 2000);

