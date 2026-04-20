import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  Zap, 
  Shield, 
  Cpu, 
  Database, 
  Server,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

export const CreateBotPage = () => {
  const [botType, setBotType] = useState('telegram');
  
  const botTemplates = [
    { id: 'telegram', name: 'Telegram Bot', icon: '📎', price: 'Rp 25.000', desc: 'Bot transaksi otomatis via Telegram API.' },
    { id: 'whatsapp', name: 'WhatsApp Bot', icon: '💬', price: 'Rp 50.000', desc: 'Bot interaktif untuk order via WhatsApp.' },
    { id: 'panel', name: 'Reseller Panel', icon: '🖥️', price: 'Rp 150.000', desc: 'Panel website pribadi dengan domain sendiri.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Create <span className="text-rose-600 dark:text-rose-400">Bot / Panel</span>
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 mt-1">
            Bangun ekosistem bisnis digitalmu sendiri dengan bot otomatis.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Premium Builder</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
            <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest mb-6 block">PILIH TEMPLATE SISTEM</label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {botTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setBotType(template.id)}
                  className={`p-6 rounded-3xl border transition-all text-center flex flex-col items-center gap-3 group ${
                    botType === template.id 
                    ? 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-500/40' 
                    : 'bg-gray-50 dark:bg-zinc-950/50 border-gray-100 dark:border-zinc-800 hover:border-rose-100'
                  }`}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{template.icon}</span>
                  <div>
                    <h4 className={`text-sm font-black tracking-tight ${botType === template.id ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                      {template.name}
                    </h4>
                    <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 mt-1">{template.price}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">NAMA BOT / DOMAIN PANEL</label>
                  <div className="relative">
                    <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-zinc-700" />
                    <input 
                      type="text" 
                      placeholder="Contoh: DigitalStoreBot atau mystore.com"
                      className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-rose-200 transition-all"
                    />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">API KEY INTEGRASI</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 dark:text-zinc-700" />
                    <input 
                      type="password" 
                      placeholder="Masukkan API Key dari menu Profil"
                      className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-rose-200 transition-all font-mono"
                    />
                  </div>
               </div>
            </div>

            <button className="w-full py-5 mt-10 bg-rose-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-700 transition-all shadow-xl shadow-rose-100 dark:shadow-none translate-y-0 active:scale-95 group">
              Build My System <Zap className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right: Preview/Spec */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-zinc-950 rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center">
                     <Cpu className="w-5 h-5" />
                   </div>
                   <h3 className="text-xl font-black text-white tracking-tight">System Specification</h3>
                 </div>

                 <div className="space-y-4">
                    {[
                      { icon: Server, label: "Hosting", val: "Cloud Vps High-Performance" },
                      { icon: Database, label: "Database", val: "Realtime Sync System" },
                      { icon: Shield, label: "Security", val: "SSL & Anti-DDoS Protection" },
                      { icon: Zap, label: "Speed", val: "Latency < 100ms Worldwide" },
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                           <spec.icon className="w-4 h-4 text-rose-400" />
                           <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{spec.label}</span>
                        </div>
                        <span className="text-xs font-black text-white">{spec.val}</span>
                      </div>
                    ))}
                 </div>

                 <div className="mt-8 p-4 bg-rose-600/10 border border-rose-500/20 rounded-2xl">
                    <div className="flex gap-3">
                       <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                       <p className="text-[10px] font-medium text-rose-200 leading-relaxed">
                         Sistem bot & panel kami menggunakan core engine terbaru yang menjamin kecepatan transaksi hingga 3x lipat dibanding bot konvensional.
                       </p>
                    </div>
                 </div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 rounded-full blur-[80px] -mr-24 -mt-24" />
           </div>

           <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm">
              <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">Butuh Custom Bot?</h4>
              <p className="text-xs font-medium text-gray-500 dark:text-zinc-500 leading-relaxed mb-6">Jika kamu membutuhkan fitur khusus seperti kustomisasi website atau bot dengan logika rumit, hubungi tim developer kami.</p>
              <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest hover:gap-3 transition-all">
                Hubungi Developer <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
