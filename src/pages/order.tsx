import { useEffect, useMemo, useState } from 'react';
import { ImageIcon, MessageCircle, Minus, Phone, Plus, Sparkles, ShoppingBag, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { PageHero, NeonCard } from './dashboardPageKit';
import { formatCurrency } from '../utils/format';
import { getApiKey } from '../store/useAuth';
import { premiuminApi, type ProductRecord } from '../services/api';

const waOrderLink = 'https://wa.me/6285888009931?text=Masih%20ada%20slot%20join%20reseller%20%3F';

export default function Order() {
  const [catalog, setCatalog] = useState<ProductRecord[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [lastOrder, setLastOrder] = useState<Awaited<ReturnType<typeof premiuminApi.order>>['data'] | null>(null);
  const apiKey = getApiKey();

  useEffect(() => {
    const loadCatalog = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await premiuminApi.products(apiKey || undefined);
        setCatalog(response.data);
        setSelectedProductId(response.data[0]?.id || 1);
        const meResponse = await premiuminApi.me(apiKey || undefined);
        setSaldo(meResponse.data.saldo);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : 'Gagal memuat katalog produk.');
      } finally {
        setLoading(false);
      }
    };

    void loadCatalog();
  }, [apiKey]);

  const selectedProduct = useMemo(
    () => catalog.find((item) => item.id === selectedProductId) || catalog[0],
    [catalog, selectedProductId],
  );

  const total = (selectedProduct?.price_sell || 0) * qty;

  const submitOrder = async () => {
    if (!selectedProduct) {
      setError('Produk belum tersedia.');
      return;
    }

    setOrdering(true);
    setError('');
    setResult('');
    setLastOrder(null);

    if (saldo < total) {
      setError('Saldo tidak cukup');
      setOrdering(false);
      return;
    }

    try {
      const response = await premiuminApi.order({ product_id: selectedProduct.id, qty }, apiKey || undefined);
      const refreshed = await premiuminApi.orderStatus(response.data.invoice, apiKey || undefined);
      setResult(`Order berhasil dibuat. Invoice: ${response.data.invoice}`);
      setLastOrder(refreshed.data);
      const meResponse = await premiuminApi.me(apiKey || undefined);
      setSaldo(meResponse.data.saldo);
      window.dispatchEvent(new Event('premiuminplus:balance-updated'));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Gagal membuat order.');
    } finally {
      setOrdering(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="order space-y-4">
      <PageHero
        title="Order Akun"
        subtitle="Pilih layanan, atur qty, lalu kirim pesanan dengan alur yang cepat dan rapi."
        slogan="Cepat diproses, jelas detailnya, dan tetap nyaman dilihat di desktop maupun HP."
        tone="from-emerald-500/15 via-sky-500/10 to-brand/10"
        chips={['Produk premium', 'Checkout ringkas', 'Support WA']}
      />

      <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
        <NeonCard className="overflow-hidden">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">Preview layanan</p>
                <h3 className="text-lg font-extrabold text-white">{selectedProduct?.name || 'Memuat...'}</h3>
              </div>
            </div>
            <div className="rounded-[1.05rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(14,165,233,0.08))] p-5 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Harga layanan</p>
              <p className="mt-3 text-3xl font-black text-white">{formatCurrency(selectedProduct?.price_sell || 0)}</p>
              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/55">
                {selectedProduct?.note || 'Produk dikirim setelah order masuk ke antrian.'}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Saldo kamu</p>
                <p className="mt-2 text-lg font-black text-white">{formatCurrency(saldo)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Status</p>
                <p className="mt-2 text-lg font-black text-emerald-300">Siap order</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-brand/20 bg-brand/10 px-4 py-3 text-sm text-white/75">
              <Sparkles className="h-4 w-4 text-brand-light" />
              Pesanan yang jelas biasanya lebih cepat diproses.
            </div>
          </div>
        </NeonCard>

        <NeonCard>
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Detail Order</h3>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">Jenis layanan</p>
              <p className="mt-1 text-sm font-bold text-white">Akun digital</p>
            </div>
          </div>

          <div className="mt-4 space-y-3.5">
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Pilih layanan</span>
              <select
                value={selectedProduct?.id || 0}
                onChange={(event) => setSelectedProductId(Number(event.target.value))}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f0b15] px-3.5 py-3 text-sm font-semibold text-white outline-none transition focus:border-brand/60"
              >
                {!catalog.length ? <option value={0}>Belum ada produk</option> : null}
                {catalog.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {formatCurrency(item.price_sell)}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-3 rounded-xl border border-white/10 bg-[#0b0f1a] p-3 sm:grid-cols-[88px_1fr]">
              <div className="grid h-20 w-full place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {selectedProduct?.image ? (
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-7 w-7 text-white/30" />
                )}
              </div>
              <div>
                <p className="text-sm font-extrabold text-white">{selectedProduct?.name || '-'}</p>
                <p className="mt-1 text-xs leading-5 text-white/50">{selectedProduct?.note || 'Produk digital siap diproses.'}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.14em]">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">Stok {selectedProduct?.stock ?? 0}</span>
                  <span className="rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 text-white">{formatCurrency(selectedProduct?.price_sell || 0)}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_132px]">
              <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Kirim ke WA</span>
                <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0f0b15] px-3.5 py-3 text-sm font-semibold text-white">
                  <MessageCircle className="h-4 w-4 text-emerald-300" />
                  6285888009931
                </div>
              </label>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Qty</span>
                <div className="mt-1.5 grid grid-cols-3 overflow-hidden rounded-xl border border-white/10 bg-[#0f0b15]">
                  <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} className="grid h-[44px] place-items-center text-white/70 transition hover:bg-white/5">
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="grid h-[44px] place-items-center border-x border-white/10 text-sm font-bold text-white">{qty}</div>
                  <button type="button" onClick={() => setQty((value) => value + 1)} className="grid h-[44px] place-items-center text-white/70 transition hover:bg-white/5">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#0b0f1a] px-4 py-3.5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">Total Tagihan</p>
                  <p className="mt-1 text-xs font-semibold text-emerald-300">{selectedProduct?.name || '-'}</p>
                </div>
                <p className="text-2xl font-black text-white">{formatCurrency(total)}</p>
              </div>
            </div>

            {loading && <p className="text-xs text-white/45">Memuat katalog produk...</p>}
            {error && <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>}
            {result && <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{result}</div>}
            {lastOrder ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-[#0b0f1a] p-4">
                <p className="text-sm font-extrabold text-white">{lastOrder.product_name || selectedProduct?.name}</p>
                <p className="mt-1 text-xs text-white/50">{lastOrder.description || selectedProduct?.note || 'Pesanan tercatat di Riwayat Pesanan.'}</p>
                <div className="mt-3 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
                  <span>Username: <b className="text-white">{lastOrder.accounts?.[0]?.username || lastOrder.account_data?.email || '-'}</b></span>
                  <span>Password: <b className="text-white">{lastOrder.accounts?.[0]?.password || lastOrder.account_data?.password || '-'}</b></span>
                </div>
              </div>
            ) : null}

            <button
              onClick={submitOrder}
              disabled={ordering || loading || !selectedProduct}
              className="w-full rounded-xl bg-brand px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg shadow-brand/20 transition hover:scale-[1.01] disabled:opacity-60"
            >
              {ordering ? 'Memproses...' : 'Order Sekarang'}
            </button>
          </div>
        </NeonCard>
      </div>

      <section className="rounded-[1.25rem] border border-emerald-500/20 bg-[linear-gradient(145deg,rgba(16,185,129,0.12),rgba(14,165,233,0.08))] p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Masih ada pertanyaan?</h3>
              <p className="mt-1 max-w-lg text-xs leading-5 text-white/55">Konsultasikan kebutuhanmu langsung ke tim kami via WhatsApp.</p>
            </div>
          </div>
          <a href={waOrderLink} target="_blank" rel="noreferrer" className="inline-flex min-w-[220px] items-center justify-center gap-2.5 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01]">
            <MessageCircle className="h-5 w-5" />
            Chat WhatsApp
          </a>
        </div>
      </section>
    </motion.div>
  );
}
