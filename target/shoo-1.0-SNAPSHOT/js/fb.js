/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener('load', initGraph, false);
   
$(document).ready(function() {
    
    $('#homefeed').click(function() {
        getFeed("home", "homefeed");
    });
    $('#wall').click(function() {
        getFeed("feed", "wall");
    });
    $('#pics').click(function() {
        getPics("feed", "wall");
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

function getFeed(feedname, list_id){
    
    FB.api('/me/'+ feedname, function(feedlist) {
        if(feedlist){
            console.log(feedlist);
            
            passive = document.getElementsByName("feed");
            for(var j = 0; j < passive.length; j++){
                passive[j].setAttribute("class", "");
            }
            
            active = document.getElementById(list_id);
            active.setAttribute("class", "active");
            
            container = document.getElementById("right-container");
            oldul = document.getElementById("feed");
            newul = document.createElement("ul");
            
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
    

            
//set user's friends
//function getFriends(object){
//                
//    console.log(object.id);
//    FB.api('/' + object.id + '/friends', function(friendList) {
//        if (friendList.data) {
//            console.log(friendList);
//            object.children = friendList.data.slice(50, 100);
//            childlist = friendList;
//                        
//        //                        for(var i in list){
//        //                            i.children = getFriends(i);
//        //                        }                
//        }
//    });
//                 
//}
//        
function getProfile(user){
                
    FB.api('/' + user.id, function(info) {
        if (info) {
            console.log(info);
            var cont = document.getElementById('left-container');
            cont.src = 'http://graph.facebook.com/' + user.id + '/picture';
        }
    });
};

function getPics(user_id){
                
    FB.api('/' + user_id + '/albums', function(albums) {
        if (albums) {
            
            var image = document.getElementById('image');
            image.src = 'http://graph.facebook.com/' + user.id + '/picture';
        }
    });
};
