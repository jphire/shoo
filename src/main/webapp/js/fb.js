/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */   
    
$(document).ready(function() {
    
    appId = "377679492261871";
    appURL = "http://localhost:8080/shoo/";
    myId = 0;

    $('#homefeed').click(function() {
        setActive("homefeed");
        showFeed("home");
    });
    $('#wall').click(function() {
        setActive("wall");
        showFeed("feed");
    });
    $('#pics').click(function() {
        setActive("pics");
        getPhotos("me");
    });
    
//    $('#searchFacebook').submit(function() {
//        // Get all the forms elements and their values in one step
//        var body = $('#searchFacebook');
//        console.log(body);
//        searchFacebook(body);
//    });
    
    $('#publishMyWall').submit(function() {
        // Get all the forms elements and their values in one step
        var body = $('#publishMyWall');
        console.log(body);
    //publishMyWall(body);
    });
    
    $('#publishFriendWall').click(function() {
        publishFriendWall(id, body);
    });
    
});

function initGraph(){
    
    var userId = $('#userid').get(0).innerHTML;
    showGraph(userId);
    getUserProfile(userId);
};
                  
function searchFacebook(element){
    
    var query = element.children('#searchQuery').value;
     //https://graph.facebook.com/search?q=mark&type=user
     FB.api('/search', {q: query, type: 'user'}, function(response) {
        if (!response || response.error) {
            alert('Error occured');
        } else {
            console.log(response);
            if(response.data.length > 0){
                showGraph(response.data(0).id);
            }
        }
    });
}    

function publishMyWall(body){
    //var body = 'Reading JS SDK documentation';
    FB.api('/me/feed', 'post', {
        message: body
    }, function(response) {
        if (!response || response.error) {
            alert('Error occured');
        } else {
            console.log('Post ID: ' + response.id);
        }
    });
}

function publishFriendWall(id, body){
    //var body = 'Reading JS SDK documentation';
    FB.api('/' + id + '/feed', 'post', {
        message: body
    }, function(response) {
        if (!response || response.error) {
            alert('Error occured');
        } else {
            console.log('Post ID: ' + response.id);
        }
    });
}
 
function showGraph(userId){
    
    FB.api('/' + userId, function(user) {
        console.log(user);
        if(userId == 'me')
            myId = user.id;
        if(user){
            show(user);
        }
    });
}

function show(user){
    var id = user.id;
    var name = user.name;
    idList = [];            
    
    FB.api('/' + id + '/feed', function(feedlist) {
        if(feedlist){
            console.log(feedlist);
            //take 10 friends last commented on user's wall
            for(var j = 0, k = 0; k < 15 && j < feedlist.data.length; j++){
                if(feedlist.data[j].from.id != id){
                    idList[k] = feedlist.data[j].from;
                    k++;
                }
            }
           
            json = {
                id: id,
                name: name,
                children: idList
            }
            //Initialize graph here so can wait for FB's async-call to finish
            init();
        }
           
    });
};

function getUserProfile(userId){
    FB.api('/' + userId, function(user) {
        if(userId == 'me'){
            showProfile(user, true);
        }
        else
            showProfile(user, false);
    });
}

function setActive(tagName){
    
    var passive = document.getElementsByName("right-cont");
    for(var j = 0; j < passive.length; j++){
        passive[j].setAttribute("class", "");
    }
            
    var active = document.getElementById(tagName);
    active.setAttribute("class", "active");
}

function showFeed(feedname){
    
    FB.api('/me/'+ feedname, function(feedlist) {
        if(feedlist){
            console.log(feedlist);
            
            var container = document.getElementById("right-container");
            var oldul = document.getElementById("feed");
            var newul = document.createElement("ul");
            newul.setAttribute("class", "feed");
            newul.setAttribute("id", "feed");
            
            for(var i = 0; i < feedlist.data.length; i++){
                var li = document.createElement("li");
                li.setAttribute("class", "post");
                var div_container = document.createElement("div");
                div_container.setAttribute("class", "container-fluid");
                var div_row = document.createElement("div");
                div_row.setAttribute("class", "row-fluid");
                var div_span2 = document.createElement("div");
                div_span2.setAttribute("class", "span2");
                var div_span9 = document.createElement("div");
                div_span9.setAttribute("class", "span9");
                li.appendChild(div_container);
                div_container.appendChild(div_row);
                div_row.appendChild(div_span2);
                div_row.appendChild(div_span9);
                             
                if(feedlist.data[i].story){
                    var story = document.createElement("p");
                    story.innerHTML = feedlist.data[i].story;
                    div_span9.appendChild(story);
                }
                if(feedlist.data[i].picture){
                    var picture = document.createElement("img");
                    picture.setAttribute("id", "tag-pic");
                    picture.setAttribute("src", feedlist.data[i].picture);
                    picture.setAttribute("align", "top");
                    div_span9.appendChild(picture);
                }
                var sender_pic = document.createElement("img");
                sender_pic.setAttribute("src", "http://graph.facebook.com/" + feedlist.data[i].from.id + "/picture");
                div_span2.appendChild(sender_pic);
                
                if(feedlist.data[i].message){
                    var message = document.createElement("p");
                    message.innerHTML = feedlist.data[i].from.name + " on: " + feedlist.data[i].created_time +"<br/>";
                    message.innerHTML += feedlist.data[i].message;
                    div_span9.appendChild(message);
                }
                var div = document.createElement("div");
                div.setAttribute("id", "comment");
                var comment_post = document.createElement("form");
                comment_post.setAttribute("id", "comment-post");
                comment_post.setAttribute("action", "http://graph.facebook.com/" + feedlist.data[i].id + "/comments");
                comment_post.setAttribute("method", "POST");
                
                var input_comment = document.createElement("input");          
                input_comment.setAttribute("class", "input-small");
                input_comment.setAttribute("type", "text");
                input_comment.setAttribute("placeholder", "Comment");
                
                comment_post.appendChild(input_comment);
                div.appendChild(comment_post);
                
                var like_button = document.createElement("form");
                like_button.setAttribute("id", "like-button");
                like_button.setAttribute("action", "http://graph.facebook.com/" + feedlist.data[i].id + "/likes");
                
                var input_like = document.createElement("button");
                input_like.setAttribute("class", "btn btn-primary btn-mini");
                input_like.setAttribute("type", "submit");
                input_like.innerHTML = "Like";
                
                like_button.appendChild(input_like); 
                  
                div.appendChild(like_button);
                div_span9.appendChild(div);
                
                var hr = document.createElement("hr");
                div_span9.appendChild(hr);
                
                newul.appendChild(li);
            }
            container.replaceChild(newul, oldul);
        }
        else console.log("error: couldn't get feed");
    });
};

function sumChosen(node){
    
    var list = $('.filter.active');
    var limitElement = $('#result-amount').get(0);
    var limit = limitElement.valueAsNumber;
       
    for(var i = 0; i < list.length; i++){
        addFriendsToGraph(node, list[i].name, limit);
    }
}

function addFriendsToGraph(node, choice, limit){
    
    var idList = [];
    
    if(choice == "feed"){
        FB.api('/' + node.id + '/feed', function(friendList) {
            if (friendList.data) {
                for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                    if(friendList.data[j].from.id != node.id){
                        idList[k] = friendList.data[j].from;
                        console.log(friendList.data[j].from.name);
                        k++;
                    }
                    if(friendList.data[j].comments.count > 0){
                        for(var l = 0; k < limit && l < friendList.data[j].comments.data.length; l++){
                            idList[k] = friendList.data[j].comments.data[l].from;
                            k++;
                        }                
                    }
                    if(friendList.data[j].likes){
                        for(var h = 0; k < limit && h < friendList.data[j].likes.data.length; h++){
                            idList[k] = friendList.data[j].likes.data[h];
                            k++;
                        }
                    }      
                }
                console.log("feedit:");
                console.log(friendList.data);
            
                json_temp = {
                    id: node.id,
                    name: node.name,
                    children: idList
                }
                         
                rgraph.op.sum(json_temp, {  
                    type: 'fade:seq',  
                    duration: 1000,  
                    hideLabels: false,  
                    transition: $jit.Trans.Quart.easeOut  
                });
            }
            else {         
                console.log("no data available");
            }
        });
    }
    
    if(choice == "home"){
        FB.api('/' + node.id + '/home', function(friendList) {
            if (friendList.data) {
                for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                    if(friendList.data[j].from.id != node.id){
                        idList[k] = friendList.data[j].from;
                        console.log(friendList.data[j].from.name);
                        k++;
                    }
                    if(friendList.data[j].comments.count > 0){
                        for(var l = 0; k < limit && l < friendList.data[j].comments.data.length; l++){
                            idList[k] = friendList.data[j].comments.data[l].from;
                            k++;
                        }                
                    }
                    if(friendList.data[j].likes){
                        for(var h = 0; k < limit && h < friendList.data[j].likes.data.length; h++){
                            idList[k] = friendList.data[j].likes.data[h];
                            k++;
                        }
                    }      
                }
                console.log("feedit:");
                console.log(friendList.data);
            
                json_temp = {
                    id: node.id,
                    name: node.name,
                    children: idList
                }
                         
                rgraph.op.sum(json_temp, {  
                    type: 'fade:seq',  
                    duration: 1000,  
                    hideLabels: false,  
                    transition: $jit.Trans.Quart.easeOut  
                });
            }
            else {         
                console.log("no data available");
            }
        });
    }
    
    if(choice == "photos"){
        FB.api('/' + node.id + '/photos', function(friendList) {
            if (friendList.data) {
                for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                    if(friendList.data[j].from.id != node.id){
                        idList[k] = friendList.data[j].from;
                        console.log(friendList.data[j].from.name);
                        k++;
                    }
                    if(friendList.data[j].comments){
                        for(var l = 0; k < limit && l < friendList.data[j].comments.data.length; l++){
                            idList[k] = friendList.data[j].comments.data[l].from;
                            k++;
                        }                
                    }
                    if(friendList.data[j].likes){
                        for(var h = 0; k < limit && h < friendList.data[j].likes.data.length; h++){
                            idList[k] = friendList.data[j].likes.data[h];
                            k++;
                        }
                    }
                
                }
                console.log("feedit:");
                console.log(friendList.data);
            
                json_temp = {
                    id: node.id,
                    name: node.name,
                    children: idList
                }
                         
                rgraph.op.sum(json_temp, {  
                    type: 'fade:seq',  
                    duration: 1000,  
                    hideLabels: false,  
                    transition: $jit.Trans.Quart.easeOut  
                });
            }
            else {         
                console.log("no data available");
            }
        });
    }
    if(choice == "friends"){
        FB.api('/' + node.id + '/friends', function(friendList) {
            if (friendList.data) {
                for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                    idList[k] = friendList.data[j];        
                    k++;
                }                
               
                json_temp = {
                    id: node.id,
                    name: node.name,
                    children: idList
                }
                         
                rgraph.op.sum(json_temp, {  
                    type: 'fade:seq',  
                    duration: 1000,  
                    hideLabels: false,  
                    transition: $jit.Trans.Quart.easeOut  
                });
            }
            else {         
                console.log("no data available");
            }
        });
    }
}

function setCoverPhoto(coverphoto){
    FB.api('/' + coverphoto, function(data) {
        if(data){
            console.log(data);
            var cont = $(".rows-left#first-row").get(0);
            var pic = document.createElement("img");
            pic.setAttribute("src", data.picture);
                            
            var old_div = document.getElementById("user-pic");
            var new_div = document.createElement("div");
            new_div.setAttribute("id", "user-pic");
            new_div.setAttribute("class", "span12");
            if(old_div)
                cont.replaceChild(new_div, old_div);
            else{    
                cont.appendChild(new_div);
            }
            new_div.appendChild(pic);
        }
    });
}

function addUserInfo(info){
    var cont = $(".rows-left#second-row").get(0);
    var oldInfo = document.getElementById("user-info");
    if(oldInfo){
        cont.removeChild(oldInfo);
    }
    console.log("info");
    console.log(info);
    var info_div = document.createElement("div");
    info_div.setAttribute("id", "user-info");
    info_div.setAttribute("class", "span12");
    cont.appendChild(info_div);
    
    var ul = $("<ul></ul>").appendTo(info_div);
    $("<li>" + info.name + "</li>").appendTo(ul);
    if(info.birthday){
        $("<li>Born: " + info.birthday + "</li>").appendTo(ul);
    }
    if(info.gender){
        $("<li>Gender: " + info.gender + "</li>").appendTo(ul);
    }
    if(info.location){
        $("<li>Location: " + info.location.name + "</li>").appendTo(ul);
    }
    if(info.relationship_status){
        $("<li>Relationship status: " + info.relationship_status + "</li>").appendTo(ul);
    }
    if(info.significant_other){
        $("<li>In relationship with: " + info.significant_other.name + "</li>").appendTo(ul);
    }
    if(info.work && info.work[0].employer){
        $("<li>Works at: " + info.work[0].employer.name + "</li>").appendTo(ul);
    }
    if(info.education){
        $("<li>Studied at: " + info.education[0].school.name + "</li>").appendTo(ul);
    }
    if(info.work && info.work.employer){
        $("<li>Favorite athletes: " + info.favorite_athletes[0].name + "</li>").appendTo(ul);
    }
}

function addUserPic(user, info){
    console.log(info);
    //add user picture
    var cont = $(".rows-left#first-row").get(0);
    var pic = document.createElement("img");
    pic.setAttribute("src", "http://graph.facebook.com/" + user.id + "/picture");
                    
    var old_div = document.getElementById("user-pic");
                    
    var new_div = document.createElement("div");
    new_div.setAttribute("id", "user-pic");
    new_div.setAttribute("class", "span8");
                    
    if(old_div)
        cont.replaceChild(new_div, old_div);
    else
        cont.appendChild(new_div);
    new_div.appendChild(pic);
}

function addFriendRequestButton(user_info){
    FB.api('/me/friends', function(friends){
        if(friends && friends.data){
            isFriend = false;
            var cont = $(".rows-left#third-row").get(0);
            var old_friend_div = document.getElementById("add-friend-div");
            if(old_friend_div){
                cont.removeChild(old_friend_div);
            }
            for(var i = 0; i < friends.data.length; i++){
                if(friends.data[i].id == user_info.id){
                    //add button
                    isFriend = true;
                }
            }
            if(isFriend == false){
                var cont = $(".rows-left#third-row").get(0);
                var friend_div = document.createElement("div");
                friend_div.setAttribute("id", "add-friend-div");
                friend_div.setAttribute("class", "span8");
                cont.appendChild(friend_div);
                var ul = $("<ul></ul>").appendTo(friend_div);
                $("<li><a href='http://www.facebook.com/dialog/friends/?id=" + user_info.id + "&app_id=" + appId + "&redirect_uri=" + appURL + "social/facebook'>Add as friend</a></li>").appendTo(ul);
            }
        }
    });
}

function showProfile(user, isLoggedIn){
                
    FB.api('/' + user.id + '/albums', function(albums) {
        //if big photo available
        if (albums && albums.data && albums.data.length > 0) {
            console.log(albums);
            for(var i=0; i<albums.data.length; i++){
                if(albums.data[i].type == "profile"){
                    var coverphoto = albums.data[i].cover_photo;
                    setCoverPhoto(coverphoto);
                }
            }
            //add user info
            FB.api('/' + user.id, function(info) {
                if(info){
                    addUserInfo(info);
                    if(isLoggedIn == false){
                        addFriendRequestButton(info);
                    }
                    else{
                        var cont = $(".rows-left#third-row").get(0);
                        var old_friend_div = document.getElementById("add-friend-div");
                        if(old_friend_div){
                            cont.removeChild(old_friend_div);
                        }
                    }
                }
            });
        }
        else{
            FB.api('/' + user.id, function(info) {
                if(info){
                    addUserPic(user, info);
                    addUserInfo(info);  
                    addFriendRequestButton(info);
                }
            }); 
        }
    });
};

function getPhotos(user_id){
                
    FB.api('/' + user_id + '/photos', function(photos) {
        if (photos) {
            console.log(photos);
            container = document.getElementById("right-container");
            oldFeedlist = document.getElementById("feed");
            photosList = document.createElement("ul");
            photosList.setAttribute("class", "feed");
            photosList.setAttribute("id", "feed");
            container.replaceChild(photosList, oldFeedlist);
            
            for(var i = 0; i < photos.data.length; i++){
                var li = document.createElement("li");
                div_container = document.createElement("div");
                div_container.setAttribute("class", "container-fluid");
                div_row = document.createElement("div");
                div_row.setAttribute("class", "row-fluid");
               
                div_pic = document.createElement("div");
                div_pic.setAttribute("class", "span5");
                div_info = document.createElement("div");
                div_info.setAttribute("class", "span6");
                
                info = document.createElement("p");
                if(photos.data[i].from.name){
                    info.innerHTML = "From:" + photos.data[i].from.name + "<br/>";
                    
                }
                if(photos.data[i].place){
                    info.innerHTML += "At:" + photos.data[i].place.name;
                }
                div_info.appendChild(info);
                
                li.appendChild(div_container);
                div_container.appendChild(div_row);
                div_row.appendChild(div_pic);
                div_row.appendChild(div_info);
                
                var photo = document.createElement("img");
                photo.setAttribute("src", photos.data[i].picture);
                photo.setAttribute("name", photos.data[i].source);
                div_pic.appendChild(photo);
                var hr = document.createElement("hr");
                li.appendChild(hr);
                photosList.appendChild(li);
            }
        }
    });
};
