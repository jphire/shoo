<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap-responsive.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/css/base.css'/>" rel="stylesheet">
        <script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
        <script type="text/javascript" src="<c:url value='/jQuery/jquery.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/jQuery/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/jit.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-button.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/options.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/fb-user-photos.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/fb-profile.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/fb-graph.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/fb-user-events.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/fb-feed-events.js'/>"></script>   
        <script type="text/javascript" src="<c:url value='/js/fb.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/fbinit.js'/>"></script>
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
                        <li>
                            <c:url value="/home" var="home"/>
                            <a href="${home}">Home</a>
                        </li>
                        <li>
                            <c:url value="/connect" var="connect"/>
                            <a href="${connect}">Connections</a>
                        </li>
                        <li class="active dropdown">
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

                    <ul class="nav pull-right">
                        <li><img src="http://graph.facebook.com/${profile.id}/picture"/></li>
                            <c:url value="/j_spring_security_logout" var="logout"/>
                        <li><a href="${logout}">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="fb-root"></div>
        
        <span id="userid">${userid}</span>
        
        <div class="container-fluid" id="left-container">
            <div class="row-fluid rows-left" id="first-row">
                <div class="span12" id="user-pic">

                </div>
            </div>
            <div class="row-fluid rows-left" id="second-row">
                <div class="span12" id="user-info">
                    
                </div>
            </div>
            <div class="row-fluid rows-left" id="third-row">
                <div class="span8" id="add-friend-div">
                    
                </div>
            </div>
            <div class="row-fluid rows-left" id="app-row">
                <div class="span8" id="app-div">
                    
                </div>
            </div>
            <div class="row-fluid rows-left" id="app-users-row">
                <div class="span8" id="app-users-div">
                    
                </div>
            </div>
        </div>
        <div id="center-container">
            <div class="container-fluid">
                <div class="row-fluid">
                    <div class="span12">
                        <div class="span3">
                            <form class="form-inline" id="searchFacebook">
                                <input type="text" id="searchQuery" class="input-medium search-query" name="userId" placeholder="Search from facebook">
                                <button type="submit" id="search" class="btn btn-small btn-primary">Search</button>
                            </form>
                        </div>
                        <div class="span4">
                            <form class="form-inline" id="publishMyWall">
                                <input class="input-large" id="publishMessage" type="text" placeholder="Post your status" name="message">
                                <button class="btn btn-small btn-primary" type="submit" value="submit">
                                    Share
                                </button>                         
                            </form>
                        </div>
                    </div>
                </div>
                <div class="row-fluid">
                    <!-- Add data-toggle="buttons-checkbox" for checkbox style toggling on btn-group -->
                    <div class="span12">
                        <div class="span3">
                            <span class="help-inline">Onclick filtering basis and max results:</span>
                        </div>
                        <div class="span3 btn-group" data-toggle="buttons-radio">
                            <button class="filter btn btn-small btn-primary active" name="friends">Friends</button>
                            <button class="filter btn btn-small btn-primary" name="photos">Photos</button>
                            <button class="filter btn btn-small btn-primary" name="feed">Wall</button>
                            <input id="result-amount" class="input-mini" type="number" name="quantity" min="1" max="10" value="5"/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="infovis"></div>    
        </div>

        <div class="container-fluid" id="right-container">


            <ul class="nav nav-pills" id="facebook-feed">
                <li class="active" id="wall" name="right-cont">
                    <a><i class="icon-user"></i> Wall</a>
                </li>
                <li id="homefeed" name="right-cont">
                    <a><i class="icon-home"></i> Home</a>
                </li>
                <li id="pics" name="right-cont">
                    <c:url value="/home" var="showfeed"/>
                    <a><i class="icon-picture"></i> Pics</a>
                </li>
            </ul> 

            <ul class="feed" id="feed">                        
            </ul>
        </div
    </body>
</html>
