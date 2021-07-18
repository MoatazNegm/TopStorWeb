//input mask bundle ip address
var allhosts= {};
var allhostsready = -1;
var allhostsactive = -1;
var thostcolor = 'red'
alldgs = 'init';
var totalstorage = 0;
var totalstoragealloc = 0;
var emergency = { 0:'darkblue', 25 : '#687ee6', 50: 'yellow', 75: 'eb2a45', 100: 'red'}
var tstoragecolor = 'grey';
col = 1;
function getdata(url){
  var newdgs;
  $.ajax({
    url: url,
    timeout: 3000,
    async: false,
    type: 'GET',
    success: function(data){  newdgs = data}
  });

  return newdgs
}

function extracthosts(){
     var newallhosts = getdata('api/v1/hosts/allinfo');
     var thost = 0;
     if(allhostsready != newallhosts['ready'].length || allhostsactive != newallhosts['active'].length){
        allhostsready = newallhosts['ready'].length ;
        allhostsactive = newallhosts['active'].length;
        $("#totalhosts").text(allhostsactive);
        thost = allhostsready / allhostsactive;
        $.each(emergency,function(e,t){
                
            if(100*(thost) > e) { thostcolor = emergency[100-e]}
        });
        $(".thost").val(thost);  
    }   
    $(".thost").trigger('configure', {'fgColor': thostcolor, 'min':0, 'max': 1, 'skin':'tron'});
    

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
            tstorage = totalstoragealloc * 100 / totalstorage
            $.each(emergency,function(e,t){
                
                if(tstorage > e) { tstoragecolor = t}
            });
            totalstorage = totalstorage.toString().slice(0,5);
            tstorage = tstorage.toString().slice(0,5);
            
        }
    });
        if(change > 0){
        $("#TotalStorage").text(totalstorage+'GB');
        $(".tstorage").val(tstorage);  
        }   
        
}
//$(".addraid").click(function(){ console.log(this); $(this).find('input').prop('checked','checked'); });

extractstorage();
extracthosts()


function refreshall(){
    
    extractstorage();
    extracthosts()
    $(".tstorage").trigger('configure', {'fgColor': tstoragecolor});

  
  ;
}

setInterval(refreshall,2000);