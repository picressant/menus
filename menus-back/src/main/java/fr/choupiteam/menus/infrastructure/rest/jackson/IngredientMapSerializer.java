package fr.choupiteam.menus.infrastructure.rest.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import fr.choupiteam.menus.application.ingredient.model.Ingredient;
import fr.choupiteam.menus.application.ingredient.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class IngredientMapSerializer extends JsonSerializer<Map<String, Integer>> {

    private ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private IngredientService ingredientService;

    @Override
    public void serialize(Map<String, Integer> value,
                          JsonGenerator gen,
                          SerializerProvider serializers)
            throws IOException {

        gen.writeStartArray();
        AtomicInteger count = new AtomicInteger(0);
        value.forEach((id, quantity) -> {
            try {
                count.getAndIncrement();
                Ingredient ingredient = this.ingredientService.getIngredient(id);
                if (ingredient != null) {
                    gen.writeStartObject();
                    gen.writeStringField("id", ingredient.getId());
                    gen.writeStringField("name", ingredient.getName());
                    gen.writeStringField("unit", ingredient.getUnit().toString());
                    gen.writeNumberField("quantity", quantity);
                    gen.writeEndObject();
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
        });

        gen.writeEndArray();
    }

}
