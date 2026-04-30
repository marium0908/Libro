"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Image as ImageIcon, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAuth } from '../../../context/AuthContext';

export default function UpdateProfile() {
  const router = useRouter();
  const { user, updateUser, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    photoURL: ''
  });

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
      setFormData({
        name: user.displayName || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user, loading, router]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(formData.name, formData.photoURL);
    router.push('/profile');
  };

  if (loading || (!user && !loading)) return (
     <div className="min-h-[60vh] flex flex-col items-center justify-center">
       <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
       <p className="font-bold opacity-40 italic">Authenticating...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 flex justify-center">
      <div className="w-full max-w-2xl text-center">
        <Link href="/profile" className="btn btn-ghost gap-2 mb-8 font-bold opacity-40 hover:opacity-100">
          <ArrowLeft className="h-4 w-4" /> Back to Account
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-base-200 overflow-hidden rounded-[3rem]"
        >
          <div className="p-12 border-b border-base-200/50 bg-primary/5 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-16 -translate-y-16 blur-2xl"></div>
            <div className="relative z-10 flex flex-col gap-1">
              <h1 className="text-4xl font-serif italic font-black mb-2 tracking-tighter text-primary line-clamp-1">Identity Settings</h1>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 translate-x-1">Customize your public footprint</span>
            </div>
          </div>
          
          <div className="card-body p-8 lg:p-12">
            <form onSubmit={handleUpdate} className="flex flex-col gap-8 text-left">
              <div className="form-control">
                <label className="label py-0 mb-1">
                  <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Display Name</span>
                </label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                  <input 
                    type="text" 
                    className="input input-bordered w-full pl-16 h-16 bg-base-200/40 rounded-2xl font-bold text-lg border-none focus:ring-4 focus:ring-primary/10 transition-all" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-0 mb-1">
                  <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Profile Image Link</span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                  <input 
                    type="url" 
                    className="input input-bordered w-full pl-16 h-16 bg-base-200/40 rounded-2xl font-bold text-lg border-none focus:ring-4 focus:ring-primary/10 transition-all" 
                    value={formData.photoURL}
                    onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-[2.5rem] flex items-center gap-6 mt-4 border border-primary/10 group">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-[2rem] shadow-2xl bg-base-100 ring rung-primary ring-offset-2 transition-transform group-hover:scale-105 duration-500 overflow-hidden">
                    <img 
                      src={formData.photoURL} 
                      alt="Preview" 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/placeholder/200")} 
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-serif italic font-black text-primary mb-1 tracking-tight">Visual Preview</div>
                  <div className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">How you appear in the collective</div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <button type="submit" className="btn btn-primary h-16 flex-1 rounded-2xl font-bold text-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Update Information
                </button>
                <Link href="/profile" className="btn btn-ghost h-16 px-10 rounded-2xl font-bold uppercase tracking-widest text-xs opacity-40 hover:opacity-100 transition-opacity">Discard</Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
