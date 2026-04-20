import React from 'react';
import { sidebarConfig } from '../../data/sidebarConfig';
import { SidebarSection } from './SidebarSection';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white dark:bg-zinc-950 border-r border-gray-100 dark:border-zinc-800 transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600 shadow-lg shadow-rose-200 dark:shadow-rose-900/20">
                <span className="text-lg font-bold text-white uppercase italic">L</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                Premiumin<span className="text-rose-600">Plus</span>
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 lg:hidden hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide">
            {sidebarConfig.map((section) => (
              <SidebarSection key={section.label} section={section} onClose={onClose} />
            ))}
          </div>

          {/* Footer Card */}
          <div className="p-4 mt-auto">
            <div className="p-4 bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl">
              <p className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Punya Kendala?</p>
              <button className="w-full py-2.5 text-sm font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-all shadow-md shadow-rose-100 dark:shadow-rose-900/20">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
