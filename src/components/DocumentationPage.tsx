import React from 'react';
import { BookOpen, Code, Terminal, Zap, Clock, Shield, Globe, Cpu, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const DocumentationPage = () => {
  const sections = [
    { title: 'Authentication', desc: 'Secure your API calls using your private secret key.', icon: Shield },
    { title: 'Balance API', desc: 'Check your real-time balance programmatically.', icon: Zap },
    { title: 'Order System', desc: 'Create and monitor orders through our REST API.', icon: Terminal },
    { title: 'IP Whitelist', desc: 'Manage authorized server addresses for your key.', icon: Globe }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Dokumentasi <span className="text-rose-600 dark:text-rose-400">API V2</span>
          </h1>
          <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 mt-1">
            Panduan teknis integrasi layanan Premiumin Plus ke sistem Anda.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 text-emerald-400 border border-emerald-500/20 rounded-xl font-mono text-[10px] uppercase font-black tracking-widest">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
          API STATUS: ONLINE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Doc Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             {sections.map((s, i) => (
                <div key={i} className="p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-rose-200 transition-all cursor-pointer group">
                  <s.icon className="w-5 h-5 text-rose-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-tight">{s.title}</h4>
                </div>
             ))}
          </div>

          {/* Endpoints section */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 lg:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">REST API Endpoints</h3>
            </div>

            <div className="space-y-6">
              {[
                { method: 'GET', path: '/v2/profile', desc: 'Mendapatkan data informasi akun profil.' },
                { method: 'GET', path: '/v2/balance', desc: 'Mengecek saldo aktif saat ini.' },
                { method: 'POST', path: '/v2/order', desc: 'Melakukan pemesanan produk digital.' },
                { method: 'GET', path: '/v2/status/{order_id}', desc: 'Mencek status pesanan secara real-time.' },
              ].map((api, i) => (
                <div key={i} className="group p-5 bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      api.method === 'GET' ? 'bg-rose-100 dark:bg-rose-400/10 text-rose-600' : 'bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600'
                    }`}>
                      {api.method}
                    </span>
                    <span className="text-sm font-black text-gray-900 dark:text-white font-mono tracking-tight">{api.path}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 dark:text-zinc-500">{api.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-zinc-950 rounded-[2.5rem] border border-white/5 p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3 text-rose-400">
                <Code className="w-6 h-6" />
                <h4 className="text-lg font-black text-white tracking-tight uppercase italic">Example Request</h4>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-rose-500/20 rounded-full" />
                <div className="w-3 h-3 bg-amber-500/20 rounded-full" />
                <div className="w-3 h-3 bg-emerald-500/20 rounded-full" />
              </div>
            </div>

            <div className="font-mono text-sm leading-relaxed relative z-10">
              <div className="text-rose-400 opacity-60 mb-2">{'// POST /v2/order'}</div>
              <div className="text-white">
                <span className="text-rose-400">await</span> fetch(<span className="text-emerald-400">'https://api.premku.com/v2/order'</span>, {'{'}
                <div className="pl-6">
                  method: <span className="text-emerald-400">'POST'</span>,
                  <br />
                  headers: {'{'}
                  <div className="pl-6">
                    <span className="text-emerald-400">'X-API-KEY'</span>: <span className="text-emerald-400">'YOUR_API_KEY'</span>,
                    <br />
                    <span className="text-emerald-400">'Content-Type'</span>: <span className="text-emerald-400">'application/json'</span>
                  </div>
                  {'}'},
                  <br />
                  body: JSON.stringify({'{'}
                  <div className="pl-6">
                    service: <span className="text-amber-400">"NETFLIX-1M"</span>,
                    <br />
                    target: <span className="text-amber-400">"digitalpanel2024"</span>
                  </div>
                  {'}'})
                </div>
                {'}'});
              </div>
            </div>
            
            {/* Visual glow */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
          </div>
        </div>

        {/* Sidebar Help */}
        <div className="lg:col-span-4 space-y-6">
           <div className="p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm overflow-hidden relative group">
              <div className="relative z-10 text-center">
                 <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                   <BookOpen className="w-10 h-10" />
                 </div>
                 <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">SDK Community</h4>
                 <p className="text-xs font-medium text-gray-500 dark:text-zinc-500 leading-relaxed mb-6">Gunakan wrapper SDK dari komunitas kami untuk integrasi yang lebih cepat di PHP, Python, atau Node.js.</p>
                 <button className="flex items-center gap-2 mx-auto text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest hover:gap-3 transition-all">
                    Visit GitHub <ChevronRight className="w-3 h-3" />
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 dark:bg-rose-900/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
           </div>

           <div className="p-8 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] shadow-sm">
              <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">Butuh Bantuan Teknis?</h4>
              <p className="text-xs font-medium text-gray-400 dark:text-zinc-500 leading-relaxed mb-6">Tim developer kami siap membantu proses integrasi Anda 24/7 melalui grup khusus developer.</p>
              <button className="w-full py-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl text-xs font-black text-gray-900 dark:text-white flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                 <Zap className="w-4 h-4 text-amber-500" />
                 Gabung Dev Channel
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
