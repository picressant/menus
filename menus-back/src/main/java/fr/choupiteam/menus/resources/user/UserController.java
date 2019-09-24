package fr.choupiteam.menus.resources.user;


import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.security.service.UserDetailsServiceImpl;
import fr.choupiteam.menus.infrastructure.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

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

    @RequestMapping(value = "/{id}/avatar", method = RequestMethod.POST)
    public void storeAvatar(@PathVariable String id, @RequestParam("file") MultipartFile file, @AuthenticationPrincipal UserDetails loggedUser) {
        if (!((ApplicationUser) loggedUser).getId().equals(id))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Non authorisé");

        ApplicationUser u = this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));

        this.userDetailsService.storeAvatar(u, file);
    }

    @GetMapping(path = "/{id}/avatar")
    public ResponseEntity getAvatar(@PathVariable String id) {
        return this.userDetailsService.getAvatar(id);
    }
}
