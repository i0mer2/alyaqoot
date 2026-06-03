-- ===========================================================================
--  ستائر الياقوت — بيانات أولية (Seed)
--  شغّلها بعد schema.sql لملء الفئات والمنتجات بنماذج جاهزة.
-- ===========================================================================

insert into public.categories (slug, name_ar, name_en, tagline_ar, description_ar, "order") values
  ('modern','ستائر مودرن','Modern Curtains','خطوط بسيطة وأناقة عصرية','تصاميم عصرية بألوان هادئة وخامات خفيفة.',1),
  ('classic','ستائر كلاسيك','Classic Curtains','فخامة لا تخرج عن الموضة','كسرات غنية وأقمشة فخمة بلمسة تقليدية.',2),
  ('luxury','ستائر فاخرة','Luxury Curtains','قمّة الترف','مخمل وحرير وتطريز يدوي.',3),
  ('blackout','ستائر العتمة','Blackout Curtains','تعتيم كامل ونوم مريح','تحجب الضوء والحرارة بالكامل.',4),
  ('sheer','ستائر شفّافة','Sheer Curtains','إضاءة ناعمة وخصوصية','تول خفيف يمرّر النور بنعومة.',5),
  ('fabric','مجموعات الأقمشة','Fabric Collections','اختر قماشك بالمتر','تشكيلة أقمشة تُباع بالمتر.',6),
  ('custom','طلبات مخصّصة','Custom Orders','صمّمها مثل ما تتخيّلها','تفصيل حسب القياس واللون والخامة.',7)
on conflict (slug) do nothing;

insert into public.products
  (slug, name_ar, name_en, category, description_ar, price, compare_at_price, unit, width_cm, origin_ar, fabric_ar, base_color, pattern, sheer, in_stock, featured, is_new, rating, reviews, colors)
values
  ('aurora-modern','ستارة أورورا مودرن','Aurora Modern','modern','قماش لينين خفيف بكسرات ناعمة ولون رمادي هادئ.',22000,null,'meter',280,'تركيا','لينين','#c2c6cd','plain',false,true,true,true,4.8,36,
    '[{"name_ar":"فضّي","name_en":"Silver","hex":"#c2c6cd"},{"name_ar":"عاجي","name_en":"Ivory","hex":"#efe7d8"}]'::jsonb),
  ('royal-classic','ستارة رويال كلاسيك','Royal Classic','classic','كسرات غنية بنقشة دمشقية ولون أزرق ملكي.',38000,null,'meter',290,'تركيا','جاكار','#1f3a5f','damask',false,true,true,false,4.9,54,
    '[{"name_ar":"أزرق ملكي","name_en":"Royal","hex":"#1f3a5f"},{"name_ar":"ذهبي","name_en":"Gold","hex":"#c9a24b"}]'::jsonb),
  ('velvet-ruby','مخمل الياقوت','Ruby Velvet','luxury','مخمل فاخر بلون ياقوتي عميق ولمعة راقية.',58000,72000,'meter',300,'إيطاليا','مخمل','#7a1f33','plain',false,true,true,true,5.0,41,
    '[{"name_ar":"ياقوتي","name_en":"Ruby","hex":"#7a1f33"},{"name_ar":"زيتي","name_en":"Olive","hex":"#4a5d4a"}]'::jsonb),
  ('silk-champagne','حرير شامبين','Champagne Silk','luxury','حرير صناعي بلمعة شامبين ناعمة.',64000,null,'meter',300,'الهند','حرير صناعي','#d8c48a','plain',false,true,false,false,4.8,23,
    '[{"name_ar":"ذهبي","name_en":"Gold","hex":"#d8c48a"},{"name_ar":"وردي","name_en":"Rose","hex":"#c9a6a6"}]'::jsonb),
  ('nightfall-blackout','عتمة نايت فول','Nightfall Blackout','blackout','تعتيم ١٠٠٪ وعزل حراري ممتاز.',30000,null,'meter',280,'كوريا','بلاك آوت','#26262a','plain',false,true,true,false,4.7,67,
    '[{"name_ar":"فحمي","name_en":"Charcoal","hex":"#26262a"},{"name_ar":"بيج","name_en":"Beige","hex":"#d8c4a8"}]'::jsonb),
  ('cloud-sheer','تول سحابة','Cloud Sheer','sheer','تول أبيض خفيف يمرّر النور بنعومة.',14000,null,'meter',300,'تركيا','تول','#f3efe6','plain',true,true,true,true,4.6,33,
    '[{"name_ar":"عاجي","name_en":"Ivory","hex":"#efe7d8"},{"name_ar":"فضّي","name_en":"Silver","hex":"#c2c6cd"}]'::jsonb),
  ('linen-fabric-natural','قماش لينين طبيعي','Natural Linen Fabric','fabric','لينين طبيعي يُباع بالمتر.',19000,null,'meter',140,'مصر','لينين','#d8c4a8','plain',false,true,false,false,4.5,9,
    '[{"name_ar":"بيج","name_en":"Beige","hex":"#d8c4a8"}]'::jsonb),
  ('minimal-grey-set','طقم مودرن مينيمال','Minimal Grey Set','modern','طقم جاهز (ستارة + تول) بخطوط بسيطة.',145000,175000,'set',300,'الصين','بوليستر مخلوط','#b8bcc4','plain',false,true,true,false,4.6,21,
    '[{"name_ar":"فضّي","name_en":"Silver","hex":"#b8bcc4"}]'::jsonb),
  ('venice-luxury-set','طقم فينيسيا الفاخر','Venice Luxury Set','luxury','طقم كامل (مخمل + تول مطرّز + إكسسوارات).',320000,380000,'set',320,'إيطاليا','مخمل + تطريز','#6e1b30','damask',false,true,true,false,5.0,17,
    '[{"name_ar":"ياقوتي","name_en":"Ruby","hex":"#6e1b30"}]'::jsonb),
  ('custom-tailored','ستارة حسب الطلب','Custom Tailored Curtain','custom','صمّم ستارتك: اختر القماش واللون والكسرات والقياس.',25000,null,'custom',null,'تفصيل محلي','حسب الاختيار','#8a1b3d','plain',false,true,true,false,5.0,48,
    '[{"name_ar":"ياقوتي","name_en":"Ruby","hex":"#8a1b3d"},{"name_ar":"ذهبي","name_en":"Gold","hex":"#c9a24b"}]'::jsonb)
on conflict (slug) do nothing;
