"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid, // Adicionado para controle da grade
} from "recharts";

// Dados mockados para o gráfico
const data = [
  { name: "Mon", score: 800 },
  { name: "Tue", score: 400 },
  { name: "Wed", score: 600 },
  { name: "Thu", score: 850 },
  { name: "Fri", score: 700 },
  { name: "Sat", score: 950 },
  { name: "Sun", score: 900 },
];

/**
 * Componente que exibe um gráfico de estatísticas semanais do usuário.
 */
export const ProfileChart = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4">
        Estatísticas Semanais
      </h3>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }} // Ajustado margin para evitar corte do label
          >
            {/* Definição do gradiente de cor para a área do gráfico */}
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8} />{" "}
                {/* Roxo mais claro */}
                <stop offset="95%" stopColor="#8A2BE2" stopOpacity={0} />{" "}
                {/* Roxo mais escuro, transparente */}
              </linearGradient>
            </defs>
            {/* Configuração do eixo X (dias da semana) */}
            <XAxis
              dataKey="name"
              stroke="#ffffff"
              opacity={0.7}
              tickFormatter={(tick: any) => tick.substring(0, 3)}
            />{" "}
            {/* Formata para 3 letras */}
            {/* Configuração do eixo Y (pontuação) */}
            <YAxis stroke="#ffffff" opacity={0.7} />
            {/* Grade do gráfico - desativada ou com cor suave */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ffffff"
              opacity={0.1}
            />
            {/* Tooltip personalizado */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Fundo mais escuro e semi-transparente
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                backdropFilter: "blur(5px)",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              itemStyle={{ color: "#fff" }}
              formatter={(value: number) => [`${value} Pts`, "Pontuação"]} // Exibe '800 Pts'
            />
            {/* Área do gráfico */}
            <Area
              type="monotone"
              dataKey="score" // Mudado de 'pv' para 'score' para maior clareza
              stroke="#8A2BE2" // Cor da linha do gráfico
              fill="url(#colorScore)" // Usa o gradiente definido acima
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
