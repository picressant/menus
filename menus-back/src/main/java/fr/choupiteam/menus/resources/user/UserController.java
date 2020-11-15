package fr.choupiteam.menus.resources.user;


import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.security.model.ChangePasswordData;
import fr.choupiteam.menus.application.security.model.Privilege;
import fr.choupiteam.menus.application.security.model.Role;
import fr.choupiteam.menus.application.security.service.AuthorizationService;
import fr.choupiteam.menus.application.security.service.UserDetailsServiceImpl;
import fr.choupiteam.menus.infrastructure.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthorizationService authorizationService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    @RequestMapping(path = "/me", method = RequestMethod.GET)
    public ApplicationUser getMe(@AuthenticationPrincipal ApplicationUser user) {
        return user;
    }

    @RequestMapping(value = "/{id}/avatar", method = RequestMethod.POST)
    public void storeAvatar(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        this.checkIsManagerOrSelf(id);
        ApplicationUser u = this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));

        this.userDetailsService.storeAvatar(u, file);
    }

    @GetMapping(path = "/{id}/avatar")
    public ResponseEntity getAvatar(@PathVariable String id) {
        this.checkIsManagerOrSelf(id);
        return this.userDetailsService.getAvatar(id);
    }

    @PostMapping(value = "/list")
    @PreAuthorize("@authorizationService.can('MANAGE_USERS')")
    public Page<ApplicationUser> getUsers(@RequestBody Pager pager) {
        return this.userDetailsService.getUsers(pager);
    }

    @GetMapping(value = "/{id}")
    public ApplicationUser getUser(@PathVariable String id) {
        this.checkIsManagerOrSelf(id);
        return this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));
    }

    @PutMapping()
    public ApplicationUser saveUser(@RequestBody ApplicationUser user) {
        this.checkIsManagerOrSelf(user.getId());
        return this.userDetailsService.saveUserData(user);
    }

    @PutMapping(value = "/{id}/reset-password")
    public void changePassword(@RequestBody ChangePasswordData data, @PathVariable String id) {
        this.checkIsManagerOrSelf(id);
        ApplicationUser user = this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));

        this.userDetailsService.generatePassword(user, data.getPassword());
        this.userDetailsService.saveUser(user);
    }


    @PostMapping()
    @PreAuthorize("@authorizationService.can('MANAGE_USERS')")
    public ApplicationUser createUser(@RequestBody ApplicationUser user) {
        this.userDetailsService.generatePassword(user, user.getUsername());
        return this.userDetailsService.createUser(user);
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("@authorizationService.can('MANAGE_USERS')")
    public void deleteUser(@PathVariable String id) {
        this.userDetailsService.deleteUser(id);
    }

    @PostMapping(value = "/{id}/privileges")
    public ApplicationUser pushUserPrivileges(@PathVariable String id, @RequestBody List<Privilege> privileges) {
        ApplicationUser u = this.userDetailsService.getUser(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur inconnu"));

        return this.userDetailsService.updatePrivileges(u, privileges);
    }

    private void checkIsManagerOrSelf(String id) {
        ApplicationUser connectedUser = (ApplicationUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!id.equals(connectedUser.getId()) && !authorizationService.can(Privilege.MANAGE_USERS.toString())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Vous n'êtes pas autorisé à réaliser cette action");
        }
    }
}
