package fr.choupiteam.menus.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages = {"fr.choupiteam.menus"})
@EnableMongoRepositories(basePackages = "fr.choupiteam.menus.infrastructure.repository")
public class MenusApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(MenusApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(MenusApplication.class);
    }
}
