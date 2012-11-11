var appNS = (function() {
	var entries = document.getElementsByClassName('entries'),
		articles = entries[0].getElementsByTagName('article'),
		aLength = articles.length,
		activeClass = 'show',
		addClass = function(clss, el) {
			if ( el === undefined ) el = this; 
			if ( el.className !== undefined ) { 
				var clssVal = (el.className.length > 0) ? ' ' + clss : clss;
				el.className += clssVal; 
			}
		},
		removeClass = function (clss, el) {
			if ( el === undefined ) el = this; 
			if ( el.className !== undefined && el.className.indexOf(clss) !== -1) {
				var val = el.className.replace(clss, '');
				el.className = ( val.length > 0 ) ? val.replace(/^\s+|\s+$/, '') : val;
			}
		},
		toggleParentClass = function(e) {
			var pNode = e.target.parentNode,
				showing = entries[0].getElementsByClassName(activeClass),
				showingLength = showing.length, j;

			if ( showingLength > 0 ) {
				// Hide all, but current
				for (j = 0; j < showingLength; j++) { 
					if ( showing[j] !== pNode ) {
						removeClass(activeClass, showing[j]); 
					}
				}
			}
			// Toggle
			if ( pNode.className.indexOf(activeClass) !== -1 ) { 
				removeClass(activeClass, pNode); 
			} else { 
				addClass(activeClass, pNode);
			}
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
		},
		setToggleAllEvent = function(element){
			element.addEventListener('click', function() {
				var articlesShowing = entries.getElementsByClassName(activeClass); 
				if (articlesShowing.length > 0) {
					for (var i = 0; i < articlesShowing.length; i++) {
						articlesShowing[i].className.replace(activeClass, '');
					}
				} else {
					for (var k = 0; k < articlesShowing.length; k++) {
						addClass(activeClass, articles[k]);
					}
				}
			}, false);
		}, 
		init = function() {
			addH2Events();
			//setToggleAllEvent();
		};
		return { 
			addClass: addClass,
			addH2Events: addH2Events,
			removeH2Events: removeH2Events
		}
})();
window.addEventListener('load', addH2Events, false);