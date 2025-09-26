import React from "react";

interface ProfileStatsCardProps {
    value: string;
    label: string;
}

export const ProfileStatsCard = ({ value, label }: ProfileStatsCardProps) => {
    return (
        <div className="flex flex-1 flex-col items-center bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md text-white min-w-0">
            <span className="text-xl font-bold">{value}</span> 
            <span className="text-sm opacity-80 mt-1">{label}</span>
        </div>
    );
};