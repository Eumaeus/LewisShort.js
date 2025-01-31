
/* We want to stage all the loading, ending with "announce ready" */

// Load the index…
$.get( indexFileName, function( data ) {
  loadIndex(data);

   // …then load the text-field interaction…
    $.getScript("scripts/betatyper.js", function () {

    // …then load the lexicon…
    $.get( lexFileName, function( data ) {
      loadLexicon(data);

      // …then activate other interactions…
      $.getScript("scripts/interactions.js", function () {

        // …then configure to start.
        initialAlphabetListState();
        announceReady(); // This will be the innermost call.

      });
    });
  });
});


function announceReady() {
  messageInfo("All data loaded: " + numberWithCommas(lexData.length) + " entries.");
}


function loadIndex(data) {

    var lineArray = data.split(/\r?\n/).join("\n").split("\n");

    indexData = lineArray.map( (l) => {
        let u = l.split("#")[0];
        let lem = l.split("#")[1];
        return { lemma: lem, urn: u};
    });
}

function loadLexicon(data) {

     var lineArray = data.split(/\r?\n/).join("\n").split("\n");

     lexData = lineArray.map( (l) => {
        let s = parseInt(l.split("#")[0]);
        let u = l.split("#")[1];
        let k = l.split("#")[2];
        let e = l.split("#")[3];
        return { seq: s, urn: u, key: k, entry: e};
    });

}

/* Misc */

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}



