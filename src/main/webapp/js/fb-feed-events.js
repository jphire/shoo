/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function setActive(tagName){
    
    var passive = document.getElementsByName("right-cont");
    for(var j = 0; j < passive.length; j++){
        passive[j].setAttribute("class", "");
    }
            
    var active = document.getElementById(tagName);
    active.setAttribute("class", "active");
}

function showFeed(feedname, userId){
    
    FB.api('/' + userId + '/'+ feedname, function(feedlist) {
        if (!feedlist || feedlist.error) {
            alert('Error occured');
        } else {
            
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
    });
};

