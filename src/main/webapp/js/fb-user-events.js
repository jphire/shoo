/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function searchFacebook(element){
    
    var query = element.children('#searchQuery')[0].value;
    
    FB.api('/search', {
        q: query, 
        type: 'user'
    }, function(response) {
        if (!response || response.error) {
            alert('Error occured');
        } else {
            if(response.data.length > 0){
               
                var userId = response.data[0].id;
                var name = response.data[0].name;
                getUserProfile(userId);
                removeCanvas();
                json = {
                    id: userId,
                    name: name,
                    children: response.data
                }
                //Initialize graph here so can wait for FB's async-call to finish
                init();
            }
        }
    });
}    

function publishMyWall(body){
    
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

