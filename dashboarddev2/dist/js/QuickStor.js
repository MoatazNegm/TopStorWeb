//input mask bundle ip address
var onedaylog = { 'error':-1, 'warning':-1};
var allhosts= {};
var allhostsready = -1;
var allhostsactive = -1;
var thost = 0;
var thostcolor = 'red';
var allusers= 0;
var allconns = 0;
var tusercolor = 'blue';
alldgs = 'init';
var totalstorage = 0;
var totalstoragealloc = 0;
var emergency = { 0:'darkblue', 25 : '#687ee6', 50: 'yellow', 75: 'eb2a45', 100: 'red'};
var tstorage = 0;
var tstoragecolor = 'grey';
col = 1;
function getdata(url, data={}){
  var newdgs;
  data['token'] = hypetoken
  $.ajax({
    url: url,
    timeout: 3000,
    async: false,
    type: 'GET',
    data: data,
    success: function(data){  newdgs = data}
  });
  return newdgs
}
function extracttrends(){
    var newtrends = getdata('api/v1/volumes/stats')['trends'];
    trendstamps = [];
    trendsizes = []
    var trendict = {}
    var tt;
    $.each(newtrends,function(vol,trends){
        if(trends != -1){
            $.each(trends.split('/'),function(e,trend){
                tt = Date(trend.split('-')[0]);
                tt = new Date(tt).getMinutes(); 
                trendict[tt] = []
            });
        }
    });
    var tt;
    $.each(newtrends,function(vol,trends){
        if(trends != -1){
            $.each(trends.split('/'),function(e,trend){
                tt = Date(trend.split('-')[0]);
                tt = new Date(tt).getMinutes(); 
                trendict[tt].push(trend.split('-')[1]); 
            });
        }
    });

    //console.log(trendstamps,trendsizes);
    console.log(trendict);

}
function extracthosts(){
     var newallhosts = getdata('api/v1/hosts/allinfo');
     
     if(allhostsready != newallhosts['ready'].length || allhostsactive != newallhosts['active'].length){
        allhostsready = newallhosts['ready'].length ;
        allhostsactive = newallhosts['active'].length;
        $("#totalhosts").text(allhostsactive);
        thost = allhostsready ;
        $.each(emergency,function(e,t){
                
            if(100*(thost/allhostsactive) > e) { thostcolor = emergency[100-e]}
        });
       
    }   
    $(".thost").trigger('configure', {'fgColor': thostcolor, 'min':0, 'max': allhostsactive, 'skin':'tron'});
    $(".thost").val(thost);  
    $(".thost").trigger('change'); 
    

    

}
function extractdisks(){
    var newdisks = getdata('api/v1/pools/dgsinfo');
    disks = newdisks['disks'];
    $("#disks").text(Object.keys(disks).length);  
}   
function extractsnaps(){
    var newsnaps = getdata('api/v1/volumes/snapshots/snapshotsinfo');
    snaps = newsnaps['allsnaps'];
    var today = new Date();
    var lstweeksnaps = 0;
    var lstweek = new Date();
    lstweek.setDate(today.getDate()-8)
    $.each(snaps,function(e,t){
        var creation = new Date(snaps[e]['creation']);
        if(creation > lstweek){
            lstweeksnaps += 1;
        }
    });
        $("#weeksnaps").text(lstweeksnaps);  
        $("#allsnaps").text(snaps.length);  
}   
function extractvolumes(){
    var voltypes = ['NFS', 'CIFS', 'HOME'];
    var vols = {};
    $.each(voltypes, function(e,prot){
        vols[prot] = getdata('api/v1/volumes/'+prot+'/volumesinfo')['allvolumes'];
    });
    var count = 0
    $.each(vols, function(e,t){
        count += vols[e].length
    });
        
    $("#allvols").text(count);  
     
}   

function extractonedaylog(){
    var newonedaylog = getdata('api/v1/info/onedaylog');
;
 
    var tconn = 0;
    if(onedaylog['error'].length != newonedaylog['error'].length || 
      onedaylog['warning'].length != newonedaylog['warning'].length ||
      onedaylog['failedlogon'].length != newonedaylog['failedlogon'].length  ){
        onedaylog['error'] = newonedaylog['error'];
        onedaylog['warning'] = newonedaylog['warning'];
        onedaylog['failedlogon'] = newonedaylog['failedlogon'];
      $("#error").text(onedaylog['error'].length);
      $("#warning").text(onedaylog['warning'].length);
      $("#failedlogon").text(onedaylog['failedlogon'].length);
      
   }   
   
}

function extractconns(){
    var newallconns = getdata('api/v1/volumes/connections');
    var newallusers = getdata('api/v1/users/userlist');
 
    var tconn = 0;
    if(allusers != newallusers['allusers'].length || allconns.length != newallconns['connections'].length){
       allusers = newallusers['allusers'];
       allconns = newallconns['connections'];
       $("#totalusers").text(allusers.length);
       tuser = allconns.length;
      
   }   
   $(".tuser").trigger('configure', {'fgColor': emergency[0], 'min':0, 'max': allusers.length, 'skin':'tron'});
   $(".tuser").val(tuser);
   $(".tuser").trigger('change');  
}
function extractstorage(){
    var newtotalstorage = 0;
    var newtotalstoragealloc = 0;
    var change = 0;
    alldgs = getdata('api/v1/pools/dgsinfo');
    $.each(alldgs['pools'],function(pname,pool){
        if(pname.includes('dhcp') > 0){ 
            newtotalstorage = newtotalstorage + pool['alloc'] + pool['available']; 
            newtotalstoragealloc = newtotalstoragealloc + pool['alloc'];
        }
    });
        
            change = 1;
            totalstorage = newtotalstorage
            totalstoragealloc = newtotalstoragealloc
            tstorage = totalstoragealloc
            $.each(emergency,function(e,t){
                
                if(tstorage > e) { tstoragecolor = t}
            });
            totalstorage = parseFloat(totalstorage.toString().slice(0,5));
            tstorage = parseFloat(tstorage.toString().slice(0,5));
            
        

    $("#TotalStorage").text(totalstorage+'GB');
    $(".tstorage").trigger('configure', {'fgColor': tstoragecolor, 'min':0, 'max': totalstorage *1000, 'skin':'tron'});
    $(".tstorage").val(tstorage*1000);
    $(".tstorage").trigger('change');
    
        
}
//$(".addraid").click(function(){ console.log(this); $(this).find('input').prop('checked','checked'); });




function refreshall(){
    
    extractstorage();
    extracthosts();
    extractconns();
    extractonedaylog();
    extractsnaps();
    extractvolumes();
    extractdisks();
    //$(".tstorage").trigger('configure', {'fgColor': tstoragecolor});

  
  ;
}
refreshall();

setInterval(refreshall,10000);
refreshall();



/* jQueryKnob */

$('.knob').knob({
  /*change : function (value) {
   //console.log("change : " + value);
   },
   release : function (value) {
   console.log("release : " + value);
   },
   cancel : function () {
   console.log("cancel : " + this.value);
   },*/
  draw: function () {

    // "tron" case
    if (this.$.data('skin') == 'tron') {

      var a   = this.angle(this.cv)  // Angle
        ,
          sa  = this.startAngle          // Previous start angle
        ,
          sat = this.startAngle         // Start angle
        ,
          ea                            // Previous end angle
        ,
          eat = sat + a                 // End angle
        ,
          r   = true

      this.g.lineWidth = this.lineWidth

      this.o.cursor
      && (sat = eat - 0.3)
      && (eat = eat + 0.3)

      if (this.o.displayPrevious) {
        ea = this.startAngle + this.angle(this.value)
        this.o.cursor
        && (sa = ea - 0.3)
        && (ea = ea + 0.3)
        this.g.beginPath()
        this.g.strokeStyle = this.previousColor
        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false)
        this.g.stroke()
      }

      this.g.beginPath()
      this.g.strokeStyle = r ? this.o.fgColor : this.fgColor
      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false)
      this.g.stroke()

      this.g.lineWidth = 2
      this.g.beginPath()
      this.g.strokeStyle = this.o.fgColor
      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false)
      this.g.stroke()

      return false
    }
  }
});
/* END JQUERY KNOB */

//-------------
//- LINE CHART -
//--------------
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

var areaChartOptions = {
  maintainAspectRatio : false,
  responsive : true,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      gridLines : {
        display : false,
      }
    }],
    yAxes: [{
      gridLines : {
        display : false,
      }
    }]
  }
}
var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
var lineChartOptions = $.extend(true, {}, areaChartOptions)
var lineChartData = $.extend(true, {}, areaChartData)
lineChartData.datasets[0].fill = false;
lineChartData.datasets[1].fill = false;
lineChartOptions.datasetFill = false

var lineChart = new Chart(lineChartCanvas, {
  type: 'line',
  data: lineChartData,
  options: lineChartOptions
})
/*
 * Flot Interactive Chart
 * -----------------------
 */
// We use an inline data source in the example, usually data would
// be fetched from a server
var data        = [],
    totalPoints = 100

function getRandomData() {

  if (data.length > 0) {
    data = data.slice(1)
  }

  // Do a random walk
  while (data.length < totalPoints) {

    var prev = data.length > 0 ? data[data.length - 1] : 50,
        y    = prev + Math.random() * 10 - 5

    if (y < 0) {
      y = 0
    } else if (y > 100) {
      y = 100
    }

    data.push(y)
  }

  // Zip the generated y values with the x values
  var res = []
  for (var i = 0; i < data.length; ++i) {
    res.push([i, data[i]])
  }

  return res
}

var interactive_plot = $.plot('#interactive', [
    {
      data: getRandomData(),
    }
  ],
  {
    grid: {
      borderColor: '#f3f3f3',
      borderWidth: 1,
      tickColor: '#f3f3f3'
    },
    series: {
      color: '#3c8dbc',
      lines: {
        lineWidth: 2,
        show: true,
        fill: true,
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      show: true
    },
    xaxis: {
      show: true
    }
  }
)

var updateInterval = 500 //Fetch data ever x milliseconds
var realtime       = 'on' //If == to on then fetch data every x seconds. else stop fetching
function update() {

  interactive_plot.setData([getRandomData()])

  // Since the axes don't change, we don't need to call plot.setupGrid()
  interactive_plot.draw()
  if (realtime === 'on') {
    setTimeout(update, updateInterval)
  }
}

//INITIALIZE REALTIME DATA FETCHING
if (realtime === 'on') {
  update()
}
//REALTIME TOGGLE
$('#realtime .btn').click(function () {
  if ($(this).data('toggle') === 'on') {
    realtime = 'on'
  }
  else {
    realtime = 'off'
  }
  update()
})
/*
 * END INTERACTIVE CHART
 */

