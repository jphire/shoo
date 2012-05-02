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
<!--        <script type="text/javascript" src="<c:url value='/js/jquery.js'/>"></script>-->
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
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
                        <li>
                            <c:url value="/home" var="home"/>
                            <a href="${home}">Home</a>
                        </li>
                        <li class="active">
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

            <h1>Your Connections</h1>
            <c:forEach var="providerId" items="${providerIds}">
                <c:set var="connections" value="${connectionMap[providerId]}" />
                <h3>${providerId}</h3>
                <c:if test="${empty connections}">
                    <p>
                    <form action="<c:url value="/connect/facebook" />" method="POST">
                        <input type="hidden" name="scope" value="read_mailbox,friends_birthday,friends_groups,friends_activities,read_stream,publish_stream,offline_access,user_photos,friends_photos,friends_events,friends_likes,friends_interests,friends_relationships,friends_notes,friends_location" />
                        You are not yet connected to ${providerId}.
                        <button type="submit" class="btn btn-success btn-small">Connect&raquo;</button>
                    </form>
                </p>

            </c:if>

            <c:url value="/connect/facebook" var="disconnectUrl"/>
            <c:forEach items="${connections}" var="connection">
                <div class="container-fluid">
                    <div class="row-fluid">
                         <div class="span1">
                            <a href="${connection.profileUrl}" target="_blank"><img src="${connection.imageUrl}" border="0"/></a><br/>
                        </div>
                        <div class="span9">
                            <form id="disconnect${connection.key.providerUserId}" action="${disconnectUrl}/${connection.key.providerUserId}" method="post">
                                <p>You are connected to ${providerId}</p>
                                <button class ="btn btn-danger btn-small" type="submit">Disconnect</button>	
                                <input type="hidden" name="_method" value="delete" />
                            </form>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </c:forEach>
        <div id="infovis"></div>    
    </div>
</body>
</html>