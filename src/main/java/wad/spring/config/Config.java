package wad.spring.config;

import javax.inject.Inject;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.jdbc.JdbcUsersConnectionRepository;
import org.springframework.social.connect.support.ConnectionFactoryRegistry;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;

@Configuration
public class Config {

    @Inject
    private DataSource dataSource;
    
    @Inject
    private Environment environment;
    
    @Bean
    public String overrideLog4JErrors() {
        System.setProperty("org.apache.catalina.loader.WebappClassLoader.ENABLE_CLEAR_REFERENCES", "false");
        return "done";
    }
    
    @Bean
	@Scope(value="singleton", proxyMode=ScopedProxyMode.INTERFACES) 
	public ConnectionFactoryLocator connectionFactoryLocator() {
		ConnectionFactoryRegistry registry = new ConnectionFactoryRegistry();
//		registry.addConnectionFactory(new TwitterConnectionFactory(environment.getProperty("P1aA3U1rmTH8VIzFWMEXg"),
//				environment.getProperty("HJ0X2rfUa0vUHa4oyTfiTdLXTsy5I8QdfV4RyiQ8jbQ")));
		registry.addConnectionFactory(new FacebookConnectionFactory("377679492261871",
				"479c9486c41573105ce1fce374c88461"));
//		registry.addConnectionFactory(new LinkedInConnectionFactory(environment.getProperty("linkedin.consumerKey"),
//				environment.getProperty("linkedin.consumerSecret")));
		return registry;
	}
    
    @Bean
    @Scope(value="singleton", proxyMode=ScopedProxyMode.INTERFACES) 
    public UsersConnectionRepository usersConnectionRepository() {
            return new JdbcUsersConnectionRepository(dataSource, connectionFactoryLocator(), Encryptors.noOpText());
    }
    
    @Bean
    @Scope(value="request", proxyMode=ScopedProxyMode.INTERFACES)
    public ConnectionRepository connectionRepository(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new IllegalStateException("Unable to get a ConnectionRepository: no user signed in");
        }
        return usersConnectionRepository().createConnectionRepository(authentication.getName());
    }

    @Bean
    @Scope(value="request", proxyMode=ScopedProxyMode.INTERFACES)	
    public Facebook facebook() {
        Connection<Facebook> facebook = connectionRepository().findPrimaryConnection(Facebook.class);
        return facebook != null ? facebook.getApi() : new FacebookTemplate();
    }
}
