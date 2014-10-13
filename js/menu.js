$('#toggle_menu').on('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	Sidebar.toggle_menu(1);
});

$('#shadow').on('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	Sidebar.toggle_menu(0);
});

$('#fixed_button').on('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	Sidebar.toggle_menu();
});

var Sidebar = {
	toggle_menu : function(a){
		var page = $('.page'),
			content = $('#content'),
			sidebar = $('#sidebar'),
			topScroll = Sidebar.window_scroll_Y();

		function open_sidebar(){
			sidebar.css({'top':'auto'});

			page.addClass('page_menu-opened');
			content.css({'top':'-'+topScroll+'px'});

			Sidebar.top_scroll_state = topScroll;
		}

		function close_sidebar(){
			page.removeClass('page_menu-opened');
			content.css({'top':'auto'});

			sidebar.css({'top':Sidebar.top_scroll_state+'px'});

			window.scrollTo(0,Sidebar.top_scroll_state);
		}

		if (a){
			if (a === 1){
				open_sidebar();
			}else{
				close_sidebar();
			}
		}else{
			if (!page.hasClass('page_menu-opened')){
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

	top_scroll_state : 0
};