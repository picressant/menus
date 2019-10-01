package fr.choupiteam.menus.infrastructure.repository;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import fr.choupiteam.menus.application.recipe.model.Recipe;
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
public class RecipePictureRepository {

    @Autowired
    @Qualifier("recipepictures")
    GridFsTemplate fsTemplate;

    public Optional<String> store(Recipe recipe, InputStream stream, String filename, String contentType) {
        GridFsOperations gridOperations = fsTemplate;

        DBObject metaData = new BasicDBObject();
        metaData.put("recipeId", recipe.getId());

        ObjectId id = gridOperations.store(stream, filename, contentType, metaData);
        return Optional.ofNullable(id).map(ObjectId::toString);

    }

    public Optional<GridFsResource> findForRecipe(String recipeId) {
        GridFsOperations gridOperations = fsTemplate;
        return Optional.ofNullable(gridOperations
                .findOne(new Query(Criteria.where("metadata.recipeId").is(recipeId))))
                .map(gridFSFile -> fsTemplate.getResource(gridFSFile));
    }

    public void removeForRecipe(String recipeId) {
        fsTemplate.delete(new Query(Criteria.where("metadata.recipeId").is(recipeId)));
    }
}
