import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ChevronDown, 
  Minus, 
  Plus, 
  ShieldCheck, 
  MessageCircle,
  Wallet,
  Package,
  Info,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [
  { id: '1', name: 'Netflix Premium 1 Bulan', price: 35000, description: 'Netflix Premium 4K UHD Ultra HD (Akun Sharing)' },
  { id: '2', name: 'Spotify Premium 1 Bulan', price: 15000, description: 'Spotify Premium Individual (Akun Baru/Lama)' },
  { id: '3', name: 'YouTube Premium 1 Bulan', price: 12000, description: 'YouTube Premium No Iklan (Akun Sharing)' },
  { id: '4', name: 'Canva Pro 1 Bulan', price: 10000, description: 'Canva Pro Akses Desain Tanpa Batas' },
  { id: '5', name: 'Disney+ Hotstar 1 Bulan', price: 25000, description: 'Disney+ Hotstar Official (Akun Sharing)' },
];

export const CheckoutPage = () => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('6285888009931');
  const [qty, setQty] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const totalPrice = selectedProduct ? selectedProduct.price * qty : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Checkout Produk
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-zinc-500 mt-1">
            Selesaikan pesanan kamu dalam beberapa langkah mudah.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-500/20">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">100% Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Product Preview */}
        <div className="lg:col-span-7 h-full">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 h-[450px] relative overflow-hidden flex items-center justify-center p-12 transition-all duration-500">
            <AnimatePresence mode="wait">
              {!selectedProduct ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-gray-50 dark:bg-zinc-950 rounded-full flex items-center justify-center text-gray-300 dark:text-zinc-800 border-4 border-white dark:border-zinc-900 ring-1 ring-gray-100 dark:ring-zinc-800 shadow-inner">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Belum Ada Produk Dipilih</h3>
                    <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 max-w-[280px]">
                      Pilih produk pada formulir di sebelah kanan untuk melihat detail.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="product"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full space-y-8"
                >
                  <div className="flex items-start gap-8">
                    <div className="w-40 h-52 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl shrink-0 shadow-2xl shadow-rose-200 dark:shadow-none p-6 flex flex-col justify-between text-white overflow-hidden relative group">
                      <div className="relative z-10">
                        <Package className="w-8 h-8 opacity-50 mb-2" />
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-70">PREMIUM</p>
                      </div>
                      <div className="relative z-10">
                        <h4 className="font-black leading-tight text-lg mb-1">{selectedProduct.name}</h4>
                        <p className="text-[10px] font-bold opacity-80">Official License</p>
                      </div>
                      {/* Decorative shapes */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 blur-2xl -mr-12 -mt-12 rounded-full" />
                    </div>
                    
                    <div className="flex-1 space-y-6 pt-4">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                          {selectedProduct.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-500 leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
                          <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">PROSES</p>
                          <p className="text-sm font-black text-gray-900 dark:text-white">Instan (Otomatis)</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
                          <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-1">GARANSI</p>
                          <p className="text-sm font-black text-rose-600 dark:text-rose-400">Full 30 Hari</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20 rounded-2xl">
                    <Info className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-500">
                      Pastikan nomor WhatsApp Anda aktif untuk menerima detail akun secara otomatis.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>

        {/* Right Card: Order Detail Form */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Order Detail</h3>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-0.5">SALDO KAMU</p>
                <p className="text-sm font-black text-gray-900 dark:text-white font-mono">Rp49.182</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Select Service */}
              <div className="relative">
                <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1 block">PILIH LAYANAN</label>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 rounded-2xl text-sm font-bold text-gray-900 dark:text-white tracking-tight transition-all hover:border-rose-200"
                >
                  <span className={selectedProductId ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-zinc-500'}>
                    {selectedProduct ? selectedProduct.name : 'Pilih produk...'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-2xl rounded-2xl z-50 overflow-hidden"
                    >
                      {products.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedProductId(p.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors border-b border-gray-50 dark:border-zinc-800 last:border-0 ${selectedProductId === p.id ? 'bg-rose-50/50 dark:bg-rose-900/20' : ''}`}
                        >
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</span>
                          <span className="text-xs font-black text-rose-600 dark:text-rose-400 font-mono">Rp{(p.price).toLocaleString()}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Kirim ke WA & Qty */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1 block">KIRIM KE WA</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <MessageCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <input 
                      type="text" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl text-sm font-bold text-gray-900 dark:text-white tracking-wider outline-none focus:border-rose-200 transition-all font-mono"
                    />
                  </div>
                </div>
                <div className="sm:w-32">
                  <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1 block">QTY</label>
                  <div className="flex items-center bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 rounded-2xl p-1 h-[54px]">
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-rose-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center text-sm font-black text-gray-900 dark:text-white font-mono">{qty}</span>
                    <button 
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-rose-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Tagihan */}
              <div className="bg-zinc-950 rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">TOTAL TAGIHAN</p>
                    <p className={`text-[11px] font-bold transition-all ${selectedProduct ? 'text-zinc-400' : 'text-emerald-500 animate-pulse'}`}>
                      {selectedProduct ? `${qty}x ${selectedProduct.name}` : 'Pilih produk...'}
                    </p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:scale-110 transition-transform duration-500">
                      <span className="text-zinc-500 text-sm font-bold mr-1">Rp</span>
                      {totalPrice.toLocaleString()}
                    </h3>
                  </div>
                </div>
                {/* Visual gloss */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-rose-500/10 to-transparent" />
              </div>

              <button 
                disabled={!selectedProduct}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${
                  selectedProduct 
                  ? 'bg-rose-600 text-white shadow-2xl shadow-rose-200 dark:shadow-none hover:bg-rose-700 hover:-translate-y-1' 
                  : 'bg-gray-100 dark:bg-zinc-950 text-gray-400 dark:text-zinc-700 cursor-not-allowed'
                }`}
              >
                {selectedProduct ? 'Beli Sekarang' : 'Pilih Produk Dahulu'}
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex items-center gap-4 px-4 py-3 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 leading-normal">
              Pesanan akan diproses otomatis oleh sistem dalam hitungan detik setelah pembayaran berhasil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
