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
        <script type="text/javascript" src="<c:url value='/jQuery/jquery.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/jQuery/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/jit.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/homeoptions.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/home.js'/>"></script>

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
                    <ul class="nav pull-right">
                        <c:url value="/j_spring_security_logout" var="logout"/>
                        <li><a href="${logout}">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="well container-fluid grid">
            <div class="span4 home-grid up-left">
                <div class="hero-unit"><h1>Shoo</h1></div>
                <div class="span3 well" id="up-left">
                <h2>Social</h2>
                <p>Shoo's social interface lets you manage many of the social media applications that you use daily in one place. You can quickly check out your latest tweets or just see what your friends are up to in Facebook. Also, new features are added to the interface...</p>
                </div>
                <div class="span3 well" id="down-left">
                <h2>News</h2>
                    <p>Shoo News helps you keep track of all the News-feeds you are interested in and categorize them the way that feels best. New graphical interface </p>
                </div>
                </div>
            <div class="span8">
                <div id="infovis-grid">
                </div>
            </div>

            <hr>

        </div> <!-- /container -->

        <footer>
            <p>&copy; Shoo 2012</p>
        </footer>

    </body>
</html>
