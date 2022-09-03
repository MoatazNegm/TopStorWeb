var refresherprop=2;
var newsnaps = 'init';
var refresheruser=2;
var userpass="hi";
var proptime="55:55:55";
var olddata=0;
var propdata='hi';
var oldproprdata="dakfj";
var chartcards = [ 'quota', 'used', 'usedbysnapshots'];
var charts = {}
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
 var allusersnohome="init";
 var allvolumes = "init";
 var allgroups= "";
 var allpools= 'init';
 var allsnaps = 'init';
 var selvalues={};
 var grpolddata;
 var myidhash;
 var mytimer;
 var mymodal;
 var cgrp={};
 var cuser={};
 var volumelistflag=0;
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
 var volstats = 'init'
 var stat = 'quota'
 var selhosts="";
 var seldhosts="";
 var changedprop = {};
 var modaltill=idletill-120000
 var onceinittable;
 var allperiodstable = {}
 var allpsnapstable = {}
 var cpool = 'init';
 var cvolume = 'init';
 var dirtylog = 1;
 var allperiods = ['Minutely', 'Hourly', 'Weekly'];
 //var allperiods = ['Minutely', 'Minutely', 'Minutely'];
 
 function poolsrefresh(){
 
  $('.select2.pool').select2({
    placeholder: "Select a pool",
    ajax: {
     url: '/api/v1/volumes/poolsinfo',
     dataType: 'json',
     timeout: 3000,
     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
     type: 'GET',
     async: false,
     success: function(data){ allpools = data;}
   }
  });
  
 }
 poolsrefresh();


function volumesrefresh(){
  var newallvolumes = '';
  var reload = 0
  if($("#Pool2").val() == '') {  newallvolumes = '';}
  else{
    $.ajax({
      url: '/api/v1/volumes/volumelist',
      dataType: 'json',
      timeout: 3000,
      // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
      type: 'GET',
      async: false,
      success: function(data){ newallvolumes = data;}
    });
    if(JSON.stringify(allvolumes) != JSON.stringify(newallvolumes)) {
      allvolumes = JSON.parse(JSON.stringify(newallvolumes)); 
      newallvolumes=[];
      $.each(allvolumes,function(e,t){
        if(allvolumes[e]['pool'] == allpools['results'][$("#Pool2").val()]['text']){
          newallvolumes.push(t);
        }
      });
      reload = 1
    }
  }
  if(cpool != $("#Pool2").val()){
    cpool = $("#Pool2").val();
    reload = 1
  } 
  $('.select2.volume').select2({
    placeholder: "Select a volume",
    data: newallvolumes
  });


  }
function getsnaps(){
  $.ajax({
    url: 'api/v1/volumes/snapshots/snapshotsinfo',
    //timeout: 3000,
    async: true,
    type: 'GET',
    success: function(data){  newsnaps = data}
  });
}
//allsnaps = getsnaps();

function initalltables(){

  onceinittable=$("#Oncetable").DataTable({
    "order": [[ 0, "desc" ],[ 1, "desc" ]],
    "data": allsnaps['Once'],
    "columns": [
      {data: "date"}, {data:"time"},{data: "name" }, 
      {data: null,
        render: function(data, type, row){
          return row.volume.split('_')[0]
        }
      },
      {data: "used"}, {data:"refcompressratio"}, 
      {
        data: null,
        render: function(data, type, row){
          return '<a class="snapdelegt" val="username" href="javascript:rollback(\''+row.name+'\')" >'
          + '<img  src="dist/img/return.png" data-name='+row.name+' alt="cannott upload delete icon">'
          + '</a>';          }
      },
      {
        data: null,
        render: function(data, type, row){
          return '<a class="snapdelegt" val="username" href="javascript:asnapdel(\''+row.name+'\')" >'
          + '<img  src="dist/img/delete.png" data-name='+row.name+' alt="cannott upload delete icon">'
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
    ],
    
  });
  onceinittable.buttons().container().appendTo('#Oncetable_wrapper .col-6:eq(0)');
  allpsnapstable["allsnaps"] =$("#allsnapstable").DataTable({
    "order": [[ 0, "desc" ],[ 1, "desc" ]],
    "data": allsnaps["allsnaps"],
    "columns": [
      {data: "date"}, {data:"time"},
      {data: "name",
       render: function(data,type,row){
         return data.split('.')[0]+'.'+data.split('.').pop();
       }
      }, {data: "snaptype"},
      {data: null,
        render: function(data, type, row){
          return row.volume.split('_')[0]
        }
      },
      {data: "used"}, {data:"refcompressratio"}, 
      {
        data: null,
        render: function(data, type, row){
          return '<a class="snapdelegt" val="username" href="javascript:rollback(\''+row.name+'\')" >'
          + '<img  src="dist/img/return.png" data-name='+row.name+' alt="cannott upload delete icon">'
          + '</a>';         
         }
      },
      {
        data: null,
        render: function(data, type, row){
          return '<a class="snapdelegt" val="username" href="javascript:asnapdel(\''+row.name+'\')" >'
          + '<img  src="dist/img/delete.png" data-name='+row.name+' alt="cannott upload delete icon">'
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
    ],
    
  });
  allpsnapstable["allsnaps"].buttons().container().appendTo('#allsnapstable_wrapper .col-6:eq(0)');
  try{
    t='Minutely';
    allperiodstable[t]=$("#"+t+"periods").DataTable({
      "order": [[ 0, "desc" ],[ 1, "desc" ]],
      "data": allsnaps[t+'period'],
      "columns": [
        {data: "id"}, 
        {data: null,
          render: function(data, type, row){
            return row.volume.split('_')[0]
          }
        }, {data:"every"},{data: "keep" }, 
        {
          data: null,
          render: function(data, type, row){
            return '<a class="snapdelegt" val="username" href="javascript:aperioddel(\''+row.id+'\')" >'
            + '<img  src="dist/img/delete.png" data-name='+row.id+' alt="cannott upload delete icon">'
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
      ],
      
    });
    allperiodstable[t].buttons().container().appendTo('#'+t+'periods_wrapper .col-6:eq(0)');
    t='Hourly';
    allperiodstable[t]=$("#"+t+"periods").DataTable({
      "order": [[ 0, "desc" ],[ 1, "desc" ]],
      "data": allsnaps[t+'period'],
      "columns": [
        {data: "id"}, 
        {data: null,
          render: function(data, type, row){
            return row.volume.split('_')[0]
          }
        },{data:"every"}, {data:'sminute'}, {data: "keep" }, 
        {
          data: null,
          render: function(data, type, row){
            return '<a class="snapdelegt" val="username" href="javascript:aperioddel(\''+row.id+'\')" >'
            + '<img  src="dist/img/delete.png" data-name='+row.id+' alt="cannott upload delete icon">'
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
      ],
      
    });
    allperiodstable[t].buttons().container().appendTo('#'+t+'periods_wrapper .col-6:eq(0)');
    t='Weekly';
    allperiodstable[t]=$("#"+t+"periods").DataTable({
      "order": [[ 0, "desc" ],[ 1, "desc" ]],
      "data": allsnaps[t+'period'],
      "columns": [
        {data: "id"}, 
        {data: null,
          render: function(data, type, row){
            return row.volume.split('_')[0]
          }
        },{data:"stime"}, {data:'every'}, {data: "keep" }, 
        {
          data: null,
          render: function(data, type, row){
            return '<a class="snapdelegt" val="username" href="javascript:aperioddel(\''+row.id+'\')" >'
            + '<img  src="dist/img/delete.png" data-name='+row.id+' alt="cannott upload delete icon">'
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
      ],
      
    });
    allperiodstable[t].buttons().container().appendTo('#'+t+'periods_wrapper .col-6:eq(0)');
    $.each(allperiods, function(e,t){
      allpsnapstable[t] =$("#"+t+"table").DataTable({
        "order": [[ 0, "desc" ],[ 1, "desc" ]],
        "data": allsnaps[t],
        "columns": [
          {data: "date"}, {data:"time"},
          {data: "name",
           render: function(data,type,row){
            return data.split('.')[0]+'.'+data.split('.').pop();
           }
          }, 
          {data: null,
            render: function(data, type, row){
              return row.volume.split('_')[0]
            }
          },
          {data: "used"}, {data:"refcompressratio"}, 
          {
            data: null,
            render: function(data, type, row){
              return '<a class="snapdelegt" val="username" href="javascript:rollback(\''+row.name+'\')" >'
              + '<img  src="dist/img/return.png" data-name='+row.name+' alt="cannott upload delete icon">'
              + '</a>';          }
          },
          {
            data: null,
            render: function(data, type, row){
              return '<a class="snapdelegt" val="username" href="javascript:asnapdel(\''+row.name+'\')" >'
              + '<img  src="dist/img/delete.png" data-name='+row.name+' alt="cannott upload delete icon">'
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
        ],
        
      });
      allpsnapstable[t].buttons().container().appendTo('#'+t+'table_wrapper .col-6:eq(0)');
      
    });
   
  } catch {;}
  $.fn.dataTable.ext.errMode = 'throw';
  //volumelistrefresh();
  
}
initalltables();


function snapsreferesh(){
  getsnaps();
  if(JSON.stringify(allsnaps) != JSON.stringify(newsnaps)) {
    allsnaps = JSON.parse(JSON.stringify(newsnaps)); 
    onceinittable.clear();
    onceinittable.rows.add(allsnaps['Once']);
    onceinittable.draw();
    try{
      allpsnapstable["allsnaps"].clear();
      allpsnapstable["allsnaps"].rows.add(allsnaps["allsnaps"]);
      allpsnapstable["allsnaps"].draw();
      $.each(allperiods, function(e,t){
        allpsnapstable[t].clear();
        allpsnapstable[t].rows.add(allsnaps[t]);
        allpsnapstable[t].draw();
        allperiodstable[t].clear();
        allperiodstable[t].rows.add(allsnaps[t+'period']);
        allperiodstable[t].draw();
      });
      
    } catch {;}
  }
   
}
function refreshall(){
  updatetasks();
  $(".odd").css("background-color","rgba(41,57,198,.1)");
  snapsreferesh();
}
$("table").css('width','100%');
setInterval(refreshall,2000);











function rollback(csnap){
  var apiurl = "api/v1/volumes/snapshots/snaprollback";
  var apidata = {"name": csnap, 'user':'mezo' }
  postdata(apiurl,apidata);
}

function asnapdel(csnap){
  var apiurl = "api/v1/volumes/snapshots/snapshotdel";
  var apidata = {"name": csnap, 'user':'mezo' }
  postdata(apiurl,apidata);
}

function aperioddel(cperiod){
  var apiurl = "api/v1/volumes/snapshots/perioddelete";
  var apidata = {"name": cperiod, 'user':'mezo' }
  postdata(apiurl,apidata);
}

$("#oncecreate").click(function(e){
e.preventDefault();
var thepool = allpools['results'][$("#Pool2").val()]['text'];
var owner = allpools['results'][$("#Pool2").val()]['owner'];
var thevol = allvolumes[$("#volname").val()]['fullname'];
var thesnap = $("#Oncename").val();

var apiurl = "api/v1/volumes/snapshots/create";
var apidata = {"snapsel": 'Once', "pool": thepool, "volume": thevol, 'name': thesnap, 'owner':owner }

postdata(apiurl,apidata);


});

$("#Minutelycreate").click(function(e){
  e.preventDefault();
  var thepool = allpools['results'][$("#Pool2").val()]['text'];
  var owner = allpools['results'][$("#Pool2").val()]['owner'];
  var thevol = allvolumes[$("#volname").val()]['fullname'];
  var every = $("#EveryMinutely").val();
  var keep = $("#KeepMinutely").val();
  var apiurl = "api/v1/volumes/snapshots/create";
  var apidata = {"snapsel": 'Minutely', "pool": thepool, "volume": thevol, 'every': every, 
                  'keep': keep, 'owner':owner }
  postdata(apiurl,apidata);
  });

  $("#Hourlycreate").click(function(e){
    e.preventDefault();
    var thepool = allpools['results'][$("#Pool2").val()]['text'];
    var owner = allpools['results'][$("#Pool2").val()]['owner'];
    var thevol = allvolumes[$("#volname").val()]['fullname'];
    var every = $("#EveryHourly").val();
    var keep = $("#KeepHourly").val();
    var sminute = $("#Sminute").val();
    var apiurl = "api/v1/volumes/snapshots/create";
    var apidata = {"snapsel": 'Hourly', "pool": thepool, "volume": thevol, 'every': every, 
                    'keep': keep,'sminute':sminute, 'owner':owner }
    console.log('apidata',apidata);
    
    postdata(apiurl,apidata);
    
    
  });

  $("#Weeklycreate").click(function(e){
    e.preventDefault();
    var thepool = allpools['results'][$("#Pool2").val()]['text'];
    var owner = allpools['results'][$("#Pool2").val()]['owner'];
    var thevol = allvolumes[$("#volname").val()]['fullname'];
    var every = $("#Sday").val();
    var keep = $("#KeepWeekly").val();
    var stime = $("#Stime").val();
    var apiurl = "api/v1/volumes/snapshots/create";
    var apidata = {"snapsel": 'Weekly', "pool": thepool, "volume": thevol, 'every': every, 
                    'keep': keep,'stime':stime, 'owner':owner }
    console.log('apidata',apidata);
    
    postdata(apiurl,apidata);
    
    
  });
  $("#Stime").focusout(function(e){ if($("#Stime").val() == ''){ $("#Stime").val('11:50 PM')}});

function changeoncesubmit(){
  if($("#Oncename").val().length < 3) { 
    $("#oncecreate").attr('disabled','disabled');
   } else {
     $("#oncecreate").attr('disabled',false);
   }; 
}

 
$("#Pool2").change(function(e){   volumesrefresh(); });
$("#volname").change(function(e){
  cvolume = $("#volname").val();
  if($("#volname").val() == ''){
    $("#Oncename").attr('disabled','disabled');
    $("#oncecreate").attr('disabled','disabled');
    $(".Minute").prop('disabled','disabled');
    $(".Hour").prop('disabled','disabled');
    $(".Week").prop('disabled','disabled');
  } else {
    $("#Oncename").attr('disabled',false);
    $(".Minute").prop('disabled', false);
    $(".Hour").prop('disabled', false);
    $(".Week").prop('disabled', false);
    changeoncesubmit();
  }
});
$("#Oncename").keyup(function(e){  
  changeoncesubmit();
});


