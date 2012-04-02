<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="text/css" href="<c:url value='/css/base.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap-responsive.css'/>" rel="stylesheet">
        <script type="text/javascript" src="<c:url value='/js/jquery.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/jit.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/options.js'/>"></script>
        <script type="text/javascript">
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
            
        </script>
        <title>Shoo</title>
    </head>
    <body>
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="brand" href="#">
                        Shoo
                    </a>
                    <ul class="nav">
                        <li class="active">
                            <a href="#">Home</a>
                        </li>
                        <li><a href="#">Info</a></li>
                        <li><a href="#"></a></li>
                    </ul>
                    <ul class="nav pull-right">
                        <c:url value="/j_spring_security_logout" var="logout"/>
                        <li><a href="${logout}">Logout</a></li>
                    </ul>
                    <form class="navbar-search pull-right">
                        <input type="text" class="search-query" placeholder="Search">
                    </form>
                </div>
            </div>
        </div>
        <div id="fb-root"></div>
        <script>
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '377679492261871',
                    status     : true, 
                    cookie     : true,
                    xfbml      : true,
                    oauth      : true
                });
          
            };
            (function(d){
                var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                d.getElementsByTagName('head')[0].appendChild(js);
            }(document));
        
        </script>

        <div id="center-container">
            <div id="infovis"></div>    
        </div>

        <div id="right-container">
            <button class="btn" type="submit">
                Button
            </button>
            <h1>Add user</h1>
            <c:url value="/user" var="createUser"/>
            <form:form action="${createUser}" method='POST'>
                <label for="username">Username</label><input type="text" name="username"/><br/>
                <label for="password">Password</label><input type="password" name="password" value="vaihda"/><br/>

                <input type="submit">
            </form:form>
            <h3>Current users:</h3>
            <c:forEach var="user" items="${users}">
                <p>${user.username}</p>
            </c:forEach>    
            <div class="alert alert-info">

            </div>
        </div>
        <div id="log"></div>
    </body>
</html>
