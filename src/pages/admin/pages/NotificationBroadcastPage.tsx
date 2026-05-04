import { useEffect, useState } from 'react';
import { BellRing, Send } from 'lucide-react';
import { PageHero, PageSection, NeonCard } from '../../dashboardPageKit';
import { getApiKey } from '../../../store/useAuth';
import { premiuminApi, type AppRole, type NotificationRecord } from '../../../services/api';

type TargetRole = 'all' | AppRole;

export function NotificationBroadcastPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetRole, setTargetRole] = useState<TargetRole>('all');
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiKey = getApiKey();

  const loadNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await premiuminApi.adminNotifications(apiKey || undefined);
      setNotifications(response.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Gagal memuat notifikasi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, [apiKey]);

  const submit = async () => {
    if (!title.trim() || !message.trim()) {
      setError('Judul dan pesan wajib diisi.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await premiuminApi.adminCreateNotification(
        {
          title: title.trim(),
          message: message.trim(),
          target_role: targetRole,
        },
        apiKey || undefined,
      );
      setTitle('');
      setMessage('');
      setTargetRole('all');
      setSuccess('Notifikasi berhasil dikirim ke database.');
      await loadNotifications();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Gagal mengirim notifikasi.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <PageHero
        title="Pesan Notifikasi"
        subtitle="Kirim pesan broadcast ke semua anggota, reseller, member, atau admin."
        slogan="Pesan tersimpan di database dan muncul di dropdown notifikasi user."
        tone="from-brand/15 via-fuchsia-500/10 to-sky-500/10"
        chips={['Broadcast', 'Database', 'Dropdown']}
      />

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <PageSection title="Buat notifikasi" subtitle="Broadcast pesan">
          <div className="space-y-3">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#0b0f1a] px-4 py-3 text-sm text-white outline-none focus:border-brand/50"
              placeholder="Judul notifikasi"
            />
            <select
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value as TargetRole)}
              className="w-full rounded-2xl border border-white/10 bg-[#0b0f1a] px-4 py-3 text-sm text-white outline-none focus:border-brand/50"
            >
              <option value="all">Semua anggota</option>
              <option value="reseller">Reseller</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-36 w-full rounded-2xl border border-white/10 bg-[#0b0f1a] px-4 py-3 text-sm leading-6 text-white outline-none focus:border-brand/50"
              placeholder="Isi pesan notifikasi"
            />
            {error ? <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
            {success ? <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{success}</div> : null}
            <button
              type="button"
              onClick={submit}
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {saving ? 'Mengirim...' : 'Kirim Notifikasi'}
            </button>
          </div>
        </PageSection>

        <PageSection title="Riwayat notifikasi" subtitle="Pesan terbaru">
          {loading ? <p className="text-sm text-white/45">Memuat notifikasi...</p> : null}
          <div className="space-y-3">
            {notifications.map((item) => (
              <NeonCard key={item.id}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <BellRing className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">
                        {item.target_role}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/55">{item.message}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-white/30">{item.created_at || '-'}</p>
                  </div>
                </div>
              </NeonCard>
            ))}
          </div>
          {!loading && !notifications.length ? <p className="text-sm text-white/45">Belum ada notifikasi.</p> : null}
        </PageSection>
      </div>
    </div>
  );
}
