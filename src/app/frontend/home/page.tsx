"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-6xl font-bold mb-10 text-primary-foreground">
        Quizz Game
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Link href="/game/solo" passHref>
          <button className="w-full py-4 text-2xl font-bold text-primary-foreground bg-primary rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300">
            Modo Solo
          </button>
        </Link>
        <Link href="/game/multiplayer" passHref>
          <button className="w-full py-4 text-2xl font-bold text-primary-foreground bg-primary rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300">
            Modo Multiplayer
          </button>
        </Link>
        <Link href="/frontend/leaderboard" passHref>
          <button className="w-full py-4 text-2xl font-bold text-primary-foreground bg-primary rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300">
            Ranking
          </button>
        </Link>
        <Link href="/frontend/profile" passHref>
          <button className="w-full py-4 text-2xl font-bold text-primary-foreground bg-primary rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300">
            Meu Perfil
          </button>
        </Link>
      </div>
    </div>
  );
}
