import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, ChevronDown, Sun, Moon, Info, CheckCircle2, AlertCircle, ShoppingCart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

interface TopbarProps {
  onMenuClick: () => void;
}

const notifications = [
  {
    id: 1,
    title: 'Pesanan Berhasil',
    message: 'Akun Netflix Premium Anda telah dikirim via WhatsApp.',
    time: '2 menit yang lalu',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10'
  },
  {
    id: 2,
    title: 'Promo Terbatas!',
    message: 'Diskon 50% untuk YouTube Premium hari ini saja.',
    time: '1 jam yang lalu',
    icon: ShoppingCart,
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-500/10'
  },
  {
    id: 3,
    title: 'Informasi Sistem',
    message: 'Deposit via QRIS Mandiri sedang dalam maintenance.',
    time: '5 jam yang lalu',
    icon: AlertCircle,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10'
  }
];

export const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <header className="h-16 lg:h-20 bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 text-gray-500 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            {getGreeting()}, <span className="text-rose-600">Digital Panel</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2.5 text-gray-500 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-xl transition-all"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Search - Visible on Desktop */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 px-4 py-2 rounded-full w-64 focus-within:border-rose-200 transition-all">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari transaksi..." 
            className="bg-transparent text-sm font-medium outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2.5 transition-all rounded-xl ${
              showNotifications 
              ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' 
              : 'text-gray-500 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-900'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-5 border-b border-gray-50 dark:border-zinc-800 flex items-center justify-between">
                  <h3 className="font-black text-gray-900 dark:text-white tracking-tight">Notifikasi</h3>
                  <span className="text-[10px] font-black bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-1 rounded-full uppercase tracking-widest">
                    3 Baru
                  </span>
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-gray-50 dark:border-zinc-800 last:border-0 cursor-pointer group"
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${notif.bg} ${notif.color}`}>
                          <notif.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors tracking-tight">
                            {notif.title}
                          </p>
                          <p className="text-xs font-medium text-gray-500 dark:text-zinc-500 leading-relaxed line-clamp-2">
                            {notif.message}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-600 uppercase tracking-widest pt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest bg-gray-50 dark:bg-zinc-950/50 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors border-t border-gray-100 dark:border-zinc-800">
                  Lihat Semua Notifikasi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 lg:pl-6 lg:border-l border-gray-100 dark:border-zinc-800 cursor-pointer group">
          <div className="w-9 h-9 lg:w-10 lg:h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-800">
            DP
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">Digital Panel</p>
            <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Member Premium</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
};
