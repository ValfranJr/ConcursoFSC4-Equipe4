// src/lib/trivia/constants.ts
import type { Category, Difficulty } from "./types";

export const CATEGORIES: Category[] = [
  { id: 17, label: "Ciência", gradient: "from-amber-400 to-orange-500" },
  { id: 19, label: "Matemática", gradient: "from-emerald-400 to-green-600" },
  { id: 28, label: "Veículos", gradient: "from-amber-400 to-orange-500" },
  { id: 27, label: "Animais", gradient: "from-rose-500 to-red-500" },
  { id: 11, label: "Filmes", gradient: "from-pink-500 to-purple-600" },
];

export const DIFFICULTIES: Difficulty[] = [
  { key: "easy", label: "Fácil", gradient: "from-emerald-400 to-green-600" },
  { key: "medium", label: "Médio", gradient: "from-indigo-400 to-blue-600" },
  { key: "hard", label: "Difícil", gradient: "from-pink-500 to-purple-600" },
];
