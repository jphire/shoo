/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.service;

import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.web.ProviderSignInUtils;
import wad.spring.domain.User;

/**
 *
 * @author janne
 */
public class SignInUtil {

    /**
     * Programmatically signs in the user with the given the user ID.
     */
    public static void signin(User user) {
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());       
        SecurityContextHolder.getContext().setAuthentication(auth);
        //SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(userId, password));
    }
}
