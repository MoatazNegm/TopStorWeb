//input mask bundle ip address
var ipv4_address = $('#HomeAddress');
$('#HomeAddress').inputmask({
    alias: "ip",
    greedy: true //The initial mask shown will be "" instead of "-____".
});
