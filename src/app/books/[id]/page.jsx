"use client";
import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { INITIAL_BOOKS } from '../../../constants';
import { ArrowLeft, BookOpen, User, Book as BookIcon, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { useAuth } from '../../../context/AuthContext';

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, borrowBook, loading } = useAuth();
  
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

  const book = INITIAL_BOOKS.find(b => b.id === id);

  if (!book) return <div className="p-20 text-center font-bold text-2xl opacity-40">Book not found.</div>;

  const handleBorrow = () => {
    if (!user) {
      toast.error('Please login to borrow this book');
      router.push('/login');
      return;
    }
    borrowBook(book.id);
    toast.success('Successfully Borrowed!');
  };

  const isBorrowed = user?.borrowedBooks?.includes(book.id);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 max-w-6xl">
      <Link href="/books" className="btn btn-ghost gap-2 mb-8 -ml-4 font-bold opacity-60">
        <ArrowLeft className="h-4 w-4" /> Back to Collection
      </Link>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full lg:w-96 flex-shrink-0"
        >
          <div className="card bg-base-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-base-200 rounded-[2.5rem]">
            <figure className="aspect-[3/4.5]">
              <img 
                src={book.image_url} 
                alt={book.title} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </figure>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="text-[10px] uppercase font-black tracking-[0.4em] text-primary mb-2 opacity-50">{book.category}</div>
          <h1 className="text-4xl md:text-6xl font-serif italic font-black mb-6 leading-tight tracking-tighter text-primary">{book.title}</h1>
          <div className="flex items-center gap-2 text-xl text-primary/40 mb-10 font-black uppercase tracking-widest text-xs">
            <User className="h-4 w-4" /> by <span className="text-primary font-serif italic normal-case text-xl translate-x-1">{book.author}</span>
          </div>

          <div className="bg-base-200/30 p-10 rounded-[2.5rem] mb-10 border border-base-200 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 opacity-40 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Description
            </h3>
            <p className="text-xl leading-relaxed text-base-content/70 font-medium mb-12 italic">{book.description}</p>
            
            <div className="flex flex-wrap gap-8">
              <div className={`flex items-center gap-4 ${book.available_quantity > 0 ? 'text-success' : 'text-error'}`}>
                {book.available_quantity > 0 ? <CheckCircle className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
                <div>
                  <div className="text-sm font-black uppercase tracking-widest">{book.available_quantity > 0 ? 'Available' : 'Reserved'}</div>
                  <div className="text-lg font-bold">{book.available_quantity} Copies Left</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-primary">
                <BookIcon className="h-6 w-6" />
                <div>
                  <div className="text-sm font-black uppercase tracking-widest">Digital Copy</div>
                  <div className="text-lg font-bold">Instant Access</div>
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={book.available_quantity === 0 || isBorrowed}
            onClick={handleBorrow}
            className={`btn btn-primary btn-lg px-16 h-16 rounded-2xl font-bold text-xl shadow-xl transition-all active:scale-95 ${isBorrowed ? 'btn-success pointer-events-none' : 'shadow-primary/20 hover:shadow-primary/40'}`}
          >
            {isBorrowed ? (
              <>Borrowed Successfully</>
            ) : book.available_quantity === 0 ? (
              <>Out of Stock</>
            ) : (
              <>Borrow This Book <ArrowRight className="h-6 w-6 ml-2" /></>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
