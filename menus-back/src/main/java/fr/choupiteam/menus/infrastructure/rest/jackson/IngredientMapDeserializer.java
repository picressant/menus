package fr.choupiteam.menus.infrastructure.rest.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class IngredientMapDeserializer extends JsonDeserializer<Map<String, Float>> {
    @Override
    public Map<String, Float> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {

        Map<String, Float> map = new HashMap<>();

        while (!(p.getCurrentToken() == JsonToken.END_ARRAY)) {

            if (p.getCurrentToken() == JsonToken.START_OBJECT && p.getCurrentName() == null) {
                //On est dans ingredients
                String id = "";
                float quantity = 0;

                while (!(p.getCurrentName() == null && p.getCurrentToken() == JsonToken.END_OBJECT)) {
                    if (p.getCurrentName() != null && p.getCurrentName().equals("ingredient") && p.getCurrentToken() == JsonToken.START_OBJECT) {
                        while (!(p.getCurrentToken() == JsonToken.END_OBJECT && p.getCurrentName().equals("ingredient"))) {
                            if (p.getCurrentToken() == JsonToken.START_OBJECT && (p.getCurrentName().equals("unit") || p.getCurrentName().equals("shopSection"))) {
                                while(p.getCurrentToken() != JsonToken.END_OBJECT)
                                    p.nextToken();
                            }
                            else if (p.getCurrentToken().isScalarValue()) {
                                if (p.currentName().equals("id")) {
                                    id = p.getValueAsString();
                                }
                            }

                            p.nextToken();
                        }
                    }

                    if (p.getCurrentToken().isScalarValue()) {
                        if (p.currentName().equals("quantity")) {
                            quantity = Float.parseFloat(p.getValueAsString());
                        }
                    }

                    p.nextToken();
                }

                if (!id.equals(""))
                    map.put(id, quantity);


            }

            p.nextToken();

        }

        return map;

    }

}
