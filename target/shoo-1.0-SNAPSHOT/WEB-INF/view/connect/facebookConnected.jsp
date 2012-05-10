<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page session="false" %>
<html>
    <head>
        <title>Shoo</title>
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/css/base.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap-responsive.css'/>" rel="stylesheet">
        <script type="text/javascript" src="<c:url value='/jQuery/jquery.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/jQuery/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
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

            <c:if test="${_duplicateConnectionException}">
                <p class="error">That connection already exists.</p>
            </c:if>


            <p>Your Shoo account is connected to the following Facebook users:</p>

            <c:url value="/connect/facebook" var="disconnectUrl"/>
            <c:forEach items="${connections}" var="connection">
                <div>
                    <a href="${connection.profileUrl}" target="_blank"><img src="${connection.imageUrl}" border="0"/></a><br/>
                    <a href="${connection.profileUrl}"><c:out value="${connection.displayName}"/></a>
                    <form id="disconnect${connection.key.providerUserId}" action="${disconnectUrl}/${connection.key.providerUserId}" method="post">
                        <button type="submit">Disconnect</button>	
                        <input type="hidden" name="_method" value="delete" />
                    </form>
                </div>
            </c:forEach>

        </div>
    </body>
</html>