package fr.choupiteam.menus.application.security.service;

import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.infrastructure.repository.ApplicationUserRepository;
import fr.choupiteam.menus.infrastructure.repository.UserPictureRepository;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static java.util.Collections.emptyList;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private ApplicationUserRepository applicationUserRepository;

    @Autowired
    private UserPictureRepository userPictureRepository;

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private final String DEFAULT_AVATAR_PATH = "defaults/default-avatar.png";

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

    public Optional<ApplicationUser> getUser(String id) {
        return this.applicationUserRepository.findById(id);
    }

    public ApplicationUser saveUser(ApplicationUser user) {
        return this.applicationUserRepository.save(user);
    }

    public ApplicationUser saveUserData(ApplicationUser user) {
        this.getUser(user.getId()).ifPresent(applicationUser -> {
            applicationUser.patch(user);
            this.applicationUserRepository.save(applicationUser);
        });

        return this.getUser(user.getId()).orElse(null);
    }


    public void storeAvatar(ApplicationUser user, MultipartFile avatar) {
        try {
            this.userPictureRepository.removeForUser(user.getId());
            this.userPictureRepository.store(user, avatar.getInputStream(), avatar.getOriginalFilename(), avatar.getContentType());
        }
        catch (IOException e) {
            log.error(e.getMessage(), e.getCause());
        }
    }

    /**
     * Finds an avatar for the given user
     *
     * @param userId User's id to search
     * @return The file's table of byte
     */
    public ResponseEntity getAvatar(String userId) {
        return this.userPictureRepository.findForUser(userId).map(gridFsResource -> {
            try {
                byte[] data = IOUtils.toByteArray(gridFsResource.getInputStream());
                return ResponseEntity
                        .ok()
                        .contentType(MediaType.valueOf(gridFsResource.getContentType()))
                        .body(data);
            }
            catch (IOException e) {
                log.error(e.getMessage(), e.getCause());
                return getDefaultAvatar();
            }
        }).orElse(getDefaultAvatar());
    }

    /**
     * Finds the default avatar and returns the table of byte
     *
     * @return Table of byte
     */
    private ResponseEntity getDefaultAvatar() {
        try {
            byte[] data = IOUtils.toByteArray(new ClassPathResource(DEFAULT_AVATAR_PATH).getInputStream());
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(data);
        }
        catch (IOException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public List<ApplicationUser> getAllUsers() {
        return this.applicationUserRepository.findAll();
    }

    public ApplicationUser createUser(ApplicationUser user) {
        return this.applicationUserRepository.insert(user);
    }
}
