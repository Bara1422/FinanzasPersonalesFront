import { Link } from 'react-router';
import { RegisterFormData } from '@/features/auth/register/RegisterFormData';
import AuthLayout from '../features/auth/components/AuthLayout';

export default function Register() {
  return (
    <AuthLayout title="Crear cuenta">
      <RegisterFormData />

      <p className="text-sm text-center text-muted-foreground">
        ¿Ya tenés cuenta?{' '}
        <Link to="/login" className="text-primary hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </AuthLayout>
  );
}
