/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener('load', initGraph, false);
   
$(document).ready(function() {
    
    
    $('#homefeed').click(function() {
        setActive("homefeed");
        getFeed("home");
    });
    $('#wall').click(function() {
        setActive("wall");
        getFeed("feed");
    });
    $('#pics').click(function() {
        setActive("pics");
        getPhotos("me");
    });
    
    $('#publishMyWall').submit(function() {
        // Get all the forms elements and their values in one step
        body = $('#publishMyWall');
        console.log(body);
    //publishMyWall(body);
    });

    $('#publishFriendWall').click(function() {
        publishFriendWall(id, body);
    });
    
});

function initGraph(){
    window.setTimeout(showMyFriends, 1000);
};
                  
                  
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
 
function showMyFriends(){
                
    var myId;
    var myName;
    idList = [];            
            
    FB.api('/me', function(user) {
        if(user){
            myId = user.id;
            myName = user.name;
        }
    });
    
    FB.api('/me/feed', function(feedlist) {
        if(feedlist){
            console.log(feedlist);
            //take 10 friends last commented on user's wall
            for(var j = 0, k = 0; k < 15 && j < feedlist.data.length; j++){
                if(feedlist.data[j].from.id != myId){
                    idList[k] = feedlist.data[j].from;
                    k++;
                }
            }
           
            json = {
                id: myId,
                name: myName,
                children: idList
            }
            //Initialize graph here so can wait for FB async call to finish
            init();
        }
           
    });
};

function showUserFriends(userId){
                
    var name;
    var idList = [];            
            
    FB.api('/' + userId, function(user) {
        if(user){
            name = user.name;
        }
    });
    
    FB.api('/' + userId + 'feed', function(feedlist) {
        if(feedlist){
            console.log(feedlist);
            //take 10 friends last commented on user's wall
            for(var j = 0, k = 0; k < 15 && j < feedlist.data.length; j++){
                if(feedlist.data[j].from.id != userId){
                    idList[k] = feedlist.data[j].from;
                    k++;
                }
            }
           
            json = {
                id: userId,
                name: name,
                children: idList
            }
            //Initialize graph here so can wait for FB async call to finish
            init();
        }
           
    });
};

function setActive(tagName){
    
    var passive = document.getElementsByName("right-cont");
    for(var j = 0; j < passive.length; j++){
        passive[j].setAttribute("class", "");
    }
            
    var active = document.getElementById(tagName);
    active.setAttribute("class", "active");
}

function getFeed(feedname){
    
    FB.api('/me/'+ feedname, function(feedlist) {
        if(feedlist){
            console.log(feedlist);
            
            var container = document.getElementById("right-container");
            var oldul = document.getElementById("feed");
            var newul = document.createElement("ul");
            newul.setAttribute("class", "feed");
            newul.setAttribute("id", "feed");
            
            for(var i = 0; i < feedlist.data.length; i++){
                li = document.createElement("li");
                li.setAttribute("class", "post");
                div_container = document.createElement("div");
                div_container.setAttribute("class", "container-fluid");
                div_row = document.createElement("div");
                div_row.setAttribute("class", "row-fluid");
                div_span2 = document.createElement("div");
                div_span2.setAttribute("class", "span2");
                div_span9 = document.createElement("div");
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
                    picture = document.createElement("img");
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
                input_comment.setAttribute("class", "input-medium");
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
        else console.log("error");
    });
};

function sumChoosen(node){
    
    var list = $('.filter.active');
    var limit = 10;
    
    for(var i = 0; i < list.length; i++){
        addFriendsToGraph(node, list[i].name, limit);
    }
}

function addFriendsToGraph(node, choice, limit){
    
    idList = [];
    
    if(choice == "feed" || choice == "both"){
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
    
    if(choice == "photos" || choice == "both"){
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
}

function getProfile(user){
                
    FB.api('/' + user.id + '/albums', function(info) {
        if (info) {
            console.log(info);
            for(var i=0; i<info.data.length; i++){
                if(info.data[i].type == "profile"){
                    var coverphoto = info.data[i].cover_photo;
                    FB.api('/' + coverphoto, function(data) {
                        if(data){
                            console.log(data);
                            var cont = document.getElementById("left-container");
                            var old_div = document.getElementById("main_div");
                            var new_div = document.createElement("div");
                            new_div.setAttribute("id", "main_div");
                            var pic = document.createElement("img");
                            pic.setAttribute("src", data.picture);
                            if(old_div)
                                cont.replaceChild(new_div, old_div);
                            else
                                cont.appendChild(new_div);
                            new_div.appendChild(pic);
                        }
                    });
                }
            }
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
