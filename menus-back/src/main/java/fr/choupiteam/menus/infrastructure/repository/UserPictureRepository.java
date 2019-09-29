package fr.choupiteam.menus.infrastructure.repository;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Repository;

import java.io.InputStream;
import java.util.Optional;

@Repository
public class UserPictureRepository {

    @Autowired
    @Qualifier("userpictures")
    GridFsTemplate fsTemplate;

    public Optional<String> store(ApplicationUser user, InputStream stream, String filename, String contentType) {
        GridFsOperations gridOperations = fsTemplate;

        DBObject metaData = new BasicDBObject();
        metaData.put("userId", user.getId());

        ObjectId id = gridOperations.store(stream, filename, contentType, metaData);
        return Optional.ofNullable(id).map(ObjectId::toString);

    }

    public Optional<GridFsResource> findForUser(String userId) {
        GridFsOperations gridOperations = fsTemplate;
        return Optional.ofNullable(gridOperations
                .findOne(new Query(Criteria.where("metadata.userId").is(userId))))
                .map(gridFSFile -> fsTemplate.getResource(gridFSFile));
    }

    public void removeForUser(String userId) {
        fsTemplate.delete(new Query(Criteria.where("metadata.userId").is(userId)));
    }
}
