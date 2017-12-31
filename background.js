/*global $*/
/*above shows variables predefined*/

/* get songs from Discovery and send notifcations
get songs from related artists and when they post a new one? 
*/

/* figure out loop to scrape ppl the user follows, and put them into a list, then pu thte ajax request into a for loop using the URL as the variable*/

var localDate = new Date();
var Times = [];
var Songs = [];
var Username = 'https://soundcloud.com/svdvm/following';
var Following = [];
var savedTimes = [];
var newSongs = [];

//accepts users URL and grabs all URLs of followed artists, returns a list
function artists() {
    return $.ajax({ 
        url: Username
    });
}

function loadOtherPage() {

    $("<iframe>")                             // create a new iframe element
        .hide()                               // make it invisible
        .attr("src", "https://soundcloud.com/svdvm/following") // point the iframe to the page you want to print
        .appendTo("body");                    // add iframe to the DOM to cause it to load the page

}

function loadFollows(data) {
    $('body').append($(data).text());
    console.log('Done');
}

//grab all the HTML data of the artists page
function getHTML(callback) {
    var Source = $.ajax({ url: 'https://soundcloud.com/svdvm/tracks'});
    callback(Source);
}

function getTimes(data) {
    var tracksRAW = ($(data).find('noscript:not(noscript.errorPage__inner)'));
    /*uses found selection tracksRAW and converts to html form from text*/
    $('body').append($(tracksRAW).text());
    /* create list of times */
    for (var i = 0;i < 10; i++) { 
        Times.push(($('body').find('article.audible:eq(' + i + ') > time')).text());
        Songs.push(($('body').find('article.audible:eq(' + i + ') > h2 > a:eq(0)')).text());
    }
}

//Saves current songs and times to cache so the next time the artist is checked, it can compare data
//to the old data, and if anything is different, it means there was a new song posted
function saveStatus(callback) {
    chrome.storage.local.set({savedTimes: Times, cacheTime: Date.now()}, function() {
        console.log('Settings saved');
        callback();
    })
}

//Returns saved times from last usage.
function savedTimesFun() {
        chrome.storage.local.get(['savedTimes'], function(items) {
        console.log(items.savedTimes);
        savedTimes = items.savedTimes;
        console.log(savedTimes);
        }) 
    }

//Grabs old data and compares, putting new songs into a list, or returning no new songs. 
function newPost(x) {
    console.log(x);
    //Compare first Time index, if the same = no new posts, if not, search deeper
    if (savedTimes[0] == Times[0]) {
        console.log(savedTimes[0]);
        console.log(Times[0]);
        return false
    } else {
        //Go through all indexs, check how many songs are new. Add new songs to newSongs var.
        for (var i = 0;i < savedTimes.length; i++) { 
               if (savedTimes[i] !== Times[i]) {
                   newSongs.push(Times[i]);
               }
        }
        return true
    }           
}

artists().done(loadFollows);
loadOtherPage();

//seems like the saving takes longer than the loading can catch up to. This is a callback issue. I need to use a call back function to wait for the saving to be completed before i can continue. 

// the call back function will also help with having to write all my code within the $.when thing


