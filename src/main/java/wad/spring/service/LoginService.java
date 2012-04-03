package wad.spring.service;

import wad.spring.domain.User;

public interface LoginService {
    
    public void loginUser(User user);
    public String getAccessToken(String address);
}
