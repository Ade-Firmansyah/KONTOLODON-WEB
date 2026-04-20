import React, { useState } from 'react';
import { 
  Banknote, 
  ArrowUpRight, 
  Building2, 
  CreditCard, 
  Info, 
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WithdrawPage = () => {
  const [amount, setAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const methods = [
    { id: 'dana', name: 'DANA', icon: '🔵' },
    { id: 'gopay', name: 'GoPay', icon: '🟢' },
    { id: 'ovo', name: 'OVO', icon: '🟣' },
    { id: 'bca', name: 'BCA', icon: '🏦' },
    { id: 'mandiri', name: 'Mandiri', icon: '🏦' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Tarik <span className="text-rose-600 dark:text-rose-400">Saldo</span>
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 mt-1">
            Cairkan komisi atau saldo kamu ke Rekening Bank atau E-Wallet.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-500/10 px-4 py-2 rounded-xl border border-rose-100 dark:border-rose-500/20">
          <Banknote className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">Withdrawal System</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 lg:p-10 shadow-sm">
            <div className="space-y-6">
              {/* Method Selection */}
              <div className="relative">
                <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1 block">METODE PENCAIRAN</label>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 rounded-2xl text-sm font-bold text-gray-900 dark:text-white tracking-tight transition-all hover:border-rose-200"
                >
                  <span className={selectedMethod ? '' : 'text-gray-400'}>
                    {selectedMethod ? methods.find(m => m.id === selectedMethod)?.name : 'Pilih tujuan pencairan...'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-2xl rounded-2xl z-50 overflow-hidden"
                    >
                      {methods.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setSelectedMethod(m.id);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors border-b border-gray-50 dark:border-zinc-800 last:border-0"
                        >
                          <span className="text-lg">{m.icon}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{m.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Account Number */}
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1 block">NOMOR REKENING / HP</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Contoh: 081234567890"
                    className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 rounded-2xl text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-rose-200 transition-all font-mono"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <CreditCard className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1 block">NOMINAL PENARIKAN</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-gray-300 dark:text-zinc-700 group-focus-within:text-rose-400 transition-colors">Rp</div>
                  <input 
                    type="text" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="0"
                    className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl text-2xl font-black text-gray-900 dark:text-white outline-none focus:border-rose-200 transition-all placeholder:text-gray-200 dark:placeholder:text-zinc-800"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                   <div className="flex items-center gap-1">
                    <Info className="w-3 h-3 text-rose-500" />
                    <span className="text-[10px] font-bold text-gray-400">Min. Rp 10.000</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={!amount || !selectedMethod}
                  className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group ${
                    amount && selectedMethod
                    ? 'bg-rose-600 text-white shadow-xl shadow-rose-100 dark:shadow-none hover:bg-rose-700 hover:-translate-y-1' 
                    : 'bg-gray-100 dark:bg-zinc-950 text-gray-400 dark:text-zinc-700 cursor-not-allowed'
                  }`}
                >
                  Tarik Saldo Sekarang
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Informasi Penting</h3>
            </div>
            <div className="space-y-6">
              {[
                "Penarikan saldo diproses secara manual dalam waktu 10 menit - 3 jam (Jam Operasional).",
                "Pastikan data nomor rekening / e-wallet sudah benar. Kesalahan input sepenuhnya tanggung jawab pengguna.",
                "Biaya admin per penarikan adalah Rp 2.500 (Gratis jika penarikan di atas Rp 100k).",
                "Riwayat penarikan bisa kamu cek di halaman Mutasi Saldo."
              ].map((text, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                  <p className="text-sm font-medium text-gray-500 dark:text-zinc-400 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-6 flex gap-4">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
             <p className="text-xs font-bold text-rose-700 dark:text-rose-400 leading-relaxed">
              Dilarang keras melakukan penarikan ke rekening orang lain demi keamanan akun Anda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
