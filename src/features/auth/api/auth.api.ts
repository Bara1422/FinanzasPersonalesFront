export type RegisterDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string; //ahora se guarda también la contraseña
};

export type AuthResponse = {
  user: Omit<User, 'password'>;
  token: string;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const LS_USER = 'auth:user';
const LS_TOKEN = 'auth:token';

/**
 * Registro mockeado
 **/

export async function register(dto: RegisterDTO): Promise<AuthResponse> {
  await sleep(400);
  const user: User = {
    id: crypto.randomUUID(),
    name: dto.name,
    username: dto.username,
    email: dto.email,
    password: dto.password,
  };
  const token = `mock-${Date.now()}`;

  localStorage.setItem(LS_USER, JSON.stringify(user));
  localStorage.setItem(LS_TOKEN, token);

  const { password, ...publicUser } = user;
  return { user: publicUser, token };
}

/**
 * Login mockeado con validación de email y password
 */
export async function login(dto: LoginDTO): Promise<AuthResponse> {
  await sleep(300);
  const saved = localStorage.getItem(LS_USER);
  if (!saved) throw new Error('Usuario no registrado');

  const user: User = JSON.parse(saved);

  if (user.email !== dto.email) {
    throw new Error('Email no coincide con ningún usuario registrado');
  }
  if (user.password !== dto.password) {
    throw new Error('Contraseña incorrecta');
  }

  const token = `mock-${Date.now()}`;
  localStorage.setItem(LS_TOKEN, token);

  const { password, ...publicUser } = user;
  return { user: publicUser, token };
}

/**
 * Recuperar contraseña (mock)
 */
export async function recoverPassword(email: string): Promise<{ ok: true }> {
  await sleep(400);
  const saved = localStorage.getItem(LS_USER);
  if (!saved) return { ok: true };
  const u: User = JSON.parse(saved);
  if (u.email !== email) throw new Error('No existe un usuario con ese email');
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(LS_TOKEN);
}

export function getSession(): {
  user: Omit<User, 'password'> | null;
  token: string | null;
} {
  const u = localStorage.getItem(LS_USER);
  const t = localStorage.getItem(LS_TOKEN);
  if (!u || !t) return { user: null, token: null };

  const { password, ...publicUser } = JSON.parse(u) as User;
  return { user: publicUser, token: t };
}
