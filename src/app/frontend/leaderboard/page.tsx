"use client";

import Link from "next/link";
import { Bot, ChevronLeft } from "lucide-react";
import { LeaderboardTopPlayers } from "@/app/components/leaderboard/LeaderboardTopPlayers";
import { LeaderboardListItem } from "@/app/components/leaderboard/LeaderboardListItem";
import { BottomNavigationBar } from "@/app/components/BottomNavigationBar";
import { UserPointsCard } from "@/app/components/UserPointsCard";

// Dados de exemplo para o ranking. Aqui é adicionado o backend futuramente.
const mockRankingData = [
  {
    id: 1,
    name: "Alice",
    username: "Alice",
    score: 1500,
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob",
    username: "Bob",
    score: 1400,
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Charlie",
    username: "Charlie",
    score: 1300,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "David",
    username: "David",
    score: 1200,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Eve",
    username: "Eve",
    score: 1100,
    avatarUrl: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Frank",
    username: "Frank",
    score: 1000,
    avatarUrl: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Grace",
    username: "Grace",
    score: 900,
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Heidi",
    username: "Heidi",
    score: 800,
    avatarUrl: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    name: "Ivan",
    username: "Ivan",
    score: 700,
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    name: "Judy",
    username: "Judy",
    score: 600,
    avatarUrl: "https://i.pravatar.cc/150?img=10",
  },
  { id: 11,
    name: "Mallory",
    username: "Mallory",
    score: 500,
    avatarUrl: "https://i.pravatar.cc/150?img=11",
  },
  { id: 12,
    name: "Niaj",
    username: "Niaj", 
    score: 400,
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  { id: 13,
    name: "Olivia", 
    username: "Olivia",
    score: 300,
    avatarUrl: "https://i.pravatar.cc/150?img=13",
  },
];

/***
 * Página do ranking de jogadores.
 * Exibe os jogadores mais bem classificados.
 */

export default function LeaderboardPage() {
  // Simular o usuário atual
  const currentUser = {
    id: 4,
    name: "David",
    username: "David",
    score: 1200,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
  };

  // Separa os 3 melhores jogadores
  const topPlayers = mockRankingData.slice(0, 3);
  const otherPlayers = mockRankingData.slice(3);

  // URL de imagens de medalhas
  const medalUrls = [
    "https://cdn-icons-png.flaticon.com/512/2583/2583344.png", // Ouro
    "https://cdn-icons-png.flaticon.com/512/2583/2583345.png", // Prata
    "https://cdn-icons-png.flaticon.com/512/2583/2583346.png", // Bronze
  ];

  return (
    <div className="flex flex-col min-h-screen items-center p-4 bg-gradient-to-br from-[#6a0dad] to-[#4b0082] text-white">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between w-full max-w-2xl px-2 py-4">
        <Link href="/home" passHref>
          <button className="text-white hover:text-gray-300 transition-colors">
            <ChevronLeft size={36} />
          </button>
        </Link>
        <h1 className="text-4xl font-bold flex-grow text-center -ml-8">
          Leaderboard
        </h1>
        <UserPointsCard
          points={currentUser.score}
          badgeUrl={currentUser.avatarUrl}
        />
      </div>

      {/* Conteúdo principal - Container com efeito de blur */}
      <div className="w-full max-w-2xl rounded-2xl p-6 mb-8 mt-4">
        {/* Top 3 Jogadores */}
        <LeaderboardTopPlayers
          first={topPlayers[0]}
          second={topPlayers[1]}
          third={topPlayers[2]}
        />

        {/* Lista dos demais jogadores no ranking */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-white/20">
          <ul className="space-y-4">
            {otherPlayers.map((player) => (
              <LeaderboardListItem
                key={player.id}
                rank={mockRankingData.indexOf(player) + 1}
                name={player.name}
                score={player.score}
                avatarUrl={player.avatarUrl}
                isCurrentUser={player.id === currentUser.id}
              />
            ))}
          </ul>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
}
