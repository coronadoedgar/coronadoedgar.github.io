---
---

(function($){
  $.fn.parallax = function(options){
    var $$ = $(this);
    if ($$.length<=0){return}
    offset = $$.offset();
    var defaults = {
      'start': 0,
      'stop': offset.top + $$.height(),
      'coeff': 0,
      'type': 'image'
    };
    var opts = $.extend(defaults, options);
    return this.each(function(){
      $(window).bind('scroll', function() {
        windowTop = $(window).scrollTop();
        if((windowTop >= opts.start) && (windowTop <= opts.stop)) {
          newCoord = windowTop * opts.coeff;
          if (opts.type == 'image'){
          	$$.css({
              'background-position': '0 '+ newCoord + 'px'
          	});	
          }else if(opts.type == 'text'){
          	$$.children('.meta-post').find('p').css({
              'margin-top': newCoord + 'px'
          	});
          }
        }
      });
    });
  };
})(jQuery);