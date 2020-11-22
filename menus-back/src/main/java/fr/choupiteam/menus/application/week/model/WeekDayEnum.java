package fr.choupiteam.menus.application.week.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum WeekDayEnum {
    MONDAY_BREAKFAST(0),
    MONDAY_LUNCH(1),
    MONDAY_DINNER(2),
    TUESDAY_BREAKFAST(3),
    TUESDAY_LUNCH(4),
    TUESDAY_DINNER(5),
    WEDNESDAY_BREAKFAST(6),
    WEDNESDAY_LUNCH(7),
    WEDNESDAY_DINNER(8),
    THURSDAY_BREAKFAST(9),
    THURSDAY_LUNCH(10),
    THURSDAY_DINNER(11),
    FRIDAY_BREAKFAST(12),
    FRIDAY_LUNCH(13),
    FRIDAY_DINNER(14),
    SATURDAY_BREAKFAST(15),
    SATURDAY_LUNCH(16),
    SATURDAY_DINNER(17),
    SUNDAY_BREAKFAST(18),
    SUNDAY_LUNCH(19),
    SUNDAY_DINNER(20);


    private final int value;

    private WeekDayEnum(int value) {
        this.value = value;
    }

    @JsonValue
    public int getValue() {
        return this.value;
    }
}
