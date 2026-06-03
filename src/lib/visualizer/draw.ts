// ===========================================================================
//  محرّك تركيب الستائر داخل المتصفح (Canvas) — مجاني 100% وبدون أي API
//  يحاكي الكسرات واللمعان والنقشة والشفافية، ويطابق منظور الغرفة تقريبياً.
// ===========================================================================

export interface SceneSettings {
  color: string;
  pattern: 'plain' | 'stripe' | 'damask';
  sheer: boolean;
  opacity: number; // 0..1
  coverage: 'both' | 'full' | 'left' | 'right';
  widthPct: number; // عرض اللوح (من عرض اللوحة)
  dropPct: number; // طول النزول
  topPct: number; // موضع القضيب من الأعلى
  fullness: number; // كثافة الكسرات (عدد)
}

function shade(hex: string, amt: number): string {
  const c = hex.replace('#', '');
  const full = c.length === 3 ? c.split('').map((x) => x + x).join('') : c;
  const num = parseInt(full, 16);
  let r = (num >> 16) & 0xff, g = (num >> 8) & 0xff, b = num & 0xff;
  const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
  r = Math.round((t - r) * p) + r;
  g = Math.round((t - g) * p) + g;
  b = Math.round((t - b) * p) + b;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/** غرفة وهمية أنيقة عند عدم رفع صورة */
function drawFauxRoom(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const wall = ctx.createLinearGradient(0, 0, 0, H);
  wall.addColorStop(0, '#e7ded0');
  wall.addColorStop(1, '#d3c7b5');
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, W, H);
  // أرضية
  ctx.fillStyle = '#b29a7c';
  ctx.fillRect(0, H * 0.8, W, H * 0.2);
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  ctx.fillRect(0, H * 0.8, W, 4);
  // نافذة مضيئة بالوسط
  const win = ctx.createLinearGradient(0, H * 0.18, 0, H * 0.8);
  win.addColorStop(0, '#fcf7ee');
  win.addColorStop(1, '#dfe6ea');
  ctx.fillStyle = win;
  ctx.fillRect(W * 0.22, H * 0.18, W * 0.56, H * 0.62);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.strokeRect(W * 0.22, H * 0.18, W * 0.56, H * 0.62);
}

function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, W: number, H: number) {
  const ir = img.width / img.height;
  const cr = W / H;
  let dw = W, dh = H, dx = 0, dy = 0;
  if (ir > cr) { dh = H; dw = H * ir; dx = (W - dw) / 2; }
  else { dw = W; dh = W / ir; dy = (H - dh) / 2; }
  ctx.drawImage(img, dx, dy, dw, dh);
}

function drawRod(ctx: CanvasRenderingContext2D, W: number, y: number) {
  const h = Math.max(8, W * 0.012);
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, '#e9e9ee');
  g.addColorStop(0.5, '#a9abb6');
  g.addColorStop(1, '#6f7180');
  ctx.fillStyle = g;
  ctx.beginPath();
  // @ts-ignore roundRect مدعوم في المتصفحات الحديثة
  ctx.roundRect(W * 0.04, y, W * 0.92, h, h / 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W * 0.05, y + h / 2, h, 0, Math.PI * 2);
  ctx.arc(W * 0.95, y + h / 2, h, 0, Math.PI * 2);
  ctx.fill();
}

function drawPanel(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  s: SceneSettings,
) {
  const light = shade(s.color, s.sheer ? 0.45 : 0.3);
  const dark = shade(s.color, -0.36);
  ctx.save();
  ctx.globalAlpha = s.sheer ? Math.min(s.opacity, 0.7) : s.opacity;

  // مسار اللوح مع حافة سفلية متموّجة
  const hem = Math.min(h * 0.06, 26);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - hem);
  const waves = Math.max(3, Math.round(s.fullness / 2));
  for (let i = 0; i < waves; i++) {
    const x1 = x + w - ((i + 0.5) / waves) * w;
    const x2 = x + w - ((i + 1) / waves) * w;
    ctx.quadraticCurveTo(x1, y + h + (i % 2 ? -hem : hem), x2, y + h - hem);
  }
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.clip();

  // كسرات
  const grad = ctx.createLinearGradient(x, 0, x + w, 0);
  const folds = Math.max(6, s.fullness);
  for (let i = 0; i <= folds; i++) {
    grad.addColorStop(i / folds, i % 2 === 0 ? dark : light);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h + hem);

  // نقشة
  if (s.pattern === 'stripe') {
    ctx.strokeStyle = light;
    ctx.globalAlpha *= 0.4;
    ctx.lineWidth = 2;
    for (let i = 1; i < folds; i++) {
      const px = x + (i / folds) * w;
      ctx.beginPath();
      ctx.moveTo(px, y);
      ctx.lineTo(px, y + h);
      ctx.stroke();
    }
    ctx.globalAlpha = s.sheer ? Math.min(s.opacity, 0.7) : s.opacity;
  } else if (s.pattern === 'damask') {
    ctx.fillStyle = light;
    ctx.globalAlpha *= 0.35;
    const stepX = w / 4, stepY = stepX * 1.3;
    for (let gy = y + stepY * 0.4; gy < y + h; gy += stepY) {
      for (let gx = x + stepX * 0.5; gx < x + w; gx += stepX) {
        ctx.beginPath();
        ctx.ellipse(gx, gy, stepX * 0.16, stepY * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = s.sheer ? Math.min(s.opacity, 0.7) : s.opacity;
  }

  // لمعان علوي
  const sheen = ctx.createLinearGradient(0, y, 0, y + h);
  sheen.addColorStop(0, 'rgba(255,255,255,0.28)');
  sheen.addColorStop(0.25, 'rgba(255,255,255,0)');
  sheen.addColorStop(1, 'rgba(0,0,0,0.16)');
  ctx.fillStyle = sheen;
  ctx.fillRect(x, y, w, h + hem);

  // ظل رأس الكسرات
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fillRect(x, y, w, h * 0.04);
  ctx.restore();
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  img: HTMLImageElement | null,
  s: SceneSettings,
) {
  ctx.clearRect(0, 0, W, H);
  if (img) drawImageCover(ctx, img, W, H);
  else drawFauxRoom(ctx, W, H);

  const topY = H * s.topPct;
  const panelH = Math.min(H - topY, H * s.dropPct);
  const pw = W * s.widthPct;
  const margin = W * 0.03;

  drawRod(ctx, W, topY - Math.max(6, W * 0.012));

  if (s.coverage === 'full') {
    drawPanel(ctx, margin, topY, W - margin * 2, panelH, s);
  } else if (s.coverage === 'left') {
    drawPanel(ctx, margin, topY, pw, panelH, s);
  } else if (s.coverage === 'right') {
    drawPanel(ctx, W - margin - pw, topY, pw, panelH, s);
  } else {
    drawPanel(ctx, margin, topY, pw, panelH, s);
    drawPanel(ctx, W - margin - pw, topY, pw, panelH, s);
  }
}
