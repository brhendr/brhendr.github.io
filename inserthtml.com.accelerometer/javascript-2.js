$(document).ready(function() {

	var is_touch_device = 'ontouchstart' in document.documentElement;
	
	if(is_touch_device) {
		
		var height, width, accX, accY, xA, yA, movement, bAR, bAL, bAT, bAB;
		
		(resize = function() {
			
			height = $(window).height();
			width = $(window).width();
			
			$('#container, .bottom-box').width(width).height(height);
			
			
		})();
		
		$(window).resize(resize);
		
		window.ondevicemotion = function(event) {  
		  	
		    accX = Math.round(event.accelerationIncludingGravity.x*10) / 10;  
		    accY = Math.round(event.accelerationIncludingGravity.y*10) / 10;  
		    
		    run();
		    
		}  
		
	} else {
		$('.content').show();
		
		$('#container').addClass('fullscreen').mousemove(function(e) {
			
			width = $(this).width();
			height = $(this).height();
			
			accX = (((e.pageX - this.offsetLeft)*2 / width) * 10) - 10;
			accY = (((e.pageY - this.offsetTop)*2 / width) * 10) - 10;
			
	 	    run();	    
		   
			
			
			
		});
	}
	
	function run() {
		
		movement = 20;
		
		xA = (width/2) - (accX*movement);
		yA = (height/2) - (accY*movement);
		
		bAR = Math.abs((xA-width/2) / (movement*20)); 
		bAL = Math.abs((xA-width/2) / (movement*20));
		bAT = Math.abs((yA-height/2) / (movement*20));
		bAB = Math.abs((yA-height/2) / (movement*20));
	
	    if(xA > (width/2)) { bAL = 0; } else if(xA < (width/2)) { bAR = 0; }
	    if(yA < (height/2)) { bAB = 0; } else if(yA > (height/2)) { bAT = 0; }

		$('.right-edge').css({'box-shadow' : 'inset 0 0 500px 500px rgba(0,0,0,'+bAR+')'});
		$('.left-edge').css({'box-shadow' : 'inset 0 0 500px 500px rgba(0,0,0,'+bAL+')'});  
		$('.top-edge').css({'box-shadow' : 'inset 0 0 500px 500px rgba(0,0,0,'+bAT+')'});
		$('.bottom-edge').css({'box-shadow' : 'inset 0 0 500px 500px rgba(0,0,0,'+bAB+')'}); 
		
		$('#container').css({'transform-origin' : xA+'px '+yA+'px'});
		
	}
});
