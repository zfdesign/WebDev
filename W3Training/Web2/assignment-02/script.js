var appNS = (function () {
	var heading = document.getElementsByTagName('h1')[0],
		entries = document.getElementsByClassName('entries')[0],
		articles = entries.getElementsByTagName('article'),
		aLength = articles.length,
		headingClass= 'showingAll', 
		activeClass = 'show',
		
		addClass = function (clss, el) {
			if ( el === undefined ) el = this; 
			if ( el.className !== undefined && el.className.indexOf(clss) === -1 ) { 
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
		
		toggleParentClass = function (e) {
			var pNode = e.target.parentNode,
				showing = entries.getElementsByClassName(activeClass),
				showingLength = showing.length, j;

			if ( showingLength > 0 ) {
				// Hide all, but current
				for ( j = 0; j < showingLength; j++ ) { 
					if ( showing[j] !== pNode ) {
						removeClass(activeClass, showing[j]); 
					}
				}
			}
			// Toggle
			if ( pNode.className.indexOf(activeClass) !== -1 ) { 
				removeClass(activeClass, pNode); 
				removeClass(headingClass, heading); 
			} else { 
				addClass(activeClass, pNode);
			}
		},
		
		addH2Events = function () {
			for ( var i=0; i < aLength; i++ ) {
				var h2 = articles[i].getElementsByTagName('h2');
				h2[0].addEventListener('click', toggleParentClass, false);
			}
		},
		
		removeH2Events = function () {
			for ( var i=0; i < aLength; i++ ) {
				var h2 = articles[i].getElementsByTagName('h2');
				h2[0].removeEventListener('click', toggleParentClass, false);
			}
		},
		
		setToggleAllEvent = function (element) {
			element.addEventListener('click', function () {
				var articlesShowing = entries.getElementsByClassName(activeClass); 

				if ( heading.className.indexOf(headingClass) !== -1 ) {
					for ( var i = 0; i < aLength; i++ ) {
						removeClass(activeClass, articles[i]);
					}
					removeClass(headingClass, heading);
				} else { 
					for ( var j = 0; j < aLength; j++ ) {
						addClass(activeClass, articles[j]);
					}
					addClass(headingClass, heading);
				}

			}, false);
		}, 
		
		init = function () {
			addH2Events();
			setToggleAllEvent(heading);
		};
		return { 
			init: init, 
			addClass: addClass, 
			removeClass: removeClass, 
			addH2Events: addH2Events, 
			removeH2Events: removeH2Events 
		}
})();
window.addEventListener('load', appNS.init, false);