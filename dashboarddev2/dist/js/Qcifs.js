
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
 var allvolumes = "init";
 var allgroups= "";
 var allpools= 'init';
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
 var selhosts="";
 var seldhosts="";
 var changedprop = {};
 var modaltill=idletill-120000
 var volumelisttable;
 var dirtylog = 1;

 function postdata(url,data){
  $.ajax({
    url: url,
    dataType: 'json',
    data: data,
  });
}

function poolsrefresh(){
 
  $('.select2.pool').select2({
    placeholder: "Select a state",
    ajax: {
     url: '/api/v1/volumes/poolsinfo',
     dataType: 'json',
     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
     type: 'GET',
     async: false,
     success: function(data){ allpools = data;}
   }
  });
  
 }

function groupsrefresh(){
  
  $('.select2.multiple').select2({
    ajax: {
     url: 'api/v1/volumes/grouplist',
     dataType: 'json',
     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
     type: 'GET',
     async: false,
     success: function(data){ allgroups = data;}
   },
 });
} 
groupsrefresh();
poolsrefresh();

//$.post("./pump.php", { req:"VolumeCreate"+prot+".py", name:pools[thepool].name+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+Groupprot, passwd:$("#Address"+prot).val().toString()+" "+$("#Subnet"+prot).val().toString()+" "+myname+" "+pools[thepool].host+" "+myname }, function (data){
            
$("#createvol").click(function(e){
  e.preventDefault();
  var thepool = allpools['results'][$("#Pool2").val()]['text'];
  var owner = allpools['results'][$("#Pool2").val()]['owner'];
  var groups = 'NoGroup';
  if($("#Group").val().toString().length > 0){
    groups = '';
    $.each($("#Group").val(),function(e,t){
      groups +=allgroups['results'][t]['text']+',';
    });
    groups = groups.slice(0,-1);
  }
  var apiurl = "api/v1/volumes/create";
  var apidata = {"type": "CIFS", "pool": thepool, "name": $("#volname").val(), 'ipaddress':$("#Address").val(),
   "Subnet": $("#Subnet").val(), 'groups': groups, "Myname":"mezo", "size": $("#volsize").val()+'G', 'owner':owner }

  postdata(apiurl,apidata);

 
});

function volumelistrefresh(){
  volumelisttable.ajax.reload(function(){
    var option;
    $(".usergroups").each(function(){
      var thisvolume=$(this)
      var grps;
      var assignedgrps = thisvolume.data("grps");
      
      if(typeof(assignedgrps) == 'number') {
        grps = [assignedgrps];
      } else {
        grps = assignedgrps.split(',');
      }
      
      $.each(grps, function(e,t){
        console.log('ttt',t.length);
        if(t !="NoGroup" && t in allgroups["results"]) {
          var grp = allgroups["results"][t];
          option = new Option(grp.text, grp.id, true, true)
          thisvolume.append(option).trigger('change');
        }
      });
      // manually trigger the `select2:select` event
      thisvolume.trigger({
          type: 'select2:select',
          params: {
              allgroups: allgroups
          }

      });
    });
    groupsrefresh();
    

    
  


    $(".changeprop").on('change',function(e){
        
      var changedkey = $(this).data('key');
      console.log('changed',changedkey)
      var oldpropvalue = $(this).data('value').toString();
      var newpropvalue = $(this).val().toString();
      if(!($(this).data('name') in changedprop)){ changedprop[$(this).data('name')] = {}; }


      if(oldpropvalue == 'NoGroup') { oldpropvalue = ''}
      if( oldpropvalue !== newpropvalue ){
        changedprop[$(this).data('name')][changedkey] =  newpropvalue
        $("#btn"+$(this).data('name')).show();
      }
      else {
        try{
          delete changedprop[$(this).data('name')][changedkey];
          if($.isEmptyObject(changedprop[$(this).data('name')])) { 
            $("#btn"+$(this).data('name')).hide();
            delete changedprop[$(this).data('name')];
          }
        } catch{
          ;
        }
        
      }
     
    });
    if($.isEmptyObject(changedprop)) { $("button.volumes").hide();}
    try{
        if($.isEmptyObject(changedprop[$(this).data('name')])) { 
          $("#btn"+$(this).data('name')).hide();
          delete changedprop[$(this).data('name')];
        }
      } catch {
        ;
      }

    

    $(".changeprop").trigger('change');    
  });
  
}




function initVolumelist(){
  volumelisttable=$("#VolumeList").DataTable({
      "order": [[ 1, "desc" ]],
      "ajax" : {
        url: 'api/v1/volumes/CIFS/volumesinfo',
        async: false,
        type: 'GET',
        
        dataSrc: 'allvolumes'
      },
      "columns": [
        { data: "name",
          render: function(data,type,row){
          return data.split('_')[0];
          }
        }, 
        { data:"pool",
          render: function(data,type,row){
            return data.split('p')[2];
          }
        }, {data:"quota"},{data:"usedbysnapshots"}, {data: "refcompressratio"}, 
        {
          data:"ipaddress",
          render: function(data, type, row){
            return '<input type="text" placeholder="xxx.xxx.xxx.xxx" class="form-control changeprop" '
            + 'name="s" id="ip'+row.name+'" data-value="'+data+'" value="'+data+'" data-name='+row.name
            + ' data-key="ipaddress" style="font-size: 99.9%;" data-inputmask="\'alias\': \'ip\'">'
          }
        },
        {
          data:"Subnet",
          render: function(data, type, row){
            return '<input type="number"  style="font-size: 99.9%;" min="8" max="32" step="8" class="form-control changeprop"'
            +'id="sub'+row.name+'" data-key="Subnet" data-name='+row.name+' data-value="'+data+'" value="'+data+'">'
          }
        },
        {
          data:"groups",
          render: function(data, type, row){
            return '<select class="select2 multiple changeprop usergroups '+row.name+' form-control"' 
            + ' multiple="multiple" data-name='+row.name+'  '
            + 'data-grps="'+row.groups+'" data-key="groups" data-value="'+data+'" data-name='+row.name+' value=[0] data-change="" id="sel'+row.name+'"></select>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<button onclick="selbtnclickeduser(this)" style="font-size:99.9%;" id="btn'+row.name+'" '
            + 'type="button" data-name='+row.name+' data-name='+row.name+'  class="btn btn-primary volumes" > update</button>';
          }
        },
        {
          data: null,
          render: function(data, type, row){
            return '<a class="UnixDelUser" val="username" href="javascript:auserdel(\''+row.name+'\')" >'
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
  volumelisttable.buttons().container().appendTo('#VolumeList_wrapper .col-6:eq(0)');
  //volumelistrefresh();
  $('.volumes').hide();
  
  
  
}
initVolumelist();



function selbtnclickeduser(ths){
  //$.post("./pump.php", { req:"UnixChangeUser", name:x.id.replace('btnsel',''), passwd:'groups'+$("#"+x.id.replace('btn','')).val()+" "+myname });
        var apiurl = 'api/v1/volumes/config';
        nam = $(ths).data('name');
        var apidata = JSON.parse(JSON.stringify(changedprop[nam]));
        apidata['volume'] = nam;
        if('groups' in apidata){
          var newgrps='';
          if (apidata['groups'] == '') { 
            newgrps = 'NoGroup';
          }else{
            $.each(apidata['groups'].split(','),function(e,t){
              try{
              newgrps += allgroups['results'][t]['text']+',';
              } catch {
                newgrps += t+',';
              }

            });
            newgrps = newgrps.slice(0,-1);
            }
          apidata['groups'] = newgrps
        }
         
        apidata['type'] = 'CIFS'
        console.log('apidata',apidata); 
        postdata(apiurl,apidata);
}

function auserdel(){
  var apiurl = "api/v1/users/userdel";
  var apidata = {'name': arguments[0], 'Myname':'mezo'}
  postdata(apiurl,apidata);
};


function tocheck(){
  
    
    $("#createvol").prop('disabled', false);
    if($("#volname").val().length < 3) { $("#createvol").prop('disabled', 'disabled'); }
    if($("#Pool2").val().length < 1) { $("#createvol").prop('disabled', 'disabled'); }
    try {
      if($("#Pool2").val().length  > 0 && $("#Address").val().length < 3) { $("#createvol").prop('disabled', 'disabled'); }
     } catch(err){
      console.log('hi',$("#Pool2").val());
      console.log('hihi',allpools['results'])
     }
     
     if($("#volsize").val() < 0) { $("#createvol").prop('disabled', 'disabled'); }
}

tocheck();

$(".tocheck").click(function(e){ tocheck(); });
$(".tocheck").focusout(function(e){ tocheck(); });

function refreshall(){
  var newallgroups='new0';
  $.ajax({
    url: "api/v1/volumes/grouplist", 
    type: "GET",
    async: false,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newallgroups=data; }
   });
   if(JSON.stringify(allgroups) != JSON.stringify(newallgroups)) {
     allgroups = JSON.parse(JSON.stringify(newallgroups)); 
     groupsrefresh();
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
      allpools = JSON.parse(JSON.stringify(newallpools));
      poolsrefresh();
    }
  
  var newallvolumes = 'new0';
  $.ajax({
    url: 'api/v1/volumes/CIFS/volumesinfo',
    type: "GET",
    async: false,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newallvolumes=data; }
   });
   if(JSON.stringify(allvolumes) != JSON.stringify(newallvolumes)) { 
      allvolumes = JSON.parse(JSON.stringify(newallvolumes));
      console.log('refreshvolumes');
      volumelistrefresh();
    }
    
  
}
refreshall();
setInterval(refreshall, 2000);


$(function () {
  /* ChartJS
   * -------
   * Here we will create a few charts using ChartJS
   */
  //-------------
  //- PIE CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var donutData        = {
    labels: [
        'Chrome',
        'IE',
        'FireFox',
        'Safari',
        'Opera',
        'Navigator',
    ],
    datasets: [
      {
        data: [700,500,400,600,300,100],
        backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
      }
    ]
  }
  var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
  var pieData        = donutData;
  var pieOptions     = {
    maintainAspectRatio : false,
    responsive : true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  new Chart(pieChartCanvas, {
    type: 'pie',
    data: pieData,
    options: pieOptions
  })


      //---------------------
      //- STACKED BAR CHART -
      //---------------------
      var areaChartData = {
        labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label               : 'Digital Goods',
            backgroundColor     : 'rgba(60,141,188,0.9)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [28, 48, 40, 19, 86, 27, 90]
          },
          {
            label               : 'Electronics',
            backgroundColor     : 'rgba(210, 214, 222, 1)',
            borderColor         : 'rgba(210, 214, 222, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(210, 214, 222, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : [65, 59, 80, 81, 56, 55, 40]
          },
        ]
      }
      var barChartData = $.extend(true, {}, areaChartData)
      var temp0 = areaChartData.datasets[0]
      var temp1 = areaChartData.datasets[1]
      barChartData.datasets[0] = temp1
      barChartData.datasets[1] = temp0
      var stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d')
      var stackedBarChartData = $.extend(true, {}, barChartData)

      var stackedBarChartOptions = {
        responsive              : true,
        maintainAspectRatio     : false,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }

      new Chart(stackedBarChartCanvas, {
        type: 'bar',
        data: stackedBarChartData,
        options: stackedBarChartOptions
      });
})

