package fr.choupiteam.menus.infrastructure.rest.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.data.domain.Sort;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class SortOrderArrayDeserializer extends JsonDeserializer<List<Sort.Order>> {

    @Override
    public List<Sort.Order> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {

        List<Sort.Order> orders = new ArrayList<>();

        while (!(p.getCurrentToken() == JsonToken.END_ARRAY)) {

            if (p.getCurrentToken() == JsonToken.START_OBJECT && p.getCurrentName() == null) {
                //In one sort
                String property = "";
                Sort.Direction direction = null;

                while (!(p.getCurrentName() == null && p.getCurrentToken() == JsonToken.END_OBJECT)) {
                    if (p.getCurrentToken().isScalarValue()) {
                        if (p.currentName().equals("property")) {
                            property = p.getValueAsString();
                        }
                        else if (p.currentName().equals("direction")) {
                            if (! p.getValueAsString().equals("NONE")) {
                                direction = Sort.Direction.fromString(p.getValueAsString());
                            }
                        }
                    }

                    p.nextToken();
                }

                if (direction != null && property != null) {
                    orders.add(new Sort.Order(direction, property));//.ignoreCase());
                }
            }

            p.nextToken();

        }

        return orders;
    }
}
