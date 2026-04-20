import React from 'react';
import { MenuSection } from '../../data/sidebarConfig';
import { SidebarItem } from './SidebarItem';

interface SidebarSectionProps {
  section: MenuSection;
  onClose?: () => void;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ section, onClose }) => {
  return (
    <div className="mb-6">
      <h3 className="px-4 mb-2 text-[11px] font-bold tracking-widest text-gray-400 dark:text-zinc-600 uppercase">
        {section.label}
      </h3>
      <div className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem key={item.name} item={item} onClose={onClose} />
        ))}
      </div>
    </div>
  );
};
