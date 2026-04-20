import React from 'react';
import { RefreshCcw, ArrowDownLeft, ArrowUpRight, Search, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

export const MutationPage = () => {
  const mutations = [
    { id: '#9220', type: 'in', title: 'Top Up Saldo via QRIS', amount: '+ 66.657', balance: 'Rp 66.657', date: '21 Apr 2026, 09:15', note: 'Deposit Automatis #DP-77201' },
    { id: '#9219', type: 'out', title: 'Beli Netflix Premium', amount: '- 35.000', balance: 'Rp 31.657', date: '21 Apr 2026, 11:30', note: 'Order #ORD-99120' },
    { id: '#9218', type: 'out', title: 'Beli Capcut Pro', amount: '- 3.800', balance: 'Rp 27.857', date: '21 Apr 2026, 14:45', note: 'Order #ORD-99121' },
    { id: '#9217', type: 'in', title: 'Referral Bonus', amount: '+ 5.000', balance: 'Rp 32.857', date: '21 Apr 2026, 16:00', note: 'Bonus invite digitalpanel' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Mutasi <span className="text-rose-600 dark:text-rose-400">Saldo</span>
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 mt-1">
            Laporan lengkap arus keluar masuk saldo akun Anda.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 px-4 py-2 rounded-xl">
             <LayoutGrid className="w-4 h-4 text-gray-400" />
             <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Filter Laporan</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
        <div className="space-y-8">
          {mutations.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  item.type === 'in' 
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' 
                  : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600'
                }`}>
                  {item.type === 'in' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-rose-600 transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">{item.note}</p>
                </div>
              </div>
              
              <div className="flex items-center sm:text-right justify-between sm:block gap-4 border-t sm:border-0 border-gray-50 pt-4 sm:pt-0">
                <div>
                   <p className={`text-lg font-black font-mono tracking-tight ${item.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>
                     {item.amount}
                   </p>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sisa: {item.balance}</p>
                </div>
                <p className="text-[10px] font-bold text-gray-400 font-mono mt-1">{item.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-rose-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-md">
             <h3 className="text-xl font-black mb-2 leading-tight">Butuh Laporan PDF?</h3>
             <p className="text-xs font-medium text-rose-200 leading-relaxed">Ekspor seluruh riwayat transaksi Anda ke format PDF untuk keperluan pembukuan atau laporan bulanan.</p>
           </div>
           <button className="whitespace-nowrap px-8 py-4 bg-white text-rose-600 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-transform active:scale-95">
             Ekspor Mutasi (.PDF)
           </button>
         </div>
         {/* Decorative shapes */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-16 -mt-16 rounded-full" />
         <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-400/20 blur-2xl -ml-12 -mb-12 rounded-full" />
      </div>
    </div>
  );
};
