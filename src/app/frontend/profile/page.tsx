"use client";
import { useState } from "react";
import { Edit2 } from "lucide-react";
import Image from "next/image";

// Components reutilizáveis
import { UserPointsCard } from "@/app/components/UserPointsCard";
import { ProfileStatsCard } from "@/app/components/profile/ProfileStatsCard";
import { AchievementCard } from "@/app/components/profile/AchievementCard";
import { ProfileChart } from "@/app/components/profile/ProfileChart";
import { EditProfileModal } from "@/app/components/profile/EditProfileModal";

// Dados de exemplo para o perfil
const mockUser = {
  name: "David ",
  username: "@david",
  avatarUrl: "https://i.pravatar.cc/150?img=4",
  quizzies: 34,
  plays: 128,
  rank: 4,
  score: 1200,
  badgeUrl: "https://i.pravatar.cc/150?img=4",
  achievements: [
    {
      id: 1,
      title: "Iniciante",
      description: "Complete 10 quizzes",
      icon: "🏆",
    },
    {
      id: 2,
      title: "Intermediário",
      description: "Complete 50 quizzes",
      icon: "🎖️",
    },
    {
      id: 3,
      title: "Avançado",
      description: "Complete 100 quizzes",
      icon: "🥇",
    },
    { id: 4, title: "Mestre", description: "Complete 200 quizzes", icon: "👑" },
    { id: 5, title: "Lenda", description: "Complete 500 quizzes", icon: "🌟" },
    {
      id: 6,
      title: "Desafiante",
      description: "Complete 1000 quizzes",
      icon: "🔥",
    },
  ],
};

export default function ProfilePage() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(mockUser);

  const handleSalveProfile = (updateData: {
    name: string;
    username: string;
  }) => {
    setCurrentUser({ ...currentUser, ...updateData });
  };

  return (
    <>
      <div className="p-4 md:p-8 text-white">
        <div className="w-full max-w-6xl mx-auto">
          <header className="flex items-center justify-between w-full mb-8">
            <h1 className="text-4xl font-bold">Perfil</h1>
            <UserPointsCard
              points={currentUser.score}
              badgeUrl={currentUser.badgeUrl}
            />
          </header>

          {/* AJUSTE: O grid agora quebra para 3 colunas em 'xl' (1280px) em vez de 'lg' */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Coluna da Esquerda: Perfil e Estatísticas */}
            <aside className="xl:col-span-1 flex flex-col gap-8">
              <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border-white/20 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={currentUser.avatarUrl}
                    alt="Avatar do usuário"
                    fill
                    sizes="128px"
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                  <button
                    onClick={() => setEditModalOpen(true)}
                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                </div>
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p className="text-lg text-white/80">{currentUser.username}</p>
              </section>

              <section className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl border-white/20 w-full">
                {/* Container flexível para os cards de estatísticas */}
                <div className="flex justify-around gap-2 sm:gap-4">
                  <ProfileStatsCard
                    label="Quizzes"
                    value={currentUser.quizzies.toString()}
                  />
                  <ProfileStatsCard
                    label="Jogadas"
                    value={currentUser.plays.toString()}
                  />
                  <ProfileStatsCard
                    label="Rank"
                    value={`#${currentUser.rank.toString()}`}
                  />
                </div>
              </section>
            </aside>

            {/* Coluna da Direita: Gráfico e Conquistas */}
            <main className="xl:col-span-2 flex flex-col gap-8">
              <section className="w-full">
                <ProfileChart />
              </section>

              <section className="w-full">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Conquistas
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {currentUser.achievements.map((ach) => (
                      <AchievementCard
                        key={ach.id}
                        iconUrl={ach.icon}
                        value={ach.title}
                        label={ach.description}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/** Renderização do modal aqui */}

      <EditProfileModal
        user={currentUser}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSalveProfile}
      />
    </>
  );
}
