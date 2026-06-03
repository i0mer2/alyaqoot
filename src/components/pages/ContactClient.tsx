'use client';

import { useState } from 'react';
import { MessageCircle, Phone, MapPin, Mail, Clock, Send } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { BRAND, waLink } from '@/lib/constants';

export default function ContactClient() {
  const { locale } = useLocale();
  const L = locale === 'ar';
  const [form, setForm] = useState({ name: '', phone: '', msg: '' });

  const text = L
    ? `مرحباً ستائر الياقوت 👋\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالرسالة: ${form.msg}`
    : `Hello Al-Yaqoot 👋\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.msg}`;

  const cards = [
    { icon: MessageCircle, label: L ? 'واتساب' : 'WhatsApp', value: BRAND.phoneDisplay, href: waLink(L ? 'مرحباً، أرغب بالاستفسار' : 'Hello') },
    { icon: Phone, label: L ? 'هاتف' : 'Phone', value: BRAND.phoneDisplay, href: `tel:+9647709164206` },
    { icon: MapPin, label: L ? 'الموقع' : 'Location', value: L ? BRAND.location_ar : BRAND.location_en },
    { icon: Mail, label: L ? 'البريد' : 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
  ];

  return (
    <>
      <PageHeader eyebrow={L ? 'نحن بانتظارك' : 'Get in touch'} title={L ? 'تواصل معنا' : 'Contact Us'} sub={L ? 'فريقنا جاهز للإجابة على كل استفساراتك' : 'Our team is ready to help'} />

      <div className="container-luxe section-pad grid gap-8 lg:grid-cols-2">
        {/* معلومات */}
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => {
            const Inner = (
              <div className="card-luxe flex h-full flex-col items-start gap-3 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ruby-gradient text-white"><c.icon size={22} /></span>
                <div>
                  <div className="text-sm text-ink-muted">{c.label}</div>
                  <div className="font-semibold text-ink" dir="ltr">{c.value}</div>
                </div>
              </div>
            );
            return c.href ? <a key={i} href={c.href} target="_blank" rel="noopener noreferrer">{Inner}</a> : <div key={i}>{Inner}</div>;
          })}
          <div className="card-luxe flex items-center gap-3 p-6 sm:col-span-2">
            <Clock size={22} className="text-ruby-700" />
            <span className="text-sm text-ink-soft">{L ? 'أوقات العمل: السبت – الخميس، ١٠ صباحاً – ٩ مساءً' : 'Sat–Thu, 10am – 9pm'}</span>
          </div>
        </div>

        {/* نموذج */}
        <div className="rounded-3xl bg-white p-7 shadow-soft">
          <h3 className="mb-4 font-display text-2xl">{L ? 'أرسل رسالة' : 'Send a message'}</h3>
          <div className="space-y-3">
            <input placeholder={L ? 'الاسم' : 'Name'} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="cfield" />
            <input placeholder={L ? 'رقم الهاتف' : 'Phone'} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="cfield" />
            <textarea placeholder={L ? 'رسالتك…' : 'Your message…'} rows={4} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} className="cfield resize-none" />
            <a href={waLink(text)} target="_blank" rel="noopener noreferrer" className="btn-ruby w-full"><Send size={18} /> {L ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}</a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .cfield { width:100%; border-radius:0.9rem; border:1px solid #e4e4e8; background:#fbf9f5; padding:0.8rem 1rem; outline:none; }
        .cfield:focus { border-color:#d0a35e; background:#fff; }
      `}</style>
    </>
  );
}
