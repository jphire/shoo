/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import net.sf.json.JSONObject;
import javax.inject.Inject;
import javax.inject.Provider;
import org.springframework.social.facebook.api.Facebook;
import javax.servlet.http.HttpServletRequest;
import org.codehaus.jackson.annotate.JsonAutoDetect.Visibility;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.type.TypeFactory;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.*;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import wad.spring.domain.FeedList;
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

    @RequestMapping(value = "/facebook", method = RequestMethod.GET)
    public String home(HttpServletRequest request, Model model) {

//        List<String> friendIds = facebook.friendOperations().getFriendIds();
//        FacebookProfile firstFriend = facebook.userOperations().getUserProfile(friendIds.get(0));

        Connection<Facebook> connection = getConnectionRepository().findPrimaryConnection(Facebook.class);
        List<Connection<Facebook>> facebookConnections = connectionRepositoryProvider.get().findConnections(Facebook.class);
        List<Post> posts = connection.getApi().feedOperations().getPosts();

        model.addAttribute("connectionsToFacebook", facebookConnections);
        
        model.addAttribute("friends", facebook.userOperations().getUserPermissions());
        model.addAttribute("profile", facebook.userOperations().getUserProfile());
        model.addAttribute("feed", posts);
        model.addAttribute("userid", "me");
        
//        List<Connection<Twitter>> twitterConnections = connectionRepositoryProvider.get().findConnections(Facebook.class);
//        model.addAttribute("connectionsToFacebook", twitterConnections);

        return "facebook";
    }

    @RequestMapping(value = "/facebook", method = RequestMethod.POST)
    public String showUser(@RequestParam String userId, Model model) throws IOException{
        System.out.println("userId: " + userId);
        return "redirect:facebook/" + userId;
    }
    
    @RequestMapping(value = "/facebook/{userId}", method = RequestMethod.GET)
    public String showUser(Model model, @PathVariable Integer userId) throws IOException{
        
        String s = userId.toString();
        System.out.println(s);
        Connection<Facebook> connection = getConnectionRepository().findPrimaryConnection(Facebook.class);
        List<Connection<Facebook>> facebookConnections = connectionRepositoryProvider.get().findConnections(Facebook.class);
        List<Post> posts = connection.getApi().feedOperations().getPosts();

        model.addAttribute("connectionsToFacebook", facebookConnections);
        
        model.addAttribute("profile", facebook.userOperations().getUserProfile());
        model.addAttribute("feed", posts);
        model.addAttribute("userid", userId);
        
        return "facebook";
    }
//    @RequestMapping(value = "/facebook/feed", method = RequestMethod.GET)
//    public @ResponseBody  getAvailability(Model model) throws IOException{
//        
//        ObjectMapper mapper = new ObjectMapper();
//
//        System.out.println("ok");
//        Connection<Facebook> connection = getConnectionRepository().findPrimaryConnection(Facebook.class);
//        List<Post> posts = new ArrayList(connection.getApi().feedOperations().getPosts());
//        
//        model.addAttribute("feed", posts);
//        System.out.println(posts);
//        System.out.println(mapper.writeValueAsString(posts));
//        //ff
//        return mapper.writeValueAsString(posts);
//    }
}
