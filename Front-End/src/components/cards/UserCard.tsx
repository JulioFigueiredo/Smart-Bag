import React from "react";
import Image from "next/image";
import { Button } from "primereact/button";

interface UserCardProps {
    imageSrc?: string;
    position?: string;
    department?: string;
    name?: string;
    lastAccess?: string;
    partsProducted?: string;
    performance?: string;
    idProfile?: string;
}

export default function UserCard({imageSrc, position, department, name, lastAccess,
        partsProducted, performance, idProfile}:UserCardProps) {
    
    return (
        <div className="bg-white rounded-xl flex flex-col max-w-80">
            <div className="flex flex-col items-center p-4">
                {imageSrc && 
                <Image src={imageSrc}
                        width={240} height={0} alt="User Profile"
                        className="h-28 w-28 rounded-full" />}
                {position && <p className="font-extrabold">{position}</p>}
                {department && <p>{department}</p>}
            </div>
            <div className="bg-slate-300 flex-grow rounded-b-xl flex flex-col items-center justify-center p-4 gap-2">
                {name && <div className="font-bold text-xl">{name}</div>}
                {lastAccess && <div className="">Acesso em {lastAccess}</div>}
                {partsProducted && <div className="">Peças Produzidas {partsProducted}</div>}
                {performance && <div className="">Desempenho {performance}</div>}
        
                {idProfile && 
                <Button className="bg-blue-400 hover:bg-blue-300 border-blue-700 lg:bg-yellow-300 p-3 min-w-56 rounded-xl "
                    label="Ver Perfil" icon="pi pi-user"  />}
            
            </div>
        </div>
    );
}