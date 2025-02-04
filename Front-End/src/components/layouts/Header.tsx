import React from "react";
import Image from "next/image";

interface HeaderProps {
    title: string;
    username?: string;
}

export default function Header({title, username}:HeaderProps) {

  return (
    <header className="header">
        <div className="header-left">
            <h1>{title}</h1>
        </div>
        <div className="header-right">
            {username && 
                <div className="flex">
                    <span className="p-4">Bem-vindo {username}</span>
                    <Image src="/images/profiles/user.png"
                        width={36} height={0} alt="User Profile"
                        className="photo" />
                </div>
            }
        </div>
    </header>
  );

}