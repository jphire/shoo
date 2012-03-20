<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Le home de admin.</h1>
        <c:url value="/admin/user" var="userURL"/>
        <c:url value="/admin/course" var="courseURL"/>
        <c:url value="/home" var="homeURL"/>
        <a href="${userURL}">Add user</a>
        <a href="${courseURL}">Add course</a>
        
    <h3>Current users:</h3>
    <c:forEach var="user" items="${users}">
        <p>${user.name}</p>
        
    </c:forEach>
        <a href="${homeURL}">Home</a>
        <p><a href="<c:url value="/j_spring_security_logout" />" > Logout</a></p>
    </body>
</html>
