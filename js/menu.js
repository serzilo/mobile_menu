

var Sidebar = {
	top_scroll_state : 0,
	browser : false,
	toggle_menu : function(a){
		var page = $('#page'),
			content = $('#content'),
			sidebar = $('#sidebar'),
			topScroll = Sidebar.window_scroll_Y();

		function open_sidebar(){
			if (Sidebar.browser != 'operamini'){
				var sidebarHeight = sidebar.height();

				page.addClass('page_menu-opened').css({'min-height':sidebarHeight+'px'});
				content.css({'top':'-'+topScroll+'px'});

				window.scrollTo(0,0);
				Sidebar.top_scroll_state = topScroll;
			}else{
				page.addClass('page_menu-top_opened')
			}
		}

		function close_sidebar(){
			if (Sidebar.browser != 'operamini'){
				page.removeClass('page_menu-opened').css({'min-height':'0'});
				content.css({'top':'auto'});

				window.scrollTo(0,Sidebar.top_scroll_state);
			}else{
				page.removeClass('page_menu-top_opened')
			}
		}

		if (a){
			if (a === 1){
				open_sidebar();
			}else{
				close_sidebar();
			}
		}else{
			if (!page.hasClass('page_menu-opened') && !page.hasClass('page_menu-top_opened')){
				open_sidebar();
			}else{
				close_sidebar();
			}
		}
	},

	window_scroll_Y : function(){
		if (window.scrollY){
			return window.scrollY;
		}else{
			return document.documentElement.scrollTop;
		}
	},

	swipe: function(){
	    var main = document.getElementById('main__inner'),
			inGesture = false,
			startX = 0, startY = 0,
			yMaxDistance = 60,
			xGestureDistance = 50;
	    
	    function mousedown(event){
			inGesture = true;
			startX = (event.touches) ? event.touches[0].pageX : event.pageX;
			startY = (event.touches) ? event.touches[0].pageY : event.pageY;

			if (event.touches && event.touches.length!=1) {
			   inGesture = false;
			}
	    }
	    
	    function mousemove(event){
			if (inGesture){
			    var deltaX = 0, deltaY = 0,
				direction;
			    
			    var moveX = (event.touches) ? event.touches[0].pageX : event.pageX,
				moveY = (event.touches) ? event.touches[0].pageY : event.pageY;

			    deltaX = Math.abs(moveX - startX);
			    deltaY = Math.abs(moveY - startY);
			    
			    if (deltaY > yMaxDistance){
					inGesture = false;
			    }
			    
			    if (inGesture){
					if ((deltaX * 0.66) >= deltaY){
					    if(navigator.userAgent.match(/Android/i)){
							event.preventDefault();
					    }

					    if (startX > moveX){
							direction = "left";
					    }else{
							direction = "right";
					    }
					    
					    if (deltaX >= xGestureDistance){
					    	var page = $('.page');

							if (direction == "left"){
								if (page.hasClass('page_menu-opened')){
							    	Sidebar.toggle_menu(0);
								}
							}else if (direction == "right"){
								if (!page.hasClass('page_menu-opened')){
							    	Sidebar.toggle_menu(1);
								}
							}
							inGesture = false;
					    }
					}else{
					    inGesture = false;
					}
				}
			}
	    }

	    main.addEventListener('touchstart', mousedown, false);
	    main.addEventListener('touchmove', mousemove, false);

	},

	browser_detect : function(){
		if (!!navigator.userAgent.match(/(Opera Mini)/i)){
			Sidebar.browser = 'operamini';
			$('body').addClass('operamini');
		}
	},

	init : function(){
		Sidebar.browser_detect();

		if (Sidebar.browser != 'operamini'){
			Sidebar.swipe();
		}

		$('#toggle_menu').on('click',function(e){
			e.preventDefault();
			e.stopPropagation();
			Sidebar.toggle_menu();
		});

		$('#shadow').on('click',function(e){
			e.preventDefault();
			e.stopPropagation();
			Sidebar.toggle_menu(0);
		});
	}
};

Sidebar.init();