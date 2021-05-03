//input mask bundle ip address
function memberclick(){
    hname=$(this).attr('data-htname');
    console.log('hihihi',hname)

    if($(this).children('img').hasClass("SelectedFreered") > 0 ) {
        $(this).children('img').removeClass("SelectedFreered")
        $(this).children('img').addClass("SelectedFreewhite");
        selhosts="";
        $("#RhostForget").attr('disabled',true);
    } else {
      $('img.server').removeClass("SelectedFreered")
      $('img.server').addClass("SelectedFreewhite");
      $(this).children('img').removeClass("SelectedFreewhite")
      $(this).children('img').addClass("SelectedFreered");
        selhosts=hname;
        $("#RhostForget").attr('disabled',false);
    }
}

$(".img-clck").click(memberclick);
var example1_filter = $("#example1_filter");
$("#example1").DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
    "order": [[ 1, "desc" ]],
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#example1_wrapper .col-6:eq(0)');
  $("#example1_filter").css("margin-left","10rem");
//$("#example1_filter").css("margin-left","10rem");
