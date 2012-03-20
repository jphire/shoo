/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


//$jit.RGraph.Plot.NodeTypes.implement({
//  'faceImage': {  
//        'render': function (node, canvas) {
//            var img = new Image(),
//                pos = node.pos.getc(true),
//                ctx = canvas.getCtx();
//
//            img.onload = function () {
//                ctx.drawImage(img, pos.x - 15, pos.y - 15);
//            };
//
//            //img.src = '/images/user-card_blue.png';
//        }
//    }
//});


function init(){
   
   //init RGraph
    var rgraph = new $jit.RGraph({
        //Where to append the visualization
        injectInto: 'infovis',
        //Optional: create a background canvas that plots
        //concentric circles.
           
        background: {
          numberOfCircles: 0,
          CanvasStyles: {
            strokeStyle: '#555'
          }
        },
        
        width: 1500,
        height: 800,
        levelDistance: 150,
        fps: 40,
        //Add navigation capabilities:
        //zooming by scrolling and panning.
        Navigation: {
          enable: true,
          panning: true,
          zooming: 35
        },
        //Set Node and Edge styles.
        Node: {
            overridable: true,
            type: 'circle',
            color: '#ddeeff'
            
        },
        
        Edge: {
          overridable: true,
          color: '#1464F4',
          alpha: 0.9,
          lineWidth:1.2
        },
        
        Events: {
    
            enable: true,
            overridable: true,
            
            onClick: function(node, eventInfo, e){
                if(!node || node.nodeFrom)
                            return;
                console.log(node);       
                //fetchJSON(node, true);
                FB.api('/' + node.id + '/friends', function(friendList) {
                    if (friendList.data) {
                        var list = friendList.data.slice(0,20); 
                        json_temp = {
                            id: node.id,
                            name: node.name,
                            children: list
                        }
                         
                        rgraph.op.sum(json_temp, {  
                            type: 'fade:seq',  
                            duration: 1000,  
                            hideLabels: false,  
                            transition: $jit.Trans.Quart.easeOut  
                        });
                    }
                    else {
                        
                        console.log("no data available");
                    }
                });
                
            }
        },
        
        Tips: {
            enable: true,
            type: 'HTML',
            align: 'left',

            onShow: function(tip, node)
            {
                tip.innerHTML = "";
		if (!node) return false;
		
                if(node)
                {
                    FB.api('/' + node.id, function(user) {
                        if (user) {
                            var picsource = 'http://graph.facebook.com/' + user.id + '/picture';           
                            tip.innerHTML = "";
                            tip.innerHTML += '<b>' + node.name + '<br/>';
                            tip.innerHTML += "<br/><img src='"+ picsource + "'/>";
                        }
                    });
                }		
            }  
        },
        
        onBeforeCompute: function(node){
            
            Log.write("centering " + node.name + "...");
            //Add the relation list in the right column.
            //This list is taken from the data property of each JSON node.
            //$jit.id('inner-details').innerHTML = node.data.relation;
        },
        
        //Add the name of the node in the correponding label
        //and a click handler to move the graph.
        //This method is called once, on label creation.
        onCreateLabel: function(domElement, node){
    
            domElement.innerHTML = node.name;
            FB.api('/' + node.id, function(user) {
                if (user) {
                    picsource = 'http://graph.facebook.com/' + user.id + '/picture';           
                    domElement.innerHTML += "<br/><img src='"+ picsource + "'/>";
                }
            });
                
        },
        //Change some label dom properties.
        //This method is called each time a label is plotted.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';

            if (node._depth <= 1) {
                style.fontSize = "1.0em";
                style.color = "#1a1a1a";
            
            } else if(node._depth >= 2){
                style.fontSize = "0.9em";
                style.color = "#1a1a1a";
            
            } 

            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    
  });
        
//    var ctx = rgraph.canvas.canvases[1].getCtx();
//    ctx.fillStyle = "#fff";
//    ctx.fillRect(-1000,-600,850,675);
//    console.log(ctx);
//    
    //load JSON data
    rgraph.loadJSON(json);
    //trigger small animation
    
    rgraph.graph.eachNode(function(n) {
      var pos = n.getPos();
      pos.setc(-200, -200);
    });
    rgraph.compute('end');
    rgraph.fx.animate({
      modes:['polar'],
      duration: 500
    });
    //end
    
}