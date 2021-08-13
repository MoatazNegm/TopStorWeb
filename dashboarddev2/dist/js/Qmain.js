
//var ipv4_address = $(".ipaddress");
//ipv4_address.inputmask();
var userofpass='00';
var onedaylog = { 'error':-1, 'warning':-1, 'failedlogon':-1 };
var statusdict = {'running': '25%', 'start': '10%', 'stop': '100%', 'finish': '100%', 'cancel': '0%'}
var statuscolors = {'running': 'bg-primary', 'start': 'pg-secondary%', 'stop': 'bg-success', 'finish': 'bg-success', 'cancel': 'bg-warning'}
var wpath = window.location.pathname;
var wpage = wpath.split("/").pop();
var requests = {};
var tasks = {};
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
    } else {
      $("#username").text(isok['response']);
      $("#chgpasswd").data('username',isok['response']);
      
     
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
function updatetasks(){
  $.each(tasks,function(task,hosts){
    $.each(hosts,function(host,status){
      var statusp = statusdict[status];
      if(statusp=='100%'){
        if($('#tr'+task+host).data('100')=='0'){
          $('#tr'+task+host).data('100','1')
        } else {
         $('#tr'+task+host).hide();
        }
      }
    });
  });
  $.each(requests,function(task,hosts){
    if(task in tasks){
      $.each(hosts,function(host,status){
        tasks[task][host] = status;
        var statusp = statusdict[status];
        var statusc = statuscolors[status];
        if(statusp !="100%"){  $('#tr'+task+host).show();}
        $("#"+task+host).css('width',statusp);
        $("#n"+task+host).text(statusp);
        $("#"+task+host).removeClass (function (index, className) {
          return (className.match (/(^|\s)bg-\S+/g) || []).join(' ');
         });
        $("#n"+task+host).removeClass (function (index, className) {
          return (className.match (/(^|\s)bg-\S+/g) || []).join(' ');
        });
        $("#"+task+host).addClass(statusc);
        $("#n"+task+host).addClass(statusc);
        });
      } 
    else {
        tasks[task] = {};
        $.each(hosts, function(host,status){
          var statusp = statusdict[status];
          var statusc = statuscolors[status];
          $('#tasktable').append('<tr data-100="0" id="tr'+task+host+'">' 
          + '<td class="'+task+' '+host+'">'+task+'</td>' 
          + '<td class="'+task+' '+host+'">'+host+'</td>' 
          +  '<td class="'+task+' '+host+'"><div class="progress progress-xs">'
          +   '<div id="'+task+host+'"  class="'+task+' '+host+'  progress-bar '+statusc+'"'
          +    'style="width: '+statusp+'"></div>'
          + ' </div></td>'
          + ' <td><span id="n'+task+host+'" class=" badge '+statusc+'">'+statusp+'</span></td>'
          + '</tr>'
          );
          tasks[task][host] = status;
        });
        
    }
  });
}

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

$(".main-sidebar").css("background","#0D0D7F")
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
  function extractonedaylog(){
    ;
  }
  function onedaylogfn(){
    $.ajax({
      url: 'api/v1/info/onedaylog',
      //timeout: 3000,
      async: true,
      type: 'GET',
      data: {'token':hypetoken },
      success: function(newonedaylog){  
        var tot = 0
        tot = newonedaylog['error'].length - newonedaylog['failedlogon'].length + newonedaylog['warning'].length
        var tconn = 0;
        onedaylog['error'] = newonedaylog['error'];
        onedaylog['warning'] = newonedaylog['warning'];
        onedaylog['failedlogon'] = newonedaylog['failedlogon'];
        $("#tot").text(tot);
        $("#warns").text(newonedaylog['warning'].length);
        $("#errs").text(newonedaylog['error'].length - newonedaylog['failedlogon'].length);
        $("#logonfails").text(newonedaylog['failedlogon'].length);
        extractonedaylog();
      }
    });
  }
 
  var bg = {'warning':{'class':'bg-warning', 'loc':'bottomLeft', 'delay':10000},
     'error':{'class':'bg-danger', 'loc':'topRight', 'delay':10000}, 
     'info':{'class':'bg-info','loc':'bottomRight', 'delay':4000},};
  setInterval(function(){
    var notif;
    onedaylogfn();
    $.ajax({
      url: 'api/v1/info/notification',
      async: true,
      type: 'GET',
      data: {'token': hypetoken},
      success: function(data){  
        notif=data; requests=data['requests'];
      if(notif['response'].includes('baduser') > 0){
         location.replace('login.html');
      }
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
    }
   });
    }, 5000);
    $('body').click(function(e){
      var apiurl = 'api/v1/login/renewtoken';
      var apidata = {'token':hypetoken};
      postdata(apiurl,apidata);
    })
$("li.auths a.active").css('background-color','#4558FC');   
$(".chgpasswd").click(function(e){
 userofpass=$(this).data('username');
});
$('#passwrd').click(function(e){
  var apiurl = 'api/v1/user/changepass';
  var apidata = {'username': userofpass, 'password': $("#pass").val()};
  postdata(apiurl,apidata);
})
$(".chpass").focusout(function(e){ 
  if($('#pass').val() != $('#newpass').val()){
     $('#passerr').css('color','red');
     $('#passwrd').prop('disabled',true);
  } else {
    $('#passerr').css('color','white'); 
    $('#passwrd').prop('disabled',false);
  }
});
