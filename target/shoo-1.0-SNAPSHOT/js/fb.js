/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener('load', initGraph, false);
            
function initGraph(){
    window.setTimeout(showMyFriends, 500);
    window.setTimeout(init, 2000);
                
};
                  
function showMyFriends(){
                
    var myId;
    var myName;
                
    FB.api('/me', function(user) {
        if(user)
            myId = user.id;
        myName = user.name;
    });
                
                              
    FB.api('/me/friends', function(friendList) {
        if (friendList) {
            //                        var friends = document.getElementById('friends');
            //                        friends.innerHTML = friendList;
            list = friendList.data.slice(30, 50);
            childlist = [];
            for(var i = 0; i < list.length; i++){
                                
                //                            if(list[i].name == "Tanja Pulkkinen"){
                //                                
                //                                getFriends(list[i]);
                //                                
                //                            }
                }
                        
            json = {
                id: myId,
                name: myName,
                children: list
            }
        }
    });
};
            
//set user's friends
function getFriends(object){
                
    console.log(object.id);
    FB.api('/' + object.id + '/friends', function(friendList) {
        if (friendList.data) {
            console.log(friendList);
            object.children = friendList.data.slice(50, 100);
            childlist = friendList;
                        
        //                        for(var i in list){
        //                            i.children = getFriends(i);
        //                        }                
        }
    });
                 
}
            
function getPic(user_id){
                
    FB.api('/' + user_id, function(user) {
        if (user) {
            var image = document.getElementById('image');
            image.src = 'http://graph.facebook.com/' + user.id + '/picture';
        }
    });
};
