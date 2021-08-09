//input mask bundle ip address

disks = [];
kk = 0;
disks[kk] = [];
disks[kk]['pool'] = 'disks[kk].pool';
diskdiv2 ='diskdiv2';
poolid = 'poolid';
alldgs = {disks: {}, newraid: {}, pools: {}, raids: {}};
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
  $.ajax({
    url: 'api/v1/pools/dgsinfo',
    //timeout: 3000,
    async: true,
    type: 'GET',
    success: function(data){  dgrefresh(data); }
  });
}

$('.newraid input').click(function(e){
  $('#createpool').attr('disabled',false);
  $('#createpool').data('redundancy',$(this).prop('id'));
});

//$(".addraid").click(function(){ console.log(this); $(this).find('input').prop('checked','checked'); });
function setdeletesequence(pool){
  if (alldgs['pools'][pool]['volumes'].length == 0){
    $("#"+pool+" .poolbtn1").show();
    $("#"+pool+" .poolbtn1").click(function(e){
      e.preventDefault();
      $("#"+pool+" .poolbtn1").hide();
      $("#"+pool+" .poolbtn1c").show();
      $("#"+pool+" .poolbtn2").show();
    });
    $("#"+pool+" .poolbtn2").click(function(e){
      e.preventDefault();
      $("#"+pool+" .poolbtn1c").hide();
      $("#"+pool+" .poolbtn2").hide();
      $("#"+pool+" .poolbtn2c").show();
      $("#"+pool+" .poolbtn3").show();
    })
    $("#"+pool+" .poolbtn1c").click(function(e){
      e.preventDefault();
      $("#"+pool+" .poolbtn1c").hide();
      $("#"+pool+" .poolbtn2").hide();
      $("#"+pool+" .poolbtn1").show();
    })
    $("#"+pool+" .poolbtn2c").click(function(e){
      e.preventDefault();
      $("#"+pool+" .poolbtn2c").hide();
      $("#"+pool+" .poolbtn3").hide();
      $("#"+pool+" .poolbtn1").show();
    })
    $("#"+pool+" .poolbtn3").click(function(e){
      e.preventDefault();
      adelpool(pool);
    });
  } else {
    var volumes = ' '
    $.each(alldgs['pools'][pool]['volumes'],function(pe,pv){
      volumes = volumes+pv.split('_')[0]+', ';
    })
    if(volumes.length > 0){ volumes = volumes.slice(0,-2)}
    $("#"+pool+" .volumespan").text(volumes);
    $("#"+pool+" .volumes").show();
  }
}
function initaddgs(){
  if(typeof alldgs == 'undefined' ) {return;}
  $(" .addraid").hide();
  $.each(alldgs['pools'],function(e,t){
    pool = e; 
    $('#'+pool+" option").remove()
    
    if($('#'+pool+" option").length <= 0){
      $.each(alldgs['newraid'],function(en,tn){


            if(Object.keys(tn).length > 0){
              
              $.each(tn,function(psize,raid){
                var size = psize.slice(0,5)
                totalsize= parseFloat(size)+parseFloat(t['available']);
                var o = new Option(totalsize.toString().slice(0,5),size);
                $('#'+pool+" .select"+en).append(o)
              });
            }
            if (alldgs['pools'][pool]['Availability'].includes('Availability')){
              $('#'+pool+" .adiv"+en).show();
              $('#'+pool+" .adivvolset").hide();
            } else {
              $('#'+pool+" .adiv"+en).hide();
              $('#'+pool+" .adivvolset").show();
            }
      });
      $('#'+pool+" .addtopool").prop('disabled','disabled');
      $('#'+pool+" .addtopool").data('pool',pool);
      $('#'+pool+" .addraid").data('pool',pool);
      $('#'+pool+" .addtopool").addClass('addto'+pool);

    }
  });
  $(".addraid").click(function(e){
    e.preventDefault();
    $(this).find('input').prop('checked','checked')
    var pool = $(this).data('pool');
    $('.addto'+pool).attr('disabled',false);
    $('.addto'+pool).data('redundancy',$(this).find('input').data('redundancy'));
  });

}
function initdgs(){
  var poolcard;
  var pool, host, status, grouptype, raid, changeop,shortdisk, size;
  if(typeof alldgs == 'undefined' ) {return;}
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
      var allsize = Math.round(100*(parseFloat(t['available'])+parseFloat(t['used'])))/100 ;
      $('#'+pool+" .spansize").text('size:'+allsize.toString()+'GB');
      $('#'+pool+" .spanused").text('used:'+t['used'].toString().slice(0,5)+'GB');
      var avtype = 'Highly Available';
      var avcolor = 'blue';
      if(t["Availability"] != "Availability") { avtype = 'No Redundancy'; avcolor='red'}
      $('#'+pool+" .spanredundancy").text(avtype);
      $('#'+pool+" .spanredundancy").css('color',avcolor);
      $('#'+pool+" .spandedup").text('dedupped:'+t['dedup']);

      $.each(t['raids'],function(ee,tt){
        raid = tt;
        $.each(alldgs['raids'][raid]['disks'],function(eee,disk){
          shortdisk = disk.slice(-5);
          status = alldgs['disks'][disk]['status'];
          host = alldgs['disks'][disk]['host'];
          changeop = alldgs['disks'][disk]['changeop'];
          size = parseFloat(alldgs['disks'][disk]['size']).toFixed(2);
          if(status.includes('ONLINE')){
            imgf = 'disk-image.png';
          } else {
            imgf = 'invaliddisk.png';
          }
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
      setdeletesequence(pool);
      poolcard.show();
    }
 });
 $(".freedisks").children().remove();
 $(".newraid").hide();
 $(".newraid option").remove();
 if('free' in alldgs['raids']) {
    $.each(alldgs['raids']['free']['disks'],function(e,disk){
      shortdisk = disk.slice(-5);
      status = alldgs['disks'][disk]['status'];
      host = alldgs['disks'][disk]['host'];
      changeop = alldgs['disks'][disk]['changeop'];
      size = parseFloat(alldgs['disks'][disk]['size']).toFixed(2);
      if(status.includes('free') ){
        imgf = 'disk-image.png';
      } else {
        imgf = 'invaliddisk.png';
      }
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
        $.each(t,function(psize,value){
          var size = psize.slice(0,5)
          var o = new Option((size*0.9).toString().slice(0,5),size);
          $("#selectsingle").append(o);
        });
      }
      $(".divsingle").show();
      } else {
        if(Object.keys(t).length > 0){
          $.each(t,function(psize,raid){
            var diskcount = raid['diskcount'];
            var size = psize.slice(0,5)
            var o = new Option((size*0.9).toString().slice(0,5),size);
            $("#select"+e).append(o)
          });
        }
        $(".div"+e).show();
      }
    });
 }
 $("tr:visible").each(function (index) {
  $(this).css("background-color", !!(index & 1)? "rgba(0,0,0,.05)" : "rgba(0,0,0,0)");
});


}
getdgs();
initdgs();
initaddgs();

$('.updatepool').click(function(e){
  e.preventDefault();
  var pool = $(this).data('pool');
  var therole = $(this).data('therole');

})
function adelpool(pool){
    var apiurl = "api/v1/pools/delpool";
    var apidata = {"pool": pool,'user':'mezo' }
    postdata(apiurl,apidata);
}

$('#createpool').click(function(e){
  e.preventDefault();
  var apiurl = "api/v1/pools/newpool";
  var redundancy = $(this).data('redundancy');
  var useable = $("#select"+redundancy).val();
  var apidata = {"redundancy": $(this).data('redundancy'), 'useable': useable, 'user':'mezo' }
  postdata(apiurl,apidata);
});
$('.addtopool').click(function(e){
  e.preventDefault();
  var apiurl = "api/v1/pools/addtopool";
  var redundancy = $(this).data('redundancy');
  var pool = $(this).data('pool');
  var useable = $("#"+pool+" .select"+redundancy).val();
  var apidata = {"pool": pool, "redundancy": redundancy, 'useable': useable, 'user':'mezo' }
  postdata(apiurl,apidata);
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


function dgrefresh(newdgs){
  var needupdate = 0;
  if((JSON.stringify(alldgs['disks']) != JSON.stringify(newdgs['disks'])) ||
  (JSON.stringify(alldgs['raids']) != JSON.stringify(newdgs['raids']))) {
    
    needupdate = 1;
  }
    if(JSON.stringify(Object.keys(alldgs['pools'])) != JSON.stringify(Object.keys(newdgs['pools']))){
      needupdate = 1;
  } else{
    $.each(newdgs['pools'],function(e,t){
      if(t['changeop'] != alldgs['pools'][e]['changeop'] || t['status']!=alldgs['pools'][e]['status']){
        needupdate = 1;
      }
    });
  }
  if(needupdate){
    
    alldgs = JSON.parse(JSON.stringify(newdgs)); 

    initdgs();
    initaddgs();
  }
}

function refreshall(){
  updatetasks();
  
  getdgs();
}

setInterval(refreshall,2000);
