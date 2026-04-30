"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { INITIAL_BOOKS } from '../constants';
import { ArrowRight, Clock, BookOpen, Users } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useAuth } from '../context/AuthContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const featuredBooks = INITIAL_BOOKS.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Banner Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-50"
            alt="Library Banner"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-serif"
          >
            Find Your Next <span className="text-primary italic">Read</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed font-medium"
          >
            Digitalizing the traditional library experience. Access thousands of titles from anywhere, anytime.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/books" className="btn btn-primary btn-lg px-8 font-bold gap-2 rounded-2xl">
              Browse now <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-primary py-4 overflow-hidden whitespace-nowrap border-y border-white/10 shadow-lg relative">
        <div className="flex animate-marquee-slower gap-8 items-center text-primary-content font-black uppercase tracking-[0.2em] text-xs">
          <span>New Arrivals: {INITIAL_BOOKS[0].title} | Special Discount on Memberships...</span>
          <span>•</span>
          <span>New Arrivals: {INITIAL_BOOKS[1].title} | Special Discount on Memberships...</span>
          <span>•</span>
          <span>New Arrivals: {INITIAL_BOOKS[2].title} | Special Discount on Memberships...</span>
          <span>•</span>
          {/* Duplicate for seamless loop */}
          <span>New Arrivals: {INITIAL_BOOKS[0].title} | Special Discount on Memberships...</span>
          <span>•</span>
          <span>New Arrivals: {INITIAL_BOOKS[1].title} | Special Discount on Memberships...</span>
          <span>•</span>
          <span>New Arrivals: {INITIAL_BOOKS[2].title} | Special Discount on Memberships...</span>
          <span>•</span>
        </div>
      </div>

      {/* Featured Books Section with Swiper */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2 font-serif italic text-primary">Library Highlights</h2>
            <p className="text-base-content/60 font-medium">Handpicked titles curated just for you.</p>
          </div>
          <Link href="/books" className="btn btn-ghost text-primary gap-2 font-bold uppercase tracking-widest text-xs">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {featuredBooks.map((book) => (
            <SwiperSlide key={book.id}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-base-100 shadow-xl border border-base-200 h-full overflow-hidden rounded-3xl"
              >
                <figure className="h-64">
                  <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </figure>
                <div className="card-body p-6">
                  <div className="badge badge-primary font-bold text-[10px] uppercase mb-2">
                    {book.category}
                  </div>
                  <h3 className="card-title text-base leading-tight mb-1 font-bold">{book.title}</h3>
                  <p className="text-xs text-base-content/60 font-medium mb-4 italic">by {book.author}</p>
                  <div className="card-actions mt-auto">
                    <Link href={`/books/${book.id}`} className="btn btn-primary btn-sm w-full rounded-xl">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Extra Section 1: Stats */}
      <section className="bg-base-200/50 py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="stats stats-vertical lg:stats-horizontal w-full shadow-2xl bg-base-100 rounded-[3rem] p-4">
            <div className="stat place-items-center py-10">
              <div className="stat-icon text-primary"><BookOpen className="h-10 w-10" /></div>
              <div className="stat-value text-primary font-serif italic">12K+</div>
              <div className="stat-title font-bold uppercase tracking-widest text-[10px]">Digital Titles</div>
              <div className="stat-desc font-medium">Growing every day</div>
            </div>
            <div className="stat place-items-center py-10 border-base-200">
              <div className="stat-icon text-primary/60"><Users className="h-10 w-10" /></div>
              <div className="stat-value text-primary font-serif italic">45K</div>
              <div className="stat-title font-bold uppercase tracking-widest text-[10px]">Active Readers</div>
              <div className="stat-desc font-medium">Community members</div>
            </div>
            <div className="stat place-items-center py-10 border-base-200">
              <div className="stat-icon text-primary/40"><Clock className="h-10 w-10" /></div>
              <div className="stat-value text-primary font-serif italic">24/7</div>
              <div className="stat-title font-bold uppercase tracking-widest text-[10px]">Open Access</div>
              <div className="stat-desc font-medium">Borrow anytime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Section 2: Membership CTA */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="bg-neutral text-neutral-content rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4 font-serif italic">Unlock Unlimited Potential</h2>
            <p className="text-lg opacity-70 mb-8 max-w-xl">
              Join our premium membership for exclusive access to journals, offline reading, and priority access to new arrivals.
            </p>
            <button className="btn btn-primary btn-lg rounded-2xl px-10">Join Now</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-32 h-32 bg-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center border border-white/10">
              <span className="text-3xl font-black">500+</span>
              <span className="text-[8px] uppercase tracking-widest opacity-50">Journals</span>
            </div>
            <div className="w-32 h-32 bg-white/5 rounded-3xl backdrop-blur-md flex flex-col items-center justify-center border border-white/10 mt-8">
              <span className="text-3xl font-black">Offline</span>
              <span className="text-[8px] uppercase tracking-widest opacity-50">Access</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
