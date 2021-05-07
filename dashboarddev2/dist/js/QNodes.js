//input mask bundle ip address
function memberclick(thisclck){
    hname=$(thisclck).attr('data-htname');
    console.log('hihihi',hname)

    if($(thisclck).children('img').hasClass("SelectedFreered") > 0 ) {
        $(thisclck).children('img').removeClass("SelectedFreered")
        $(thisclck).children('img').addClass("SelectedFreewhite");
        selhosts="";
        $("#RhostForget").attr('disabled',true);
    } else {
      $('img.server').removeClass("SelectedFreered")
      $('img.server').addClass("SelectedFreewhite");
      $(thisclck).children('img').removeClass("SelectedFreewhite")
      $(thisclck).children('img').addClass("SelectedFreered");
        selhosts=hname;
        $("#RhostForget").attr('disabled',false);
       
    }
}

$(".img-clck").click(function(event) {
  memberclick(this);
  event.preventDefault();
});
var example1_filter = $("#example1_filter");
$("#example1").DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
    "order": [[ 1, "desc" ]],
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#example1_wrapper .col-6:eq(0)');
  $("#example1_filter").css("margin-left","10rem");
//$("#example1_filter").css("margin-left","10rem");
