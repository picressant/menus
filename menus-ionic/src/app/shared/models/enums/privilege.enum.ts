export enum Privilege {
    MANAGE_INGREDIENTS = "MANAGE_INGREDIENTS",
    MANAGE_USERS = "MANAGE_USERS",
    DELETE_RECIPE = "DELETE_RECIPE",
    DELETE_SIDE = "DELETE_SIDE"
}

export function getAllPrivileges(): Privilege[] {
    return [Privilege.MANAGE_INGREDIENTS, Privilege.MANAGE_USERS, Privilege.DELETE_RECIPE, Privilege.DELETE_SIDE];
}
