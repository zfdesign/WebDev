var Xarticle = x$('.entries').find('article'), Xclass = 'hide';

Xarticle.each(function(){ x$(this).addClass(Xclass); });
x$('article > h2').on('click', function (e) {
	var pNode = x$(this)[0].parentNode;
	Xarticle.not(pNode).each(function(){ x$(this).addClass(Xclass); }); // optional collapse all other
	x$(pNode).toggleClass(Xclass);
});