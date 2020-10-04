package fr.choupiteam.menus.application.week.model;

public enum WeekDayEnum {
    MONDAY_LUNCH(0),
    MONDAY_DINNER(1),
    TUESDAY_LUNCH(2),
    TUESDAY_DINNER(3),
    WEDNESDAY_LUNCH(4),
    WEDNESDAY_DINNER(5),
    THURSDAY_LUNCH(6),
    THURSDAY_DINNER(7),
    FRIDAY_LUNCH(8),
    FRIDAY_DINNER(9),
    SATURDAY_LUNCH(10),
    SATURDAY_DINNER(11),
    SUNDAY_LUNCH(12),
    SUNDAY_DINNER(13);

    private final int value;

    private WeekDayEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return this.value;
    }
}
