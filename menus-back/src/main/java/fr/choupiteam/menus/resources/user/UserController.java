package fr.choupiteam.menus.resources.user;


import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.security.model.ChangePasswordData;
import fr.choupiteam.menus.application.security.model.Role;
import fr.choupiteam.menus.application.security.service.UserDetailsServiceImpl;
import fr.choupiteam.menus.infrastructure.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
    public ApplicationUser getMe(@AuthenticationPrincipal ApplicationUser user) {
        return user;
    }

    @RequestMapping(value = "/{id}/avatar", method = RequestMethod.POST)
    public void storeAvatar(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        this.checkIsAdminOrSelf(id);
        ApplicationUser u = this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));

        this.userDetailsService.storeAvatar(u, file);
    }

    @GetMapping(path = "/{id}/avatar")
    public ResponseEntity getAvatar(@PathVariable String id) {
        this.checkIsAdminOrSelf(id);
        return this.userDetailsService.getAvatar(id);
    }

    @GetMapping(value = "/list")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<ApplicationUser> getUsers() {
        return this.userDetailsService.getAllUsers();
    }

    @GetMapping(value = "/{id}")
    public ApplicationUser getUser(@PathVariable String id) {
        this.checkIsAdminOrSelf(id);
        return this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));
    }

    @PutMapping()
    public ApplicationUser saveUser(@RequestBody ApplicationUser user) {
        this.checkIsAdminOrSelf(user.getId());
        return this.userDetailsService.saveUserData(user);
    }

    @PutMapping(value = "/{id}/reset-password")
    public void changePassword(@RequestBody ChangePasswordData data, @PathVariable String id) {
        this.checkIsAdminOrSelf(id);
        ApplicationUser user = this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));

        this.userDetailsService.generatePassword(user, data.getPassword());
        this.userDetailsService.saveUser(user);
    }


    @PostMapping()
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApplicationUser createUser(@RequestBody ApplicationUser user) {
        this.userDetailsService.generatePassword(user, user.getUsername());
        return this.userDetailsService.createUser(user);
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUser(@PathVariable String id) {
        this.userDetailsService.deleteUser(id);
    }

    private void checkIsAdminOrSelf(String id) {
        ApplicationUser connectedUser = (ApplicationUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!id.equals(connectedUser.getId()) && connectedUser.getRole() != Role.ROLE_ADMIN) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vous n'êtes pas autorisé à réaliser cette action");
        }
    }
}
