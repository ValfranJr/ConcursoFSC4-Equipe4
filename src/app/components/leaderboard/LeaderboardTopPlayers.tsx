import Image from "next/image";
import { Crown, Trophy } from "lucide-react";

interface PlayerProps {
  id: number;
  rank?: number;
  name: string;
  username: string;
  score: number;
  avatarUrl: string;
}

interface LeaderboardTopPlayersProps {
  /**
   * O objeto do jogador em 1º lugar.
   */
  first: PlayerProps;
  /**
   * O objeto do jogador em 2º lugar.
   */
  second: PlayerProps;
  /**
   * O objeto do jogador em 3º lugar.
   */
  third: PlayerProps;
}

/**
 * Componente  que exibe os 3 melhores jogadores do ranking em destaque
 * @param {LeaderboardTopPlayersProps} props - As propriedades do componente.
 */
export const LeaderboardTopPlayers = ({
  first,
  second,
  third,
}: LeaderboardTopPlayersProps) => {
  const players = [
    { ...second, rank: 2, medalColor: "text-gray-400" },
    { ...first, rank: 1, medalColor: "text-yellow-400" }, // Corrigido para ouro
    { ...third, rank: 3, medalColor: "text-amber-700" }, // Corrigido: text-amber-700
  ];

  return (
    <div className="flex justify-center items-end space-x-4 mb-8">
      {players.map((player) => (
        <div
          key={player.id}
          className={`relative flex flex-col items-center p-4 rounded-2xl shadow-lg transition-all duration-300 ${
            player.rank === 1 ? "w-40 bg-purple-700" : "w-32 bg-purple-800"
          }`}
        >
          {/* Icone de trofeu  para os 3 primeiros*/}
          <div className="absolute top-[-15px]">
            {player.rank === 1 ? (
              <Crown
                className="w-12 h-12 text-yellow-400"
                fill="currentColor"
              />
            ) : (
              <Trophy
                className={`${player.medalColor} w-8 h-8`}
                fill="currentColor"
              />
            )}
          </div>

          {/* Avatar do jogador */}
          <div
            className={`mt-4 relative rounded-full overflow-hidden border-4 ${
              player.rank === 1
                ? "border-yellow-400 w-24 h-24"
                : "border-gray-400 w-20 h-20"
            }`}
          >
            <Image
              src={player.avatarUrl}
              alt={`${player.name} Avatar`}
              style={{ objectFit: "cover" }}
              sizes="96px"
              fill
            />
          </div>

          {/* Informações do jogador */}
          <span className="text-2xl opacity-80 font-extrabold">
            {player.rank}º
          </span>
          <span className="mt-2 text-xl font-bold">{player.name}</span>
          <span className="text-sm opacity-80">@{player.username}</span>
          <span className="mt-1 text-2xl font-extrabold">
            {player.score} pts
          </span>
        </div>
      ))}
    </div>
  );
};
