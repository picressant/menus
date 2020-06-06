package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.security.model.ApplicationUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ApplicationUserRepository extends MongoRepository<ApplicationUser, String> {
    ApplicationUser findByUsername(String username);
    Optional<ApplicationUser> findByGoogleId(String googleId);
}
