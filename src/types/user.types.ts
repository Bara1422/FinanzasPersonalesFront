export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  username: string;
  rol: UserRole;
  created_at: string;
}

export interface UserWithPassword extends User {
  password: string;
}
