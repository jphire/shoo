/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    
    //for local development:
//    appURL = "http://localhost:8080/shoo";
    
    //for production, uncomment next line
    appURL = "http://shoo.herokuapp.com";
    initGraph();
});

function initGraph(){
    
    show();
};

function show(){
    
//    Mock data for front page
    var list = [{id:"1", name:"social", children:[{id:"33", name:"facebook"}, {id:"44", name:"twitter"}]},
        {id:"3", name:"news", children:[{id:"35", name:"this"}, {id:"46", name:"that"}]},
        {id:"4", name:"calendar", children:[{id:"55", name:"this"}, {id:"56", name:"that"}]},
    ];
        
    
    $.getJSON(appURL + '/home/user', function(response){
        if(!response || response.error){
            console.log("Error: Couldn't get logged user's username.");
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
