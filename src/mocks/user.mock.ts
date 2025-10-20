export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id_usuario: number;
  nombre: string;
  password_hash: string;
  email: string;
  username: string;
  rol: UserRole;
  created_at: Date;
  updated_at: Date;
  activo: boolean;
}

export const mockUser: User = {
  id_usuario: 1,
  nombre: 'Juan Pérez',
  password_hash: 'hashed_password_example',
  email: 'juan.perez@example.com',
  username: 'juanperez',
  rol: 'USER',
  created_at: new Date('2023-01-01T00:00:00Z'),
  updated_at: new Date('2023-01-01T00:00:00Z'),
  activo: true,
};
