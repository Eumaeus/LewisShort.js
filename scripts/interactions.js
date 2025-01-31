
/* ****************************** */
/* Alphabet List */
/* ****************************** */

// On startup, FIX WHEN DEALING WITH REQ PARAM URL!
function initialAlphabetListState() {
		let urnParam = getUrnParam();
		updateAlphabetSelection("alpha_Αα");
		updateVolumeListFromAlphaList("a");
		if (urnParam){
			getEntryFromRequestParam(urnParam);
		} 
}

$("#alphaList").on( "click", "li", function() {
  let eid = $(this).attr("id");
  updateAlphabetSelection(eid);
} );

function clearAlphabetSelection(){
		 $("#alphaList li").removeClass("selected");
}

function updateAlphabetSelection( elementId ) {
	 // Remove all "selected"
	 $("#alphaList li").removeClass("selected");
  $("#" + elementId).addClass("selected");
  updateVolumeListFromAlphaList( $("#" + elementId).attr("data-lookup") );
}

function updateAlphaListFromEntry(entryId) {

}

/* ****************************** */
/* URN Request Param */
/* ****************************** */

function getUrnParam(){
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);
	let urnParam = urlParams.get("urn");
	return urnParam;
}




/* ****************************** */
/* Volume List */
/* ****************************** */

$("#volumeList").on( "click", "li", function() {
  let eid = $(this).attr("id");
  updateVolumeListSelection(eid);
  // load entry…
} );

/* Scroll to position */
function volumeListScrollToSelection( elementId ) {
		// Select the ul element
		var $ul = $('ul#volumeList');
		$ul.scrollTop(0);
		// Scroll to the li element with id '123'
		var $target = $('li#' + elementId);

		// Check if both elements exist
		if ($ul.length && $target.length) {
		    // Offset the scroll position a bit so the target is near the top
		    var offsetTop = $target.offset().top - $ul.offset().top;
		    
		    // Animate scrolling to the target position. The '200' is the duration in milliseconds.
		    $ul.animate({
		        scrollTop: offsetTop - 40 // Subtract a little to not have it exactly at the top
		    }, 200);
		} else {
		    console.log('Either the UL or the LI with id "123" was not found.');
		}

}

function clearVolumeSelection(){
		 $("#volumeList li").removeClass("selected");
}

function updateVolumeListSelection( elementId ) {
	 // Remove all "selected"
	 $("#volumeList li").removeClass("selected");
	 // Select the requested one
  $("#" + elementId).addClass("selected");
  // Update the entry! urn:cite2:hmt:ls.markdown:
  var thisUrn = "urn:cite2:hmt:ls.markdown:" + elementId.split("_")[1];
  displayEntry( thisUrn );

}

function updateVolumeListFromAlphaList( betaLetter ) {
			// clear out
		$("#volumeList").html("");
			// Get the right entries from indexData
			var entriesForLetter = indexData.filter( (ie) => {
					return ie.lemma[0] == betaLetter
			});
			// Populate list
			for (ie in entriesForLetter) {
						let urnId = entriesForLetter[ie].urn.split(":")[4];
					 li = `<li id="entry_${urnId}">${entriesForLetter[ie].lemma}</li>`;
					 $("#volumeList").append(li);
			}
}


/* ****************************** */
/* Message div .app_message */
/* ****************************** */

function messageWarn( message ) {
		 showMessage();
			$("#main_message").removeClass("warn wait default");
			$("#main_message").addClass("warn")
			$("#main_message").html(`<p>${message}</p>`);
			hideMessageAfterDelay(3);
}

function messageWait( message ) {
		 showMessage();
			$("#main_message").removeClass("warn wait default");
			$("#main_message").addClass("wait")
			$("#main_message").html(`<p>${message}</p>`);
			hideMessageAfterDelay(3);
}

function messageInfo( message ) {
		 showMessage();
			$("#main_message").removeClass("warn wait default");
			$("#main_message").addClass("default")
			$("#main_message").html(`<p>${message}</p>`);
			hideMessageAfterDelay(3);
}

function showMessage() {
	  $("#main_message").removeClass("app_hidden");
}

function hideMessageAfterDelay(delay) {
    
    setTimeout(function() {
        // Select the element and add the class 'app_hidden'
        $("#main_message").addClass("app_hidden");
    }, delay * 1000);
}

/* ****************************** */
/* Searching for Entries */
/* ****************************** */


function searchGreek( greek ){


	// Get exact matches
	var exactMatches = indexData.filter( id => {
			return id.lemma.toLowerCase().split(" ")[0] == greek.toLowerCase();
	});

	// Get words that start with what we found
	var allStartsWith = indexData.filter( id => {
			return id.lemma.toLowerCase().startsWith(greek.toLowerCase());
	});
	var diffStartsWith = allStartsWith.filter(x => !exactMatches.includes(x));

	// Get words that include what we found
	var allIncludes = indexData.filter( id => {
			return id.lemma.toLowerCase().includes(greek.toLowerCase());
	});
	var tempConcat = exactMatches.concat(diffStartsWith);
	var diffIncludes = allIncludes.filter(x => !tempConcat.includes(x));

	var allMatches = exactMatches.concat(diffStartsWith,diffIncludes);

	// Clear out ul#volumeList
	$("ul#resultsList").html("");

	// <li id="entry_n0">Α α</li>
	for (i in allMatches) {
			let entryId = allMatches[i].urn.split(":")[4];
			let newEl = `<li id="entry_${entryId}">${allMatches[i].lemma}</li>`;
			$("ul#resultsList").append(newEl);
	}

}

// Activate those result links, <li id="lexResultListItem_n8910" class=""> ἀνθρωποσφᾰγέω </li>

$("ul#resultsList").on( "click", "li", function() {
  let eid = $(this).attr("id");
  let urn = "urn:cite2:hmt:ls.markdown:" + eid.split("_")[1];
  $("ul#resultsList li").removeClass("selected");
  $(this).addClass("selected");
  displayEntry(urn);

  // update alphabet list
  alphaForEntry = indexData.filter( id => {
  	return id.urn == urn;
  });
  alphaLookup = alphaForEntry[0].lemma[0];
  alphaId = "alpha_" + alphaLookup;
  $("ul#alphaList li").removeClass("selected");
  $("li#" + alphaId).addClass("selected");

  // update volume list
  updateVolumeListFromAlphaList( alphaLookup );
  $("ul#volumeList li").removeClass("selected");
  var volumeEntryId = "entry_" + eid.split("_")[1];
	$("li#" + volumeEntryId).addClass("selected");
	volumeListScrollToSelection( volumeEntryId );
} );

function displayEntry( urn ) {
			thisEntry = entryFromUrn( urn );
			// parse Markdown and put entry in box
			var mdEntry = marked.parse(thisEntry.entry);
			$("#lexEntry").html(mdEntry.replace("<p>","").replace("</p>",""));

			// put lemma in box
			$("#lexEntryLabel").html(thisEntry.key);
			// Update URN links
			$("#lexEntryUrn a").html(thisEntry.urn);
			$("#lexEntryUrn a").attr("href", "?urn=" + thisEntry.urn);
			
}

function entryFromUrn( urn ) {
			myEntry = lexData.filter( ld => {
					return ld.urn == urn;
			});
			currentEntry = myEntry[0];
			return myEntry[0];
}

function getEntryFromRequestParam(urn) {
		displayEntry( urn );
		// Clear out ul#volumeList
		$("ul#resultsList").html("");

		hits = lexData.filter( ld => {
				return ld.urn == urn;
		});

		for (i in hits) {
				let entryId = hits[i].urn.split(":")[4];
				let newEl = `<li id="entry_${entryId}">${hits[i].key}</li>`;
				$("ul#resultsList").append(newEl);
		}

		// update alphabet list
	  alphaForEntry = indexData.filter( id => {
	  	return id.urn == urn;
	  });
	  alphaLookup = alphaForEntry[0].lemma[0];
	  alphaId = "alpha_" + alphaLookup;
	  $("ul#alphaList li").removeClass("selected");
	  $("li#" + alphaId).addClass("selected");

	  // update volume list
	  updateVolumeListFromAlphaList( alphaLookup );
	  $("ul#volumeList li").removeClass("selected");
	  var volumeEntryId = "entry_" + urn.split(":")[4];
		$("li#" + volumeEntryId).addClass("selected");
		volumeListScrollToSelection( volumeEntryId );

}

/* ****************************** */
/*  Searching English
/* ****************************** */

/*
<input class="greekInputField" id="englishInput" size="30">
<button id="searchButton">Search All Text</button>
*/

$("#searchButton").on("click", function(){
		let searchTerm = $("#englishInput").val();

		if (searchTerm.length < 4) {
				messageWarn( "The search term must be more than 3 characters.");
		} else {
				messageWait( "Searching…");
				hits = lexData.filter( ld => {
						return ld.entry.includes(searchTerm);
				});

				// Clear out ul#volumeList
				$("ul#resultsList").html("");

				for (i in hits) {
						let entryId = hits[i].urn.split(":")[4];
						let newEl = `<li id="entry_${entryId}">${hits[i].key}</li>`;
						$("ul#resultsList").append(newEl);
				}
		}

});