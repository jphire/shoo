/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.domain;

import java.util.List;
import org.springframework.social.facebook.api.Post;

/**
 *
 * @author janne
 */
public class FeedList {
    
    private List<Post> posts;

    public FeedList(){}
    
    public FeedList(List<Post> posts) {
        this.posts = posts;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
    
    
}
