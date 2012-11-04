var entries = document.getElementsByClassName('entries'),
	articles = entries[0].getElementsByTagName('article');
for(i=0 ; i<articles.length ; i++){
	articles[i].addEventListener('click', function(e){
		var element = e.target;
		if (element.nodeName.toLowerCase() === 'h2') {
			var pNode = element.parentNode;
			if ( pNode.className.length > 0 ) { pNode.className = ""; } 
			else { pNode.className = "show"; }
		}
	}, false);
}
