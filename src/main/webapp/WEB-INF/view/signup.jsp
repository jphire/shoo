<%-- 
    Document   : registration
    Created on : Mar 31, 2012, 6:35:39 PM
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
        <title>Sign up</title>
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
                            <a href="/home">Home</a>
                        </li>
                        <li><a href="/info">Info</a></li>
                        <li><a href="#"></a></li>
                    </ul>
                    <ul class="nav pull-right">
                        <li><a href="#">&copy;Janne Laukkanen</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container">
            <h1>Sign up</h1>
            <p><c:url value="/signup" var="createUser"/>
                <form:form action="${createUser}" method='POST'>
                    <label for="username">Username</label><input type="text" name="username"/><br/>
                    <label for="password">Password</label><input type="password" name="password"/><br/>
                </p>
                <input class="btn btn-primary btn-large" type="submit" value="Sign up&raquo;">
            </form:form>
        </div>
    </body>
</html>