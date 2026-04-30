"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message || "Oops! Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle('Libro Scholar', 'scholar@libro.com', '');
      router.push('/');
    } catch (err) {
      // Error handled in AuthContext
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-base-100 shadow-2xl border border-base-200 w-full max-w-md overflow-hidden rounded-[2rem]"
      >
        <div className="bg-primary p-12 text-primary-content text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 -translate-y-16 blur-3xl"></div>
          <div className="relative z-10 flex flex-col gap-1">
            <div className="w-12 h-12 bg-white/20 rounded-2xl rotate-12 flex items-center justify-center mb-4">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-4xl font-serif italic font-black tracking-tighter">Welcome</h2>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Back to Libro</span>
          </div>
        </div>
        <div className="card-body p-8 lg:p-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="form-control">
              <label className="label py-0 mb-1">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Email Address</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="input input-bordered w-full h-14 pl-12 bg-base-200/50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label py-0 mb-1">
                <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="input input-bordered w-full h-14 pl-12 bg-base-200/50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-4 font-black gap-3 h-14 rounded-2xl text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Login
            </button>
            {error && <p className="text-error text-center text-xs font-bold mt-2">{error}</p>}
          </form>

          <div className="divider text-[8px] uppercase font-black opacity-20 my-8 tracking-[0.5em]">Collective Auth</div>
          
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="btn btn-outline border-base-300 gap-3 h-14 rounded-2xl lg:shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 opacity-80" alt="Google" />
            <span className="font-bold tracking-tight">Login with Google</span>
          </button>

          <div className="text-center mt-10">
            <p className="text-xs font-black opacity-40 uppercase tracking-widest mb-2">New to Libro?</p>
            <Link href="/register" className="font-serif italic text-xl font-black text-primary hover:opacity-70 transition-opacity">
              Create an account →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
