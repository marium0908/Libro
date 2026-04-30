"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User as UserIcon, Mail, BookOpen, Settings, Edit2, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { INITIAL_BOOKS } from '../../constants';

import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || (!user && !loading)) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
       <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
       <p className="font-bold opacity-40 italic">Authenticating...</p>
    </div>
  );

  const borrowedBooksData = INITIAL_BOOKS.filter(b => user.borrowedBooks.includes(b.id));

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* User Card */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="card bg-base-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-base-200 overflow-hidden rounded-[2.5rem]">
            <div className="h-40 bg-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 -translate-y-10 blur-2xl"></div>
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>
            <div className="px-8 pb-10">
              <div className="relative -mt-20 mb-8 inline-block">
                <div className="avatar">
                  <div className="w-40 h-40 rounded-[2.5rem] border-8 border-base-100 shadow-2xl overflow-hidden bg-base-200">
                    <img 
                      src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`} 
                      alt={user.displayName} 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover" 
                      onError={(e) => (e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`)}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-content p-2.5 rounded-2xl shadow-lg border-4 border-base-100 rotate-12">
                  <CheckCircle className="h-4 w-4" />
                </div>
              </div>
              
              <h1 className="text-3xl font-serif italic font-black mb-2 tracking-tighter">{user.displayName}</h1>
              <p className="text-primary/40 font-black flex items-center gap-2 mb-8 text-[10px] uppercase tracking-[0.2em] translate-x-1">
                <Mail className="h-3 w-3" /> {user.email}
              </p>

              <div className="flex flex-col gap-4">
                <Link href="/profile/update" className="btn btn-primary h-14 gap-3 font-black rounded-2xl shadow-lg shadow-primary/20 italic font-serif text-lg">
                  <Edit2 className="h-4 w-4" /> Edit Identity
                </Link>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="p-5 bg-base-200/50 rounded-3xl border border-base-200 text-center">
                    <div className="text-2xl font-black text-primary italic font-serif">{user.borrowedBooks.length}</div>
                    <div className="text-[9px] uppercase font-black opacity-30 tracking-[0.3em]">Volumes</div>
                  </div>
                  <div className="p-5 bg-base-200/50 rounded-3xl border border-base-200 text-center">
                    <div className="text-2xl font-black text-primary italic font-serif">Pro</div>
                    <div className="text-[9px] uppercase font-black opacity-30 tracking-[0.3em]">Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content: Borrowed Books */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-4xl font-bold font-serif italic tracking-tight">Active Readings</h2>
            </div>
            <div className="badge badge-lg font-bold py-4 px-6 bg-base-200 text-base-content/60 border-none rounded-xl">
              {borrowedBooksData.length} Total
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {borrowedBooksData.map((book) => (
              <motion.div 
                key={book.id} 
                whileHover={{ scale: 1.02 }}
                className="card bg-base-100 border border-base-200 flex flex-row overflow-hidden shadow-sm hover:shadow-xl transition-all rounded-3xl group"
              >
                <figure className="w-32 flex-shrink-0 relative overflow-hidden">
                  <img src={book.image_url} alt={book.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </figure>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[10px] uppercase font-black text-primary tracking-[0.2em] mb-2">{book.category}</div>
                    <h3 className="font-black text-lg leading-tight mb-2 line-clamp-2">{book.title}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-4 bg-base-200/50 p-3 rounded-xl border border-base-200">
                    <div className="flex items-center gap-2 text-[10px] text-base-content/40 font-black uppercase tracking-widest">
                      <Calendar className="h-3 w-3" /> Due in 14 days
                    </div>
                    <Link href={`/books/${book.id}`} className="btn btn-ghost btn-xs text-primary font-black uppercase tracking-widest p-0 min-h-0 h-4">
                      Read
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {borrowedBooksData.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300"
            >
               <div className="w-20 h-20 bg-base-200 rounded-3xl flex items-center justify-center mx-auto mb-6 text-base-content/20">
                 <BookOpen className="h-10 w-10" />
               </div>
               <p className="text-xl font-bold italic font-serif opacity-40 mb-2">Shelf empty, story waiting.</p>
               <p className="text-sm font-medium opacity-30 mb-8 max-w-xs mx-auto">Explore our collection and start your next journey with Libro.</p>
               <Link href="/books" className="btn btn-primary rounded-2xl px-12 font-black shadow-lg shadow-primary/20">Start Browsing</Link>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
