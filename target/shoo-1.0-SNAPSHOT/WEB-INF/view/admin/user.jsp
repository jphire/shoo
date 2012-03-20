<%-- 
    Document   : user
    Created on : Feb 24, 2012, 12:25:43 PM
    Author     : janne
--%>
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
        <h1>Add user</h1>
        <c:url value="/admin/user" var="createStudent"/>
        <form:form action="${createStudent}" method='POST'>
            <label for="name">Name</label><input type="text" name="name"/><br/>
            <label for="username">Username</label><input type="text" name="username"/><br/>
            <label for="password">Password</label><input type="password" name="password" value="vaihda"/><br/>

            <input type="submit">
        </form:form>
    
    </body>
</html>
