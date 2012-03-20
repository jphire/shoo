<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Le home de casual person.</h1>
        <p><a href="student/home">Le home de student!</a></p>
        <p><a href="admin/home">Le home de admin!</a></p>
        
        <h3>Current users:</h3>
        <p>
        <c:forEach var="user" items="${userList}">
            <span>Nimi: ${user.name} </span>
            <sec:authorize access="hasRole('lecturer')"> 
                <span>Käyttäjätunnus: ${user.username}</span><br/>
            </sec:authorize>
            
        </c:forEach>
         </p>   
        <h3>Courses:</h3> 
        <c:forEach var="course" items="${courses}">
            <span>Nimi: ${course.name}, </span>
            <span>Ilmoittautuneita: ${course.studentcount}  </span> 
            
            <sec:authorize access="hasRole('student')">
                    <a href="student/attendCourse/${course.id}">ilmoittaudu</a><br/>
            </sec:authorize>
            
        </c:forEach>

    </body>
</html>
