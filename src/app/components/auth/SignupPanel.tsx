"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Calendar, ChevronDown, Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { SignupFormData } from "@/lib/schemas/auth";
import { useRouter } from "next/navigation";
import { id } from "zod/v4/locales";
import { get } from "http";

type SignupValues = z.infer<typeof SignupFormData>;

//LocalStorage para armazenar o usuario
function getUsers(): Array<any> {
  if (typeof window !== "undefined") return [];
  try {
    const user = JSON.parse(localStorage.getItem("users") || "[]");
    return user;
  } catch (error) {
    return [];
  }
}

function saveUsers(users: Array<any>) {
  localStorage.setItem("users", JSON.stringify(users));
}

function saveCurrentUser(user: any) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function genId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now());
}

export function SignupPanel() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(SignupFormData),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: SignupValues) => {
    setIsLoading(true);
    const user = getUsers();
    const newUser = {
      id: genId(),
      username: data.username,
      email: data.email,
      password: data.password,
    };
    const nextUser = [...user, newUser];
    saveUsers(nextUser);
    saveCurrentUser({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });

    setIsLoading(false);
    setShowSuccessModal(true);

    // pequeno delay só para o modal aparecer
    setTimeout(() => {
      setShowSuccessModal(false);
      router.push("/frontend/login");
    }, 3000);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col md:items-center md:justify-center md:p-4">
        {/* Cabeçalho */}
        <div className="flex-1 md:flex-none md:w-full md:max-w-md md:bg-white md:rounded-2xl md:shadow-lg md:p-8">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          {/* Conteúdo */}
          <div className="flex-1 px-6">
            {/* Título */}
            <h1 className="text-center text-2xl font-semibold text-gray-900 mb-2">
              Crie uma <span className="text-blue-600">conta</span>
            </h1>
            <div className="mb-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                Por favor, insira seu nome de usuário, email e senha
              </p>
            </div>

            {/* Formulário */}
            <div className="space-y-6">
              {/* Nome de usuário */}
              <div>
                <Label className="text-sm font-medium text-gray-700 block mb-2">
                  Nome de usuário
                </Label>
                <div className="relative">
                  <Input
                    {...register("username")}
                    placeholder="andrew_stanley"
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  {watchedValues.username && !errors.username && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              {/* Email */}
              <div>
                <Label className="text-sm font-medium text-gray-700 block mb-2">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    {...register("email")}
                    placeholder="seu_email@exemplo.com"
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  {watchedValues.email && !errors.email && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* Senha */}
              <div>
                <Label className="text-sm font-medium text-gray-700 block mb-2">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    placeholder="Insira sua senha"
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  {watchedValues.password && !errors.password && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Confirmação da senha */}
              <div>
                <Label className="text-sm font-medium text-gray-700 block mb-2">
                  Confirme a senha
                </Label>
                <div className="relative">
                  <Input
                    {...register("confirmPassword")}
                    placeholder="Confirme sua senha"
                    className="h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  {watchedValues.confirmPassword && !errors.confirmPassword && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Botão de envio */}
              <div className="pt-8">
                <Button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit(onSubmit)}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-full disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "SIGN UP"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de sucesso */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md mx-4 rounded-3xl border-none p-8">
          <div className="text-center space-y-6">
            {/* Animação do ícone do robô */}
            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center relative">
                <div className="w-12 h-12 bg-gray-800 rounded-lg relative">
                  {/* Olhos do robô */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  {/* Boca do robô */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-400 rounded-full"></div>
                </div>
                {/* Animação de pontos flutuantes */}
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
                <div
                  className="absolute -bottom-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Sucesso!
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Por favor, aguarde um momento, estamos preparando-o para você...
              </DialogDescription>
            </div>

            {/* Pontos flutuantes de carregamento */}
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
