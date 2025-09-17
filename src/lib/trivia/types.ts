// src/lib/trivia/types.ts
export type Category = { id: number; label: string; gradient?: string };

export type DifficultyKey = "easy" | "medium" | "hard";
export type Difficulty = {
  key: DifficultyKey;
  label: string;
  gradient?: string;
};
