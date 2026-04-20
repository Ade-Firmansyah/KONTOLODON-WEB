import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '../../data/sidebarConfig';

interface SidebarItemProps {
  item: MenuItem;
  onClose?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, onClose }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive
            ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-semibold'
            : 'text-gray-500 dark:text-zinc-500 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white'
        }`
      }
    >
      <Icon className={`w-5 h-5 transition-colors ${
        'group-hover:text-rose-600 dark:group-hover:text-rose-400'
      }`} />
      <span className="text-sm tracking-tight">{item.name}</span>
    </NavLink>
  );
};
