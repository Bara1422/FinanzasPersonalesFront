//TODO: implementar ruta en back
/* import { type FormEvent, useState } from 'react';
import { Link } from 'react-router';
import { FieldFormController } from '@/components/forms/FieldFormController';
import { Button } from '@/components/ui/button';
import AuthLayout from '../features/auth/components/AuthLayout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return;
    }
    try {
      setLoading(true);
      await recoverPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message ?? 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Recuperar contraseña">
      {sent ? (
        <div className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Si el email existe, te enviamos las instrucciones para recuperar la
            contraseña.
          </p>
          <Link to="/login" className="text-primary hover:underline">
            Volver a iniciar sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <FieldFormController
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ?? undefined}
          />
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ?? undefined}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Enviando…' : 'Enviar instrucciones'}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">
              Volver
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
 */
