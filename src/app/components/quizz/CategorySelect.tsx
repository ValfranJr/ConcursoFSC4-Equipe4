// src/components/quiz/CategorySelect.tsx
"use client";

import { CATEGORIES } from "@/lib/trivia/constants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  onSelect: (id: number) => void;
  selectedId?: number | null;
};

export default function CategorySelect({ onSelect, selectedId = null }: Props) {
  return (
    <div className="mt-2 rounded-3xl bg-white/20 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] ring-2 ring-ring">
      <div className="mx-auto mb-5 text-center">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <Link href="/frontend/home">
              <ChevronLeft className=" text-xl" />
            </Link>
          </div>

          <div className="mx-auto mt-2">
            <Image
              src="/avatar-quizz.png"
              alt="Avatar"
              width={140}
              height={140}
              className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
              priority
            />
          </div>
        </div>
        <p className="text-lg text-white/80">Escolha sua categoria</p>
        <p className="text-lg font-semibold text-white/90">Vamos explorar!</p>
      </div>

      <div className="mx-auto flex max-w-sm flex-col gap-4">
        {CATEGORIES.map((c) => {
          const isSelected = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              aria-pressed={isSelected}
              className={`h-12 rounded-2xl bg-gradient-to-r ${c.gradient} px-6 font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSelected ? "ring-2 ring-white" : ""
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
