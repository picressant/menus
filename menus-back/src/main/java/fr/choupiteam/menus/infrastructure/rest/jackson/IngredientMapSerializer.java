package fr.choupiteam.menus.infrastructure.rest.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class IngredientMapSerializer extends JsonSerializer<Map<String, Float>> {

    @Autowired
    private IngredientService ingredientService;

    @Override
    public void serialize(Map<String, Float> value,
                          JsonGenerator gen,
                          SerializerProvider serializers)
            throws IOException {

        gen.writeStartArray();
        for (Map.Entry<String, Float> entry : value.entrySet()) {
            try {
                String id = entry.getKey();
                Float quantity = entry.getValue();
                Ingredient ingredient = this.ingredientService.getIngredient(id);
                if (ingredient != null) {
                    gen.writeStartObject();
                    gen.writeObjectField("ingredient", ingredient);
                    gen.writeNumberField("quantity", quantity);
                    gen.writeEndObject();
                }

            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }

        gen.writeEndArray();
    }

}
