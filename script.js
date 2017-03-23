var socialMedia = {
	facebook : 'https://www.facebook.com/Robert-Allen-230947223986211/',
  twitter : 'https://twitter.com/bobbidigi0',
  codepen: 'https://codepen.io/bobbidigi34/',
  // youtube: 'https://www.youtube.com/user/Bobbidigi34',
 /*free-code-camp: 'https://www.freecodecamp.com/bobbidigi'*/
 // globe:'http://185.116.212.19/~potionwi/1.MATHS%20websiteee/',
 linkedin: 'https://www.linkedin.com/in/robert-allen-44020778',
 // github:'https://github.com/bobbidigi',
 // wordpress:'https://wordpress.com/create/' 
};

var socialList = function() {
  var  output = '<ul>', 
    myList = document.querySelectorAll('.socialmediaicons');

  for (var key in arguments[0]) {
    output+= '<li><a href="' + socialMedia[key] + '">' +
      '<i class="fa fa-'+key +'">' + '</i>' +
      '</a></li>';
  }
  output+= '</ul>';
  
  for (var i = myList.length - 1; i >= 0; i--) {
    myList[i].innerHTML = output;
  };
}(socialMedia);


$(document).ready(function() {
  
  // Clear previous term
  $('#searchFor').val('');

  // Get a random article
  $('#fetchBtn').click(function() {
    window.location = "https://en.wikipedia.org/wiki/Special:Random";
  });

  // Get search articles
  $('#searchBtn').click(function() {

    // Get the term to search for
    var searchFor = $('#searchFor').val();
    if (!searchFor) {
      alert("Please enter a search query");
      // return focus to search box after error
      $('#searchFor').focus();
      // restart search
      return;
    }

    // Create the url to send to Wikipedia using
    // the action 'opensearch'
    var reqURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchFor + '&format=json&callback=?';
    console.log(reqURL);

    // Build the ajax request
    $.ajax( {
      type: "GET",
      url: reqURL,
      async: false,
      dataType: "json",
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },

      // If the request is successful:
      success: function(data) {
        //console.log(data);

        // Clear previous search results
        $('#result').html('');

        // Loop through all of the articles returned with the
        // search term in the name
        for (var i = 0; i < data[1].length; i++) {
          // Add them to the '#result' unordered list
          $('#result').prepend(
            // Make the article title a link to the
            // article with the 4th return object
            '<li><a class="title" href=' + data[3][i] +
            ' target="_blank">'
            // Article title is the 2nd object
            + data[1][i] + '</a><p><span class="entry">'
            // Article intro is the 3rd object
            + data[2][i] + '</span></p><hr></li>');
        }
      },
      // If fail:
      error: function(errorMsg) {
        alert('There was a problem, please try again later');
      }
   }); // end ajax
     $( ".result-box" ).show();
 }); // end the .click function
});
