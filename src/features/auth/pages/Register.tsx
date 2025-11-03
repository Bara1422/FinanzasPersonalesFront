import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import Field from '../components/Field';
import { register as apiRegister } from '../api/auth.api';
import { validateRegister } from '../utils/validators';
import { Button } from '@/components/ui/button';

type Input = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const nav = useNavigate();
  const [input, setInput] = useState<Input>({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Input, string>>>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function handleChange<K extends keyof Input>(
    key: K,
    e: ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;
    setInput((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError(null);
    const validation = validateRegister(input);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    try {
      setLoading(true);
      await apiRegister(input);
      nav('/');
    } catch (err: any) {
      setApiError(err.message ?? 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Nombre"
          value={input.name}
          onChange={(e) => handleChange('name', e)}
          error={errors.name}
        />
        <Field
          label="Usuario"
          value={input.username}
          onChange={(e) => handleChange('username', e)}
          error={errors.username}
        />
        <Field
          label="Email"
          type="email"
          value={input.email}
          onChange={(e) => handleChange('email', e)}
          error={errors.email}
        />
        <Field
          label="Contraseña"
          type="password"
          value={input.password}
          onChange={(e) => handleChange('password', e)}
          error={errors.password}
        />

        {apiError && <p className="text-sm text-red-600">{apiError}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creando…' : 'Crear cuenta'}
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
