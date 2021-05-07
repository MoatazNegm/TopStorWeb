
$(".checkboxy").css("margin-top","0.36rem");
$(".form-check").css("margin-bottom","0.6rem");
function sortsofts(){
var options = $('#softs option');
var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
arr.sort(function(o1, o2) { return o1.t < o2.t ? 1 : o1.t > o2.t ? -1 : 0; });
options.each(function(i, o) {
  o.value = arr[i].v;
  $(o).text(arr[i].t);
});
}
sortsofts();