import type { BlogPost } from '@/types';

export const posts: BlogPost[] = [
  {
    slug: 'how-to-choose-curtains',
    title_ar: 'كيف تختار الستارة المناسبة لغرفتك؟',
    title_en: 'How to choose the right curtain for your room',
    excerpt_ar: 'دليل عملي لاختيار اللون والخامة والطول حسب نوع الغرفة وإضاءتها.',
    excerpt_en: 'A practical guide to color, fabric and length by room type and lighting.',
    cover: '', date: '2026-01-12', readMinutes: 5, tag_ar: 'دليل',
    body_ar:
      'اختيار الستارة يعتمد على ثلاثة أشياء: وظيفة الغرفة، كمية الضوء، وستايل الديكور.\n\n' +
      '١) غرف النوم: اختر ستائر العتمة (Blackout) لنوم مريح وعزل حراري.\n' +
      '٢) الصالات: امزج بين ستارة ثقيلة وتول شفّاف لتتحكم بالخصوصية والإضاءة.\n' +
      '٣) المطابخ: التول الخفيف أو الأقمشة سهلة الغسل هي الأنسب.\n\n' +
      'نصيحة الياقوت: خلي طول الستارة يلامس الأرض أو ينزل ٢-٣ سم فوقها لإطلالة أنيقة، وتجنّب الستائر القصيرة لأنها تصغّر النافذة بصرياً.',
  },
  {
    slug: 'blackout-vs-sheer',
    title_ar: 'العتمة أو التول؟ ليش ما تجمع الاثنين',
    title_en: 'Blackout or sheer? Why not have both',
    excerpt_ar: 'نظام الطبقتين يعطيك تحكم كامل بالضوء والخصوصية طوال اليوم.',
    excerpt_en: 'A two-layer system gives full control of light and privacy all day.',
    cover: '', date: '2026-02-03', readMinutes: 4, tag_ar: 'نصائح',
    body_ar:
      'نظام الطبقتين صار الأكثر طلباً بالبيوت العراقية: تول خفيف نهاراً يمرّر النور ويحفظ خصوصيتك، وستارة عتمة ليلاً للنوم والعزل.\n\n' +
      'الميزة إنك تتحكم بالجو حسب الوقت بدون ما تضحّي بالإضاءة الطبيعية. ومن ناحية الديكور، التباين بين القماش الخفيف والثقيل يعطي عمق وفخامة للنافذة.',
  },
  {
    slug: 'measure-your-window',
    title_ar: 'كيف تقيس نافذتك بالشكل الصح',
    title_en: 'How to measure your window correctly',
    excerpt_ar: 'خطوات بسيطة لقياس العرض والارتفاع وكمية القماش المطلوبة.',
    excerpt_en: 'Simple steps to measure width, height and required fabric.',
    cover: '', date: '2026-03-18', readMinutes: 6, tag_ar: 'دليل',
    body_ar:
      'القياس الصحيح يوفّر عليك فلوس ووقت. قِس عرض النافذة (أو الشيش/المجرى) بالسنتيمتر، ثم اضرب بمعامل الكثافة:\n\n' +
      '• كثافة عادية: ×٢\n• كثافة فخمة (كسرات غنية): ×٢.٥ إلى ×٣\n\n' +
      'مثال: نافذة عرضها ٢ متر وكثافة ×٢.٥ تحتاج ٥ أمتار قماش. وللارتفاع، قِس من المجرى لين الأرض وأضف ١٠ سم للخياطة من فوق وتحت.\n\n' +
      'أو استخدم حاسبة الياقوت بالموقع وتطلع لك الكمية تلقائياً.',
  },
  {
    slug: 'ruby-velvet-trend',
    title_ar: 'لمسة الياقوت: المخمل يرجع بقوة',
    title_en: 'The ruby touch: velvet is back',
    excerpt_ar: 'ليش المخمل الياقوتي صار نجم الديكور هالموسم وكيف تنسّقه.',
    excerpt_en: 'Why ruby velvet is this season’s star and how to style it.',
    cover: '', date: '2026-04-09', readMinutes: 4, tag_ar: 'موضة',
    body_ar:
      'المخمل الياقوتي يعطي دفء وفخامة فورية لأي غرفة. نسّقه مع إكسسوارات ذهبية أو فضية، وخلّي بقية الألوان هادئة حتى يبقى هو نجم الديكور.\n\n' +
      'يناسب المجالس وغرف الاستقبال، وبالإضاءة الدافئة يطلع شكله ساحر. عند الياقوت تلكاه بعدة درجات تناسب ذوقك.',
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
