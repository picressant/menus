package com.choupiteam.menus.back.application;

import org.glassfish.jersey.server.ResourceConfig;

public class MenusApplication extends ResourceConfig {
    public MenusApplication() {
        // Define the package which contains the service classes.
        packages("com.choupiteam.menus.back.services");
    }
}