import Image from "next/image";

interface LeaderboardListItemProps {
    /**
     * Posição do jogador no ranking
    */
rank: number;
    /**
     * Nome do jogador
    */
name: string;
    /**
     * Pontuação do jogador
    */
score: number;
    /**
     *URL da imagem de perfildo jogador
    */
avatarUrl: string;
    /**
     * Indica se a linha pertence ao usuário atual. para destaque;
     */
isCurrentUser?: boolean;
}

/**
 * Componente que exibe uma linha individual no ranking.
 * @param {LeaderboardListItemProps} props - Propriedades do componente.
 */

export const LeaderboardListItem = ({ rank, name, score, avatarUrl, isCurrentUser = false }: LeaderboardListItemProps) => {
    return (
        <li
            className={`flex items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 ${
                isCurrentUser ? 'bg-purple-600 text-white transform scale-[1.02]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
        >
            {/* Container da posição, avatar e nome */}
            <div className="flex items-center flex-1">
                <span className="text-xl font-bold w-12 text-center mr-4">{rank}º</span>
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <Image 
                        src={avatarUrl}
                        alt={`Avatar de ${name}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="42px"
                    />
                </div>
                <span className="text-lg ml-4 truncate">{name}</span>
            </div>

            {/* Exibir a pontuação */}
            <span className="text-lg font-bold min-w-[70px] text-right">{score} pts</span>
        </li>
    );
}