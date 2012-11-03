var articlesToggle = document.getElementsByTagName('article');

console.log(articlesToggle.length);
//*
for(i=0 ; i<articlesToggle.length ; i++){
	articlesToggle[i].addEventListener('click', function(e){
		var element = e.target;
		if (element.nodeName.toLowerCase() === 'h2') {
			var pNode = element.parentNode;
			if ( pNode.className.length > 0 ) { pNode.className = ""; } 
			else { pNode.className = "show"; }
		}
	}, false);
}
// */