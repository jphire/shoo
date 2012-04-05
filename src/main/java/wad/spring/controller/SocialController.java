/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.controller;

import java.util.List;
import javax.inject.Inject;
import javax.inject.Provider;
import org.springframework.social.facebook.api.Facebook;
import javax.servlet.http.HttpServletRequest;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import wad.spring.repository.UserRepository;

/**
 *
 * @author janne
 */
@Controller
@RequestMapping(value = "/social")
public class SocialController {
 
    private final Facebook facebook;
    
    private final Provider<ConnectionRepository> connectionRepositoryProvider;
    
    private final UserRepository userRepository;
    
    @Inject
    public SocialController(Facebook facebook, Provider<ConnectionRepository> connectionRepositoryProvider, UserRepository userRepository, Facebook faecbook) {
        this.connectionRepositoryProvider = connectionRepositoryProvider;
        this.userRepository = userRepository;
        this.facebook = facebook;
    }
    
    private ConnectionRepository getConnectionRepository() {
        return connectionRepositoryProvider.get();
    }
    
    @RequestMapping(value = "/facebook")
    public String home(HttpServletRequest request, Model model) {
                
//        List<String> friendIds = facebook.friendOperations().getFriendIds();
//        FacebookProfile firstFriend = facebook.userOperations().getUserProfile(friendIds.get(0));
        
        Connection<Facebook> connection = getConnectionRepository().findPrimaryConnection(Facebook.class);
        List<Connection<Facebook>> facebookConnections = connectionRepositoryProvider.get().findConnections(Facebook.class);
        List<Post> posts = connection.getApi().feedOperations().getPosts();
        //List<Post> feed = connection.getApi().feedOperations().getHomeFeed();
        
        
        //List<FacebookProfile> friendIds = facebook.friendOperations().getFriendProfiles();
        model.addAttribute("connectionsToFacebook", facebookConnections);
//        model.addAttribute("feed", posts);
//        model.addAttribute("likes", facebook.likeOperations().getMovies());
//        model.addAttribute("group1", facebook.groupOperations());
        model.addAttribute("friends", facebook.userOperations().getUserPermissions());
        model.addAttribute("profile", facebook.userOperations().getUserProfile());
        model.addAttribute("posts", posts);
        
//        Post p;
//        p.
        model.addAttribute("feed", facebook.feedOperations().getFeed());
//        model.addAttribute("friends", connection.getApi().eventOperations().getInvitations());
//        model.addAttribute("profile", connection.getApi().friendOperations().getFriendProfiles());
  
//        List<Connection<Twitter>> twitterConnections = connectionRepositoryProvider.get().findConnections(Facebook.class);
//        model.addAttribute("connectionsToFacebook", twitterConnections);
        
        return "facebook";
    }
}
