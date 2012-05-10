package wad.spring.service;

import org.junit.*;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
public class UserServiceTest {
    
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
        userRepository.deleteAll();
    }
    
    @Autowired
    UserService userService;
    
    @Autowired
    UserRepository userRepository;

    @Test
    public void createIncrementsElementCountByOne() {
        long countAtStart = userRepository.count();

        User u = new User();
        u.setUsername("Matti");
        userService.addUser(u);  
        long countAtEnd = userRepository.count();      
        Assert.assertTrue("User count should be increased by one when adding an element.",
                countAtStart + 1 == countAtEnd);
    }
    
    @Test
    public void removeDecrementsElementCountByOne() {

        User temp = new User();
        temp.setUsername("Pekka");
        User u = userService.addUser(temp);
        long countAtStart = userRepository.count();
        userService.removeUser(u);
        long countAtEnd = userRepository.count();
        Assert.assertTrue("User count should be increased by one when adding an element.",
                countAtStart - 1 == countAtEnd);
    }
    
    @Test
    public void getUsersReturnsCorrectCount() {
        
        User u = new User();
        u.setUsername("Testi");
        userService.addUser(u);

        long countAtEnd = userRepository.count();
        Assert.assertTrue("User count should be increased by one when adding an element.",
                userService.getUsers().size() == countAtEnd);
    }
    
    @Test
    public void getUserReturnsCorrectUser() {
        
        User temp = new User();
        temp.setUsername("Test");
        User u = userService.addUser(temp);

        Assert.assertTrue("getUser should return correct id.",
                userService.getUser("Test").getId() == u.getId());
    }
    
    @Test
    public void updateProfileUpdatesUserinfo() {
        
        User temp = new User();
        temp.setUsername("Test");
        temp.setPassword("this");
        User u = userService.addUser(temp);
        
        User temp2 = new User();
        temp2.setUsername("Test2");
        temp2.setPassword("that");
        userService.updateProfile(temp2, u.getUsername());
        
        Assert.assertTrue("updateProfile doesn't update user info.",
                userService.getUser(u.getUsername()).getPassword() == temp2.getPassword());
    }
    
    @Test
    public void getUsernameReturnsNullWhenNotAuthorized() {
        
        Assert.assertTrue("getUser should return null if not authorized.",
                userService.getLoggedInUsername() == null);
    }
    
    @Test
    public void getLoggedInUsernameReturnsCorrectNameWhenAuthorized() {
        
        User temp = new User();
        temp.setUsername("Test");
        temp.setPassword("this");
        User u = userService.addUser(temp);
        
        //Log user in
        Authentication auth = new UsernamePasswordAuthenticationToken(u.getUsername(), u.getPassword());       
        SecurityContextHolder.getContext().setAuthentication(auth);
        
        Assert.assertTrue("getUser should return correct name when authorized.",
                userService.getLoggedInUsername() == "Test");
    }
}
