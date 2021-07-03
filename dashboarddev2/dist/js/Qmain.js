
//var ipv4_address = $(".ipaddress");
//ipv4_address.inputmask();

var globalnotif = {'msgcode':'init','time':'init'};

if (typeof(Storage) !== "undefined") {
  // Store
  //localStorage.setItem("lastname", "Smith");
  // Retrieve
  console.log('it is ok :',localStorage.getItem("lastname"));
} else {
  console.log("Sorry, your browser does not support Web Storage...");
}




dirtylog = 1;
function postdata(url,data){
  $.ajax({
    url: url,
    dataType: 'json',
    data: data,
  });
}

$(".main-sidebar").css("background","#131010")
var ipv4_address = $(".ipaddress");
ipv4_address.inputmask({ "clearIncomplete": true });
//Initialize Select2 Elements
jQuery(function($){
    $('.card-header').each(function(){
      let $card_header = $(this);
      let $collapse_element = $card_header.next();
      $collapse_element.on('show.bs.collapse', function () {
        let $card_header_top = $card_header.offset().top;
        let $visible_collapse = $('.collapse.show');
        if($visible_collapse.length){
          let $visible_collapse_top = $visible_collapse.offset().top;
          if($visible_collapse_top < $card_header_top){
            $card_header_top -= $visible_collapse.height();
          }
        }
        $([document.documentElement, document.body]).animate({
          scrollTop: $card_header_top
        });
      });
    });
  });
  var bg = {'warning':{'class':'bg-warning', 'loc':'bottomLeft', 'delay':10000},
     'error':{'class':'bg-danger', 'loc':'topRight', 'delay':10000}, 
     'info':{'class':'bg-info','loc':'bottomRight', 'delay':4000},};
  setInterval(function(){
    var notif;
    
    $.ajax({
      url: 'api/v1/info/notification',
      async: false,
      type: 'GET',
      success: function(data) {  notif=data;}
    });
    // for fixing the time zone presentation
    if(notif['msgcode'].includes('_')  && notif['msgcode'].includes('%') && notif['msgcode'].includes('!')){
       notif['msgcode'] = notif['msgocde'].split('%')[2]
     }
    if(globalnotif['time'] != notif['time'] || globalnotif['msgcode'] != notif['msgcode']){
      globalnotif = notif;
      dirtylog = 1;
      //console.log('notif',notif['type'], bg[notif['type']]['class'],bg[notif['type']]['loc'], bg[notif['type']]['delay'] );
      notifbody = notif['msgbody'];
      $(document).Toasts('create', { 
        title: notif['host'],
        subtitle: notif['user'],
        close: false,
        class: bg[notif['type']]['class']+' infoalert',
        autohide: true,
        position: bg[notif['type']]['loc'],
        delay: bg[notif['type']]['delay'],
        body: notifbody
      });
      
    } else { dirtylog = 0}
    }, 5000);
      