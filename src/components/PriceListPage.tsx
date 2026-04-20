import React from 'react';
import { 
  Tags, 
  Code, 
  ArrowUpRight, 
  Search, 
  ChevronRight,
  Monitor,
  Gamepad,
  Music,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

interface PriceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  stock: number;
  isReady: boolean;
  savings: string;
  icon: any;
}

const prices: PriceItem[] = [
  { id: '1', name: 'Capcut Pro 1 Bulan', category: 'CAPCUT PRO 1 BULAN', price: 3800, oldPrice: 375000, stock: 21, isReady: true, savings: '99%', icon: Monitor },
  { id: '2', name: 'AM Exp April 2027', category: 'AM EXP APRIL 2027', price: 800, oldPrice: 175000, stock: 27, isReady: true, savings: '100%', icon: Gamepad },
  { id: '3', name: 'Spotify 2 Bulan No Garansi', category: 'SPOTIFY 2 BULAN NO GARANSI', price: 14500, oldPrice: 225000, stock: 0, isReady: false, savings: '94%', icon: Music },
  { id: '4', name: 'Viu Premium Lifetime', category: 'VIU PREMIUM LIFETIME', price: 550, oldPrice: 150000, stock: 291, isReady: true, savings: '100%', icon: Monitor },
  { id: '5', name: 'Capcut Pro 1 Minggu', category: 'CAPCUT PRO 1 MINGGU', price: 1000, oldPrice: 50000, stock: 0, isReady: false, savings: '98%', icon: Monitor },
  { id: '6', name: 'Prime Video', category: 'PRIME VIDEO', price: 9000, oldPrice: 250000, stock: 1, isReady: true, savings: '96%', icon: Monitor },
  { id: '7', name: 'Spotify 3 Bulan Bergaransi', category: 'SPOTIFY 3 BULAN BERGARANSI', price: 19000, oldPrice: 600000, stock: 0, isReady: false, savings: '97%', icon: Music },
  { id: '8', name: 'CHATGPT PLUS 1B GAR 7 HARI', category: 'CHATGPT PLUS 1B GAR 7 HARI', price: 10000, oldPrice: 150000, stock: 15, isReady: true, savings: '92%', icon: Zap },
  { id: '9', name: 'Link Redeem Nitro 3 Bulan', category: 'LINK REDEEM NITRO 3 BULAN', price: 29000, oldPrice: 350000, stock: 0, isReady: false, savings: '92%', icon: ShoppingBag },
  { id: '10', name: 'Capcut Pro 1 Bulan Fullgar', category: 'CAPCUT PRO 1 BULAN FULLGAR', price: 4200, oldPrice: 2345672, stock: 17, isReady: true, savings: '100%', icon: Monitor },
  { id: '11', name: 'AM Exp Januari 2027', category: 'AM EXP JANUARI 2027', price: 500, oldPrice: 175000, stock: 223, isReady: true, savings: '100%', icon: Gamepad },
  { id: '12', name: '10 Akun Pesanan', category: '10 AKUN PESANAN', price: 5000, oldPrice: 50000, stock: 50, isReady: true, savings: '90%', icon: ShoppingBag },
];

export const PriceListPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Daftar Harga
            </h1>
            <Tags className="w-6 h-6 text-rose-600 dark:text-rose-400 rotate-12" />
          </div>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500">
            Harga spesial reseller. Jual kembali, untung berlapis!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-4 py-2 rounded-xl focus-within:border-rose-200 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cari layanan..." className="bg-transparent outline-none text-xs font-bold w-40" />
          </div>
          <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white px-4 py-2 rounded-xl text-xs font-black border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 transition-all">
            <Code className="w-4 h-4" />
            Dokumentasi API
          </button>
        </div>
      </div>

      {/* Grid of Price Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {prices.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`group bg-white dark:bg-zinc-900 rounded-[2rem] border p-6 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-none hover:-translate-y-1 ${
              item.isReady ? 'border-gray-100 dark:border-zinc-800' : 'border-gray-50 dark:border-zinc-800/50 opacity-80'
            }`}
          >
            {/* Promo Badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-2xl uppercase tracking-widest">
                HEMAT {item.savings}
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                item.isReady ? 'bg-gray-50 dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-white' : 'bg-gray-50 dark:bg-zinc-950/50 border-gray-50 dark:border-zinc-900 text-gray-300 dark:text-zinc-700'
              }`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="pt-1">
                <span className="text-[9px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded-full uppercase tracking-widest leading-loose">
                  {item.category}
                </span>
              </div>
            </div>

            <h3 className="text-base font-black text-gray-900 dark:text-white mb-2 tracking-tight line-clamp-1">
              {item.name}
            </h3>

            <div className="mt-auto pt-4 flex flex-col">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xl font-black text-rose-600 dark:text-rose-400">
                  Rp{item.price.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-gray-400 line-through">
                  Rp{item.oldPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                {item.isReady ? (
                  <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">READY: {item.stock}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-zinc-950 text-gray-400 dark:text-zinc-600 px-2.5 py-1 rounded-full border border-gray-100 dark:border-zinc-800">
                    <div className="w-1 h-1 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest">HABIS</span>
                  </div>
                )}
                
                <button className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest group/btn ${item.isReady ? 'text-rose-600 dark:text-rose-400' : 'text-gray-300 dark:text-zinc-700 cursor-not-allowed'}`}>
                  Beli <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
