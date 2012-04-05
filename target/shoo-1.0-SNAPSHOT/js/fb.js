/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.addEventListener('load', initGraph, false);
            
function initGraph(){
    window.setTimeout(showMyFriends, 1000);
                
};
                  
function showMyFriends(){
                
    var myId;
    var myName;
    idList = [];
    ss=[];            
            
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
            ss=idList;
            init();
        }
        //Initialize graph here so can wait for FB async call to finish
        
    });
                
                              
//    FB.api('/me/friends', function(friendList) {
//        if (friendList) {
//            
//            list = friendList.data.slice(30, 50);
//            
//            childlist = [];
//            for(var i = 0; i < list.length; i++){
//                                
//                //                            if(list[i].name == "Tanja Pulkkinen"){
//                //                                
//                //                                getFriends(list[i]);
//                //                                
//                //                            }
//                }
//                        
//            json = {
//                id: myId,
//                name: myName,
//                children: list
//            }
//        }
//        
       
//    });
    
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
//function getPic(user_id){
//                
//    FB.api('/' + user_id, function(user) {
//        if (user) {
//            var image = document.getElementById('image');
//            image.src = 'http://graph.facebook.com/' + user.id + '/picture';
//        }
//    });
//};
