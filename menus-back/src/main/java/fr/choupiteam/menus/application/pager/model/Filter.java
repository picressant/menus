package fr.choupiteam.menus.application.pager.model;

public class Filter {
    private String property;

    private Object value;

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
