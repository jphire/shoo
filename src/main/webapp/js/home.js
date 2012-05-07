/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    appURL = "http://localhost:8080/shoo";
    initGraph();
});

function initGraph(){
    
    show();
};

function show(){
    
    var list = [{id:"1", name:"social"}];
        
    
    $.getJSON(appURL + '/home/user', function(response){
        if(!response || response.error){
            console.log("error: couldn't get logged username.");
        } else{
            console.log(response);
            json = {
                id: "0",
                name: response.username,
                children: list
            }
            //Initialize graph here so can wait for FB's async-call to finish
            init();
        }
        
    });
           
    
       
};
