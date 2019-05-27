export enum IngredientUnit {
    GRAMME,
    KILOGRAMME,
    LITRE,
    MILILITRE
}

export function ingredientUnitToString(unit: IngredientUnit) {
    switch(unit) {
        case IngredientUnit.GRAMME: return "g";
        case IngredientUnit.KILOGRAMME: return "kg";
        case IngredientUnit.LITRE: return "l";
        case IngredientUnit.MILILITRE: return "ml";
    }
}