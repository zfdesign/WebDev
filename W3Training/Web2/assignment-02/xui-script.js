(function() {
	var Xarticles = x$('.entries').find('article'), 
		Xclass = 'hide', 
		hideAll = false;

	/* Toggle notes content */ 
	Xarticles.each(function(){ x$(this).addClass(Xclass); });
	x$('article > h2').on('click', function (e) {
		var pNode = x$(this)[0].parentNode;
		x$(pNode).toggleClass(Xclass);
		Xarticles.not(pNode).each(function(){ 
			x$(this).addClass(Xclass); 
			hideAll = false;
			x$('body > h1').removeClass('showingAll');
		}); 
	});
	x$('h1').on('click', function () {
		Xarticles.each( function(e, i) { 
			(hideAll) ? x$(this).addClass(Xclass) : x$(this).removeClass(Xclass); 
		});
		x$(this).toggleClass('showingAll');
		hideAll = (hideAll) ? false : true;	
	});

	/* Toggle Menu visibility */
	x$('a.menuLink').on('click', function(e) {
		e.preventDefault();
		x$('body').toggleClass('menuOn');
		x$('nav > ul > li').addClass('hideOptions');
	});
	x$('.entriesOverlay').on('click', function(e) {
		e.preventDefault();
		x$('body').removeClass('menuOn');
		x$('#Options').addClass('hideOptions');
	});

	/* Toggle expandable menu options */
	x$('nav > ul > li').addClass('hideOptions');
	x$('nav > ul > li > a').on('click', function(e) {
		e.preventDefault();
		var liNode = x$(this)[0].parentNode;
		x$(liNode).toggleClass('hideOptions');
	});
})();

