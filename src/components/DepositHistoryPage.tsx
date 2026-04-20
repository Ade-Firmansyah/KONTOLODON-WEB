import React from 'react';
import { Receipt, Search, QrCode, CreditCard, ExternalLink, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

export const DepositHistoryPage = () => {
  const deposits = [
    { id: 'DP-77201', method: 'QRIS', amount: 'Rp 10.000', code: '657', date: '21 Apr 2026, 09:15', status: 'Success', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { id: 'DP-77199', method: 'Virtual Account', amount: 'Rp 50.000', code: '000', date: '21 Apr 2026, 08:30', status: 'Canceled', color: 'text-gray-400', bg: 'bg-gray-50 dark:bg-zinc-800/10' },
    { id: 'DP-77198', method: 'QRIS', amount: 'Rp 25.000', code: '122', date: '20 Apr 2026, 20:45', status: 'Success', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { id: 'DP-77197', method: 'DANA', amount: 'Rp 100.000', code: '045', date: '20 Apr 2026, 15:20', status: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Riwayat <span className="text-rose-600 dark:text-rose-400">Deposit</span>
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 mt-1">
            Riwayat pengisian saldo kamu secara lengkap dan transparan.
          </p>
        </div>
        <div className="flex bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 p-1.5 rounded-2xl shadow-sm">
           <button className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-black shadow-lg shadow-rose-100 dark:shadow-none">Semua</button>
           <button className="px-5 py-2 text-gray-400 dark:text-zinc-500 rounded-xl text-xs font-black">Berhasil</button>
           <button className="px-5 py-2 text-gray-400 dark:text-zinc-500 rounded-xl text-xs font-black">Proses</button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Deposit ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Metode</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Nominal</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {deposits.map((item, index) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group hover:bg-gray-50/50 dark:hover:bg-zinc-950/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 dark:bg-zinc-950 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-rose-600 transition-colors">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 dark:text-white font-mono tracking-tight">{item.id}</p>
                        <p className="text-[10px] font-bold text-gray-400 font-mono mt-0.5">{item.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       {item.method === 'QRIS' ? <QrCode className="w-4 h-4 text-rose-400" /> : <CreditCard className="w-4 h-4 text-emerald-400" />}
                       <p className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{item.method}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-gray-900 dark:text-white font-mono">{item.amount}</p>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-0.5">UNIK: {item.code}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${item.bg} ${item.color.replace('text-', 'border-').replace('600', '100')} dark:border-opacity-20`}>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
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
      </div>
    </div>
  );
};
