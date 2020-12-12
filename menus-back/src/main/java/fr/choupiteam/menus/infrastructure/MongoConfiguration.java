package fr.choupiteam.menus.infrastructure;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@Configuration
@PropertySource("classpath:application.properties")
@ConfigurationProperties(prefix = "mongo")
public class MongoConfiguration extends AbstractMongoConfiguration {

    private String dbName;

    private String mongoUri;

    @Bean(name = "userpictures")
    public GridFsTemplate gridFsUser() throws Exception {
        return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter(), "user");
    }

    @Bean(name = "recipepictures")
    public GridFsTemplate gridFsRecipe() throws Exception {
        return new GridFsTemplate(mongoDbFactory(), mappingMongoConverter(), "recipe");
    }

    @Override
    public MongoClient mongoClient() {
        return new MongoClient(new MongoClientURI(this.getMongoUri()));
    }

    @Override
    protected String getDatabaseName() {
        return this.getDbName();
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public String getMongoUri() {
        return mongoUri;
    }

    public void setMongoUri(String mongoUri) {
        this.mongoUri = mongoUri;
    }
}
