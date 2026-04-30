"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('libro_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const getUsers = () => {
    const users = localStorage.getItem('libro_all_users');
    return users ? JSON.parse(users) : [];
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const allUsers = getUsers();
      const existingUser = allUsers.find(u => u.email === email);

      if (!existingUser) {
        throw new Error('No user found with this email.');
      }

      if (existingUser.password !== password) {
        throw new Error('Incorrect password. Please try again.');
      }

      setUser(existingUser);
      localStorage.setItem('libro_user', JSON.stringify(existingUser));
      toast.success('Nice to see you again!');
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, photoURL, password) => {
    setLoading(true);
    try {
      const allUsers = getUsers();
      if (allUsers.find(u => u.email === email)) {
        throw new Error('User already exists with this email.');
      }

      const newUser = {
        uid: 'user_' + Date.now(),
        email,
        password, // In a real app we'd hash this
        displayName: name,
        photoURL: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
        borrowedBooks: []
      };

      const updatedUsers = [...allUsers, newUser];
      localStorage.setItem('libro_all_users', JSON.stringify(updatedUsers));
      
      toast.success('Account created successfully!');
      return newUser;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (name, email, photoURL) => {
    setLoading(true);
    try {
      const allUsers = getUsers();
      let existingUser = allUsers.find(u => u.email === email);

      if (!existingUser) {
        existingUser = {
          uid: 'user_' + Date.now(),
          email,
          displayName: name,
          photoURL: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          borrowedBooks: []
        };
        const updatedUsers = [...allUsers, existingUser];
        localStorage.setItem('libro_all_users', JSON.stringify(updatedUsers));
      }

      setUser(existingUser);
      localStorage.setItem('libro_user', JSON.stringify(existingUser));
      toast.success('Logged in with Google!');
    } catch (error) {
      toast.error('Google login failed.');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('libro_user');
    toast.success('See you later!');
  };

  const updateUser = (name, photoURL) => {
    if (user) {
      const finalPhotoURL = photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;
      const updated = { ...user, displayName: name, photoURL: finalPhotoURL };
      setUser(updated);
      localStorage.setItem('libro_user', JSON.stringify(updated));

      // Also update in all users
      const allUsers = getUsers();
      const updatedAllUsers = allUsers.map(u => u.uid === user.uid ? updated : u);
      localStorage.setItem('libro_all_users', JSON.stringify(updatedAllUsers));

      toast.success('Profile updated!');
    }
  };

  const borrowBook = (bookId) => {
    if (!user) {
      toast.error('You need to login first');
      return;
    }
    
    if (user.borrowedBooks.includes(bookId)) {
      toast.error('You already have this one!');
      return;
    }

    const updated = { ...user, borrowedBooks: [...user.borrowedBooks, bookId] };
    setUser(updated);
    localStorage.setItem('libro_user', JSON.stringify(updated));

    // Also update in all users
    const allUsers = getUsers();
    const updatedAllUsers = allUsers.map(u => u.uid === user.uid ? updated : u);
    localStorage.setItem('libro_all_users', JSON.stringify(updatedAllUsers));

    toast.success('Book borrowed! Enjoy reading.');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, updateUser, borrowBook }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

