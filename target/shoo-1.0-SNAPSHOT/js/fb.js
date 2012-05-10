/*
 * Here we initialize the facebook home page for user
 */
    
$(document).ready(function() {
    //TODO: this shouldn't be global, change to use getJSON to get it from server
    appId = "297883533612989";
    //for development locally
//    appURL = "http://localhost:8080/shoo/";
    //for production
    appURL = "http://shoo.herokuapp.com/";
    myId = 'me';
    var userId = $('#userid').get(0).innerHTML;
    
    $('#homefeed').click(function() {
        setActive("homefeed");
        showFeed("home", "me");
    });
    
    $('#wall').click(function() {
        setActive("wall");
        showFeed("feed", userId);
    });
    
    $('#pics').click(function() {
        setActive("pics");
        getPhotos(userId);
    });
    
    $('#searchFacebook').submit(function(e) {
        // Get all search query text in one step
        var body = $('#searchFacebook');
        searchFacebook(body);
        //prevent default behavior
        return false;
    });
    
    $('#publishMyWall').submit(function() {
        // Get all message to be posted in one step
        var body = $('#publishMyWall').children('#publishMessage')[0].value;
        publishMyWall(body);
    });
    
    $('#publishFriendWall').click(function() {
        publishFriendWall(id, body);
    });
    
});

function initGraph(){
    
    var userId = $('#userid').get(0).innerHTML;
    showGraph(userId);
    getUserProfile(userId);
    showFeed("feed", userId);
};