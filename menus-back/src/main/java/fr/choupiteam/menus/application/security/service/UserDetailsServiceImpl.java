package fr.choupiteam.menus.application.security.service;

import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.infrastructure.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import static java.util.Collections.emptyList;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostConstruct
    public void init() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public void generatePassword(ApplicationUser user, String password) {
        user.setPassword(this.bCryptPasswordEncoder.encode(password));
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser applicationUser = applicationUserRepository.findByUsername(username);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(applicationUser.getUsername(), applicationUser.getPassword(), emptyList());
    }

    public ApplicationUser getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return applicationUserRepository.findByUsername((String) auth.getPrincipal());
    }

    public ApplicationUser getUser(String id) {
        return this.applicationUserRepository.findById(id).get();
    }

    public void saveUser(ApplicationUser user) {
        this.applicationUserRepository.save(user);
    }
}