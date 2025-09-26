"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";

// Definimos os tipos para as props do nosso componente
interface UserData {
  name: string;
  username: string;
  avatarUrl: string;
}

interface EditProfileModalProps {
  user: UserData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updateUser: Omit<UserData, "avatarUrl">) => void;
}

export function EditProfileModal({
  user,
  isOpen,
  onClose,
  onSave,
}: EditProfileModalProps) {
  // Estados para controlar os valores dos inputs do formulário
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);

  useEffect(() => {
    if(isOpen) {
      setName(user.name);
      setUsername(user.username);
    }
  }, [isOpen, user]);

  // Função para lidar com o salvamento (por enquanto, apenas exibe no console)
  const handleSaveChanges = () => {
    console.log("Salvando alterações:", { name, username });
    onSave({ name, username });
    onClose(); // Fecha o modal após salvar
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-purple-500 text-white rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Editar Perfil
          </DialogTitle>
        </DialogHeader>

        {/* Corpo do Modal com o Formulário */}
        <div className="flex flex-col items-center gap-6 py-4">
          {/* Seção do Avatar */}
          <div className="relative w-28 h-28">
            <Image
              src={user.avatarUrl}
              alt="Avatar do usuário"
              fill
              sizes="112px"
              className="rounded-full border-4 border-purple-400"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700"
            >
              <Camera size={20} />
              {/* O input de arquivo fica escondido, a label que o ativa */}
              <input id="avatar-upload" type="file" className="hidden" />
            </label>
          </div>

          {/* Campos do Formulário */}
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/20 focus:border-purple-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/10 border-white/20 focus:border-purple-400"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          {/* Usamos DialogClose para o botão de cancelar fechar o modal automaticamente */}
          <DialogClose asChild>
            <Button
              variant="outline"
              className="text-black/80 bg-white/90 border-white/20 hover:bg-white/10"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            onClick={handleSaveChanges}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
