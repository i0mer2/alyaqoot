'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Wand2, Sparkles, X, Play, Pause, ChevronLeft, ChevronRight, ImagePlus, Send, MessageCircle, Check } from 'lucide-react';
import CurtainArt from '@/components/art/CurtainArt';
import { useLocale } from '@/lib/i18n/LocaleProvider';

const DURATION = 4500;

/** غرفة وهمية مبسّطة للعرض التوضيحي */
function RoomMock({ withCurtains = false }: { withCurtains?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#eef1f4] to-[#dfe3e8]">
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-[#d6ccbf] to-[#c8bdac]" />
      <div className="absolute left-1/2 top-[16%] h-[48%] w-[42%] -translate-x-1/2 rounded-md border-4 border-[#3a3f47] bg-gradient-to-b from-[#bfe0f5] to-[#e8f3fb]">
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#3a3f47]" />
        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#3a3f47]" />
      </div>
      <div className="absolute bottom-[8%] left-1/2 h-[24%] w-[55%] -translate-x-1/2 rounded-lg bg-gradient-to-b from-[#9aa0a8] to-[#7f858d]" />
      {withCurtains && (
        <>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="absolute left-[20%] top-[10%] h-[64%] w-[16%] -translate-x-1/2 overflow-hidden rounded-b-md">
            <CurtainArt color="#7a1f33" pattern="damask" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="absolute left-[80%] top-[10%] h-[64%] w-[16%] -translate-x-1/2 overflow-hidden rounded-b-md">
            <CurtainArt color="#7a1f33" pattern="damask" />
          </motion.div>
        </>
      )}
    </div>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-full w-full max-w-[330px] overflow-hidden rounded-[28px] border-4 border-ink bg-ivory-soft shadow-luxe">
      <div className="flex items-center justify-center bg-ink py-1.5"><span className="h-1.5 w-10 rounded-full bg-white/30" /></div>
      <div className="relative h-[calc(100%-26px)] p-3">{children}</div>
    </div>
  );
}

/** إطار محادثة شبيه بـ Gemini */
function GeminiBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-platinum-200 bg-white">
      <div className="flex items-center gap-2 border-b border-platinum-200 px-3 py-2">
        <Sparkles size={15} className="text-champagne-600" />
        <span className="text-sm font-semibold text-ink">Gemini</span>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

const PROMPT_PREVIEW = 'Edit my room photo, add realistic curtains to the window…';

export default function HowToReel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale } = useLocale();
  const L = locale === 'ar';
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  const scenes = [
    {
      title: L ? '١) على الموقع: اضغط «دمج واقعي»' : '1) Tap “AI merge”',
      caption: L ? 'يفتح Gemini على حسابك المجاني ويُنسخ البرومبت تلقائياً' : 'Gemini opens & the prompt is auto-copied',
      render: (
        <Phone>
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <motion.button animate={{ scale: [1, 0.94, 1] }} transition={{ duration: 1, repeat: Infinity }} className="btn-ruby pointer-events-none text-sm">
              <Wand2 size={16} /> {L ? 'دمج واقعي' : 'AI merge'}
            </motion.button>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              <ChevronRight className="rotate-90 text-champagne-600" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-soft">
                <Sparkles size={18} className="text-champagne-600" /><span className="text-sm font-semibold text-ink">Gemini</span>
              </div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                <Check size={12} /> {L ? 'تم نسخ البرومبت' : 'prompt copied'}
              </motion.span>
            </motion.div>
          </div>
        </Phone>
      ),
    },
    {
      title: L ? '٢) في Gemini: ارفع صورة غرفتك' : '2) Attach your room photo',
      caption: L ? 'اضغط أيقونة الصورة 🖼️ واختر صورة غرفتك (احفظها من زر الموقع)' : 'Tap the image icon and pick your room photo',
      render: (
        <Phone>
          <GeminiBox>
            <div className="flex h-full flex-col justify-end gap-2 p-2">
              <motion.div initial={{ opacity: 0, y: 24, scale: 0.6 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="h-20 w-28 self-start overflow-hidden rounded-lg border border-platinum-200">
                <RoomMock />
              </motion.div>
              <div className="flex items-center gap-2 rounded-full border border-champagne/70 p-1.5">
                <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  <ImagePlus size={18} className="text-ruby-700" />
                </motion.span>
                <span className="flex-1 text-[11px] text-ink-muted">{L ? 'أرفق صورة' : 'attach image'}</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-platinum-200 text-platinum-500"><Send size={13} /></span>
              </div>
            </div>
          </GeminiBox>
        </Phone>
      ),
    },
    {
      title: L ? '٣) الصق البرومبت' : '3) Paste the prompt',
      caption: L ? 'النص منسوخ تلقائياً — الصقه في خانة الكتابة' : 'Already copied — paste it in the box',
      render: (
        <Phone>
          <GeminiBox>
            <div className="flex h-full flex-col justify-end gap-2 p-2">
              <div className="h-16 w-24 self-start overflow-hidden rounded-lg border border-platinum-200"><RoomMock /></div>
              <div className="relative flex items-center gap-2 rounded-2xl border-2 border-champagne p-2.5">
                <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-5 end-2 rounded-md bg-ink px-2 py-0.5 text-[10px] text-white">
                  {L ? 'لصق' : 'Paste'}
                </motion.span>
                <motion.span initial={{ width: '8%' }} animate={{ width: '100%' }} transition={{ duration: 1.6 }} className="overflow-hidden whitespace-nowrap text-[10px] leading-none text-ink-soft" dir="ltr">
                  {PROMPT_PREVIEW}
                </motion.span>
              </div>
            </div>
          </GeminiBox>
        </Phone>
      ),
    },
    {
      title: L ? '٤) اضغط إرسال ➤' : '4) Press send ➤',
      caption: L ? 'انتظر ثواني حتى ينشئ الصورة على حسابك' : 'Wait a few seconds',
      render: (
        <Phone>
          <GeminiBox>
            <div className="flex h-full flex-col justify-end gap-2 p-2">
              <div className="self-start rounded-2xl rounded-bl-sm bg-platinum-100 p-2 text-[10px] text-ink-soft" dir="ltr">{PROMPT_PREVIEW}</div>
              <div className="flex items-center gap-2 rounded-full border border-platinum-300 p-1.5">
                <span className="flex-1 text-[11px] text-ink-muted">…</span>
                <motion.span animate={{ scale: [1, 0.8, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="grid h-7 w-7 place-items-center rounded-full bg-ruby-gradient text-white">
                  <Send size={13} />
                </motion.span>
              </div>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-center text-[11px] font-semibold text-ruby-700">
                {L ? 'جاري إنشاء صورتك… ✨' : 'generating… ✨'}
              </motion.div>
            </div>
          </GeminiBox>
        </Phone>
      ),
    },
    {
      title: L ? '٥) استلم النتيجة الواقعية ✨' : '5) Get your result ✨',
      caption: L ? 'صورتك جاهزة على حسابك — بعدها اطلبها عبر واتساب' : 'Done! Then order via WhatsApp',
      render: (
        <Phone>
          <div className="flex h-full flex-col gap-3">
            <div className="relative flex-1">
              <RoomMock withCurtains />
              <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.6, type: 'spring' }} className="absolute right-2 top-2 text-2xl">✨</motion.span>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-2 text-sm font-semibold text-white">
              <MessageCircle size={16} /> {L ? 'اطلب عبر واتساب' : 'Order on WhatsApp'}
            </motion.div>
          </div>
        </Phone>
      ),
    },
  ];

  useEffect(() => { if (open) { setStep(0); setPlaying(true); } }, [open]);
  useEffect(() => {
    if (!open || !playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % scenes.length), DURATION);
    return () => clearTimeout(t);
  }, [step, playing, open, scenes.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} dir={L ? 'rtl' : 'ltr'}
            className="relative w-full max-w-md rounded-3xl bg-ivory-soft p-5 shadow-luxe">
            <button onClick={onClose} className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white shadow-soft hover:bg-platinum-100"><X size={18} /></button>

            <h3 className="mb-1 flex items-center gap-2 font-display text-2xl text-ruby-800">
              <Sparkles size={20} className="text-champagne-600" /> {L ? 'شرح: كيف تأخذ صورتك من Gemini' : 'How to use Gemini'}
            </h3>
            <p className="mb-3 text-sm text-ink-muted">{L ? 'ارفع صورتك ← الصق النص ← خذ النتيجة 👇' : 'Attach → paste → result 👇'}</p>

            <div className="relative h-[360px] rounded-2xl bg-ivory-deep p-3">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: L ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: L ? 30 : -30 }} transition={{ duration: 0.4 }} className="h-full">
                  {scenes[step].render}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-3 text-center">
              <h4 className="font-display text-lg text-ink">{scenes[step].title}</h4>
              <p className="text-sm text-ink-muted">{scenes[step].caption}</p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <button onClick={() => setStep((s) => (s - 1 + scenes.length) % scenes.length)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-platinum-100"><ChevronRight size={18} /></button>
              <div className="flex items-center gap-2">
                {scenes.map((_, i) => (
                  <button key={i} onClick={() => setStep(i)} className="h-2 rounded-full transition-all" style={{ width: i === step ? 22 : 8, background: i === step ? '#8a1b3d' : '#cfcfd6' }} />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setPlaying((p) => !p)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-platinum-100">{playing ? <Pause size={16} /> : <Play size={16} />}</button>
                <button onClick={() => setStep((s) => (s + 1) % scenes.length)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-platinum-100"><ChevronLeft size={18} /></button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
