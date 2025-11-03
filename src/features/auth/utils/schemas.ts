import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Minimo 2 caracteres"),
    username: z.string().min(3, "Minimo 3 caracteres").regex(/^[a-zA-Z0-9_]+$/, "Sólo letras/números/_"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Minimo 6 caracteres"),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const recoverSchema = z.object({
    email: z.string().email(),
});


export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RecoverInput = z.infer<typeof recoverSchema>;