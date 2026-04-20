import React, { useState } from 'react';
import { 
  Wallet, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  CreditCard, 
  Cpu, 
  Code, 
  Copy, 
  RotateCw, 
  Eye, 
  Trophy, 
  ArrowUpRight, 
  Terminal,
  CircleDot,
  History,
  ExternalLink
} from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    { label: "TOTAL DEPOSIT", value: "Rp66,657", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "TOTAL BELANJA", value: "Rp19,950", icon: ShoppingCart, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { label: "TOTAL PESANAN", value: "14 Trx", icon: History, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
    { label: "PRODUK AKTIF", value: "32 Layanan", icon: Cpu, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-zinc-900 p-6 rounded-[1.5rem] border border-gray-100 dark:border-zinc-800 flex items-center gap-4 transition-all hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-none">
          <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-0.5">{stat.label}</p>
            <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DashboardHome = () => {
  const [showKey, setShowKey] = useState(false);
  const secretKey = "••••••••••••••••••••••••••••••••••••••••";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {getGreeting()}, <span className="text-rose-600 dark:text-rose-400">digitalpanel123</span>
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 mt-1">
            Kelola transaksi dan akses API kamu dengan mudah di Premku V2.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-500/20 shadow-sm border-dashed">
          <CircleDot className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Premku Card Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[16/9.5] bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-950 dark:to-black rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden group border border-white/5">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">PREMKU CARD</p>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CreditCard className="w-5 h-5 opacity-50" />
                    <span className="text-xs font-bold uppercase tracking-widest">Balance</span>
                  </div>
                </div>
                <div className="w-10 h-8 bg-amber-400/20 border border-amber-400/30 rounded-md flex items-center justify-center">
                  <div className="w-6 h-4 border border-amber-400/40 rounded flex flex-wrap gap-0.5 p-0.5">
                    <div className="w-1 h-1 bg-amber-400/40 rounded-full" />
                    <div className="w-1 h-1 bg-amber-400/40 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="my-4">
                <h3 className="text-4xl font-black tracking-tight group-hover:scale-105 transition-transform origin-left duration-500">
                  <span className="text-zinc-500 text-xl font-black mr-1">Rp</span>
                  49.182
                </h3>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">CARD HOLDER</p>
                  <p className="text-sm font-black tracking-widest uppercase">DIGITALPANEL123</p>
                </div>
                <div className="opacity-40 group-hover:opacity-60 transition-opacity">
                  <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center p-1">
                    <div className="w-full h-full border border-white rounded-full flex items-center justify-center p-1">
                      <div className="w-full h-full bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gloss shine effect */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent rotate-6 -translate-x-12" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-rose-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-rose-100 dark:shadow-none hover:bg-rose-700 hover:-translate-y-0.5 transition-all active:scale-95 group">
              <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Isi Saldo
            </button>
            <button className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white py-4 rounded-2xl font-black text-sm border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all active:scale-95 group">
              <History className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:rotate-12 transition-transform" />
              Mutasi
            </button>
          </div>
        </div>

        {/* API Credentials Section */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">API Credentials</h3>
            </div>
            <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-zinc-950 px-3 py-1 rounded-full uppercase tracking-widest border border-gray-100 dark:border-zinc-800">Developer Access</span>
          </div>
          <p className="text-xs font-medium text-gray-400 dark:text-zinc-500 mb-8 leading-relaxed max-w-lg">
            Gunakan kunci API ini untuk mengintegrasikan website atau bot WhatsApp Anda secara langsung ke sistem Premiumku V2.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-2 px-1">YOUR SECRET KEY</p>
              <div className="relative group/key">
                <div className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 pr-12 rounded-2xl text-sm font-bold text-gray-900 dark:text-white tracking-[0.2em] transition-all focus-within:border-rose-200 dark:focus-within:border-rose-500">
                  {showKey ? "pk_live_51MvX7sZ_7p6Xp7S8_hVQ4r9G7v9G7p6Xp7-7Xp7" : secretKey}
                </div>
                <button 
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-zinc-800 text-white py-4 rounded-2xl font-black text-sm hover:bg-black dark:hover:bg-zinc-700 transition-all active:scale-95 group">
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Salin Key
              </button>
              <button className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 text-rose-500 border border-rose-100 dark:border-rose-500/20 py-4 rounded-2xl font-black text-sm hover:bg-rose-50 dark:hover:bg-rose-500/5 transition-all active:scale-95 group">
                <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>

      <DashboardStats />

      {/* Bottom Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Top Sultan */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Top Sultan</h3>
          </div>
          <div className="space-y-4">
            {[
              { rank: 1, user: "6285××××16", value: "1,004k", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
              { rank: 2, user: "6285××××36", value: "450k", color: "text-gray-400", bg: "bg-gray-50 dark:bg-gray-400/10" },
              { rank: 3, user: "6287××××45", value: "365k", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border border-gray-50 dark:border-zinc-800 flex items-center justify-between hover:scale-[1.02] transition-transform cursor-pointer ${idx === 0 ? 'bg-amber-50/30 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${item.bg} ${item.color} rounded-lg flex items-center justify-center`}>
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{item.user}</p>
                    <p className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Top Spender</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${idx === 0 ? 'text-emerald-600' : 'text-gray-900 dark:text-white'}`}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat Terakhir */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Riwayat Terakhir</h3>
            </div>
            <button className="text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-3 py-1.5 rounded-full uppercase tracking-widest hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors">Lihat Semua</button>
          </div>
          <div className="space-y-6">
            {[
              { name: "AM Exp April 2027", date: "20 Apr 2026, 17:01", price: "Rp800" },
              { name: "AM Exp Januari 2027", date: "20 Apr 2026, 16:58", price: "Rp500" },
              { name: "Capcut Pro 1 Bulan Fullgar", date: "20 Apr 2026, 07:38", price: "Rp4.200" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group">
                <div className="flex flex-col">
                  <p className="font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-rose-600 transition-colors">{item.name}</p>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium tracking-wide font-mono">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900 dark:text-white">{item.price}</p>
                  <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase rounded-md border border-emerald-100 dark:border-emerald-500/20">SUKSES</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Console */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">API Console</h3>
            </div>
            <button className="text-[10px] font-black text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-full uppercase tracking-widest hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors flex items-center gap-1">
              Docs <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="bg-zinc-950 rounded-2xl p-6 font-mono text-[11px] relative overflow-hidden group border border-white/5">
            <div className="flex gap-1.5 mb-4 opacity-30">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 uppercase tracking-widest text-[9px] font-black">BASH</span>
            </div>
            <div className="space-y-1.5 text-zinc-400">
              <p className="text-zinc-500"><span className="text-emerald-500">dev@premku:~#</span> curl -X POST \</p>
              <p className="pl-4 text-rose-400 tracking-tight">https://premku.com/api/order \</p>
              <p className="pl-4 italic"><span className="text-zinc-600">-H</span> <span className="text-zinc-200">"Content-Type: application/json"</span> \</p>
              <p className="pl-4 italic"><span className="text-zinc-600">-d</span> <span className="text-zinc-200 ml-1">'{'{'}</span></p>
              <p className="pl-8"><span className="text-rose-400">"api_key"</span>: <span className="text-amber-300">"ea26f9..."</span>,</p>
              <p className="pl-8"><span className="text-rose-400">"product_id"</span>: <span className="text-amber-300">"netflix_1b"</span>,</p>
              <p className="pl-8"><span className="text-rose-400">"qty"</span>: 1</p>
              <p className="pl-4 text-zinc-200">{'}'}'</p>
              <div className="flex items-center gap-1.5 pt-2 border-t border-white/5 mt-4">
                <span className="text-emerald-500">dev@premku:~#</span>
                <span className="w-1.5 h-3 bg-white/40 animate-pulse" />
              </div>
            </div>
            
            <button className="absolute top-4 right-4 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
