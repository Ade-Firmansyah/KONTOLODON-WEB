import { useLocation } from 'react-router-dom';
import { Users, ClipboardList, SlidersHorizontal, BellRing } from 'lucide-react';
import { AppShell, type NavSection } from '../components/layout/AppShell';
import { UserManagementPage } from './admin/pages/UserManagementPage';
import { MonitoringTransaksiPage } from './admin/pages/MonitoringTransaksiPage';
import { SettingMarkupPage } from './admin/pages/SettingMarkupPage';
import { NotificationBroadcastPage } from './admin/pages/NotificationBroadcastPage';

interface AdminPanelPageProps {
  session: {
    username: string;
    role: string;
  };
  onLogout: () => void;
}

const adminSections: NavSection[] = [
  {
    label: 'Admin Panel',
    items: [
      { label: 'User Management', to: '/admin/user-management', icon: Users, end: true },
      { label: 'Monitoring Transaksi', to: '/admin/monitoring-transaksi', icon: ClipboardList },
      { label: 'Setting Markup', to: '/admin/setting-markup', icon: SlidersHorizontal },
      { label: 'Pesan Notifikasi', to: '/admin/pesan-notifikasi', icon: BellRing },
    ],
  },
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/admin/user-management': {
    title: 'User Management',
    subtitle: 'Kelola user, edit data, tambah user baru, dan hapus user dari satu layar.',
  },
  '/admin/monitoring-transaksi': {
    title: 'Monitoring Transaksi',
    subtitle: 'Pantau top up dan user order secara terpisah supaya alurnya mudah dibaca.',
  },
  '/admin/setting-markup': {
    title: 'Setting Markup',
    subtitle: 'Atur markup bertingkat sesuai range harga dengan logika yang lebih masuk akal.',
  },
  '/admin/pesan-notifikasi': {
    title: 'Pesan Notifikasi',
    subtitle: 'Kirim broadcast notifikasi ke anggota, member, reseller, atau admin.',
  },
};

export function AdminPanelPage({ session, onLogout }: AdminPanelPageProps) {
  const location = useLocation();
  const path = location.pathname === '/admin/' ? '/admin/user-management' : location.pathname;
  const meta = pageMeta[path] || pageMeta['/admin/user-management'];

  const page = (() => {
    if (path === '/admin/monitoring-transaksi') return <MonitoringTransaksiPage />;
    if (path === '/admin/setting-markup') return <SettingMarkupPage />;
    if (path === '/admin/pesan-notifikasi') return <NotificationBroadcastPage />;
    return <UserManagementPage />;
  })();

  return (
    <AppShell
      title="Admin Panel"
      subtitle={meta.subtitle}
      username={session.username}
      role="admin"
      sections={adminSections}
      onLogout={onLogout}
    >
      {page}
    </AppShell>
  );
}
