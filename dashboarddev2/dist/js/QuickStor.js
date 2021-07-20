//input mask bundle ip address
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
        if( newtotalstorage != totalstorage || newtotalstoragealloc != totalstoragealloc ){
            change = 1;
            totalstorage = newtotalstorage
            totalstoragealloc = newtotalstoragealloc
            tstorage = totalstoragealloc
            $.each(emergency,function(e,t){
                
                if(tstorage > e) { tstoragecolor = t}
            });
            totalstorage = parseFloat(totalstorage.toString().slice(0,5));
            tstorage = parseFloat(tstorage.toString().slice(0,5));
            
        }
    });
 
    $("#TotalStorage").text(totalstorage+'GB');
    $(".tstorage").trigger('configure', {'fgColor': tstoragecolor, 'min':0, 'max': totalstorage *1000, 'skin':'tron'});
    $(".tstorage").val(tstorage*1000);
    $(".tstorage").trigger('change');
    
        
}
//$(".addraid").click(function(){ console.log(this); $(this).find('input').prop('checked','checked'); });

extractstorage();
extracthosts()


function refreshall(){
    
    extractstorage();
    extracthosts();
    extractconns();
    //$(".tstorage").trigger('configure', {'fgColor': tstoragecolor});

  
  ;
}

setInterval(refreshall,2000);