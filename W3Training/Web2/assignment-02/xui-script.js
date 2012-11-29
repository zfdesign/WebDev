(function() {
	var hideClass = 'hide', 
		hideAll = false, 
		lsNoteCount = Number(localStorage.getItem('noteCount')) || 0,
		lastItemKey,
		lastItemValue;

	/* Toggle notes content */ 
	var toggleH2Content = function(e) {
			var pNode = e.target.parentNode;
			x$(pNode).toggleClass(hideClass);
			x$('body').removeClass('showingAll'); 
			hideAll = false;
			x$('.entries article').not(pNode).each(function(){ 
				x$(this).addClass(hideClass); 
			}); 
		},
		bindH2Click = function(callback) {
			x$('article > h2').on('click', function (e) {
				e.preventDefault();
				callback(e);
			});
		}, 
		unBindH2Click = function() {
			x$('article > h2').un('click');
		};


	 // TODO: convert and pass callback
	x$('h1').on('click', function(e) {
		e.preventDefault();
		x$('.entries article').each( function(e, i) { 
			(hideAll) ? x$(this).addClass(hideClass) : x$(this).removeClass(hideClass); 
		});
		x$(this).toggleClass('showingAll'); // TODO: x$('body').toggleClass('showingAll');
		hideAll = (hideAll) ? false : true;	
	});


	/* Toggle Menu visibility */
	x$('a.menuLink').on('click', function(e) {
		e.preventDefault();
		x$('html').toggleClass('menuOn');
		x$('nav > ul > li').addClass('hideOptions');
	});
	x$('.entriesOverlay').on('click', function(e) {
		e.preventDefault();
		x$('html').removeClass('menuOn');
		x$('nav > ul > li').addClass('hideOptions');
	});

	/* Toggle expandable menu options */
	x$('nav > ul > li > a').on('click', function(e) {
		e.preventDefault();
		x$('nav > ul > li').not(e.target.parentNode).addClass('hideOptions');
		var liNode = x$(this)[0].parentNode;
		x$(liNode).toggleClass('hideOptions');
	});


	/* Helper functions */
	function getComplexItem(key) {
		var val = localStorage.getItem(key);
		if (!val) return val;
		return JSON.parse(val);
	}
	function setComplexItem(key, val) {
		if (!val) localStorage.setItem(key, val);
		else localStorage.setItem(key, JSON.stringify(val));
	}

	/* Show notes */
	function showNotes() {
		if(lsNoteCount > 0 ) {
			x$('.notes > p').addClass('hide'); 
			var lsLength = localStorage.length - 1, i, htmlContent = "";
			for (i = lsLength; i >= 0; i--) {
				if (localStorage.key(i) !== 'noteCount' ) {
					htmlContent += getComplexItem(localStorage.key(i));
				}
			}
			x$('.notes').html('inner', htmlContent);
			x$('.entries article').addClass(hideClass);
			unBindH2Click(); 
			bindH2Click(toggleH2Content);
		} else { 
			x$('.notes > p').removeClass('hide'); 
			unBindH2Click(); 
		}
	}
	/* Append Note */
	function addNoteToList(note) {
		if(lsNoteCount === 0) { x$('.notes > p').addClass(hideClass); }
		var noteFChild = x$('.notes')[0].firstChild;
		x$(noteFChild).html('before', note);
		// TODO: hideClass; scroll Note to top
		unBindH2Click(); 
		bindH2Click(toggleH2Content);
	}
	
	/* AddNote Form */
	x$('#AddNoteForm').on('submit', function(e) {
		e.preventDefault(); 
		x$(this).addClass('interacted');
		var dateStr = new Date(),
			keyStr = dateStr.getTime(),
			valStr = "",
			xTitle = x$('#AddNoteTitle')[0].value,
			xText  = x$('#AddNoteText')[0].value,
			LongLat = null;
		
		// validation /* if (!x$(this)[0].checkValidity()) { alert('Please fill in the fields'); } */
		if ( xTitle.length === 0 ) { 
			alert('Please give your Note a title');
			return false;
		}
		if ( xText.length === 0 ){
			alert('Please give your Note content');
			return false;
		}
		
		valStr += '<article data-key=\"' + keyStr + '\">';
		valStr += '<h2>' + xTitle + '</h2>';
		valStr += '<p>' + xText + '</p>';
		if ("geolocation" in navigator && x$('#AddLocation').has(':checked').length > 0 ) {
			lastItemKey = keyStr;
			lastItemValue = valStr;
			navigator.geolocation.getCurrentPosition(getLatLong, handleGeoError); 
		} 
		
		valStr += '</article>';
		
		setComplexItem(keyStr, valStr);
		addNoteToList(valStr);
		x$('.entriesOverlay').fire('click');
		lsNoteCount++;
		localStorage.setItem('noteCount', lsNoteCount);
	});

	// GEOLOCATION
	function getLatLong(position, key, val) {
		var LatLong = position.coords.latitude + ',' + position.coords.longitude,
			googleMapLink = '//maps.google.com/maps?q=' + LatLong,
			pLocale = '<p class="locale">Location: <small><a target="_blank" href="' + googleMapLink + '">' + LatLong + '</a><small></p>';

		x$('.notes article[data-key="' + lastItemKey + '"] p:last-child').html('after', pLocale);
		var newStr = lastItemValue + pLocale + '</article>';
		setComplexItem(lastItemKey, newStr);
	}
	function handleGeoError(error) {
		alert('Your location is currently not available.\n' + error);
	}
	
	
	// INIT()
	x$(window).load(showNotes); // show saved <article>s
	x$('nav > ul > li').addClass('hideOptions'); // collapse all sub nav items 
	x$('#AddNoteForm').find('input[type="submit"]').attr('formnovalidate', 'formnovalidate'); // handover form validation
	if ( localStorage.getItem('noteCount') === null) {
		localStorage.setItem('noteCount', lsNoteCount);
	}

	/* BUG FIXING */
	if (navigator.userAgent.indexOf('Android 2') !== -1) { 
		x$('html').addClass('androidV2'); 
		x$('.notes').setStyle('min-height', window.innerHeight + 'px');
	}

	})();

