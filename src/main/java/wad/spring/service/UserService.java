package wad.spring.service;

import java.util.List;
import org.springframework.security.access.prepost.PostFilter;
import wad.spring.domain.User;
import org.springframework.security.access.prepost.PreAuthorize;

public interface UserService {

    public User addUser(User user);
    
    public User getUser(String userName);
    
    public void removeUser(User user);
    
    @PreAuthorize("isAuthenticated()")
    public void updateProfile(User user, String userName);
    
    @PreAuthorize("hasRole('admin')")
    public List<User> getUsers();

    @PreAuthorize("isAuthenticated()")
    public String getUsername();

}
