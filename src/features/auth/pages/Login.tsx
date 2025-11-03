import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/Field";
import { login } from "../api/auth.api";
import { validateLogin } from "../utils/validators";
import { Button } from "@/components/ui/button";

type Input = { email: string; password: string };

export default function Login() {
  const nav = useNavigate();
  const [input, setInput] = useState<Input>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Input, string>>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function handleChange<K extends keyof Input>(key: K, e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError(null);
    const e2 = validateLogin(input);
    setErrors(e2);
    if (Object.keys(e2).length) return;
    try {
      setLoading(true);
      await login(input);
      nav("/");
    } catch (err: any) {
      setApiError(err.message ?? "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Iniciar sesión">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Email"
          type="email"
          value={input.email}
          onChange={(e) => handleChange("email", e)}
          error={errors.email}
        />
        <Field
          label="Contraseña"
          type="password"
          value={input.password}
          onChange={(e) => handleChange("password", e)}
          error={errors.password}
        />
        {apiError && <p className="text-sm text-red-600">{apiError}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Ingresando…" : "Ingresar"}
        </Button>

        <div className="text-sm text-center text-muted-foreground">
          <Link to="/forgot" className="text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <p className="text-sm text-center text-muted-foreground">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
