export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id_usuario: number;
  nombre: string;
  password: string;
  email: string;
  username: string;
  rol: UserRole;
  created_at: Date;
  updated_at: Date;
  activo: boolean;
}

export const mockUsers: User[] = [
  {
    id_usuario: 1,
    nombre: 'Admin',
    password: 'admin',
    email: 'admin@example.com',
    username: 'admin',
    rol: 'ADMIN',
    created_at: new Date('2023-01-01T00:00:00Z'),
    updated_at: new Date('2023-01-01T00:00:00Z'),
    activo: true,
  },
  {
    id_usuario: 2,
    nombre: 'María Gómez',
    password: 'hashed_password_example_2',
    email: 'maria.gomez@example.com',
    username: 'mariagomez',
    rol: 'USER',
    created_at: new Date('2023-01-01T00:00:00Z'),
    updated_at: new Date('2023-01-01T00:00:00Z'),
    activo: true,
  },
  {
    id_usuario: 3,
    nombre: 'Carlos Rodríguez',
    password: 'hashed_password_example_3',
    email: 'carlos.rodriguez@example.com',
    username: 'carlosrodriguez',
    rol: 'USER',
    created_at: new Date('2023-01-01T00:00:00Z'),
    updated_at: new Date('2023-01-01T00:00:00Z'),
    activo: true,
  },
];
