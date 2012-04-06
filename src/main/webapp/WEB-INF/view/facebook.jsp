<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap-responsive.css'/>" rel="stylesheet">
        <script type="text/javascript" src="<c:url value='/js/jquery.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/jit.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/options.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/fb.js'/>"></script>
        <link type="text/css" href="<c:url value='/css/base.css'/>" rel="stylesheet">
        <title>Shoo</title>
    </head>
    <body>    
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="brand" href="#">
                        Shoo
                    </a>
                    <ul class="nav nav-pills">
                        <li class="active">
                            <c:url value="/home" var="home"/>
                            <a href="${home}">Home</a>
                        </li>
                        <li>
                            <c:url value="/connect" var="connect"/>
                            <a href="${connect}">Connections</a>
                        </li>
                        <li>
                            <c:url value="/news" var="news"/>
                            <a href="${news}">News</a>
                        </li>
                        <li class="dropdown">
                            <c:url value="/social/facebook" var="facebook"/>
                            <c:url value="/social/twitter" var="twitter"/>
                            <a href="#"
                               class="dropdown-toggle"
                               data-toggle="dropdown">
                                Social
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="${facebook}">Facebook</a></li>
                                <li><a href="${twitter}">Twitter</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav">
                        <c:if test="${empty connectionsToFacebook}">
                            <li><form action="<c:url value="/connect/facebook" />" method="POST">
                                    <button class="btn btn-primary" type="submit">
                                        Connect FB
                                    </button>
                                </form></li>
                            </c:if>
                            <c:if test="${not empty connectionsToFacebook}">
                            <li><form action="<c:url value="/connect/facebook" />" method="POST">
                                    <button class="btn btn-danger" type="submit" value="delete">
                                        Disconnect FB
                                    </button>
                                </form></li>
                            </c:if>    
                        <li>${connectionsToProviders}</li>
                    </ul>
                    <ul class="nav pull-right">
                        <li><img src="http://graph.facebook.com/${profile.id}/picture"/></li>
                            <c:url value="/j_spring_security_logout" var="logout"/>
                        <li><a href="${logout}">Logout</a></li>
                    </ul>

                    <form class="navbar-search pull-left">
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

        <div id="left-container"></div>
        <div id="center-container">
            <div id="infovis"></div>    
        </div>

        <div id="right-container">


            <ul class="nav nav-pills">
                <li class="active">
                    <c:url value="/home" var="showfeed"/>
                    <a href="showfeed" onClick="showFeed()">Feed</a>
                </li>
                <li>
                    <c:url value="/home" var="showfeed"/>
                    <a id="homefeed">Home</a>
                </li>
                <li>
                    <c:url value="/home" var="showfeed"/>
                    <a href="showfeed" onClick="showPics()">Pics</a>
                </li>
            </ul> 


            <ul class="feed">
                <c:forEach items="${feed}" var="post">
                    <li class="post">

                        <c:if test="${not empty post.picture}">
                            <img id="tag-pic" src="<c:out value="${post.picture}"/>" align="top"/>
                        </c:if>
                        <p id="story"><c:if test="${not empty post.story}">
                                <c:out value="${post.story}"/></p>
                            </c:if>

                        <c:if test="${not empty post.message}">

                            <img src="http://graph.facebook.com/${post.from.id}/picture"/>

                            <c:out value="${post.from.name} on ${post.createdTime}:" /><br/>
                            <c:out value="${post.message}" />
                        </c:if>
                        <c:forEach items="${post.comments}" var="comment">
                            <c:out value="${comment}" />
                        </c:forEach>
                        <div id="comment">
                            <form id="comment-post" action="http://graph.facebook.com/${post.id}/comments" method="POST">
                                <input class="input-medium" type="text" placeholder="Comment">
                            </form>
                            <form id="like-button" action="<c:url value="http://graph.facebook.com/${post.id}/likes" />" method="POST">
                                <button class="btn btn-primary btn-mini" type="submit" value="delete">
                                    Like
                                </button>
                            </form><br/>
                        </div>
                    </li>
                    <hr id="feed"/>
                </c:forEach>
            </ul>
        </div
    </body>
</html>
