import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Camera, 
  Shield, 
  Save, 
  Smartphone,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: 'digitalpanel',
    email: 'digitalpanel2024@gmail.com',
    fullName: 'Digital Panel Admin',
    whatsapp: '6285888009931',
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Profil <span className="text-rose-600 dark:text-rose-400">Pengguna</span>
        </h1>
        <p className="text-sm font-medium text-gray-500 dark:text-zinc-500 mt-1">
          Kelola informasi akun dan pengaturan keamanan kamu di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Profile Card */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 shadow-sm flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 shadow-xl overflow-hidden bg-rose-50 dark:bg-zinc-950 flex items-center justify-center">
                 <User className="w-16 h-16 text-rose-400 opacity-50" />
              </div>
              <button className="absolute bottom-1 right-1 p-2.5 bg-rose-600 text-white rounded-xl shadow-lg border-2 border-white dark:border-zinc-900 hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{formData.fullName}</h2>
            <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-1">Bronze Member</p>
            
            <div className="mt-8 pt-8 border-t border-gray-50 dark:border-white/5 w-full space-y-4 text-left">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-lg flex items-center justify-center">
                   <Mail className="w-4 h-4" />
                 </div>
                 <div className="truncate flex-1">
                    <p className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Email</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{formData.email}</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                   <Smartphone className="w-4 h-4" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[9px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest">WhatsApp</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{formData.whatsapp}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Edit Form */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 p-8 lg:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Informasi Dasar</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "USERNAME", value: formData.username, icon: User, key: "username" },
                { label: "NAMA LENGKAP", value: formData.fullName, icon: User, key: "fullName" },
                { label: "NOMOR WHATSAPP", value: formData.whatsapp, icon: Smartphone, key: "whatsapp" },
                { label: "ALAMAT EMAIL", value: formData.email, icon: Mail, key: "email" },
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-widest px-1">{field.label}</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <field.icon className="w-4 h-4 text-gray-300 dark:text-zinc-700" />
                    </div>
                    <input 
                      type="text" 
                      value={field.value}
                      onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-rose-200 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-gray-50 dark:border-white/5 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-700 transition-all active:scale-95 shadow-xl shadow-rose-100 dark:shadow-none">
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
              <button className="flex-1 py-4 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all active:scale-95">
                <Lock className="w-4 h-4" /> Ganti Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
