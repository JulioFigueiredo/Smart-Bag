// Arquivo: /app/components/Navbar.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link href="/" className={`navlink ${pathname === '/' ? 'active' : ''}`}>
          <i className="pi pi-home pr-4 red-icon"></i> Home
        </Link>
        <Link href="/users" className={`navlink ${pathname === '/users' ? 'active' : ''}`}>
          <i className="pi pi-user pr-4 red-icon"></i> Usuários
        </Link>
        <Link href="/sensors" className={`navlink ${pathname === '/sensors' ? 'active' : ''}`}>
          <i className="pi pi-bolt pr-4 red-icon"></i> Sensores
        </Link>
        <Link href="/reports" className={`navlink ${pathname === '/reports' ? 'active' : ''}`}>
          <i className="pi pi-receipt pr-4 red-icon"></i> Relatórios
        </Link>
        <Link href="/products" className={`navlink ${pathname === '/products' ? 'active' : ''}`}>
          <i className="pi pi-list pr-4 red-icon"></i> Itens
        </Link>
        <Link href="/notify" className={`navlink ${pathname === '/notify' ? 'active' : ''}`}>
          <i className="pi pi-bell pr-4 red-icon"></i> Notificações
        </Link>
        <Link href="/settings" className={`navlink ${pathname === '/settings' ? 'active' : ''}`}>
          <i className="pi pi-cog pr-4 red-icon"></i> Configurações
        </Link>
      </div>
      <div className="navbar-bottom">
        <hr />
        <Link href="/login" className="navlink">
          <i className="pi pi-sign-out pr-4 red-icon"></i> Logout
        </Link>
      </div>
    </nav>
  );
}
