/* set 'hidden' className onLoad */
var appNS = (function() {
	var entries = document.getElementsByClassName('entries'),
		articles = entries[0].getElementsByTagName('article')
		aLength = articles.length,
		toggleParentClass = function(e) {
			var pNode = e.target.parentNode;
			if ( pNode.className.length > 0 ) { pNode.className = ""; } 
			else { pNode.className = "show"; }
		},
		addEvents = function() {
			for( i=0; i < aLength; i++ ) {
				var h2 = articles[i].getElementsByTagName('h2');
				h2[0].addEventListener('click', toggleParentClass, false);
			}
		},
		removeEvents = function() {
			for( i=0; i < aLength; i++ ) {
				var h2 = articles[i].getElementsByTagName('h2');
				h2[0].removeEventListener('click', toggleParentClass, false);
			}
		};
		return { 
			addEvents: addEvents,
			removeEvents: removeEvents
		}
})();
window.addEventListener('load', addEvents, false);