export enum Role {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export function getRoleStringified(role: Role) {
  if (role === Role.ROLE_ADMIN) {
    return 'Administrateur';
  }
  else if (role === Role.ROLE_USER) {
    return 'Utilisateur';
  }
}

export function getAllRoles(): Role[] {
  return [Role.ROLE_ADMIN, Role.ROLE_USER];
}
