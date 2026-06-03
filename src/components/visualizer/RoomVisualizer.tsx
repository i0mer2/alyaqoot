'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Upload, Download, Plus, RefreshCw, MessageCircle, Trash2, Sparkles, ShoppingBag, Wand2, PlayCircle } from 'lucide-react';
import HowToReel from './HowToReel';
import { drawScene, type SceneSettings } from '@/lib/visualizer/draw';
import { products } from '@/lib/data/products';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { useCart } from '@/store/cart';
import { waLink } from '@/lib/constants';
import { cn } from '@/lib/utils';

const DEFAULT: SceneSettings = {
  color: '#7a1f33', pattern: 'damask', sheer: false, opacity: 1,
  coverage: 'both', widthPct: 0.26, dropPct: 0.72, topPct: 0.15, fullness: 14,
};

type Shot = { id: string; url: string; label: string };

export default function RoomVisualizer() {
  const { locale, t } = useLocale();
  const L = locale === 'ar';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const [settings, setSettings] = useState<SceneSettings>(DEFAULT);
  const [productId, setProductId] = useState<string>('p-005');
  const [shots, setShots] = useState<Shot[]>([]);
  const [drag, setDrag] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);
  const [geminiPrompt, setGeminiPrompt] = useState('');
  const [showReel, setShowReel] = useState(false);

  const product = products.find((p) => p.id === productId);
  const set = (patch: Partial<SceneSettings>) => setSettings((s) => ({ ...s, ...patch }));

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const img = imgRef.current;
    const aspect = img ? Math.min(Math.max(img.width / img.height, 0.8), 2) : 4 / 3;
    const baseW = 1000;
    const baseH = Math.round(baseW / aspect);
    canvas.width = baseW * dpr;
    canvas.height = baseH * dpr;
    canvas.style.aspectRatio = `${baseW} / ${baseH}`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawScene(ctx, baseW, baseH, img, settings);
  }, [settings]);

  useEffect(() => { redraw(); }, [redraw, hasImage]);
  useEffect(() => {
    const onResize = () => redraw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [redraw]);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const img = new Image();
      img.onload = () => { imgRef.current = img; setHasImage(true); setShowGuide(false); };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }, []);

  /** يفتح تطبيق Gemini على حساب الزبون المجاني مع نسخ الطلب الجاهز */
  const openInGemini = async () => {
    const styleName = product ? product.name_en : '';
    const colorName = product?.colors.find(
      (c) => c.hex.toLowerCase() === settings.color.toLowerCase(),
    )?.name_en;
    const colorText = colorName ? `${colorName} (${settings.color})` : settings.color;
    const patternWord =
      settings.pattern === 'damask' ? 'an elegant damask pattern'
      : settings.pattern === 'stripe' ? 'subtle vertical stripes'
      : 'a solid, smooth finish';
    const fabricWord = settings.sheer
      ? 'sheer, light, semi-transparent voile/tulle'
      : 'rich, premium, opaque';

    // برومبت احترافي بالإنجليزية: تعديل الصورة المرفقة فقط (لا إنشاء غرفة جديدة)
    const prompt =
      `IMPORTANT: Edit the attached photo of my REAL room. Do NOT generate a new room or a new scene, ` +
      `do NOT change the camera angle, and do NOT replace the photo — only modify the attached image itself.\n\n` +
      `Task: dress ONLY the existing window with realistic ${fabricWord} curtains featuring ${patternWord}, ` +
      `in this exact color ${colorText}${styleName ? ` (style: "${styleName}")` : ''}.\n` +
      `• Size and align the curtains correctly to the existing window frame. Do NOT make them oversized and do NOT cover ` +
      `the bed, walls, or other furniture.\n` +
      `• Hang them from a slim rod just above the window; let them fall straight to the floor with natural soft folds, ` +
      `realistic fabric texture, a subtle sheen, and correct perspective.\n` +
      `• Add shadows and lighting that exactly match the room's existing light direction and white balance.\n\n` +
      `Keep the walls, ceiling, floor, bed, furniture, decor, plants, colors, layout, camera angle and lighting ` +
      `EXACTLY as in the original photo. The result must look like the SAME photograph with only new curtains added ` +
      `to the window — seamless, photorealistic, professional, high detail. Output a single edited image.`;
    setGeminiPrompt(prompt);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch { /* المتصفح قد يمنع النسخ التلقائي */ }
    window.open('https://gemini.google.com/app', '_blank', 'noopener');
    setShowGuide(true);
  };

  const copyPrompt = async () => {
    try { await navigator.clipboard.writeText(geminiPrompt); setCopied(true); setTimeout(() => setCopied(false), 3000); } catch {}
  };

  const selectProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setProductId(id);
    set({ color: p.visualizer.baseColor, pattern: p.visualizer.pattern, sheer: p.visualizer.sheer });
  };

  const capture = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/jpeg', 0.85);
    const label = product ? (L ? product.name_ar : product.name_en) : 'ستارة';
    setShots((s) => [{ id: crypto.randomUUID(), url, label }, ...s].slice(0, 6));
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'alyaqoot-preview.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  const add = useCart((s) => s.add);
  const addToCart = () => {
    if (!product || product.unit === 'custom') return;
    add({
      key: product.id, productId: product.id, slug: product.slug,
      name_ar: product.name_ar, name_en: product.name_en, image: '',
      unit: product.unit, price: product.price, qty: 1,
    });
  };

  const orderMsg = L
    ? `مرحباً، صمّمت إطلالة بمعاينة الغرفة وأعجبتني 😍\nالستارة: ${product ? product.name_ar : ''}\nاللون: ${settings.color}\nأرغب بطلبها.`
    : `Hello! I designed a look in the room visualizer.\nCurtain: ${product?.name_en ?? ''}\nColor: ${settings.color}\nI'd like to order it.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* لوحة الرسم */}
      <div>
        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]); }}
          className={cn('relative overflow-hidden rounded-3xl border-2 bg-ink shadow-luxe transition', drag ? 'border-champagne' : 'border-transparent')}
        >
          <canvas ref={canvasRef} className="block w-full" />
          {!hasImage && (
            <label className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-t from-ink/90 to-transparent p-5 text-sm text-white">
              <Upload size={18} /> {t.visualizer.upload}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
            </label>
          )}
        </div>

        {/* زر الدمج الواقعي عبر Gemini (مجاني على حساب الزبون) */}
        <button
          onClick={openInGemini}
          disabled={!hasImage}
          className="btn-ruby mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Wand2 size={18} /> {L ? '✨ دمج واقعي بالذكاء الاصطناعي (مجاني)' : '✨ AI realistic merge (free)'}
        </button>
        <button
          onClick={() => setShowReel(true)}
          className="mt-2 flex w-full items-center justify-center gap-2 text-sm font-semibold text-ruby-700 transition hover:underline"
        >
          <PlayCircle size={18} /> {L ? 'شاهد الشرح المتحرّك: كيف تستخدم الأداة؟' : 'Watch the animated tutorial'}
        </button>
        {!hasImage && (
          <p className="mt-1.5 text-center text-xs text-ink-muted">
            {L ? 'حمّل صورة غرفتك أولاً ثم اضغط الزر' : 'Upload a room photo first'}
          </p>
        )}

        {/* بطاقة الإرشاد بعد فتح Gemini */}
        {showGuide && (
          <div className="mt-3 rounded-2xl border border-champagne/50 bg-white p-4 shadow-soft">
            <h4 className="mb-2 flex items-center gap-2 font-display text-lg text-ink">
              <Sparkles size={18} className="text-champagne-600" />
              {L ? 'فتحنا لك Gemini على حسابك المجاني ✨' : 'Opened Gemini on your account ✨'}
            </h4>
            <ol className="space-y-1.5 text-sm text-ink-soft" style={{ listStyle: 'decimal', paddingInlineStart: '1.2rem' }}>
              <li>{L ? 'سجّل دخول بحساب Google (إذا ما كنت داخل).' : 'Sign in to Google.'}</li>
              <li>{L ? 'الصق النص (نسخناه لك تلقائياً) في خانة الكتابة.' : 'Paste the prompt.'}</li>
              <li>{L ? 'اضغط أيقونة الصورة 🖼️ وارفع صورة غرفتك، ثم أرسل.' : 'Attach your room photo & send.'}</li>
              <li>{L ? 'راح تطلع لك الصورة الواقعية على حسابك مجاناً.' : 'Get your realistic image free.'}</li>
            </ol>

            <p className="mt-3 mb-1 text-xs font-semibold text-ink">
              {L ? 'النص الجاهز (بالإنجليزية لأدق نتيجة) — تم نسخه تلقائياً:' : 'Ready prompt (auto-copied):'}
            </p>
            <div className="rounded-xl bg-ivory-deep p-3" dir="ltr">
              <p className="text-xs leading-relaxed text-ink-muted">{geminiPrompt}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={copyPrompt} className="btn-outline px-3 py-1.5 text-xs">
                {copied ? (L ? 'تم النسخ ✓' : 'Copied ✓') : (L ? 'نسخ النص مجدداً' : 'Copy again')}
              </button>
              <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" className="btn-ruby px-3 py-1.5 text-xs">
                <Wand2 size={14} /> {L ? 'فتح Gemini' : 'Open Gemini'}
              </a>
            </div>
            <p className="mt-2 text-[11px] text-ink-muted">
              {L ? '💡 مجاني تماماً على حسابك — والنتيجة عندك. بعدها ارجع واطلب الستارة عبر واتساب.' : 'Free on your account.'}
            </p>
          </div>
        )}

        {/* أدوات */}
        <div className="mt-4 flex flex-wrap gap-2">
          <label className="btn-outline cursor-pointer text-sm">
            <Upload size={16} /> {L ? 'صورة الغرفة' : 'Room photo'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
          </label>
          <button onClick={capture} className="btn-outline text-sm"><Plus size={16} /> {t.visualizer.compare}</button>
          <button onClick={save} className="btn-outline text-sm"><Download size={16} /> {t.visualizer.save}</button>
          <button onClick={() => { setSettings(DEFAULT); }} className="btn-outline text-sm"><RefreshCw size={16} /> {t.visualizer.reset}</button>
        </div>

        {/* لقطات المقارنة */}
        {shots.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-2 text-sm font-semibold text-ink-muted">{L ? 'المقارنة المحفوظة' : 'Saved comparisons'}</h4>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {shots.map((sh) => (
                <div key={sh.id} className="group relative w-40 shrink-0 overflow-hidden rounded-xl border border-platinum-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sh.url} alt={sh.label} className="block w-full" />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-ink/70 px-2 py-1 text-[11px] text-white">{sh.label}</span>
                  <button onClick={() => setShots((s) => s.filter((x) => x.id !== sh.id))} className="absolute end-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100"><Trash2 size={13} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
          <Sparkles size={14} className="text-champagne-600" /> {t.visualizer.hint}
        </p>
      </div>

      {/* لوحة التحكم */}
      <aside className="space-y-5 rounded-3xl bg-white p-5 shadow-soft">
        {/* اختيار الستارة */}
        <div>
          <h4 className="mb-2 text-sm font-semibold text-ink">{t.visualizer.step2}</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {products.filter((p) => p.category !== 'fabric').map((p) => (
              <button
                key={p.id}
                onClick={() => selectProduct(p.id)}
                className={cn('h-12 w-12 shrink-0 rounded-xl border-2 transition', productId === p.id ? 'border-ruby-700 scale-105' : 'border-transparent')}
                style={{ background: p.visualizer.baseColor }}
                title={L ? p.name_ar : p.name_en}
              />
            ))}
          </div>
          {product && <p className="text-xs text-ink-muted">{L ? product.name_ar : product.name_en}</p>}
        </div>

        {/* اللون */}
        <Control label={t.visualizer.color}>
          <div className="flex flex-wrap items-center gap-2">
            {product?.colors.map((c) => (
              <button key={c.hex} onClick={() => set({ color: c.hex })} className={cn('h-7 w-7 rounded-full border', settings.color === c.hex ? 'ring-2 ring-ruby-700 ring-offset-1' : 'border-platinum-300')} style={{ background: c.hex }} title={L ? c.name_ar : c.name_en} />
            ))}
            <input type="color" value={settings.color} onChange={(e) => set({ color: e.target.value })} className="h-7 w-9 cursor-pointer rounded border border-platinum-300 bg-transparent" />
          </div>
        </Control>

        {/* النقشة */}
        <Control label={L ? 'النقشة' : 'Pattern'}>
          <div className="flex gap-2">
            {(['plain', 'stripe', 'damask'] as const).map((pt) => (
              <button key={pt} onClick={() => set({ pattern: pt })} className={cn('flex-1 rounded-lg border px-2 py-1.5 text-xs', settings.pattern === pt ? 'border-ruby-700 bg-ruby-50 text-ruby-800' : 'border-platinum-200')}>
                {pt === 'plain' ? (L ? 'سادة' : 'Plain') : pt === 'stripe' ? (L ? 'مخطّط' : 'Stripe') : (L ? 'دمشقي' : 'Damask')}
              </button>
            ))}
          </div>
        </Control>

        {/* التغطية */}
        <Control label={L ? 'التغطية' : 'Coverage'}>
          <div className="grid grid-cols-4 gap-2">
            {(['both', 'full', 'left', 'right'] as const).map((cv) => (
              <button key={cv} onClick={() => set({ coverage: cv })} className={cn('rounded-lg border px-1 py-1.5 text-xs', settings.coverage === cv ? 'border-ruby-700 bg-ruby-50 text-ruby-800' : 'border-platinum-200')}>
                {cv === 'both' ? (L ? 'جانبين' : 'Both') : cv === 'full' ? (L ? 'كامل' : 'Full') : cv === 'left' ? (L ? 'يسار' : 'Left') : (L ? 'يمين' : 'Right')}
              </button>
            ))}
          </div>
        </Control>

        <Slider label={t.visualizer.opacity} value={settings.opacity} min={0.3} max={1} step={0.05} onChange={(v) => set({ opacity: v })} />
        <Slider label={t.visualizer.width} value={settings.widthPct} min={0.12} max={0.48} step={0.01} onChange={(v) => set({ widthPct: v })} />
        <Slider label={t.visualizer.height} value={settings.dropPct} min={0.3} max={0.92} step={0.01} onChange={(v) => set({ dropPct: v })} />
        <Slider label={t.visualizer.position} value={settings.topPct} min={0.05} max={0.4} step={0.01} onChange={(v) => set({ topPct: v })} />
        <Slider label={t.visualizer.fullness} value={settings.fullness} min={6} max={26} step={1} onChange={(v) => set({ fullness: v })} />

        <label className="flex items-center justify-between text-sm">
          <span className="text-ink-muted">{L ? 'شفّاف (تول)' : 'Sheer'}</span>
          <input type="checkbox" checked={settings.sheer} onChange={(e) => set({ sheer: e.target.checked })} className="h-5 w-5 accent-ruby-700" />
        </label>

        {/* إجراءات الطلب */}
        <div className="space-y-2 border-t border-platinum-200 pt-4">
          <a href={waLink(orderMsg)} target="_blank" rel="noopener noreferrer" className="btn-ruby w-full">
            <MessageCircle size={18} /> {t.visualizer.order}
          </a>
          {product && product.unit !== 'custom' && (
            <button onClick={addToCart} className="btn-outline w-full"><ShoppingBag size={16} /> {t.common.addToCart}</button>
          )}
          {product && (
            <Link href={`/products/${product.slug}`} className="block text-center text-sm text-ruby-700 hover:underline">
              {L ? 'تفاصيل المنتج' : 'Product details'}
            </Link>
          )}
        </div>
      </aside>

      <HowToReel open={showReel} onClose={() => setShowReel(false)} />
    </div>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-ink-muted">{label}</label>
      {children}
    </div>
  );
}

function Slider({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 flex justify-between text-sm text-ink-muted">
        <span>{label}</span>
      </label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full accent-ruby-700" />
    </div>
  );
}
