
var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();


$(".main-sidebar").css("background","#131010")
var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();
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
