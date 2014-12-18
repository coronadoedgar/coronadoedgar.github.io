
function main_resizeMe(displayHeight, displayWidth,el) {
	console.log('entro juuu');
	//Standard dimensions, for which the body font size is correct
	var preferredHeight = 825;
	var preferredWidth = 900;

		if (displayHeight < preferredHeight || displayWidth < preferredWidth) {
		var heightPercentage = (displayHeight * 100) / preferredHeight;
		var widthPercentage = (displayWidth * 100) / preferredWidth;
		var percentage = Math.min(heightPercentage, widthPercentage);
		var newFontSize = percentage.toFixed(2);

		el.css("font-size", newFontSize + 'px');
		} else {
			el.css("font-size", '100px');
		}
}

function main_display_responsive(el){
	for(x=0;x<el.length;x++){
		e=el[x];
		console.log('elemento'+x);
		if($(window).height()<600){
			e.css('display','none');
		}else{
			e.css('display','block');
		}
	}
}