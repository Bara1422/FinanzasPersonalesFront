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

export const mockUsers: User[] = [
  {
    id_usuario: 1,
    nombre: 'Admin',
    email: 'admin@example.com',
    username: 'admin',
    rol: 'ADMIN',
    created_at: '2023-01-01T00:00:00Z',
  },
  {
    id_usuario: 2,
    nombre: 'María Gómez',
    email: 'maria.gomez@example.com',
    username: 'mariagomez',
    rol: 'USER',
    created_at: '2023-01-01T00:00:00Z',
  },
  {
    id_usuario: 3,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    username: 'carlosrodriguez',
    rol: 'USER',
    created_at: '2023-01-01T00:00:00Z',
  },
];

export const mockUsersWithPassword: UserWithPassword[] = mockUsers.map(
  (user, index) => ({
    ...user,
    password: `password${index + 1}`,
  }),
);
