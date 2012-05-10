package wad.spring.controller;

import java.nio.charset.Charset;
import org.apache.commons.lang.CharSet;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.server.MockMvc;
import org.springframework.test.web.server.request.MockMvcRequestBuilders;
import org.springframework.test.web.server.result.MockMvcResultMatchers;
import org.springframework.test.web.server.setup.MockMvcBuilders;
import wad.spring.domain.User;
import wad.spring.repository.UserRepository;
import wad.spring.service.SignInUtil;
import wad.spring.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:spring-context-test.xml",
    "classpath:spring-database-test.xml", "classpath:spring-social-test.xml", "classpath:spring-security-test.xml"})
@ActiveProfiles("dev")
public class MainControllerTest {
    
    @Autowired
    UserService userService;
    
    @Autowired
    UserRepository userRepository;

    MockMvc mockMvc;
    
    @Before
    public void setup() {
        String[] contextLoc = {"classpath:spring-context-test.xml",
    "classpath:spring-database-test.xml", "classpath:spring-social-test.xml", "classpath:spring-security-test.xml"};
        String warDir = "src/main/webapp";
        mockMvc = MockMvcBuilders.xmlConfigSetup(contextLoc).
                configureWebAppRootDir(warDir, false).build();
    }
    
    @After
    public void tearDown() {
        SecurityContextHolder.clearContext();
        userRepository.deleteAll();
    }
    
    @Test
    public void requestToHome() throws Exception {
        
        User temp = new User();
        temp.setUsername("Test");
        temp.setPassword("this");
        User u = userService.addUser(temp);
        
        //Log user in
        SignInUtil.signin(u);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/home")).
                andExpect(MockMvcResultMatchers.status().isOk()).
                andExpect(MockMvcResultMatchers.forwardedUrl("/WEB-INF/view/home.jsp")).
                andExpect(MockMvcResultMatchers.model().size(1)).
                andExpect(MockMvcResultMatchers.model().attributeExists("userName"));       
    }
    
    @Test
    public void requestToAny() throws Exception {
        
        User temp = new User();
        temp.setUsername("Test");
        temp.setPassword("this");
        User u = userService.addUser(temp);
        
        //Log user in
        SignInUtil.signin(u);
        
        mockMvc.perform(MockMvcRequestBuilders.get("/arbitraryfooo")).
                andExpect(MockMvcResultMatchers.redirectedUrl("/home"));     
    }
    
}