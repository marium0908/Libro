import { Inter, Playfair_Display } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Libro - Online Book Borrowing',
  description: 'Discover and borrow your next favorite book.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-base-100 font-sans text-base-content antialiased">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster 
              position="top-right" 
              toastOptions={{
                className: 'font-bold rounded-2xl shadow-xl',
                duration: 3000
              }}
            />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
