"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Award, ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";

const navItems = [
  { id: "home", label: "Início", icon: Home, href: "/frontend/home" },
  { id: "profile", label: "Perfil", icon: User, href: "/frontend/profile" },
  {
    id: "leaderboard",
    label: "Ranking",
    icon: Award,
    href: "/frontend/leaderboard",
  },
];

interface DesktopSideNavProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

/**
 * Componente de navegação lateral para desktop
 * Fixo e visível apenas em telas grandes
 */
export const DesktopSideNav = ({
  isCollapsed,
  toggleCollapse,
}: DesktopSideNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={`fixed inset-y-0 left-0 hidden md:flex flex-col bg-white/10 backdrop-blur-md shadow-2xl p-4 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex items-center space-x-2 p-2 mb-8">
        <div className="relative w-10 h-10">
          <Image
            src="/avatar-quizz.png"
            alt="Quiz Logo"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-white">Quizz</h1>
        )}
      </div>

      <ul className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const activeClasses =
            "bg-white/20 text-white font-bold  border-purple-500";
          const inactiveClasses =
            "text-gray-300 hover:bg-white/10 transition-colors";

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex items-center p-3 rounded-lg ${isActive ? activeClasses : inactiveClasses}`}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        onClick={toggleCollapse}
        className="mt-auto flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
      >
        {isCollapsed ? (
          <ChevronsRight className="w-5 h-5" />
        ) : (
          <ChevronsLeft className="w-5 h-5" />
        )}
      </button>
    </nav>
  );
};
