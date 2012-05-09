/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function getPhotos(user_id){
                
    FB.api('/' + user_id + '/photos', function(photos) {
        if (!photos || photos.error) {
            alert('Error occured');
        } else {
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
