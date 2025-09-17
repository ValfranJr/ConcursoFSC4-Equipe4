// src/components/quiz/DifficultySelect.tsx
"use client";

import { Difficulty, DifficultyKey } from "@/lib/trivia/types";
import clsx from "clsx";

type Props = {
  difficulties: Difficulty[];
  onSelect: (diff: DifficultyKey) => void;
  selected?: DifficultyKey | null;
  className?: string;
  pillClassName?: string;
  disabled?: boolean;
};

export default function DifficultySelect({
  difficulties,
  onSelect,
  selected = null,
  className,
  pillClassName,
  disabled,
}: Props) {
  const basePill =
    "w-full rounded-full py-3 px-4 font-medium text-white shadow transition-transform " +
    "hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <div className={clsx("grid gap-3", className)}>
      {difficulties.map((d) => {
        const isSelected = d.key === selected;
        return (
          <button
            key={d.key}
            type="button"
            disabled={disabled}
            aria-pressed={isSelected}
            onClick={() => onSelect(d.key)}
            className={clsx(
              basePill,
              "bg-gradient-to-r",
              d.gradient ?? "from-indigo-400 to-blue-600",
              isSelected && "ring-2 ring-offset-2 ring-blue-600",
              disabled && "opacity-60 cursor-not-allowed",
              pillClassName
            )}
          >
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
