/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function removeCanvas(){
    var oldCanvas = $('#infovis-canvaswidget').get(0);
    if(oldCanvas)
        $('#infovis').get(0).removeChild(oldCanvas);
} 
 
function showGraph(userId){
    
    removeCanvas();
    
    FB.api('/' + userId, function(user) {
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
    var idList = [];            
    
    FB.api('/' + id + '/feed', function(feedlist) {
        if (!feedlist || feedlist.error) {
            alert('Error occured');
        } else {
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
            if (!friendList || friendList.error) {
                console.log('Error occured');
            } else {
                if (friendList.data) {
                    for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                        if(friendList.data[j].from.id != node.id){
                            idList[k] = friendList.data[j].from;
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
                    var json_temp = {
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
                    console.log("No friendlist data available");
                }
            }
        });
    }
    
    if(choice == "home"){
        FB.api('/' + node.id + '/home', function(friendList) {
            if (!friendList || friendList.error) {
                console.log('Error occured');
            } else {
                if (friendList.data) {
                    for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                        if(friendList.data[j].from.id != node.id){
                            idList[k] = friendList.data[j].from;
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
                
                    var json_temp = {
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
                    console.log("No friendlist data available");
                }
            }
        });
    }
    
    if(choice == "photos"){
        FB.api('/' + node.id + '/photos', function(friendList) {
            if (!friendList || friendList.error) {
                console.log('Error occured');
            } else {
                if (friendList.data) {
                    for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                        if(friendList.data[j].from.id != node.id){
                            idList[k] = friendList.data[j].from;
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
                
                    var json_temp = {
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
                    console.log("No friendlist data available");
                }
            }
        });
    }
    if(choice == "friends"){
        FB.api('/' + node.id + '/friends', function(friendList) {
            if (!friendList || friendList.error) {
                console.log('Error occured');
            } else {
                if (friendList.data) {
                    for(var j = 0, k = 0; k < limit && j < friendList.data.length; j++){
                        idList[k] = friendList.data[j];        
                        k++;
                    }                
               
                    var json_temp = {
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
                    console.log("No friendlist data available");
                }
            }
        });
    }
}

