
import Image from "next/image";
import React from "react";

interface AchievementCardProps {
  iconUrl: string; // URL de icone de conquista
  value: string; // Valor associado à  conquista
  label: string; // Rotulo da conquista
}

export function AchievementCard({
  iconUrl,
  value,
  label,
}: AchievementCardProps) {
  return (
    <div className="flex flex-col p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-md text-white">
      <div className="relative w-12 h-12 mb-2">
        <span className="w-28 h-28 ">{iconUrl}</span>
        
      </div>
      <span className="text-xl font-bold">{value}</span>
      <span className="text-sm opacity-80 mt-1">{label}</span>
    </div>
  );
}
