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