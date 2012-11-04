/* set 'hidden' className onLoad */
var appNS = (function() {
	var entries = document.getElementsByClassName('entries'),
		articles = entries[0].getElementsByTagName('article')
		aLength = articles.length,
		toggleParentClass = function(e) {
			var pNode = e.target.parentNode,
				showing = document.getElementsByClassName('show'),
				showingLength = showing.length, j;
			for (j = 0; j < showingLength; j++) { 
				if ( showing[j] !== pNode ) {
					showing[j].className = ""; 
				}
			}
			if ( pNode.className.length > 0 ) { pNode.className = ""; } 
			else { pNode.className = "show"; }
		},
		addH2Events = function() {
			for( var i=0; i < aLength; i++ ) {
				var h2 = articles[i].getElementsByTagName('h2');
				h2[0].addEventListener('click', toggleParentClass, false);
			}
		},
		removeH2Events = function() {
			for( var i=0; i < aLength; i++ ) {
				var h2 = articles[i].getElementsByTagName('h2');
				h2[0].removeEventListener('click', toggleParentClass, false);
			}
		};
		return { 
			addH2Events: addH2Events,
			removeH2Events: removeH2Events
		}
})();
window.addEventListener('load', addH2Events, false);