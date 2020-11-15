package fr.choupiteam.menus.application.security.service;

import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.security.model.Privilege;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    public boolean can(String action) {
        ApplicationUser currentUser = (ApplicationUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return (currentUser.getPrivileges().contains(Privilege.valueOf(action)));
    }
}
