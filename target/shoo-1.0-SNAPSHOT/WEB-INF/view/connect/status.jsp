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
<!--        <script type="text/javascript" src="<c:url value='/js/fb.js'/>"></script>-->

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

        <div class="container">

            <h3>Your Connections</h3>

            <c:forEach var="providerId" items="${providerIds}">
                <c:set var="connections" value="${connectionMap[providerId]}" />

                <div class="accountConnection">

                    <h4><img src="<c:url value="${iconUrl}" />" width="36" height="36" />${providerDisplayName}</h4>

                    <p>
                        <c:if test="${not empty connections}">
                            You are connected to ${providerDisplayName} as ${connections[0]}.
                        </c:if>
                        <c:if test="${empty connections}">
                            You are not yet connected to ${providerDisplayName}.
                        </c:if>
                        Click <a href="<c:url value="/connect/${providerId}" />">here</a> to manage your ${providerDisplayName} connection.
                    </p>
                </div>
            </c:forEach>
            <div id="infovis"></div>    
        </div>
    </body>
</html>