export enum MealDay {
    MONDAY_BREAKFAST = 0,
    MONDAY_LUNCH = 1,
    MONDAY_DINNER = 2,
    TUESDAY_BREAKFAST = 3,
    TUESDAY_LUNCH = 4,
    TUESDAY_DINNER = 5,
    WEDNESDAY_BREAKFAST = 6,
    WEDNESDAY_LUNCH = 7,
    WEDNESDAY_DINNER = 8,
    THURSDAY_BREAKFAST = 9,
    THURSDAY_LUNCH = 10,
    THURSDAY_DINNER = 11,
    FRIDAY_BREAKFAST = 12,
    FRIDAY_LUNCH = 13,
    FRIDAY_DINNER = 14,
    SATURDAY_BREAKFAST = 15,
    SATURDAY_LUNCH = 16,
    SATURDAY_DINNER = 17,
    SUNDAY_BREAKFAST = 18,
    SUNDAY_LUNCH = 19,
    SUNDAY_DINNER = 20
}

export function getMealDayStringified(value: number): string {
    switch (value) {
        case 0:
            return "Lundi matin";
        case 1:
            return "Lundi midi";
        case 2:
            return "Lundi soir";
        case 3:
            return "Mardi matin";
        case 4:
            return "Mardi midi";
        case 5:
            return "Mardi soir";
        case 6:
            return "Mercredi matin";
        case 7:
            return "Mercredi midi";
        case 8:
            return "Mercredi soir";
        case 9:
            return "Jeudi matin";
        case 10:
            return "Jeudi midi";
        case 11:
            return "Jeudi soir";
        case 12:
            return "Vendredi matin";
        case 13:
            return "Vendredi midi";
        case 14:
            return "Vendredi soir";
        case 15:
            return "Samedi matin";
        case 16:
            return "Samedi midi";
        case 17:
            return "Samedi soir";
        case 18:
            return "Dimanche matin";
        case 19:
            return "Dimanche midi";
        case 20:
            return "Dimanche soir";
    }
}
