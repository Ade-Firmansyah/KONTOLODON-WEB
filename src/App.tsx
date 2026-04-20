import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Search, Receipt, LayoutGrid, Palette, PlayCircle, Cpu, GraduationCap, ChevronRight, User, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHome } from './components/DashboardHome';
import { CommunityPage } from './components/CommunityPage';
import { CheckoutPage } from './components/CheckoutPage';
import { DepositPage } from './components/DepositPage';
import { PriceListPage } from './components/PriceListPage';
import { WithdrawPage } from './components/WithdrawPage';
import { OrderHistoryPage } from './components/OrderHistoryPage';
import { DepositHistoryPage } from './components/DepositHistoryPage';
import { MutationPage } from './components/MutationPage';
import { ProfilePage } from './components/ProfilePage';
import { DocumentationPage } from './components/DocumentationPage';
import { CreateBotPage } from './components/CreateBotPage';
import { ThemeProvider } from './context/ThemeContext';

// --- Landing Page Components ---

const LandingNavbar = () => (
  <nav className="w-full h-20 flex items-center justify-between px-6 md:px-12 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-900">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/40">
        <LayoutGrid className="text-white w-6 h-6" />
      </div>
      <span className="text-lg md:text-xl font-extrabold tracking-tight text-white capitalize">
        Premiumin<span className="text-brand font-black">Plus</span>
      </span>
    </div>
    
    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-400">
      <a href="#" className="hover:text-brand transition-colors flex items-center gap-1">
        <Receipt className="w-4 h-4" />
        Pricelist
      </a>
      <Link 
        to="/dashboard" 
        className="bg-brand text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-brand/20 hover:scale-105 transition-all flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Dashboard
      </Link>
    </div>
  </nav>
);

const LandingPage = () => {
  const categories = [
    { label: 'Semua Produk', icon: <LayoutGrid className="w-4 h-4" /> },
    { label: 'Design & Edit', icon: <Palette className="w-4 h-4" /> },
    { label: 'Stream & Media', icon: <PlayCircle className="w-4 h-4" /> },
    { label: 'Apps & Tools', icon: <Cpu className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-400 relative overflow-x-hidden">
      <LandingNavbar />
      
      <main className="pb-24">
        <div className="max-w-5xl mx-auto pt-16 pb-12 px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-900/20 text-emerald-400 px-4 py-1.5 rounded-full text-[11px] font-bold border border-emerald-500/20 mb-8"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            TRUSTED DIGITAL PLATFORM
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-[800] leading-[1.1] mb-6 tracking-tight text-white"
          >
            Akses Apps Premium, <br />
            <span className="bg-gradient-to-r from-brand to-rose-400 bg-clip-text text-transparent italic">Harga Bikin Senyum.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Nikmati layanan digital dengan harga distributor. <span className="font-bold text-zinc-300">Otomatis, cepat, dan bergaransi.</span> Pilihan cerdas buat dipakai sendiri atau dijual lagi.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-3 bg-zinc-900 p-2.5 rounded-3xl shadow-2xl border border-zinc-800 mb-12 max-w-3xl mx-auto"
          >
            <div className="flex-1 relative flex items-center px-4 gap-3 bg-zinc-950/50 rounded-2xl border border-zinc-800">
              <Search className="w-5 h-5 text-zinc-600" />
              <input 
                type="text" 
                placeholder="Cari layanan (cth: Spotify)..." 
                className="w-full py-3 bg-transparent outline-none text-sm font-semibold text-zinc-300 placeholder:text-zinc-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 md:w-48 relative flex items-center px-4 gap-3 bg-zinc-950/50 rounded-2xl border border-zinc-800">
                <Receipt className="w-5 h-5 text-zinc-600" />
                <input 
                  type="text" 
                  placeholder="ID Invoice..." 
                  className="w-full py-3 bg-transparent outline-none text-sm font-semibold text-zinc-300 placeholder:text-zinc-600"
                />
              </div>
              <button className="bg-brand text-white px-8 py-3 rounded-2xl font-bold hover:bg-brand-dark transition-colors shadow-lg shadow-brand/30">
                Cek
              </button>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-all"
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="group relative bg-zinc-900 rounded-[2rem] border border-zinc-800 p-6 flex flex-col items-center text-center shadow-xl hover:shadow-brand/5 transition-all">
              <div className="w-24 h-24 mb-6 relative">
                <div className="absolute inset-0 bg-zinc-800 rounded-3xl -rotate-6" />
                <div className="w-full h-full bg-zinc-800 rounded-3xl relative z-10 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-zinc-700" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-zinc-100 mb-1">Produk {i + 1}</h3>
              <p className="text-sm font-medium text-zinc-500 mb-6">Layanan Premium Terpercaya</p>
              <button className="w-full py-3 bg-zinc-800/50 text-zinc-300 border border-zinc-800 rounded-2xl font-bold group-hover:bg-brand group-hover:text-white transition-all">
                Lihat Paket
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <LayoutGrid className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-extrabold text-white">Lisensi Premiumin Plus</span>
          </div>
          <p className="text-sm font-medium text-zinc-600 underline">© 2024 Lisensi Premiumin Plus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// --- Main App with Router ---

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Dashboard Routes Wrapped in DashboardLayout */}
          <Route 
            path="/dashboard/*" 
            element={
              <DashboardLayout>
                <Routes>
                  <Route index element={<DashboardHome />} />
                  <Route path="community" element={<CommunityPage />} />
                  <Route path="accounts" element={<CheckoutPage />} />
                  <Route path="deposit" element={<DepositPage />} />
                  <Route path="harga" element={<PriceListPage />} />
                  <Route path="withdraw" element={<WithdrawPage />} />
                  <Route path="orders" element={<OrderHistoryPage />} />
                  <Route path="deposits" element={<DepositHistoryPage />} />
                  <Route path="mutasi" element={<MutationPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="docs" element={<DocumentationPage />} />
                  <Route path="builder" element={<CreateBotPage />} />
                  <Route path="*" element={
                    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-6">
                        <Cpu className="w-10 h-10" />
                      </div>
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Halaman Sedang Dikembangkan</h2>
                      <p className="text-gray-500 dark:text-zinc-500 font-medium">Layanan ini akan segera tersedia untuk Anda.</p>
                    </div>
                  } />
                </Routes>
              </DashboardLayout>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
