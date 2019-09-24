package fr.choupiteam.menus.resources.user;


import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.security.service.UserDetailsServiceImpl;
import fr.choupiteam.menus.infrastructure.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody ApplicationUser user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        applicationUserRepository.save(user);
    }

    @RequestMapping(path = "/me", method = RequestMethod.GET)
    public ApplicationUser getMe() {
        return this.userDetailsService.getCurrentUser();
    }
}
