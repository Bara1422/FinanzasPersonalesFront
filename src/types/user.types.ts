export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  username: string;
  rol: UserRole;
  created_at: Date;
}

export interface UserWithPassword extends User {
  password: string;
}
