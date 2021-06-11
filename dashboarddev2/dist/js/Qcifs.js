
var refresherprop=2;
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
 var volstats = 'init'
 var stat = 'quota'
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
  var apidata = {"type": prot, "pool": thepool, "name": $("#volname").val(), 'ipaddress':$("#Address").val(),
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
        url: 'api/v1/volumes/'+prot+'/volumesinfo',
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
        }, {data: null,
            render: function(data,type,row){
              if('quota' in row){
                return row.quota;
              } else {
                return 'n/a'; 
              }
            }
        },{data: null,
           render: function(data,type,row){
             if("usedbysnapshots"in row){
               return row.usedbysnapshots
             } else{
               return 'n/a';
             }
            }
        },{data: null,
           render: function(data,type,row){
            if("refcompressratio"in row){
              return row.refcompressratio
            } else{
              return 'n/a';
            }
           } 
        }, 
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
            return '<a class="UnixDelUser" val="username" href="javascript:avoldel(\''+row.name+'\')" >'
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
  volumelisttable.errMode = function ( settings, helpPage, message ) { 
    console.log(message);
};
  $.fn.dataTable.ext.errMode = 'throw';
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
         
        apidata['type'] = prot;
        postdata(apiurl,apidata);
}

function avoldel(volname){
  var apiurl = "api/v1/volumes/volumedel";
  var apidata = {'name': volname, 'type': prot, 'user':'mezo'}
  postdata(apiurl,apidata);
};


function tocheck(){
  
    
    $("#createvol").prop('disabled', false);
    if($("#volname").val().length < 3) { $("#createvol").prop('disabled', 'disabled'); }
    if($("#Pool2").val().length < 1) { $("#createvol").prop('disabled', 'disabled'); }
    try {
      if($("#Pool2").val().length  > 0 && $("#Address").val().length < 3) { $("#createvol").prop('disabled', 'disabled'); }
     } catch(err){
      console.log('Pool2 error',$("#Pool2").val());
      console.log('Pool2 error allpools',allpools['results'])
     }
     
     if($("#volsize").val() < 0) { $("#createvol").prop('disabled', 'disabled'); }
}

tocheck();

$(".tocheck").click(function(e){ tocheck(); });
$(".tocheck").focusout(function(e){ tocheck(); });


function initcharts(){
  $.each(chartcards,function(e,t){



  $(function () {
    /* ChartJS
    * -------
    * Here we will create a few charts using ChartJS
    */
    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var donutData2        = {
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

    var donutData = {};
    donutData['labels'] = volstats[t]['labels']
    donutData['datasets'] = [{
      data: volstats[t]['stats'],
      backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef']
    }];


    var pieChartCanvas = $('#'+t+'Chart').get(0).getContext('2d')
    var pieData        = donutData;
    var pieOptions     = {
      maintainAspectRatio : false,
      responsive : true,
      legend: {
          display: true,
          labels: {
              color: 'rgb(255, 99, 132)',
              boxWidth : 10,
              padding : 4,
          },
          
      },
      title: { 
        text: t,
        display: true,
      },
      colorschemes: {

        scheme: 'brewer.Paired8'
      }
    }

    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    charts[t] = new Chart(pieChartCanvas, {
      type: 'pie',
      data: pieData,
      options: pieOptions
    });


  });
  });
}
initcharts()







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
    url: "api/v1/volumes/poolsinfo", 
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
    url: 'api/v1/volumes/'+prot+'/volumesinfo',
    type: "GET",
    async: false,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newallvolumes=data; }
   });
   if(JSON.stringify(allvolumes) != JSON.stringify(newallvolumes)) { 
      allvolumes = JSON.parse(JSON.stringify(newallvolumes));
      volumelistrefresh();
    }
    
  var newstats='new0'
  $.ajax({
    url: "api/v1/volumes/stats", 
    type: "GET",
    async: false,
    //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},
    
    success: function(data) {  newstats=data; }
    });
    if(JSON.stringify(volstats) != JSON.stringify(newstats)) { 
      volstats = JSON.parse(JSON.stringify(newstats));
      try{
      $.each(chartcards,function(e,t){
        charts[t].data.datasets[0]['data'] = volstats[t]['stats']
        charts[t].data.labels = volstats[t]['labels']
        charts[t].update();
      });;
    } catch {;}
    }
}
refreshall();
setInterval(refreshall, 2000);
setInterval(function(){allvolumes='refresh';}, 5000);

