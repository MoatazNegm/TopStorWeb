//input mask bundle ip address

disks = [];
 kk = 0;
 disks[kk] = [];
 disks[kk]['pool'] = 'disks[kk].pool';
 diskdiv2 ='diskdiv2';
 poolid = 'poolid';
 col = 1;
 disks[kk]['host'] = 'disks[kk].host';
 disks[kk]['status'] = 'disks[kk].status';
 disks[kk]['changeop'] = 'disks[kk].changeop';
 disks[kk]['grouptype'] = 'disks[kk].grouptype';
 disks[kk]['fromhost'] = 'disks[kk].fromhost';
 disks[kk]['size'] = 10;
 disks[kk]['selected'] = 'disks[kk].selected';
 imgf = 'disk-image.png'
 diskimg = 'disk-image'
 clickdisk = 'href="#"'
  $(".freedisks").append(
      '<div id="disk'+disks[kk].pool+'" class=" col-'+col+' disks '+disks[kk]['host']+' '+disks[kk]['pool']+' '+disks[kk]['status']+' '+disks[kk]['changeop']+'">'
     
						/*      +'   <div class="a413">' */
        +'  <a id="'+kk+'2" '+clickdisk+' class="img-clck" >'
        +'     <img class="img412 imgstyle '+diskimg+' disk'+kk+'" src="img/'+imgf+'" />'
        +'  <p class="psize">'+disks[kk]["size"]+'</p></a><p class="pimage">disk'+kk+'</p>'
        +' <p class="pimage">'+disks[kk]["grouptype"]+'</p><p class="pimage">'+disks[kk]["fromhost"]+'</p>'
        +'  </a>'

	 );
   $(".freedisks").append(
      '<div id="disk'+disks[kk].pool+'2" class=" col-'+col+' disks '+disks[kk]['host']+' '+disks[kk]['pool']+' '+disks[kk]['status']+' '+disks[kk]['changeop']+'">'
     
						/*      +'   <div class="a413">' */
      +'  <a id="'+kk+'2" '+clickdisk+' class="img-clck" >'
      +'     <img class="img412 imgstyle '+diskimg+' disk'+kk+'" src="img/'+imgf+'" />'
      +'  <p class="psize">'+disks[kk]["size"]+'</p></a><p class="pimage">disk'+kk+'</p>'
      +' <p class="pimage">'+disks[kk]["grouptype"]+'</p><p class="pimage">'+disks[kk]["fromhost"]+'</p>'
      +'  </a>'
  
	 );

function memberclick(){
    hname=$(this)
  

    if($(this).children('img').hasClass("SelectedFreered") > 0 ) {
        $(this).children('img').removeClass("SelectedFreered")
        $(this).children('img').addClass("SelectedFreewhite");
        selhosts="";
        $("#RhostForget").attr('disabled',true);
    } else {
        console.log('hihihi',$(this).children('img').attr('id'))
      $('img.server').removeClass("SelectedFreered")
      $('img.server').addClass("SelectedFreewhite");
      $(this).children('img').removeClass("SelectedFreewhite");
      $(this).children('img').addClass("SelectedFreered");
        selhosts=hname;
        $("#RhostForget").attr('disabled',false);
    }
}
$(".img-clck").click(memberclick);

