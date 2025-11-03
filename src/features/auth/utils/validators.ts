// Validar formato de email
export function isEmail(x: string) {
  return /\S+@\S+\.\S+/.test(x);
}

// Validar registro
export function validateRegister(i: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const errors: Partial<Record<keyof typeof i, string>> = {};

  if (i.name.trim().length < 2)
    errors.name = "El nombre debe tener al menos 2 caracteres";

  if (!/^[a-zA-Z0-9_]{3,}$/.test(i.username))
    errors.username = "El usuario debe tener al menos 3 caracteres y solo letras/números/_";

  if (!isEmail(i.email))
    errors.email = "Email inválido";

  //Contraseña mínima de 6 caracteres (igual que login)
  if (i.password.trim().length < 6)
    errors.password = "La contraseña debe tener al menos 6 caracteres";

  return errors;
}

// Validar login
export function validateLogin(i: { email: string; password: string }) {
  const errors: Partial<Record<keyof typeof i, string>> = {};

  if (!isEmail(i.email))
    errors.email = "Email inválido";

  if (i.password.trim().length < 6)
    errors.password = "La contraseña debe tener al menos 6 caracteres";

  return errors;
}
