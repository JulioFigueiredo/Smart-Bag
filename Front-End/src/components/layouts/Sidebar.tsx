import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Sidebar() {

  return (
    <aside className="sidebar">
      <Image src="/images/logotipo.png" width={256} height={0}
        className="w-full rounded-lg" alt="Logotipo"
      />
      <Navbar />
    </aside>
  );
}
