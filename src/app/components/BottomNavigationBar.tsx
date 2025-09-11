"use client";

import Link from 'next/link';
import { Home, User, Award } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';



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
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Função para lidar com o evento de scroll
    useEffect(() => {
        const handleScroll = () => {
            // Verifica a direção do scroll
            if (window.scrollY > lastScrollY && window.scrollY > 10) {
                // Scroll para baixo
                setIsVisible(false);
            } else {
                // Scroll para cima
                setIsVisible(true);
            }

            // Atualiza a posição anterior do scroll
            setLastScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    if (!isVisible) {
        return null;
    }


    return (
        <nav className={`fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-2xl px-2 py-4 md:hidden transition-transform duration-300 rounded-t-3xl ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <ul className="flex justify-around items-center h-12">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === `/${item.href}`;
                    const labelStyle = isActive ? 'text-blue-500 font-bold' : 'text-gray-500';


                    return (
                        <li key={item.id} className="flex-1 flex justify-center">
                            <Link href={`/${item.href}`} className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                                <Icon className="w-6 h-6 mb-1" />
                                <span className={`text-sm ${labelStyle}`}>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}