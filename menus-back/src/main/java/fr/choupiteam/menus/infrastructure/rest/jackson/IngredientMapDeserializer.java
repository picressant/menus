package fr.choupiteam.menus.infrastructure.rest.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class IngredientMapDeserializer extends JsonDeserializer<Map<String, Integer>> {
    @Override
    public Map<String, Integer> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {

        Map<String, Integer> map = new HashMap<>();

        while (!(p.getCurrentToken() == JsonToken.END_ARRAY)) {
            if (p.getCurrentToken() == JsonToken.START_OBJECT) {
                String id = "";
                int quantity = 0;

                while (!(p.getCurrentToken() == JsonToken.END_OBJECT)) {

                    if (p.getCurrentToken().isScalarValue()) {
                        if (p.currentName().equals("id")) {
                            id = p.getValueAsString();
                        }
                        if (p.currentName().equals("quantity"))
                            p.getIntValue();
                    }
                    p.nextToken();


                }

                if (!id.equals(""))
                    map.put(id, quantity);

                p.nextToken();


            }
            else
                p.nextToken();
        }

        return map;

    }

}
