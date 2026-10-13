import { ScreenBuilder, IMAGES, TOKENS } from '../../builder.js';

/**
 * GENERATOR FOR: SCR-084 (COM-10) — Emergency Security Hotline (Private Guard Dispatch)
 * Module: COMMS (Zero-Fluff)
 * Style: Glassmorphism & Lotus Porcelain (#FBF9F5) | iPhone 15/16 Pro (393 × 852 px)
 */
export function createScreen(x = 0, y = 0) {
  const b = new ScreenBuilder('scr_com_10', 'SCR-084: Security & Guard Hotline', x, y);

  // 1. Header with Fitts's Law Target & [ 🌐 EN | VI ] Language Switcher Pill
  b.addHeader('SECURITY DESK', '24/7 PRIVATE CLOSE PROTECTION HOTLINE', true);

  const sId = '$scr_com_10';

  // 2. Urgent Status Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Security Command Center',
    width: 345,
    height: 140,
    x: 24,
    y: 124,
    backgroundColor: '#09090B',
    cornerRadius: TOKENS.cornerRadiusCard
  }, 'card_sec_status_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sec_status_10',
    text: 'STATUS: ARMED RAPID RESPONSE PATROL ON STANDBY',
    fontSize: 9,
    fontStyle: 'Bold',
    color: '#EF4444',
    x: 20,
    y: 18
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sec_status_10',
    text: 'Swiss Security Operations Desk',
    fontSize: 16,
    fontStyle: 'Bold',
    color: '#FFFFFF',
    x: 20,
    y: 38
  });

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sec_status_10',
    text: 'Direct hotline to Thảo Điền & Tây Hồ tactical response units.\nAverage response time: 4 minutes to private residence.',
    fontSize: 10,
    fontStyle: 'Regular',
    color: '#A1A1AA',
    x: 20,
    y: 66
  });

  // 3. One-Touch Emergency Actions Card
  b.addStep('CREATE_FRAME', {
    parentId: sId,
    name: 'Card / Security Protocols',
    width: 345,
    height: 340,
    x: 24,
    y: 280,
    backgroundColor: TOKENS.bgCard,
    cornerRadius: 16
  }, 'card_sec_protocols_10');

  b.addStep('CREATE_TEXT', {
    parentId: '$card_sec_protocols_10',
    text: 'Tactical Protective Measures',
    fontSize: 14,
    fontStyle: 'Bold',
    color: TOKENS.textPrimary,
    x: 20,
    y: 18
  });

  const protocols = [
    { name: '1. Armed Convoy Escort Dispatch', desc: 'Armored SUV convoy dispatches to current GPS coordinates.' },
    { name: '2. Villa Perimeter Lockdown Activation', desc: 'Automated biometric blast shutters and IR sensors arming.' },
    { name: '3. Medical Heli-Evac Request', desc: 'Direct SOS coordination with FV Hospital aeromedical team.' },
    { name: '4. Cyber Counter-Surveillance Sweep', desc: 'Signal jamming and encrypted room verification.' }
  ];

  let pcY = 50;
  protocols.forEach(p => {
    b.addStep('CREATE_TEXT', {
      parentId: '$card_sec_protocols_10',
      text: p.name,
      fontSize: 11,
      fontStyle: 'Bold',
      color: TOKENS.textPrimary,
      x: 20,
      y: pcY
    });

    b.addStep('CREATE_TEXT', {
      parentId: '$card_sec_protocols_10',
      text: p.desc,
      fontSize: 10,
      fontStyle: 'Regular',
      color: TOKENS.textSecondary,
      x: 20,
      y: pcY + 16
    });

    pcY += 56;
  });

  // 4. Red SOS Action Button
  b.addStep('CREATE_BUTTON', {
    parentId: sId,
    name: 'Btn / SOS Dispatch',
    text: '🚨 Trigger Instant Armed Guard Dispatch',
    backgroundColor: '#EF4444',
    textColor: '#FFFFFF',
    x: 24,
    y: 636
  });

  // 5. Bottom Navigation Dock
  b.addBottomNavBar(3);

  return b;
}

if (process.argv[1] && process.argv[1].endsWith('scr_com_10.js')) {
  createScreen(0, 0).build().then(res => {
    console.log('Result:', res.success ? 'SUCCESS' : res.error);
  }).catch(console.error);
}
