import React from 'react';
import { MessageSquare, Users, Bell, ArrowRight, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const CommunityPage = () => {
  const communityLinks = [
    {
      title: "WhatsApp Channel",
      description: "Dapatkan update informasi stok, promo, dan maintenance secara real-time langsung di WhatsApp Anda.",
      icon: Bell,
      link: "https://whatsapp.com/channel/0029VbCwx7mFMqrVF7gIPD2S",
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-900/30",
      buttonText: "Ikuti Saluran",
      stats: "Update Setiap Hari"
    },
    {
      title: "WhatsApp Group",
      description: "Bergabung dengan ribuan member lainnya untuk diskusi, berbagi tips, dan tanya jawab seputar layanan kami.",
      icon: Users,
      link: "https://chat.whatsapp.com/BJPTGWLSHyKIyVtFjuckUj",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      buttonText: "Gabung Grup",
      stats: "1500+ Members"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
          Komunitas <span className="text-rose-600 dark:text-rose-400">Premiumin Plus</span>
        </h1>
        <p className="text-gray-500 dark:text-zinc-500 font-medium">
          Bergabunglah dengan komunitas kami untuk mendapatkan informasi terbaru, tips eksklusif, dan dukungan dari sesama pengguna.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {communityLinks.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-none transition-all duration-500"
          >
            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-[1.25rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
              <item.icon className="w-7 h-7" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 px-3 py-1 rounded-full uppercase tracking-widest">
                Official Access
              </span>
              <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 bg-gray-50 dark:bg-zinc-950 px-3 py-1 rounded-full uppercase tracking-widest border border-gray-100 dark:border-zinc-800">
                {item.stats}
              </span>
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              {item.title}
            </h2>
            
            <p className="text-gray-500 dark:text-zinc-500 font-medium leading-relaxed mb-8">
              {item.description}
            </p>

            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-sm tracking-tight transition-all duration-300 active:scale-95 ${
                index === 0 
                ? 'bg-rose-600 text-white shadow-xl shadow-rose-100 dark:shadow-none hover:bg-rose-700' 
                : 'bg-emerald-600 text-white shadow-xl shadow-emerald-100 dark:shadow-none hover:bg-emerald-700'
              }`}
            >
              {item.buttonText}
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Decorative pattern */}
            <div className="absolute top-6 right-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:scale-150 transition-transform duration-1000">
              <MessageSquare className="w-32 h-32" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rules Section */}
      <div className="bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-[2.5rem] p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Etika Berkomunitas</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Dilarang Spam", desc: "Jangan mengirim pesan yang sama berulang kali atau iklan tanpa izin." },
                { title: "Saling Menghormati", desc: "Gunakan bahasa yang sopan dan hargai sesama anggota komunitas." },
                { title: "Gunakan Search", desc: "Cari jawaban untuk pertanyaan umum di deskripsi grup sebelum bertanya." },
                { title: "No PII", desc: "Jangan menyebarkan data pribadi Anda atau orang lain di area publik." }
              ].map((rule, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 bg-white dark:bg-zinc-900 rounded-lg flex items-center justify-center text-[10px] font-black text-gray-400 dark:text-zinc-500 border border-gray-100 dark:border-zinc-800 shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{rule.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-80 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 leading-tight">Admin Selalu Siap</h4>
              <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium mb-6 leading-relaxed">Admin kami memantau grup setiap hari untuk membantu kendala transaksi Anda.</p>
              <button className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                Cek Admin List <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-50 dark:bg-rose-900/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
};
