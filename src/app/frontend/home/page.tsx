// /src/app/frontend/home/page.tsx
"use client";

import { HomeCard } from "@/app/components/home/HomeCard";
import { RankingSnapshot } from "@/app/components/home/RankingSnapshot";
import { Swords, User } from "lucide-react";
import { ProfileStatsCard } from "@/app/components/profile/ProfileStatsCard";

const mockRankingData = [
  { id: 1, name: "Alice", username: "@alice", avatarUrl: "https://i.pravatar.cc/150?img=1", score: 1500, quizzies: 50, plays: 200, rank: 1 },
  { id: 2, name: "Bob", username: "@bob", avatarUrl: "https://i.pravatar.cc/150?img=2", score: 1400, quizzies: 45, plays: 180, rank: 2 },
  { id: 3, name: "Charlie", username: "@charlie", avatarUrl: "https://i.pravatar.cc/150?img=3", score: 1300, quizzies: 40, plays: 160, rank: 3 },
  { id: 4, name: "David", username: "@david", avatarUrl: "https://i.pravatar.cc/150?img=4", score: 1200, quizzies: 34, plays: 128, rank: 4 },
  { id: 5, name: "Eve", username: "@eve", avatarUrl: "https://i.pravatar.cc/150?img=5", score: 1100, quizzies: 30, plays: 110, rank: 5 },
];

const currentUserId = 4;
const currentUser = mockRankingData.find((user) => user.id === currentUserId)!;

export default function HomePage() {
  const topPlayers = mockRankingData.slice(0, 3);

  return (
    <div className="p-4 md:p-8 text-white">
      <div className="w-full max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Bem-vindo, {currentUser.name}!</h1>
          <p className="text-lg text-white/80">Pronto para um novo desafio?</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* A coluna principal agora ocupa 3 de 5 colunas (60%) */}
          <main className="lg:col-span-3 flex flex-col gap-6">
            <HomeCard
              icon={<User className="w-8 h-8 text-cyan-300" />}
              title="Modo Solo"
              description="Teste seus conhecimentos e ganhe pontos."
              href="/frontend/game/solo"
            />
            <HomeCard
              icon={<Swords className="w-8 h-8 text-red-400" />}
              title="Modo Multiplayer"
              description="Desafie seus amigos em uma batalha de conhecimento."
              href="/game/multiplayer"
            />

            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Sua Atividade
              </h3>
              <div className="flex justify-around gap-4">
                <ProfileStatsCard
                  label="Quizzes"
                  value={currentUser.quizzies.toString()}
                />
                <ProfileStatsCard
                  label="Jogadas"
                  value={currentUser.plays.toString()}
                />
                <ProfileStatsCard
                  label="Pontos"
                  value={currentUser.score.toString()}
                />
              </div>
            </div>
          </main>
          
          {/* A coluna secundária agora ocupa 2 de 5 colunas (40%) */}
          <aside className="lg:col-span-2 flex flex-col gap-8 h-full">
            <RankingSnapshot
              topPlayers={topPlayers}
              currentUser={currentUser}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}