import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { LoginFormData } from '@/features/auth/login/LoginFormData';
import { useAuthStore } from '@/store/authStore';
import AuthLayout from '../features/auth/components/AuthLayout';

export default function Login() {
  const nav = useNavigate();

  const {  usuario, token } = useAuthStore();

  useEffect(() => {
    if (usuario || token) {
      nav('/dashboard');
    }
  }, [usuario, token, nav]);

  return (
    <AuthLayout title="Iniciar sesión">
      <LoginFormData />
      <div className="text-sm text-center text-muted-foreground">
        <Link to="/forgot" className="text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <p className="text-sm text-center text-muted-foreground">
        ¿No tenés cuenta?{' '}
        <Link to="/register" className="text-primary hover:underline">
          Registrate
        </Link>
      </p>
    </AuthLayout>
  );
}
