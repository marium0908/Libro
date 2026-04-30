"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Book as BookIcon, LogOut, Menu } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/books">All Books</Link></li>
            {user && <li><Link href="/profile">My Profile</Link></li>}
          </ul>
        </div>
        <Link href="/" className="group flex items-center gap-3 transition-opacity active:opacity-80">
          <div className="relative">
            <div className="w-10 h-10 bg-primary rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-primary/20"></div>
            <BookIcon className="absolute inset-0 m-auto h-5 w-5 text-primary-content" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-serif italic text-2xl font-black text-primary tracking-tighter">Libro</span>
            <span className="text-[7px] font-black uppercase tracking-[0.5em] opacity-40 translate-x-1">Collective</span>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
          <li><Link href="/books" className="hover:text-primary transition-colors">All Books</Link></li>
          {user && <li><Link href="/profile" className="hover:text-primary transition-colors">My Profile</Link></li>}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/profile" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors overflow-hidden">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    onError={(e) => (e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`)}
                  />
                ) : (
                  <div className="font-serif italic font-black text-primary group-hover:text-white text-xs">L</div>
                )}
              </div>
              <span className="text-sm font-bold text-neutral hidden sm:inline">{user.displayName}</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="btn btn-ghost btn-sm font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/register" className="text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-primary transition-colors hidden sm:inline">Join</Link>
            <Link href="/login" className="btn btn-primary btn-sm px-6 h-10 min-h-0 rounded-2xl font-black italic font-serif shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

