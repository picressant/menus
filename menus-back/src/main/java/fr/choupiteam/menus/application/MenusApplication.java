package fr.choupiteam.menus.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = {"fr.choupiteam.menus"})
@EnableMongoRepositories(basePackages = "fr.choupiteam.menus.infrastructure.repository")
public class MenusApplication {

    public static void main(String[] args) {
        SpringApplication.run(MenusApplication.class, args);
    }

}
