package wad.spring.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
//import org.apache.http.HttpResponse;
//import org.apache.http.client.methods.HttpGet;
//import org.apache.http.impl.client.DefaultHttpClient;

@Service
public class LoginServiceImpl implements LoginService {

    
    private String getResponseBody(String url) {
//        DefaultHttpClient httpclient = new DefaultHttpClient();
//        HttpGet httpget = new HttpGet(url);
//        try {
//            HttpResponse response = httpclient.execute(httpget);
//            return readInputStream(response.getEntity().getContent());
//        } catch (IOException ex) {
//            Logger.getLogger(LoginServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
//        }

        return null;
    }

    private String readInputStream(InputStream is) {
        StringBuilder sb = new StringBuilder();
        Scanner sc = new Scanner(is);
        while (sc.hasNextLine()) {
            sb.append(sc.nextLine()).append("\n");
        }

        return sb.toString();
    }
    
    @Override
    public String getAccessToken(String address) {
        
        String s = getResponseBody(address);
//        s = s.trim();
        
//        int i = Integer.parseInt(s);
        
        return s;
    }  
}
