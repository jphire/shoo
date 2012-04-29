/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package wad.spring.controller;

import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.web.servlet.view.RedirectView;

/**
 *
 * @author janne
 *
 * This class is implemented so that the standard url-mapping of
 * ConnectController can be customized. We are only redirecting to the
 * all-connections-page after connecting or disconnecting to a serviceprovider.
 */
public class CustomConnectController extends ConnectController {

    @javax.inject.Inject
    public CustomConnectController(
            ConnectionFactoryLocator connectionFactoryLocator,
            ConnectionRepository connectionRepository) {
        super(connectionFactoryLocator, connectionRepository);
    }

    @Override
    protected String connectedView(String providerId) {
        return "redirect:/" + getViewPath();
    }

    @Override
    protected String connectView(String providerId) {
        return "redirect:/" + getViewPath();
    }

    private String getViewPath() {
        return "connect/";
    }
}
