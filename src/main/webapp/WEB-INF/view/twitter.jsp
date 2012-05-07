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
        <script type="text/javascript" src="<c:url value='/js/jquery.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/jit.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-button.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/options.js'/>"></script>
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
                <div class="hero-unit">
                <h1>Twitter</h1>
                <p>This is a placeholder for future Twitter content.</p>
                <p><a class="btn btn-primary btn-large">Learn more &raquo;</a></p>
            </div>
                
            <div id="infovis"></div>    
        </div>

        <div class="container-fluid" id="right-container">

        </div>
    </body>
</html>
