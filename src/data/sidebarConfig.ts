import { 
  LayoutDashboard, 
  MessageCircle, 
  UserCircle, 
  Wallet, 
  Tags, 
  Banknote, 
  History, 
  Receipt, 
  RefreshCcw, 
  User, 
  AlertCircle, 
  Users, 
  Code,
  Bot
} from 'lucide-react';

export interface MenuItem {
  name: string;
  icon: any;
  href: string;
}

export interface MenuSection {
  label: string;
  items: MenuItem[];
}

export const sidebarConfig: MenuSection[] = [
  {
    label: "UTAMA",
    items: [
      { name: "Dasbor", icon: LayoutDashboard, href: "/dashboard" },
      { name: "Komunitas WA", icon: MessageCircle, href: "/dashboard/community" }
    ]
  },
  {
    label: "TRANSAKSI",
    items: [
      { name: "Akun Pesanan", icon: UserCircle, href: "/dashboard/accounts" },
      { name: "Deposit Saldo", icon: Wallet, href: "/dashboard/deposit" },
      { name: "Daftar Harga", icon: Tags, href: "/dashboard/harga" },
      { name: "Tarik Saldo", icon: Banknote, href: "/dashboard/withdraw" },
      { name: "Riwayat Pesanan", icon: History, href: "/dashboard/orders" },
      { name: "Riwayat Deposit", icon: Receipt, href: "/dashboard/deposits" },
      { name: "Mutasi Saldo", icon: RefreshCcw, href: "/dashboard/mutasi" }
    ]
  },
  {
    label: "LAINNYA",
    items: [
      { name: "Profil", icon: User, href: "/dashboard/profile" },
      { name: "Create Bot/Panel", icon: Bot, href: "/dashboard/builder" },
      { name: "Dokumentasi API", icon: Code, href: "/dashboard/docs" }
    ]
  }
];
