import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";
import Home from "@/app/page";


//Props que o card deve aceitar

interface HomeCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
}

export const HomeCard = ({ icon, title, description, href}: HomeCardProps) => {
    return (
        <Link href={href} className="group block">
            <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-center gap-x-4">
                   {/** Conteiner do icone */}
                    <div className="p-3 bg-white/20 rounded-lg">
                        {icon}
                    </div>
                    {/** Textos */}
                    <div>
                        <h3 className="text-xl font-semibold text-white">{title}</h3>
                        <p className="text-sm text-white/70">{description}</p>
                    </div>
                </div>
                {/** Seta que reage ao hover */}
                <ChevronRight className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
        </Link>
    );
}