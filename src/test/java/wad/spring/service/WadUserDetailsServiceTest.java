/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.service;

import org.junit.*;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import wad.spring.domain.User;
import wad.spring.repository.UserRepository;

/**
 *
 * @author janne
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring-context-test.xml",
    "classpath:spring-database-test.xml", "classpath:spring-social-test.xml", "classpath:spring-security-test.xml"})
public class WadUserDetailsServiceTest {
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
        SecurityContextHolder.clearContext();
        userRepository.deleteAll();
    }
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    UserService userService;
    
    @Autowired
    UserDetailsService userDetailsService;
    
    @Test
    public void loadByUsernameReturnsCorrectDetails() {
        User temp = new User();
        temp.setUsername("Test");
        temp.setPassword("this");
        User u = userService.addUser(temp);
        
        UserDetails d = userDetailsService.loadUserByUsername("Test");
        
        
        Assert.assertTrue("loadByUserName doesn't return correct details.",
                d.getUsername().equals(u.getUsername()) && d.getPassword().equals(u.getPassword()) && !d.getAuthorities().isEmpty());
    }
    
}

