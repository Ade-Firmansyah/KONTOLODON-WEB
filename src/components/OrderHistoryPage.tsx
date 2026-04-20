import React from 'react';
import { ShoppingCart, Search, Filter, ExternalLink, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderHistoryPage = () => {
  const orders = [
    { id: 'ORD-99120', item: 'Netflix Premium 1 Bulan', price: 'Rp 35.000', date: '21 Apr 2026, 10:45', status: 'Success', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { id: 'ORD-99119', item: 'Spotify Premium 1 Bulan', price: 'Rp 15.000', date: '20 Apr 2026, 22:15', status: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { id: 'ORD-99118', item: 'YouTube Premium 1 Bulan', price: 'Rp 12.000', date: '20 Apr 2026, 17:30', status: 'Failed', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    { id: 'ORD-99117', item: 'Canva Pro 1 Bulan', price: 'Rp 10.000', date: '19 Apr 2026, 09:12', status: 'Success', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Riwayat <span className="text-rose-600 dark:text-rose-400">Pesanan</span>
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 mt-1">
            Pantau status dan detail akun dari semua pesanan kamu di sini.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-4 py-2 rounded-xl focus-within:border-rose-200 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cari ID pesanan..." className="bg-transparent outline-none text-xs font-bold w-40" />
          </div>
          <button className="p-2.5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl text-gray-500 hover:text-rose-600 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Produk</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Harga</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {orders.map((order, index) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-gray-50/50 dark:hover:bg-zinc-950/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-gray-900 dark:text-white font-mono tracking-tight">{order.id}</p>
                    <p className="text-[10px] font-bold text-gray-400 font-mono mt-1">{order.date}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{order.item}</p>
                    <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest mt-1">Gojek Account</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-gray-900 dark:text-white font-mono">{order.price}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${order.bg} ${order.color.replace('text-', 'border-').replace('600', '100')} dark:border-opacity-20`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${order.color.replace('text-', 'bg-')}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${order.color}`}>{order.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-8 py-4 bg-gray-50/50 dark:bg-zinc-950/30 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
           <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Menampilkan 4 dari 142 pesanan</p>
           <div className="flex gap-2">
             <button className="px-3 py-1 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg text-xs font-black text-gray-400 cursor-not-allowed">Pre</button>
             <button className="px-3 py-1 bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-800 rounded-lg text-xs font-black text-rose-600">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};
