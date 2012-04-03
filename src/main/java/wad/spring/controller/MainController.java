/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.annotation.Resource;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;
import javax.inject.Qualifier;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.support.WebApplicationContextUtils;
import wad.spring.domain.Role;
import wad.spring.domain.User;
import wad.spring.repository.UserRepository;
import wad.spring.service.LoginService;
import wad.spring.service.SignInUtil;
import wad.spring.service.UserService;

@Controller
public class MainController {

    @Autowired
    private LoginService loginService;
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    private final Provider<ConnectionRepository> connectionRepositoryProvider;
    
    private final UserRepository userRepository;
    
    @Inject
    public MainController(Provider<ConnectionRepository> connectionRepositoryProvider, UserRepository userRepository) {
        this.connectionRepositoryProvider = connectionRepositoryProvider;
        this.userRepository = userRepository;
    }
    
    private ConnectionRepository getConnectionRepository() {
        return connectionRepositoryProvider.get();
    }
    
    @RequestMapping(value = "*")
    public String login(Model model) {
        List<Connection<Facebook>> connections = connectionRepositoryProvider.get().findConnections(Facebook.class);
        model.addAttribute("connectionsToFacebook", connections);
        return "home";
    }

    @RequestMapping(value = "/signin")
    public String signin(Model model) {
        return "signin";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.GET)
    public String signup(Model model) {
        return "signup";
    }

    @RequestMapping(value = "/home")
    public String home(HttpServletRequest request, Model model) {
        
        List<Connection<Facebook>> connections = connectionRepositoryProvider.get().findConnections(Facebook.class);
        model.addAttribute("connectionsToFacebook", connections);
        
//        if (request.getParameter("code") == null) {
//            return "redirect:https://www.facebook.com/dialog/oauth?client_id=377679492261871&redirect_uri=http://localhost:8080/shoo";
//        } else if (request.getParameter("access_token") != null) {
//            String access_token = request.getParameter("access_token");
//            model.addAttribute("access_token", access_token);
//            return "home";
//        } else {
//            String code = request.getParameter("code");
//            String address = "https://graph.facebook.com/oauth/access_token?client_id=377679492261871&redirect_uri=http://localhost:8080/shoo&client_secret=479c9486c41573105ce1fce374c88461&code=" + code;
//            String token = loginService.getAccessToken(address);
//            model.addAttribute("token", token);
//            return "home";
//        }
        return "home";
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String postUser(WebRequest request, HttpServletRequest httpRequest, @ModelAttribute User u, Model model) {

        User user = userService.addUser(u);

        //Programmatically login user
        loginService.loginUser(user);
        
       // httpRequest.getSession( true );
        return "redirect:/";
    }

}
