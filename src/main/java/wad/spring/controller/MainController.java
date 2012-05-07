/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.controller;

import java.util.List;
import javax.inject.Inject;
import javax.inject.Provider;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import wad.spring.domain.User;
import wad.spring.repository.UserRepository;
import wad.spring.service.UserService;

@Controller
public class MainController {
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private UserService userService;
    
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
        return "redirect:/home";
    }

    @RequestMapping(value = "/home")
    public String home(HttpServletRequest request, Model model) {
        
        String userName = userService.getUsername();
        
        model.addAttribute("userName", userName);
        
        return "home";
    }
    
    @RequestMapping(value = "/home/user")
    @ResponseBody
    public User getUser(Model model) {
        
        String userName = userService.getUsername();
        User user = new User();
        user.setUsername(userName);
                
        return user;
    }

}
