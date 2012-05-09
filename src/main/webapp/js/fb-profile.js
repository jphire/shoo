/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function getUserProfile(userId){
    FB.api('/' + userId, function(user) {
        if(userId == 'me'){
            showProfile(user, true);
        }
        else
            showProfile(user, false);
    });
}

function setCoverPhoto(coverphoto){
    FB.api('/' + coverphoto, function(data) {
        if (!data || data.error) {
            alert('Error occured');
        } else {
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
    var info_div = document.createElement("div");
    info_div.setAttribute("id", "user-info");
    info_div.setAttribute("class", "span12");
    cont.appendChild(info_div);
    
    var ul = $("<ul></ul>").appendTo(info_div);
    $("<li><a href='" + appURL + "social/facebook/" + info.id + "'>" + info.name + "</a></li>").appendTo(ul);
    if(info.birthday){
        $("<li><b>Born:</b> " + info.birthday + "</li>").appendTo(ul);
    }
    if(info.gender){
        $("<li><b>Gender:</b> " + info.gender + "</li>").appendTo(ul);
    }
    if(info.location){
        $("<li><b>Location:</b> " + info.location.name + "</li>").appendTo(ul);
    }
    if(info.relationship_status){
        $("<li><b>Relationship status:</b> " + info.relationship_status + "</li>").appendTo(ul);
    }
    if(info.significant_other){
        $("<li><b>In relationship with:</b> " + info.significant_other.name + "</li>").appendTo(ul);
    }
    if(info.work && info.work[0].employer){
        $("<li><b>Works at:</b> " + info.work[0].employer.name + "</li>").appendTo(ul);
    }
    if(info.education){
        $("<li><b>Studied at:</b> " + info.education[0].school.name + "</li>").appendTo(ul);
    }
    if(info.work && info.work.employer){
        $("<li><b>Favorite athletes:</b> " + info.favorite_athletes[0].name + "</li>").appendTo(ul);
    }
}

function addUserPic(user){
    //add user picture to left container
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
                cont = $(".rows-left#third-row").get(0);
                var friend_div = document.createElement("div");
                friend_div.setAttribute("id", "add-friend-div");
                friend_div.setAttribute("class", "span8");
                cont.appendChild(friend_div);
                var ul = $("<ul></ul>").appendTo(friend_div);
                $("<li>Do you know " + user_info.name + "?</li>").appendTo(ul);
                $("<li><a href='http://www.facebook.com/dialog/friends/?id=" + user_info.id + "&app_id=" + appId + "&redirect_uri=" + appURL + "social/facebook'>Add as friend</a></li>").appendTo(ul);
            }
        }
    });
}

function addAppRequestButton(user){
    
    FB.api('/' + user.id, {
        fields: 'installed'
    }, function(response) {
        if (!response || response.error) {
            alert('Error occured');
        } 
        else if(response.installed){
            console.log("already installed shoo");
            removeOldAppShareButton();
        }
        else{
            var cont = $(".rows-left#app-row").get(0);
            removeOldAppShareButton();
            
            $("<div class='span12' id='app-div'></div>").appendTo(cont);
            $("<p id='app-span'><b>" + user.name + "</b> does not use <b>Shoo</b> yet. Help more people to join us!</p>").appendTo('#app-div');
            $("<button type='button' class='btn btn-medium btn-success' id='send-app-link' name='" + user.id + "'>Inform friend about Shoo&raquo;</button>").appendTo('#app-div');
            addAppShareEventListener();
        }
    });
}

function addAppShareEventListener(){
    $('#send-app-link').click(function(e) {
        shareLink(e.currentTarget.name);
    });
}

function removeOldAppShareButton(){
    var cont = $(".rows-left#app-row").get(0);
    var old_app_div = document.getElementById("app-div");
    if(old_app_div){
        cont.removeChild(old_app_div);
    }
}

function removeOldAppUsersRow(){
    var cont = $(".rows-left#app-users-row").get(0);
    var old_app_users_div = document.getElementById("app-users-div");
    if(old_app_users_div){
        cont.removeChild(old_app_users_div);
    }
}

function shareLink(userId){
    var send_url = "https://www.facebook.com/dialog/send?";
    var applicationId = "app_id=" + appId + "&";
    var to = "to=" + userId + "&";
    var name = "name=Shoo - fluent surfing&";
    var link = "link=" + appURL + "&";
    var redirect_uri = "redirect_uri=" + appURL + "social/facebook";
    location.href = send_url + applicationId + to + name + link + redirect_uri;  
}

function addAppUsingFriends(user){
    
    FB.api('/' + user.id + '/friends', {
        fields: 'installed,name,picture'
    }, function(response) {
        if(!response || response.error){
            console.log("can't get user's data");
            removeOldAppUsersRow();
        }
        else if(response.data && response.data.length > 0){
            var friends = response.data;
            var cont = $(".rows-left#app-users-row").get(0);
            removeOldAppUsersRow();
            
            $("<div class='span12' id='app-users-div'></div>").appendTo(cont);
            $("<p id='app-users-p'>Friends using Shoo:</p>").appendTo('#app-users-div');
            $("<ul class='span12' id='app-users-ul'></ul>").appendTo('#app-users-div');
            
            for(var i = 0; i < friends.length; i++){
                if(friends[i].installed){
                    $("<li id='" + friends[i].id + "'><img src='" + friends[i].picture + "'/><a href='" + appURL + "social/facebook/" + friends[i].id + "'>" + friends[i].name + "</a></li>").appendTo('#app-users-ul');
                }    
            }
        }
        else{
            removeOldAppUsersRow();
        }
    });    
}

function showProfile(user, isLoggedIn){
                
    FB.api('/' + user.id + '/albums', function(albums) {
        //if big photo available
        if (albums && albums.data && albums.data.length > 0) {       
            for(var i = 0; i < albums.data.length; i++){
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
                    addAppRequestButton(info);
                    addAppUsingFriends(info);
                }
            });
        }
        else{
            FB.api('/' + user.id, function(info) {
                if(info){
                    addUserPic(user);
                    addUserInfo(info);  
                    addFriendRequestButton(info);
                    addAppRequestButton(info);
                    addAppUsingFriends(info);
                }
            }); 
        }
    });
};


