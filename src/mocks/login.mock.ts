import { mockUsersWithPassword } from './user.mock';

export const loginMock = (email: string, password: string) => {
  const user = mockUsersWithPassword.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const token = btoa(`${user.id_usuario}:${user.rol}`);
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};
