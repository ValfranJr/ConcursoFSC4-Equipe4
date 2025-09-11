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
    { ...first, rank: 1, medalColor: "text-yellow-400" }, 
    { ...third, rank: 3, medalColor: "text-amber-700" }, 
  ];

  return (
    <div className="flex justify-center items-end space-x-2 mb-8 md:space-x-4">
      {players.map((player) => (
        <div
          key={player.id}
          className={`relative flex flex-col items-center p-4 rounded-2xl shadow-lg transition-all duration-300 bg-white/10 backdrop-blur-md ${
            player.rank === 1 ? "w-[12rem] h-[16rem] md:w-64" : "w-[9rem] h-[14rem] md:w-48"
          }`}
        >
          {/* Ícone de troféu ou coroa */}
          <div className="absolute top-[-20px]">
            {player.rank === 1 ? (
              <Crown className="w-12 h-12 text-yellow-400" fill="currentColor" />
            ) : (
              <Trophy
                className={`${
                  player.rank === 2 ? "text-gray-400" : "text-amber-700"
                } w-8 h-8`}
                fill="currentColor"
              />
            )}
          </div>

          {/* Avatar do jogador */}
          <div
            className={`mt-4 relative rounded-full overflow-hidden border-4 ${
              player.rank === 1
                ? "border-yellow-400 w-24 h-24 md:w-32 md:h-32 "
                : "border-white/20 w-16 h-16 md:w-20 md:h-20"
            }`}
          >
            <Image
              src={player.avatarUrl}
              alt={`${player.name} Avatar`}
              style={{ objectFit: "cover" }}
              sizes="96px"
              fill
              className="rounded-full"
            />
          </div>

          {/* Informações do jogador */}
          <span className="text-xl opacity-80 font-extrabold mt-2">
            {player.rank}º
          </span>
          <span className="mt-1 text-lg font-bold truncate">{player.name}</span>
          <span className="text-sm opacity-80">@{player.username}</span>
          <span className="mt-1 text-xl font-extrabold">{player.score} pts</span>
        </div>
      ))}
    </div>
  );
};
