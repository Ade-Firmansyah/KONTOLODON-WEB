import React, { useState } from 'react';
import { 
  Info, 
  ArrowRight, 
  QrCode, 
  CheckCircle2, 
  HelpCircle,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const DepositPage = () => {
  const [amount, setAmount] = useState<string>('');
  const quickAmounts = ['10.000', '25.000', '50.000', '100.000', '250.000', '500.000'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Isi Saldo <span className="text-rose-600 dark:text-rose-400">Otomatis</span>
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-zinc-500 mt-1">
            Top up saldo instan 24 jam via QRIS (All E-Wallet & Bank).
          </p>
        </div>
        <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-500/10 px-4 py-2 rounded-xl border border-rose-100 dark:border-rose-500/20">
          <QrCode className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">QRIS PAYMENT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Input Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 lg:p-10 shadow-sm">
            <div className="space-y-8">
              {/* Nominal Input */}
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4 px-1 block">NOMINAL DEPOSIT</label>
                <div className="relative group/input">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-gray-300 dark:text-zinc-700 group-focus-within/input:text-rose-600 transition-colors">Rp</div>
                  <input 
                    type="text" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="0"
                    className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-8 pl-20 rounded-3xl text-4xl font-black text-gray-900 dark:text-white outline-none focus:border-rose-200 dark:focus:border-rose-500 transition-all placeholder:text-gray-200 dark:placeholder:text-zinc-800"
                  />
                </div>
                <div className="flex justify-between items-center mt-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <Info className="w-3 h-3 text-rose-600" />
                    <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500">Minimal Rp 1.000</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500">Maks Rp 1.000.000</span>
                </div>
              </div>

              {/* Quick Select */}
              <div>
                <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-4 px-1 block">PILIHAN CEPAT</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val.replace(/\./g, ''))}
                      className="group p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center transition-all hover:border-rose-200 hover:shadow-md hover:shadow-rose-50 dark:hover:shadow-none active:scale-95"
                    >
                      <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 mb-1 group-hover:text-rose-600 transition-colors">+ Rp</span>
                      <span className="text-lg font-black text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">{val}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={!amount || parseInt(amount) < 1000}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group ${
                  amount && parseInt(amount) >= 1000
                  ? 'bg-rose-600 text-white shadow-2xl shadow-rose-100 dark:shadow-none hover:bg-rose-700 hover:-translate-y-1' 
                  : 'bg-gray-100 dark:bg-zinc-950 text-gray-400 dark:text-zinc-700 cursor-not-allowed'
                }`}
              >
                Lanjut Pembayaran
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Card: Instructions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Cara Pembayaran</h3>
              </div>

              <div className="space-y-8">
                {[
                  {
                    step: 1,
                    text: <>Sistem akan men-generate <b>QRIS dinamis</b>. Anda bebas scan menggunakan DANA, GoPay, OVO, ShopeePay, atau aplikasi Mobile Banking.</>
                  },
                  {
                    step: 2,
                    text: <>Pastikan nominal transfer <b>SAMA PERSIS</b> hingga 3 digit terakhir (kode unik). Jika tidak sesuai, saldo tidak akan masuk otomatis.</>
                  },
                  {
                    step: 3,
                    text: <>Saldo akan bertambah otomatis ke akun Anda dalam waktu <b>1 - 5 menit</b> setelah pembayaran berhasil divalidasi.</>
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 bg-rose-50 dark:bg-rose-900/30 rounded-lg flex items-center justify-center text-xs font-black text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20">
                      {item.step}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed pt-1 font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative background shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-500/5 rounded-full blur-[60px] -mr-16 -mt-16" />
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20 rounded-[1.5rem] p-6 flex gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-xs font-bold text-amber-700 dark:text-amber-500 leading-relaxed">
              Jika saldo belum masuk lebih dari 10 menit, segera hubungi Admin via WhatsApp dengan menyertakan bukti struk transfer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
