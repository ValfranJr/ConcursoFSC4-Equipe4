"use client";

import { useEffect, useMemo, useState } from "react";
import CategorySelect from "@/app/components/quizz/CategorySelect";
import DifficultySelect from "@/app/components/quizz/DifficultSelect";
import { CATEGORIES, DIFFICULTIES } from "@/lib/trivia/constants";
import type { DifficultyKey } from "@/lib/trivia/types";
import { Button } from "@/app/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TriviaItem = {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
type TriviaResponse = { response_code: number; results: TriviaItem[] };

function decodeHtml(s: string) {
  if (typeof window === "undefined") return s;
  const e = document.createElement("textarea");
  e.innerHTML = s;
  return e.value;
}
const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function GameSoloPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyKey | null>(null);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<TriviaItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (step !== 3 || !categoryId || !difficulty) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const url = `/api/trivia?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple&lang=pt-BR`;
        const res = await fetch(url, { cache: "no-store" });
        const data: TriviaResponse = await res.json();
        if (data.response_code !== 0)
          throw new Error("Sem perguntas para essa combinação.");
        setQuestions(data.results);
      } catch (e: any) {
        setError(e.message ?? "Erro ao carregar perguntas");
      } finally {
        setLoading(false);
      }
    })();
  }, [step, categoryId, difficulty]);

  const prepared = useMemo(() => {
    return questions.slice(0, 5).map((q) => {
      const options = shuffle([q.correct_answer, ...q.incorrect_answers]).map(
        decodeHtml
      );
      return {
        ...q,
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        options,
      };
    });
  }, [questions]);

  useEffect(() => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
  }, [prepared.length]);

  const handleSelectOption = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    setShowFeedback(true);

    const isLast = currentIdx >= prepared.length - 1;
    const advance = () => {
      if (!isLast) {
        setCurrentIdx((idx) => idx + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      }
    };

    setTimeout(advance, 900);
  };

  return (
    <div className="min-h-screen w-full text-white">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-5 py-6 sm:max-w-lg">
        {" "}
        {step === 1 && (
          <>
            <CategorySelect
              selectedId={categoryId}
              onSelect={(id) => {
                setCategoryId(id);
                setStep(2);
              }}
            />
          </>
        )}
        {step === 2 && (
          <>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Link href="/frontend/home">
                <ChevronLeft className=" text-xl" />
              </Link>
            </div>
            <h2 className="mb-4 text-center text-xl font-semibold">
              Selecione a Dificuldade
            </h2>
            <DifficultySelect
              difficulties={DIFFICULTIES}
              selected={difficulty}
              onSelect={(d) => {
                setDifficulty(d);
                setStep(3);
              }}
            />
          </>
        )}
        {step === 3 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <Link href={`/frontend/home`}>
                <ChevronLeft />
              </Link>
              <div className="text-sm ">
                {CATEGORIES.find((c) => c.id === categoryId)?.label} •{" "}
                {DIFFICULTIES.find((d) => d.key === difficulty)?.label}
              </div>
            </div>

            {loading && <p>Carregando perguntas…</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && prepared.length === 0 && (
              <p>Sem perguntas.</p>
            )}

            {!loading && !error && prepared.length > 0 && (
              <div className="space-y-5">
                <div className="rounded-xl border p-4 font-semibold">
                  <div className="mb-2 text-xs ">
                    {prepared[currentIdx]?.category} •{" "}
                    {prepared[currentIdx]?.difficulty.toUpperCase()} •{" "}
                    {currentIdx + 1}/{prepared.length}
                  </div>
                  <h3 className="mb-3 font-medium">
                    {prepared[currentIdx]?.question}
                  </h3>
                  <div className="grid gap-2">
                    {prepared[currentIdx]?.options.map((opt, i) => {
                      const isCorrect =
                        opt === prepared[currentIdx].correct_answer;
                      const isSelected = selectedOption === opt;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(opt)}
                          disabled={selectedOption !== null}
                          className={cn(
                            "rounded-lg border p-2 text-left transition-transform",
                            selectedOption === null && "hover:scale-[1.01]",
                            showFeedback &&
                              isCorrect &&
                              "border-green-500 bg-green-500/10 text-green-400",
                            showFeedback &&
                              !isCorrect &&
                              isSelected &&
                              "border-red-500 bg-red-500/10 text-red-400"
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedOption !== null &&
                  currentIdx >= prepared.length - 1 && (
                    <p className="text-center text-sm text-white/70">
                      Fim das perguntas.
                    </p>
                  )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
