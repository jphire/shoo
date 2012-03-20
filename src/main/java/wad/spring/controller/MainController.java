/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import wad.spring.service.LoginService;

@Controller
public class MainController {

    @Autowired
    private LoginService loginService;

//    @RequestMapping(value = "/home")
//    public String home(Model model) {
//        model.addAttribute("raakaAineet", raakaAineService.listAll());
//        model.addAttribute("reseptit", reseptiService.list());
//        return "redirect:https://www.facebook.com/dialog/oauth?client_id=377679492261871&redirect_uri=http://vivid-samurai-5737.herokuapp.com/";
//    }
    
    @RequestMapping(value = "*")
    public String login(HttpServletRequest request, Model model) {
        if(request.getParameter("code") == null){
            return "redirect:https://www.facebook.com/dialog/oauth?client_id=377679492261871&redirect_uri=http://localhost:8080/shoo/home/";
        }
        else if(request.getParameter("access_token") != null){
            String access_token = request.getParameter("access_token");
            model.addAttribute("access_token", access_token);
            return "home";
        }
        
        else{
            String code = request.getParameter("code");
            String address = "https://graph.facebook.com/oauth/access_token?client_id=377679492261871&redirect_uri=http://localhost:8080/shoo/home/&client_secret=479c9486c41573105ce1fce374c88461&code=" + code;
            String token = loginService.getAccessToken(address);
            model.addAttribute("token", token);
            return "home";
        }
        
    }
}
