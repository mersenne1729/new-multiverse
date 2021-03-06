// STEP 1 - get the input from the user
$(".js-search-form").submit(function(event) {
    event.preventDefault();
    var userInput = $("#query").val();
    //    function call
    getResults(userInput);
});



// Dropbox of scientists and idears NEED THE KEYWORD MULTIVERSE ADDED+

var scientistArray = [
    //scientists/idear1
    {
        author: "Adam Frank",
    },
    //scientist/idear2
    {
        author: "Alan Guth",
    },
    //scientist/idear3
    {
        author: "Alexander Vilenkin",
    },
    //scientist/idear4
    {
        author: "Andrei Linde",
    },
    //scientist/idear5
    // {
    //     author: "Anthropic principle",
    // },
    //scientist/idear6
    {
        author: "Brian Greene",
    },
    // //scientist/idear7
    // {
    //     author: "Bubble Universe",
    // },
    //scientist/idear8
    // {
    //     author: "Chaotic inflation",
    // },
    // //scientist/idear9
    // {
    //     author: "Cosmic inflation",
    // },
    //scientist/idear10
    // {
    //     author: "Cosmological horizon",
    // },
    //scientist/idear11
    {
        author: "David Deutsch",
    },
    //scientist/idear12
    {
        author: "David Gross",
    },
    //scientist/idear13
    // {
    //     author: "Ergodic hypothesis",
    // },
    //scientist/idear14
    {
        author: "Jim Baggott",
    },
    //scientist/idear15
    {
        author: "Laura Mersini-Houghton",
    },
    //scientist/idear16
    {
        author: "Leonard Susskind",
    },
    //scientist/idear17
    {
        author: "Marcelo Gleiser",
    },
    //scientist/idear18
    {
        author: "Max Tegmark",
    },
    //scientist/idear19
    {
        author: "Michio Kaku",
    },
    // //scientist/idear20
    // {
    //     author: "M-theory",
    // },
    //scientist/idear21
    // {
    //     author: "Multiverse",
    // },
    //scientist/idear22
    {
        author: "Occams razor",
    },
    //scientist/idear23
    {
        author: "Paul Davies",
    },
    //scientist/idear24
    {
        author: "Paul Steinhardt",
    },
    //scientist/idear25
    {
        author: "Raj Pathria",
    },
    //scientist/idear26
    {
        author: "Sean Carroll",
    },
    //scientist/idear27
    {
        author: "Sloan Sky Survey",
    },
    //scientist/idear28
    {
        author: "Stephen Hawking",
    },
    //scientist/idear29
    {
        author: "Steven Weinberg",
    },
    // //scientist/idear30
    // {
    //     author: "WMAP",
    // },
    //scientist/idear31
    {
        author: "Yasunori Nomura",
    },

]

// Search terms for the various levels found by #IDs

var level = "beyond+the+cosmological+horizon"
var leve2 = "multiverse+different+constants"
var leve3 = "many+worlds"
var leve4 = "mathematical+universe"
var leve5 = "max+tegmark"



// STEP 2 - using the input from the user (query) make the API call to get the JSON response
/////// drop down box ////////////////////////

function populateScientistDropDown(inputArray) {

    var htmlOutput = "";

    htmlOutput += "<select id='query' >";

    for (var counter = 0; counter < inputArray.length; counter++) {
        htmlOutput += "<option value='" + inputArray[counter].author + " multiverse'>" + inputArray[counter].author + " </option>";
    }
    htmlOutput += "</select>";

    $(".input-placeholder").html(htmlOutput);
}

//functiona definition
function getResults(userSearchTerm) {
    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 20,
            key: "AIzaSyAMUD_BHo3KndZfwnmbo50I9NzIY3RCvk4",
            q: userSearchTerm,
            type: "video"

        },
        function(receivedApiData) {
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

    $.each(videosArray, function(videosArrayKey, videosArrayValue) {
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

//populate favorites container
function populateFavoritesContainer() {


    $.ajax({
            type: "GET",
            url: "/populate-favorites/",
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function(result) {
            //If successful, set some globals instead of using result object
            console.log(result);


            var buildTheHtmlOutput = "";

            $.each(result, function(resultKey, resultValue) {

                buildTheHtmlOutput += "<li>";
                buildTheHtmlOutput += '<h5 class="favoritesTitle">' + resultValue.title + '</h5>';
                
                buildTheHtmlOutput += '<h6 class="favoritesAuthor">' + resultValue.author + '</h6>';
                
                buildTheHtmlOutput += '<div class="pdf-buttons">';
                buildTheHtmlOutput += '<a class="pdf url" href="' + resultValue.url + '" target="_blank">';
                buildTheHtmlOutput += 'Details >>';
                buildTheHtmlOutput += '</a>';
                buildTheHtmlOutput += "</li>";

            })
            $(".favorites .content-container ul").html(buildTheHtmlOutput);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//document ready related code
$(function() {
    populateScientistDropDown(scientistArray);
    populateFavoritesContainer();
    
});

$(document).on('click', '.scientist-search-form .pdf', function(event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    //get the value from the input box
    var scientistValue = $(this).parent().find('select').val();
    // console.log(scientistValue);

    $.ajax({
            type: "GET",
            url: "/get-article-ids/" + scientistValue,
            dataType: 'json',
        })
        .done(function(resultArticleIds) {
            // console.log(resultArticleIds.data);

            var buildTheHtmlOutput = "";

            $.each(resultArticleIds.data, function(searchResultKey, searchResultValue) {

                buildTheHtmlOutput += '<div class="search-results">';
                
                buildTheHtmlOutput += '<h5 class="title' + searchResultValue.id + '">The Mathematical Universe</h5>';
                
                buildTheHtmlOutput += '<h6 class="author' + searchResultValue.id + '"> </h6>';
                
                buildTheHtmlOutput += '<p class="abstract' + searchResultValue.id + '"></p>';
                
                buildTheHtmlOutput += '<div class="pdf-buttons">';
                buildTheHtmlOutput += '<a class="pdf url' + searchResultValue.id + '" href="" target="_blank">';
                buildTheHtmlOutput += 'Details >>';
                buildTheHtmlOutput += '</a>';


                buildTheHtmlOutput += "<div class='reading-list" + searchResultValue.id + "'>";
                buildTheHtmlOutput += "<form class='add-to-reading-list-form'>";
                buildTheHtmlOutput += "<input type='hidden' class='reading-list-title' value=''>";
                buildTheHtmlOutput += "<input type='hidden' class='reading-list-author' value=''>";
                buildTheHtmlOutput += "<input type='hidden' class='reading-list-url' value=''>";
                buildTheHtmlOutput += "<button type='submit' class='add-to-reading-list-button pdf add-to-reading-list-icon '>";
                buildTheHtmlOutput += '<i class="fa fa-bookmark-o" aria-hidden="true"></i>';
                buildTheHtmlOutput += "</button>";
                buildTheHtmlOutput += "</form>";
                buildTheHtmlOutput += "</div>";
                
                buildTheHtmlOutput += '</div>';
                buildTheHtmlOutput += '</div>';

                $.ajax({
                        type: "GET",
                        url: "/get-article-details/" + searchResultValue.id,
                        dataType: 'json',
                    })
                    .done(function(resultArticleDetails) {

                        $.each(resultArticleDetails, function(resultArticleDetailsKey, resultArticleDetailsValue) {

                            //authors
                            if (resultArticleDetailsValue.authors == undefined) {
                                $(".author" + searchResultValue.id).hide();
                            }
                            else {
                                $(".author" + searchResultValue.id).html(resultArticleDetailsValue.authors[0]);
                                $('.reading-list' + searchResultValue.id + " .reading-list-author").val(resultArticleDetailsValue.authors[0]);
                                $(".author" + searchResultValue.id).show();
                            }

                            //title
                            if (resultArticleDetailsValue.title == "") {
                                $(".title" + searchResultValue.id).hide();
                            }
                            else {
                                $(".title" + searchResultValue.id).html(resultArticleDetailsValue.title);
                                $('.reading-list' + searchResultValue.id + " .reading-list-title").val(resultArticleDetailsValue.title);
                                $(".title" + searchResultValue.id).show();
                            }

                            //description
                            if (resultArticleDetailsValue.description == "") {
                                $(".abstract" + searchResultValue.id).hide();
                            }
                            else {
                                $(".abstract" + searchResultValue.id).html(resultArticleDetailsValue.description);
                                $(".abstract" + searchResultValue.id).show();
                            }
                            // fulltextUrls
                            if (resultArticleDetailsValue.fulltextUrls == undefined) {
                                $(".url" + searchResultValue.id).hide();
                            }
                            else {
                                $(".url" + searchResultValue.id).attr("href", resultArticleDetailsValue.fulltextUrls[0]);
                                $('.reading-list' + searchResultValue.id + " .reading-list-url").val(resultArticleDetailsValue.fulltextUrls[0]);
                                $(".url" + searchResultValue.id).show();
                            }

                        });

                    })
                    .fail(function(jqXHR, error, errorThrown) {
                        console.log(jqXHR);
                        console.log(error);
                        console.log(errorThrown);
                    });

            });
            $(".content-box").html(buildTheHtmlOutput);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});


$(document).on('click', '.add-to-reading-list-form .add-to-reading-list-button', function(event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    
    //get the value from the input boxes
    var readingListTitle = $(this).parent().find('.reading-list-title').val();
    var readingListAuthor = $(this).parent().find('.reading-list-author').val();
    var readingListUrl = $(this).parent().find('.reading-list-url').val();

console.log(readingListTitle, readingListAuthor, readingListUrl);

    var nameObject = {
        'title': readingListTitle,
        'author': readingListAuthor,
        'url': readingListUrl
    };

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(nameObject),
            url: '/add-to-reading-list/',
        })
        .done(function(result) {
            console.log(result);
            populateFavoritesContainer();
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on('click', '.clearFavoritesButton', function(event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();

    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-favorites',
        })
        .done(function(result) {
            console.log(result);
            populateFavoritesContainer();
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});