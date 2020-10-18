package fr.choupiteam.menus.infrastructure.repository;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.recipe.model.Recipe;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.infrastructure.repository.custom.PageableRepository;
import org.apache.catalina.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationUserRepository extends MongoRepository<ApplicationUser, String>, PageableRepository<ApplicationUser> {
    ApplicationUser findByUsername(String username);
    Optional<ApplicationUser> findByGoogleId(String googleId);

    List<ApplicationUser> findAllByGroup(Group group);
}
