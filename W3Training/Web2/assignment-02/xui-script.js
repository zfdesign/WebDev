var Xarticles = x$('.entries').find('article'), Xclass = 'hide', hideAll = false;
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
x$('body > h1').on('click', function () {
	Xarticles.each( function(e, i) { 
		(hideAll) ? x$(this).addClass(Xclass) : x$(this).removeClass(Xclass); 
	});
	x$(this).toggleClass('showingAll');
	hideAll = (hideAll) ? false : true;	
});