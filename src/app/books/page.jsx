"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_BOOKS } from '../../constants';
import { Search, Filter, Book as BookIcon } from 'lucide-react';
import Link from 'next/link';

export default function AllBooks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['Story', 'Tech', 'Science'];

  const filteredBooks = useMemo(() => {
    return INITIAL_BOOKS.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-base-100 p-6 rounded-3xl border border-base-200 sticky top-24">
            <div className="flex items-center gap-2 font-bold mb-6 text-lg">
              <Filter className="h-5 w-5 text-primary" />
              <span>Filter by Category</span>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`btn btn-sm justify-start gap-3 h-11 px-4 rounded-xl border-none transition-all ${!selectedCategory ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105 ml-2' : 'btn-ghost opacity-40 hover:opacity-100 hover:bg-primary/10'}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${!selectedCategory ? 'bg-white' : 'bg-primary'}`}></div>
                <span className="font-black uppercase tracking-widest text-[10px]">All Categories</span>
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm justify-start gap-3 h-11 px-4 rounded-xl border-none transition-all ${selectedCategory === cat ? 'bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105 ml-2' : 'btn-ghost opacity-40 hover:opacity-100 hover:bg-primary/10'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat ? 'bg-white' : 'bg-primary'}`}></div>
                  <span className="font-black uppercase tracking-widest text-[10px]">{cat}</span>
                </button>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-base-200">
              <div className="bg-primary/5 p-4 rounded-2xl text-xs text-primary font-medium leading-relaxed">
                <BookIcon className="h-4 w-4 mb-2" />
                Find specialized collections in Tech and Science updated weekly.
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-base-content/40" />
            <input 
              type="text" 
              placeholder="Search books by title..." 
              className="input input-bordered w-full pl-12 h-14 rounded-2xl bg-base-100 shadow-sm focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-2xl font-serif italic font-black text-primary tracking-tighter">
              {filteredBooks.length} <span className="opacity-40 not-italic text-sm font-black uppercase tracking-widest translate-x-2">Books Available</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book) => (
                <motion.div 
                  layout
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card bg-base-100 border border-base-200 hover:shadow-xl transition-all group overflow-hidden"
                >
                  <div className="flex h-48 sm:h-56">
                    <figure className="w-1/3 flex-shrink-0">
                      <img 
                        src={book.image_url} 
                        alt={book.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                    </figure>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <div className="text-[9px] font-black uppercase text-primary tracking-[0.2em] mb-2">{book.category}</div>
                        <h3 className="font-serif italic font-black text-lg leading-tight mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-[10px] uppercase font-black opacity-30 tracking-widest translate-x-0.5">by {book.author}</p>
                      </div>
                      <Link href={`/books/${book.id}`} className="btn btn-primary btn-sm w-full mt-4 rounded-xl font-bold">
                        Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-200">
              <Search className="h-12 w-12 mx-auto text-base-content/20 mb-4" />
              <h3 className="text-lg font-bold">No books found</h3>
              <p className="text-base-content/50">Try adjusting your search or category filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
