//input mask bundle ip address

var example1 = document.getElementById("example1");
var example1_filter = document.getElementById("example1_filter");
example1.DataTable({
    "responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
    "order": [[ 1, "desc" ]],
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
  }).buttons().container().appendTo('#example1_wrapper .col-6:eq(0)');
  example1_filter.css("margin-left","10rem");
//$("#example1_filter").css("margin-left","10rem");

var ipv4_address = document.getElementById("HomeAddress");
$ipv4_address.inputmask({
    alias: "ip",
    greedy: false //The initial mask shown will be "" instead of "-____".
});
