"use client";

import Link from 'next/link';
import { Home, User, Award } from 'lucide-react';
import { usePathname } from 'next/navigation';



/**
 * Representa o um item de navegação inferior
 */

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Início', icon: Home, href: 'frontend/home' },
    { id: 'profile', label: 'Perfil', icon: User, href: 'frontend/profile' },
    { id: 'leaderboard', label: 'Ranking', icon: Award, href: 'frontend/leaderboard' },
];


/**
 * Componente de barra de navegação inferior
 * Responsivo e visivel apenas em dispositivos móveis
 */
export const BottomNavigationBar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-primary-foreground/90 backdrop-blur-md shadow-2xl p-4 md:hidden ">
            <ul className="flex justify-around items-center h-12">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === `/${item.href}`;

                    return (
                        <li key={item.id}>
                            <Link href={`/${item.href}`} className={`flex flex-col items-center text-sm transition-colors duration-200 justify-center p-2 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                                <Icon className="w-6 h-6 mb-1" />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}