import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Book as BookIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="group flex items-center gap-4 transition-opacity active:opacity-80">
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-[1.25rem] -rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-primary/20"></div>
                <BookIcon className="absolute inset-0 m-auto h-6 w-6 text-primary-content" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-serif italic text-3xl font-black text-white tracking-tighter">Libro</span>
                <span className="text-[8px] font-black uppercase tracking-[0.6em] text-primary translate-x-1 uppercase">Collective</span>
              </div>
            </Link>
            <p className="opacity-60 text-sm leading-relaxed max-w-xs font-medium">
              We are digitizing the traditional library experience. Join us in making knowledge accessible to everyone, everywhere.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium opacity-60">
              <li><a href="/" className="hover:opacity-100 hover:text-primary transition-all">Home</a></li>
              <li><a href="/books" className="hover:opacity-100 hover:text-primary transition-all">All Books</a></li>
              <li><a href="/profile" className="hover:opacity-100 hover:text-primary transition-all">My Profile</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition-all">Membership</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Help & Support</h4>
            <ul className="flex flex-col gap-4 text-sm font-medium opacity-60">
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition-all">FAQs</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition-all">Terms of Service</a></li>
              <li><a href="#" className="hover:opacity-100 hover:text-primary transition-all">Cookies</a></li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 h-fit">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6">Contact Us</h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@libro.com</span>
              </div>
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 800-READERS</span>
              </div>
              <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Story St, SF</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] opacity-30">
          <p>© {new Date().getFullYear()} LIBRO DIGITAL SYSTEM</p>
          <p>BUILT FOR READERS BY READERS</p>
        </div>
      </div>
    </footer>
  );
}
