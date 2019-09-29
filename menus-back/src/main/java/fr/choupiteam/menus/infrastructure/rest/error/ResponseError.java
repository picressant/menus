package fr.choupiteam.menus.infrastructure.rest.error;

public class ResponseError {
    private String message;
    private Exception e;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Exception getE() {
        return e;
    }

    public void setE(Exception e) {
        this.e = e;
    }
}
