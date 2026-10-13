import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-104 (SET-04) — Currency & Unit Display ($ USD / ₫ VND, m² / sq ft)
 * Module: SETTINGS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_set_04', 'SCR-104: Currency & Measurement Units', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('UNITS & CURRENCY', 'VALUATION & SPATIAL MEASUREMENT', true);

  const sId = '$scr_set_04';

  // 2. Currency Selector Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Currency Units',
    width: 345,
    height: 220,
    x: 24,
    y: 124,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_currency_units_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_currency_units_04',
    text: 'Valuation & Pricing Currency',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const currencies = [
    { code: 'USD ($)', name: 'United States Dollar (International Standard)', status: '✓ SELECTED DEFAULT' },
    { code: 'VND (₫)', name: 'Vietnamese Đồng (Domestic Cadastral Rate)', status: '○ SECONDARY' },
    { code: 'SGD ($)', name: 'Singapore Dollar (Private Wealth Desk)', status: '○ AVAILABLE' }
  ];

  let cY = 48;
  currencies.forEach((c, i) => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_currency_units_04',
      text: `${c.code} — ${c.name}`,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: cY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_currency_units_04',
      text: c.status,
      fontSize: 10,
      fontStyle: 'Bold',
      color: i === 0 ? TOKENS.accentEmerald : TOKENS.textMuted,
      x: 20,
      y: cY + 16
    });

    cY += 50;
  });

  // 3. Architectural Area Units Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Architectural Units',
    width: 345,
    height: 230,
    x: 24,
    y: 360,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_arch_units_04');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_arch_units_04',
    text: 'Land & Floor Measurement Units',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const units = [
    { unit: 'Square Metres (m²)', desc: 'Official Vietnamese standard (Cadastral Sổ Hồng metric)', status: '✓ PRIMARY' },
    { unit: 'Square Feet (sq ft)', desc: 'International standard (e.g. 10,764 sq ft for 1,000 m²)', status: '✓ DUAL DISPLAY' },
    { unit: 'Hectares (ha) & Sào / Mẫu', desc: 'Used for large resort acreage & heritage estates', status: '○ ON DEMAND' }
  ];

  let uY = 48;
  units.forEach(u => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_arch_units_04',
      text: u.unit,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: uY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_arch_units_04',
      text: `${u.desc} • ${u.status}`,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: uY + 16
    });

    uY += 52;
  });

  // 4. Action Button: Save
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / Save Units',
    text: 'Save Valuation & Metric Formats',
    backgroundColor: TOKENS.btnPrimaryBg,
    textColor: TOKENS.btnPrimaryText,
    x: 24,
    y: 630
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_set_04.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
