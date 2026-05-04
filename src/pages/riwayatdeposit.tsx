import { useEffect, useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { PageHero, PageSection } from './dashboardPageKit';
import { premiuminApi, type DepositRecord } from '../services/api';
import { getApiKey } from '../store/useAuth';
import { formatCurrency } from '../utils/format';

export default function RiwayatDeposit() {
  const [deposits, setDeposits] = useState<DepositRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkingInvoice, setCheckingInvoice] = useState('');
  const apiKey = getApiKey();

  const loadDeposits = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await premiuminApi.deposits(apiKey || undefined);
      setDeposits(response.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Gagal memuat riwayat deposit.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDeposits();
  }, [apiKey]);

  const normalizeStatus = (status = 'pending') => {
    const value = status.toLowerCase();
    if (['success', 'sukses', 'paid'].includes(value)) return { label: 'Success', tone: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300' };
    if (['failed', 'fail', 'gagal'].includes(value)) return { label: 'Gagal', tone: 'border-rose-500/20 bg-rose-500/10 text-rose-300' };
    if (['expired', 'error'].includes(value)) return { label: value === 'expired' ? 'Expired' : 'Error', tone: 'border-amber-500/20 bg-amber-500/10 text-amber-200' };
    return { label: 'Pending', tone: 'border-sky-500/20 bg-sky-500/10 text-sky-300' };
  };

  const checkStatus = async (invoice: string) => {
    setCheckingInvoice(invoice);
    setError('');
    try {
      const response = await premiuminApi.depositStatus(invoice, apiKey || undefined);
      setDeposits((current) => current.map((item) => (item.invoice === invoice ? response.data : item)));
      if (response.data.status === 'success') {
        window.dispatchEvent(new Event('premiuminplus:balance-updated'));
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Gagal cek status pembayaran.');
    } finally {
      setCheckingInvoice('');
    }
  };

  return (
    <div className="riwayat-deposit">
      <PageHero
        title="Riwayat Deposit"
        subtitle="Riwayat top up langsung dari tabel deposit backend."
        slogan="Saldo hanya masuk saat status pembayaran success."
        tone="from-emerald-500/15 via-sky-500/10 to-cyan-500/10"
        chips={['Top up', 'DB sync', 'Saldo real']}
      />
      <div className="mt-4">
        <PageSection title="Daftar deposit" subtitle="History deposit saldo">
          {loading ? <p className="text-sm text-white/45">Memuat riwayat deposit...</p> : null}
          {error ? <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div> : null}
          <div className="space-y-3">
            {deposits.map((deposit) => {
              const status = normalizeStatus(deposit.status);
              const uniqueCode = Math.max(0, Number(deposit.total_bayar || 0) - Number(deposit.amount || 0));

              return (
              <div key={deposit.invoice} className="flex flex-col justify-between gap-3 rounded-[1.2rem] border border-white/10 bg-[#0f0b15] px-4 py-4 lg:flex-row lg:items-center">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{deposit.invoice}</p>
                  <p className="mt-1 text-xs text-white/40">{deposit.created_at || '-'}</p>
                  <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
                    <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white/60">Deposit: <b className="text-white">{formatCurrency(deposit.amount)}</b></span>
                    <span className="rounded-xl border border-brand/20 bg-brand/10 px-3 py-2 text-white/70">Total: <b className="text-white">{formatCurrency(deposit.total_bayar || deposit.amount)}</b></span>
                    <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white/60">Kode unik: <b className="text-white">{formatCurrency(uniqueCode)}</b></span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 text-left lg:text-right">
                  <span className={`inline-flex justify-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${status.tone}`}>
                    {status.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => void checkStatus(deposit.invoice)}
                    disabled={checkingInvoice === deposit.invoice || status.label === 'Success'}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/75 transition hover:bg-white/10 disabled:opacity-50"
                  >
                    <RefreshCcw className={`h-3.5 w-3.5 ${checkingInvoice === deposit.invoice ? 'animate-spin' : ''}`} />
                    {checkingInvoice === deposit.invoice ? 'Cek...' : 'Cek Status'}
                  </button>
                </div>
              </div>
              );
            })}
          </div>
          {!loading && !deposits.length && !error ? <p className="text-sm text-white/45">Belum ada deposit.</p> : null}
        </PageSection>
      </div>
    </div>
  );
}
