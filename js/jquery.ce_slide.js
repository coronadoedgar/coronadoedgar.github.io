(function(){
	//clase ce_slide
	var ce_slide=function(el,options){
		var defaults={
			ce_margin_top:'0'
		}
		this.options=(defaults,options);
		var o=this;

		rezise_slide=function (el_video) {

			//redimencionar slide
			$('.item').css({
				height:(o.options.ce_container=='default') ? 'auto': o.options.ce_container.height()
			});

			//redimencionar video
			el_video.css('height',el.height());
			if(!(el_video.data('condicional'))) el_video.css('top','-'+el.height()+'px');
		}

		animate_slide_video=function (el_video,parameter) {
			switch(parameter){
				case 'show':
					el_video.css('display','block')
					el_video.animate({top:o.options.ce_margin_top+'px'},2000,'easeOutBounce',function(){el.css('display','none')});
					
					var v_element=$('<div id="cerrar"><img src="img/cerrar.png" alt="cerrar"/></div>');
					el_video.append(v_element);
					el_video.data('condicional', 'active');
					v_element.css({
						position:'absolute',
						top:5+'px',
						right:0+'%',
						'z-index':2,
						cursor: 'pointer'
					});
					v_element.children('img').css({
						height:20+'px',
						width:20+'px'
					});
					break;
				case 'hide':
					el.css('display','block');
					el_video.animate({top:'-'+el.height()+'px'},2000,'easeOutBounce',function(){
																						el_video.css('display','none');
																						src=el_video.children('iframe').attr('src');
																						el_video.children('iframe').removeAttr('src').attr('src',src);
																						el_video.removeData('condicional');
																					});
					
					break;
				default:
					console.log("no definido animación de video");
			}
		}

		build_video=function (el_thrower_video,src) {
			var el_video=$('<div id="myVideo" class="col-sm-12 col-md-12"><iframe id="main-video" src="'+src+'" width="100%" height="99%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>');
			el.before(el_video);
			el_video.css({
				'top':'-'+el.height()+'px',
				'height':el.height()+'px',
				width:100+'%',
				'background-color':'#1088D8',
				'position':'absolute',
				'z-index':2
			});
			//evento mostrar video
			el_thrower_video.on('click',function(){
				animate_slide_video(el_video,'show');
			});

			//evento oculta video
			el_video.on('click',$('#cerrar'),function(){
				animate_slide_video(el_video,'hide');
			});
		}

		o.buil_slide=function(){
			switch(el.attr('class')){
				case 'ce_slide_classical':
					el.css('overflow','hidden');

					var el_section=$('<section id="mySlide" class="carousel slide"></section>');
					var el_indicators=$("<ol class='carousel-indicators'></ol>");
					var el_carousel=$("<div class='carousel-inner'></div>");

					el.children('ul').children().each(function(i){
						var el_li=$(this);
						var attri_clase=(i==0) ? 'class="active"' : '';
						el_indicators.append($('<li data-target="#mySlide" data-slide-to="'+i+'" '+attri_clase+'></li>'));
						var attrc_clase=(i==0) ? 'class="item active"' : 'class="item"';
						var el_carousel_content=el_li.children('img');
						if(el_li.attr('class')=='ce_slide_item_video'){
							o.options.ce_margin_top=($(el_li.data('margin:top')).height());
							el_carousel_video=$('<div class="container"><div class="carousel-caption"><p class="wow bounceIn" data-wow-delay="0.3s"><a id="btn_video" class="btn btn-lg btn-primary" href="#" role="button" data-thrower:video="'+el_li.data('url:video')+'">Play video</a></p></div></div>');
						}else{
							el_carousel_video='';
						}
						el_carousel.append($('<div '+attrc_clase+'></div>').append(el_carousel_content,el_carousel_video));
					});
					el_section.append(el_indicators,el_carousel,'<a href="#mySlide" class="left carousel-control" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a href="#mySlide" class="right carousel-control" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>');
					el.html(el_section);

					$('.item').children('img').css({
						width:100+'%',
						height:100+'%'
					});

					o.options.ce_height=(o.options.ce_container=='default') ? o.options.ce_height : o.options.ce_container.height() ;	
					$('.item').css({
						height:(o.options.ce_container=='default') ? 'auto': o.options.ce_container.height()
					});

					build_video($('#btn_video'),$('#btn_video').data('thrower:video'));
					$('#btn_video').removeAttr('data-thrower:video');

					$(window).resize(function(){
						console.log('resize ce_slide');
						rezise_slide($('#myVideo'));
					});
					break;
				case '':
					break;
				default:
					console.log('no definido la clase');
			}
		};
	};

	//función principal
	$.fn.ce_slide=function(options){
		options=$.extend({
			ce_interval:1000,
			ce_container:'default'
		},options);
		$(this).each(function(){
			var el=$(this);
			var obj_ce_slide=new ce_slide(el,options);
			obj_ce_slide.buil_slide();
			$('.carousel').carousel({
				interval:obj_ce_slide.options.ce_interval
			});
		});
	};
})(jQuery);