import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/store/authStore';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.usuario);
  const token = useAuthStore((state) => state.token);

  if (user && token) {
    navigate('/dashboard', { replace: true });
  }

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h1>Iniciar sesión (Mock)</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
};
