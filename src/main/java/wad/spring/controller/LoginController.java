/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.WebRequest;
import wad.spring.domain.User;
import wad.spring.service.LoginService;
import wad.spring.service.UserService;

/**
 *
 * @author janne
 */

@Controller
public class LoginController {
    
    @Autowired
    private LoginService loginService;
    @Autowired
    private UserService userService;
    
    @RequestMapping(value = "/signin")
    public String signin(Model model) {
        return "signin";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String signup(Model model) {
        return "signup";
    }
    
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String registerUser(WebRequest request, HttpServletRequest httpRequest, @ModelAttribute User u, Model model) {

        User user = userService.addUser(u);

        //Programmatically login user
        loginService.loginUser(user);
        
       // httpRequest.getSession( true );
        return "redirect:/";
    }
}
