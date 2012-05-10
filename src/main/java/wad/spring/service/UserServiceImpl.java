/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wad.spring.domain.Role;
import wad.spring.domain.User;
import wad.spring.repository.UserRepository;

/**
 *
 * @author janne
 */
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    
    @Override
    @Transactional
    public User addUser(User user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser = userRepository.save(newUser);

        List<Role> roles = new ArrayList();

        Role role = new Role();
        role.setRolename("ROLE_USER");
        roles.add(role);
        
        newUser.setRoles(roles);
        return newUser;
    }

    @Override
    @Transactional
    public void removeUser(User user) {
        
        userRepository.delete(user.getId());
    }
    
    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    
    @Override
    public User getUser(String userName){
        
        return userRepository.findByUsername(userName);
    }
    
    @Override
    @Transactional
    public void updateProfile(User user, String userName) {
        
        User newUser = userRepository.findByUsername(userName);
        newUser.setPassword(user.getPassword());
        
        userRepository.save(newUser);
        
    }
    
    public String getUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return null;
        }
        return auth.getName();
    }

}
