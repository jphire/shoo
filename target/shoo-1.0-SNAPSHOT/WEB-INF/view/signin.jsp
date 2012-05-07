<%-- 
    Document   : index
    Created on : Mar 30, 2012, 2:15:54 PM
    Author     : janne
--%>
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
<!--        <script type="text/javascript" src="<c:url value='/Jit/jit.js'/>"></script>-->
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
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
                    <ul class="nav">
                        <li class="active">
                            <c:url value="/home" var="home"/>
                            <a href="${home}">Home</a>
                        </li>
                        <li><a href="/info">Info</a></li>
                        <li><a href="#"></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container">

            <!-- Main hero unit for a primary marketing message or call to action -->
            <div class="hero-unit">
                <h1>Shoo!!</h1>
                <p>Shoo is an easier-to-use - interface for internet applications. </p>
                <p><c:url value="/j_spring_security_check" var="login"/>
                    <form:form action="${login}" method='POST'>
                        <label for="j_username">Username</label><input type="text" name="j_username"/><br/>
                        <label for="j_password">Password</label><input type="password" name="j_password"/><br/>
                        <input class="btn btn-primary btn-large" type="submit" value="Login&raquo;">
                    </form:form>
                </p>
                
                
                <form id="fb_signin" action="<c:url value="/signin/facebook"/>" method="POST">
                    <button type="submit">
                        <img src="<c:url value="/images/facebook-signin.png"/>" />
                    </button>
                </form>
                <form id="tw_signin" action="<c:url value="/signin/twitter"/>" method="POST">
                    <button type="submit">
                        <img src="<c:url value="/images/twitter-signin.png"/>" />
                    </button>
                </form>
                

                <c:url value="/signup" var="signup"/>
                <a href="${signup}">Sign up</a>
            </div>
            <hr>

            <footer>
                <p>&copy; Shoo 2012</p>
            </footer>

        </div> <!-- /container -->
    </body>
</html>
