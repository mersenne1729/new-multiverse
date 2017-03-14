// STEP 1 - get the input from the user
$(".js-search-form").submit(function (event) {
    event.preventDefault();
    var userInput = $("#query").val();
    //    function call
    getResults(userInput);
});


// Search terms for the various levels

var level = "beyond+the+cosmological+horizon"
var leve2 = "multiverse+different+constants"
var leve3 = "many+worlds"
var leve4 = "mathematical+universe"
var leve5 = "max+tegmark"



// STEP 2 - using the input from the user (query) make the API call to get the JSON response

//functiona definition
function getResults(userSearchTerm) {
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 20,
            key: "AIzaSyAMUD_BHo3KndZfwnmbo50I9NzIY3RCvk4",
            q: userSearchTerm,
            type: "video"

        },
        function (receivedApiData) {
            //show the json array received from the API call
            //console.log(receivedApiData);
            // if there are no results it will just empty the list
            if (receivedApiData.pageInfo.totalResults == 0) {
                alert("No video found!");
            }
            //if there are results, call the displaySearchResults
            else {
                displaySearchResults(receivedApiData.items);

            }
        });
}

// STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
function displaySearchResults(videosArray) {
    //console.log(videosArray);

    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";

    $.each(videosArray, function (videosArrayKey, videosArrayValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output vide title
        buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
        buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
    });

    $(".js-search-results").html(buildTheHtmlOutput);
}