<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page session="false" %>
<html>
    <head>
        <title>Spring Social Showcase: Send a Tweet</title>
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/css/base.css'/>" rel="stylesheet">
        <link type="text/css" href="<c:url value='/bootstrap/css/bootstrap-responsive.css'/>" rel="stylesheet">
        <script type="text/javascript" src="<c:url value='/js/jquery.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/js/jquery-ui.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/bootstrap/js/bootstrap-collapse.js'/>"></script>
        <script type="text/javascript" src="<c:url value='/Jit/options.js'/>"></script>
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
                                    <button class="btn btn-primary" type="submit" value="delete">
                                        Disconnect FB
                                    </button>
                                </form></li>
                            </c:if>    
                        <li>${connectionsToProviders}</li>
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

            <form id="disconnect" action="${disconnectUrl}" method="post">
                <button type="submit">Disconnect from all</button>	
                <input type="hidden" name="_method" value="delete" />
            </form>

            <form action="<c:url value="/connect/facebook" />" method="POST">
                <p>You may connect multiple Twitter users to a single Spring Social Showcase account. To connect to another Twitter user, click the button.</p>
                <button type="submit">Connect to another Twitter user</button> <label for="postTweet"><input id="postTweet" type="checkbox" name="postTweet" /> Post a tweet about connecting with Spring Social Showcase</label>
                <p>(Note: If you are still logged into Twitter as any one of the profiles that are already connected, you'll need to
                    first sign out when Twitter prompts you to allow access to Spring Social Showcase and then login as a
                    different Twitter user.)</p>
            </form>

            <h3>Post a Tweet to your connected Twitter accounts</h3>
            <c:url var="tweetUrl" value="/twitter/tweet" />
            <form action="${tweetUrl}" method="post">
                <textarea name="message" rows="5" cols="80"></textarea> 	
                <p><input type="submit" value="Tweet" /></p>
            </form>
        </div>
    </body>
</html>