import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .email("Por favor, insira um email válido")
    .min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(12, "A senha deve ter no máximo 12 caracteres"),
  rememberMe: z.boolean().optional(),
});

export const SignupFormData = z
  .object({
    username: z
      .string()
      .min(2, "O nome deve ter no mínimo 2 caracteres")
      .max(50, "O nome deve ter no máximo 50 caracteres"),
    email: z
      .email("Por favor, insira um email válido")
      .min(1, "Email é obrigatório"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um número"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .email("Por favor, insira um email válido")
    .min(1, "Email é obrigatório"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula e um número"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

// Tipos TypeScript derivados dos schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof SignupFormData>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
