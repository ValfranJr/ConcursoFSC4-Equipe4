"use client";

import { ChevronLeft, Edit2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Components reutilizáveis
import { UserPointsCard } from "@/app/components/UserPointsCard";
import { BottomNavigationBar } from "@/app/components/BottomNavigationBar";
import { ProfileStatsCard } from "@/app/components/profile/ProfileStatsCard";
import { AchievementCard } from "@/app/components/profile/AchievementCard";
import { ProfileChart } from "@/app/components/profile/ProfileChart";

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
  return (
    <div className="flex flex-col min-h-screen items-center p-4 bg-gradient-to-br from-[#6a0dad] to-[#4b0082] text-white4">
      {/* Container principal para conteúdo*/}
      <header className="flex items-center justify-between w-full max-w-2xl px-2 py-4 relative">
        <Link
          href="/frontend/home"
          className="text-white hover:text-gray-300 transition-colors"
          passHref
        >
          <ChevronLeft size={36} className="cursor-pointer" />
        </Link>
        <h1 className="text-4xl font-bold text-white flex-grow text-center">
          Perfil
        </h1>
        <div className="absolute top-4 right-4">
          <UserPointsCard
            points={mockUser.score}
            badgeUrl={mockUser.badgeUrl}
          />
        </div>
      </header>

      {/* Conteúdo do perfil */}
      <div className="w-full max-w-2xl rounded-2xl p-6 mb-8 mt-4">
        <main className="flex flex-col items-center">
          {/* Sessão superior do perfil */}
          <section className="flex flex-col items-center mb-8 w-full max-w-sm">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={mockUser.avatarUrl}
                alt="Avatar do usuário"
                fill
                className="rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
                <Edit2 size={20} />
              </button>
            </div>
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold">{mockUser.name}</h2>
              <p className="text-lg text-white/80">{mockUser.username}</p>
            </div>
          </section>

          {/* Estatísticas do usuário */}
          <section className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-white/20 w-full max-w-lg mb-8">
            {/* Será o componente ProfileStatsCard */}
            <div className="flex justify-around">
              <ProfileStatsCard
                label="Quizzie"
                value={mockUser.quizzies.toString()}
              />
              <ProfileStatsCard
                label="Plays"
                value={mockUser.plays.toString()}
              />
              <ProfileStatsCard label="Rank" value={mockUser.rank.toString()} />
            </div>
          </section>

          {/* Grafico de estatisticas */}
          <section className="w-full max-w-lg mb-8">
              {/* Componente de gráfico - pode usar Chart.js ou Recharts */}
              <div className="w-full max-w-lg mb-8">
                <ProfileChart />
              </div>
          </section>

          {/* Conquistas do usuário */}
          <section className="w-full max-w-lg mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Conquistas</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {mockUser.achievements.map((ach) => (
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

      <BottomNavigationBar />
    </div>
  );
}
