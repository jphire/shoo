<%-- 
    Document   : course
    Created on : Feb 24, 2012, 12:25:53 PM
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
        <h1>Add course</h1>
        <c:url value="/admin/course" var="createCourse"/>
        <form:form action="${createCourse}" method='POST'>
            <label for="name">Name</label><input type="text" name="name"/><br/>
            <span>Luennoija</span><br/>
            <c:forEach var="l" items="${lecturers}">
                <input type="radio" name="lecturerId" value="${l.id}"/><label for="lecturer">${l.name}</label></br>
            </c:forEach>
           
            <input type="submit">
        </form:form>
    </body>
</html>
