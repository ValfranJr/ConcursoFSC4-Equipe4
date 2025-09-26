import Image from "next/image";
import { Crown, Trophy } from "lucide-react";
import Link from "next/link";

// Tipos para os dados que o componente vai receber
interface Player {
  id: number;
  name: string;
  score: number;
  avatarUrl: string;
}

interface CurrentUser extends Player {
  rank: number;
}

interface RankingSnapshotProps {
  topPlayers: Player[];
  currentUser: CurrentUser;
}

// Ícones para as posições do pódio
const rankIcons = [
  <Crown key={1} className="w-5 h-5 text-yellow-400" fill="currentColor" />,
  <Trophy key={2} className="w-5 h-5 text-gray-300" fill="currentColor" />,
  <Trophy key={3} className="w-5 h-5 text-amber-600" fill="currentColor" />,
];

export const RankingSnapshot = ({
  topPlayers,
  currentUser,
}: RankingSnapshotProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 flex flex-col gap-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Ranking Rápido</h3>
        <Link
          href="/frontend/leaderboard"
          className="text-sm text-cyan-300 hover:underline"
        >
          Ver tudo
        </Link>
      </div>

      {/* Lista do Top 3 */}
      <div className="space-y-4">
        {topPlayers.map((player, index) => (
          <div key={player.id} className="flex items-center gap-3">
            {rankIcons[index]}
            <Image
              src={player.avatarUrl}
              alt={player.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="flex-1 font-semibold text-white truncate">
              {player.name}
            </span>
            <span className="text-sm text-white/80">{player.score} pts</span>
          </div>
        ))}
      </div>

      {/* Divisor */}
      <hr className="border-white/20" />

      {/* Posição do Usuário Atual */}
      <div>
        <h4 className="text-md font-bold text-white/90 mb-3">Sua Posição</h4>
        <div className="flex items-center gap-3 bg-purple-600/50 p-3 rounded-lg">
          <span className="font-bold text-lg w-6 text-center">
            {currentUser.rank}º
          </span>
          <Image
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="flex-1 font-semibold text-white truncate">
            {currentUser.name}
          </span>
          <span className="text-sm text-white/80">{currentUser.score} pts</span>
        </div>
      </div>
    </div>
  );
};
