
//var ipv4_address = $(".ipaddress");
//ipv4_address.inputmask();
var wpath = window.location.pathname;
var wpage = wpath.split("/").pop();
localStorage.setItem("lastlocation",wpage);

var globalnotif = {'msgcode':'init','time':'init'};
var hypetoken = localStorage.getItem('token');
if(hypetoken == null || hypetoken == '0'){  location.replace('login.html');}
$.ajax({
  url: 'api/v1/login/test',
  async: false,
  type: 'GET',
  data: {'token': hypetoken},
  success: function(isok) {  
    if(isok['response'].includes('baduser') > 0){
      location.href = 'login.html';
    };
  } 
});
var puser = localStorage.getItem('user');
if(puser != 'admin') {$(".auths").hide();}
$.ajax({
  url: 'api/v1/users/userauths',
  async: false,
  type: 'GET',
  data: {'username':puser, 'token': hypetoken},
  success: function(data) {  
    if(data['response'].includes('baduser') > 0){
      location.href = 'login.html';
    }
    var auths = data['auths'].split('/')
    $.each(auths,function(e,t){
      if(t.includes(true) > 0){
        var theauth = t.split('-')[0];
        $("."+theauth).show();
      }
    })
  
  } 
});


dirtylog = 1;
function postdata(url,data){
  data['token'] = hypetoken;
  $.ajax({
    url: url,
    dataType: 'json',
    data: data,
    success: function(data) {  
      if(data['response'].includes('baduser') > 0){
         location.replace('login.html');
      }
    }
  });

}

$(".main-sidebar").css("background","#131010")
var ipv4_address = $(".ipaddress");
try{
ipv4_address.inputmask({ "clearIncomplete": true });
}
catch{ ; }
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
      data: {'token': hypetoken},
      success: function(data) {  notif=data;
      if(notif['response'].includes('baduser') > 0){
         location.replace('login.html');
      }}
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
    $('body').click(function(e){
      var apiurl = 'api/v1/login/renewtoken';
      var apidata = {'token':hypetoken};
      postdata(apiurl,apidata);
    })
      
