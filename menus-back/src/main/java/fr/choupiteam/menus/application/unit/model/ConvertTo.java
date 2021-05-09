package fr.choupiteam.menus.application.unit.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "convertTo")
public class ConvertTo {

    @Id
    private String id;

    @DBRef
    private Unit unitFrom;

    @DBRef
    private Unit unitTo;

    private float factor;

    public Unit getUnitFrom() {
        return unitFrom;
    }

    public void setUnitFrom(Unit unitFrom) {
        this.unitFrom = unitFrom;
    }

    public Unit getUnitTo() {
        return unitTo;
    }

    public void setUnitTo(Unit unitTo) {
        this.unitTo = unitTo;
    }

    public float getFactor() {
        return factor;
    }

    public void setFactor(float factor) {
        this.factor = factor;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
