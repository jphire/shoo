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
        <h1>Le home de student.</h1>
        
        <form:form action="update" method='POST'>
            <label for="name">Name</label><input type="text" name="name" value="${name}"/><br/>
            <label for="username">Username</label><input type="text" name="username" value="${username}" readonly="readonly"/><br/>
            <label for="password">Password</label><input type="password" name="password" value="${password}"/><br/>

            <input type="submit">
        </form:form>
        <c:url value="/home" var="homeURL"/>
        <a href="${homeURL}">Home</a>
        <a href="<c:url value="/j_spring_security_logout" />" > Logout</a>
    </body>
</html>
