//input mask bundle ip address

disks = [];
kk = 0;
disks[kk] = [];
disks[kk]['pool'] = 'disks[kk].pool';
diskdiv2 ='diskdiv2';
poolid = 'poolid';
alldgs = 'init';
col = 1;
disks[kk]['host'] = 'disks[kk].host';
disks[kk]['status'] = 'disks[kk].status';
disks[kk]['changeop'] = 'disks[kk].changeop';
disks[kk]['grouptype'] = 'disks[kk].grouptype';
disks[kk]['fromhost'] = 'disks[kk].fromhost';
disks[kk]['size'] = 10;
disks[kk]['selected'] = 'disks[kk].selected';
imgf = 'disk-image.png';
diskimg = 'disk-image';
clickdisk = 'href="#"';

function getdgs(){
  var newdgs;
  $.ajax({
    url: 'api/v1/pools/dgsinfo',
    timeout: 3000,
    async: false,
    type: 'GET',
    success: function(data){  newdgs = data}
  });
  return newdgs
}
$('.newraid input').click(function(e){
  console.log('hi',$(this).prop('id'))
});
function initdgs(){
  var poolcard;
  var pool, host, status, grouptype, raid, changeop,shortdisk, size;
  $('.phdcp').remove();
  $.each(alldgs['pools'],function(e,t){
    if(e.includes('pree') < 1){
      pool = e;
      poolcard = $(".toclone").clone();
      poolcard.insertBefore($("#freepools"));
      poolcard.removeClass('toclone');
      poolcard.addClass('phdcp');
      poolcard.prop('id',pool);
      $('#'+pool+" .title").text(pool);

      $.each(t['raids'],function(ee,tt){
        raid = tt;

        $.each(alldgs['raids'][raid]['disks'],function(eee,disk){
          shortdisk = disk.slice(-5);
          status = alldgs['disks'][disk]['status'];
          host = alldgs['disks'][disk]['host'];
          changeop = alldgs['disks'][disk]['changeop'];
          size = alldgs['disks'][disk]['size'];
          $('#'+pool+' .disks').append(
            '<div id="'+disk+'" data-disk="'+disk+'" class=" col-'+col+' '+raid+' '+pool+' '+status+' '+changeop+'">'
              +'  <a href="javascript:memberclick(\'#'+disk+'\')" class="img-clck" >'
              +'     <img class="img412 imgstyle '+diskimg+' '+disk+'" src="img/'+imgf+'" />'
              +'  <p class="psize">'+size+'</p></a><p class="pimage">'+shortdisk+'</p>'
              //+' <p class="pimage">'+changeop+'</p><p class="pimage">'+e+'</p>'
              +'  </a>'
            +'</div>'
          );
        });
      });
      $.each($('.btna'),function(k,v){
        $(v).data('pool',pool);
        $(v).removeClass('btna');
        $(v).addClass('updatepool');
      }); 
      poolcard.show();
    }
 });
 $(".freedisks").children().remove();
 $(".newraid").hide();
 $(".newraidoption").remove();
 $.each(alldgs['raids']['free']['disks'],function(e,disk){
  shortdisk = disk.slice(-5);
  status = alldgs['disks'][disk]['status'];
  host = alldgs['disks'][disk]['host'];
  changeop = alldgs['disks'][disk]['changeop'];
  size = alldgs['disks'][disk]['size'];
  $('.freedisks').append(
    '<div id="'+disk+'" data-disk="'+disk+'" class=" col-'+col+' '+status+' '+changeop+'">'
      +'  <a href="javascript:memberclick(\'#'+disk+'\')" class="img-clck" >'
      +'     <img class="img412 imgstyle '+diskimg+' '+disk+'" src="img/'+imgf+'" />'
      +'  <p class="psize">'+size+'</p></a><p class="pimage">'+shortdisk+'</p>'
      //+' <p class="pimage">'+changeop+'</p><p class="pimage">'+e+'</p>'
      +'  </a>'
    +'</div>'
  );

 }); 
 $.each(alldgs['newraid'],function(e,t){
  if(e == 'single'){
   if(Object.keys(t).length > 0 ){
     $.each(t,function(size,value){
      var o = new Option(size.toString()+'GB',size);
      $("#selectsingle").append(o);
     });
   }
   $(".divsingle").show();
  } else {
    if(Object.keys(t).length > 0){
      $.each(t,function(size,raid){
        var o = new Option(size.toString()+'GB',size);
        $("#select"+e).append(o)
      });
    }
    $(".div"+e).show();
  }
 });



}
alldgs = getdgs();
initdgs();

$('.updatepool').click(function(e){
  e.preventDefault();
  var pool = $(this).data('pool');
  var therole = $(this).data('therole');

})
function memberclick(thisclck){
  //hname=$(thisclck).attr('data-disk');
  var hname = thisclck

  if($(thisclck+' img').hasClass("SelectedFreered") > 0 ) {
    $(thisclck+' img').removeClass("SelectedFreered")
      $(thisclck+' img').addClass("SelectedFreewhite");
      selhosts="";
      $("#RhostForget").attr('disabled',true);
  } else {
    $('img.server').removeClass("SelectedFreered")
    $('img.server').addClass("SelectedFreewhite");
    $(thisclck+' img').removeClass("SelectedFreewhite")
    $(thisclck+' img').addClass("SelectedFreered");
      selhosts=hname;
      $("#RhostForget").attr('disabled',false);
      
  }
}
    

function getChanges(prev, now) {
  var changes = {};
  for (var prop in now) {
      if (!prev || prev[prop] !== now[prop]) {
          if (typeof now[prop] == "object") {
              var c = getChanges(prev[prop], now[prop]);
              if (! $.isEmptyObject(c) ) // underscore
                  changes[prop] = c;
          } else {
              changes[prop] = now[prop];
          }
      }
  }
  
  return changes;

}


function dgrefresh(){
  var newdgs = getdgs();
  var needupdate = 0;

  if((JSON.stringify(alldgs['disks']) != JSON.stringify(newdgs['disks'])) ||
  (JSON.stringify(alldgs['raids']) != JSON.stringify(newdgs['raids']))) {
    
    needupdate = 1;
  }
  $.each(newdgs['pools'],function(e,t){
    if(t['changeop'] != alldgs['pools'][e]['changeop'] || t['status']!=alldgs['pools'][e]['status']){
      needupdate = 1;
    }
  });
  if(needupdate){
    
    alldgs = JSON.parse(JSON.stringify(newdgs)); 

    initdgs();
  }
}

function refreshall(){
  dgrefresh();
}

setInterval(refreshall,2000);