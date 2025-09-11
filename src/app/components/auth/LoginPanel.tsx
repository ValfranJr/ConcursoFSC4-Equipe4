"use client";

import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Eye, EyeOff, ChevronLeft, Circle } from "lucide-react";
import { useState } from "react";
import { loginSchema } from "@/lib/schemas/auth";
import type * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;

const mockUser = {
  email: "admin@quizz.com",
  password: "123456789",
};

export function LoginPanel() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: Errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (data.email === mockUser.email && data.password === mockUser.password) {
      router.push("/frontend/home");
    } else {
      alert("Email ou senha inválida");
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white  p-4 shadow-sm">
      {/* Voltar */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-200"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Titulo */}
      <h1 className="mb-6 text-center text-3xl font-semibold leading-tight text-neutral-900">
        Entrar no <span className="text-blue-600">Quizz Game</span>
      </h1>
      {/* Avatar */}
      <div className="mb-6 flex justify-center">
        <div className="relative h-20 w-20">
          <Image
            src="/avatar-quizz.png"
            alt="Quizzie Bot Avatar"
            fill
            sizes="80px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm text-neutral-800">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Insira seu email"
            {...register("email")}
            className="h-11 rounded-md border-neutral-200 bg-white/80 placeholder:text-neutral-400"
          />
          {Errors.email && (
            <p className="text-sm text-red-500">{Errors.email.message}</p>
          )}
        </div>

        {/* Senha */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm text-neutral-800">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Insira sua senha"
              {...register("password")}
              className="h-11 rounded-md border-neutral-200 pr-10 placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-600 hover:bg-neutral-100"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            {Errors.password && (
              <p className="text-sm text-red-500">{Errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Lembrar */}
        <div className="flex items-center gap-2 pt-1">
          <Checkbox
            id="remember"
            defaultChecked
            {...register("rememberMe")}
            className="data-[state=checked]:bg-blue-600"
          />
          <Label htmlFor="remember" className="text-[13px] text-neutral-700">
            Lembre-me
          </Label>
        </div>
        {/* Entrar */}
        <Button
          type="submit"
          className="mt-2 h-12 w-full rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Entrar
        </Button>

        {/* Ou */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-neutral-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-neutral-500">Ou</span>
          </div>
        </div>

        {/* Botão Google */}
        <div className="flex items-center justify-center gap-8 py-1">
          <button
            type="button"
            className="flex items-center rounded-full border border-neutral-200 p-2 hover:bg-neutral-200"
            aria-label="Login com Google"
          >
            <Image src="/google.png" alt="Google" width={20} height={20} />
            <span className="ml-2 text-sm font-medium text-neutral-700">
              Login com Google
            </span>
          </button>
        </div>
        <p className="text-center text-sm text-neutral-500">
          Não tem uma conta?{" "}
          <a href="/signup" className="text-blue-600">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
