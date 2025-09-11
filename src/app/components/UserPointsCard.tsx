"use client";

import Image from "next/image"; 

interface UserPointsCardProps {
    /**
     * Pontuação do usuário.
     */
    points: number;
    /**
     * Url da imagem do usuário.
     */
    badgeUrl: string;
}

/**
 * Componente que exibe a pontuação do usuário com um badge.
 * Utilizando o canto superior das páginas.
 */

export const UserPointsCard = ({ points, badgeUrl }: UserPointsCardProps) => {
    return (
        <div className="flex items-center space-x-2 bg-white/20 p-4 rounded-full shadow-lg backdrop-blur-sm border border-white/30 transform hover:scale-105 cursor-pointer">
        
        
        {/* Exibi a pontuação do usuário */}
        <span className="text-xl font-bold text-white pr-1">{points}</span>


        {/* Exibi o badge do usuário */}
        <div className="w-8 h-8 relative">
            <Image 
                src={badgeUrl} 
                alt="User Badge" 
                fill 
                className="rounded-full"
                style={{ objectFit: 'cover' }}
                sizes="32px"
            />
        </div>
        </div>
    );
}