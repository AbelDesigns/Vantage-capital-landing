(function () {
  'use strict';

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }
  refreshIcons();

  // ===========================================================================
  // 1. TOAST SYSTEM
  // ===========================================================================
  function showToast(title, detail) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast-item pointer-events-auto bg-elevated hairline-strong rounded-xl px-4 py-3 shadow-2xl flex items-start gap-3';
    el.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-vantage mt-1.5 shrink-0"></span>
      <div class="flex flex-col">
        <span class="text-[13px] font-bold text-ink">${title}</span>
        ${detail ? `<span class="text-[12px] text-muted mt-0.5">${detail}</span>` : ''}
      </div>
    `;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 180ms ease';
      setTimeout(() => el.remove(), 200);
    }, 3400);
  }

  // ===========================================================================
  // 2. HERO FLOATING LIVE FX WIDGET (FIXED: cleanly separated from GSAP init!)
  // ===========================================================================
  let heroDir = 'USD_EUR';
  let swapDeg = 0;
  const heroInput = document.getElementById('hero-send-input');
  const heroOut = document.getElementById('hero-receive-out');
  const heroSendCode = document.getElementById('hero-send-code');
  const heroRecCode = document.getElementById('hero-receive-code');
  const heroRateLabel = document.getElementById('hero-rate-label');
  const heroSavings = document.getElementById('hero-savings-badge');
  const heroSwapBtn = document.getElementById('hero-swap-btn');

  function updateHeroWidget() {
    if (!heroInput) return;
    const val = Math.max(0, parseFloat(heroInput.value) || 0);
    const rate = heroDir === 'USD_EUR' ? 0.92592 : 1.08001;
    heroOut.textContent = (val * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    heroSendCode.textContent = heroDir === 'USD_EUR' ? 'USD' : 'EUR';
    heroRecCode.textContent = heroDir === 'USD_EUR' ? 'EUR' : 'USD';
    heroRateLabel.textContent = heroDir === 'USD_EUR' ? '1 USD = 0.92592 EUR' : '1 EUR = 1.08001 USD';
    heroSavings.textContent = `Ahorras +$${Math.round(val * 0.028).toLocaleString('en-US')}`;
  }

  if (heroInput && heroSwapBtn) {
    heroInput.addEventListener('input', updateHeroWidget);
    heroSwapBtn.addEventListener('click', () => {
      heroDir = heroDir === 'USD_EUR' ? 'EUR_USD' : 'USD_EUR';
      swapDeg += 180;
      heroSwapBtn.style.transform = `rotate(${swapDeg}deg)`;
      updateHeroWidget();
    });
    updateHeroWidget();
  }

  // ===========================================================================
  // 3. INTERACTIVE 4-TAB PLATFORM SHOWCASE (SCREENSHOT 3)
  // ===========================================================================
  const featureData = {
    budgeting: {
      title: 'Rendimiento Intuitivo Que Alinea Tus Metas',
      desc: 'Gestiona liquidez, asigna presupuestos por entidad y desbloquea claridad financiera en un solo lugar. Los saldos y rendimientos se actualizan en tiempo real.',
      icon1: 'smartphone',
      sub1: 'Onboarding ágil',
      subdesc1: 'Configura cuentas multi-divisa en minutos sin integraciones complejas y suma a tu equipo financiero al instante.',
      icon2: 'network',
      sub2: 'Control en tiempo real',
      subdesc2: 'Define límites dinámicos por tarjeta, aprueba transferencias al toque y mantén cada presupuesto bajo llave.',
      screen: `
        <div class="flex items-center justify-between text-[10px] text-ink/80 font-semibold px-1 pt-0.5 tabular-nums">
          <span>9:41</span>
          <div class="w-16 h-4 rounded-full bg-black border border-white/10"></div>
          <div class="flex items-center gap-1"><span>5G</span><span class="w-4 h-2 rounded-[2px] border border-white/60 inline-block bg-vantage"></span></div>
        </div>
        <div class="flex items-center justify-between pt-2">
          <div>
            <p class="text-[11px] text-muted">Buenos días,</p>
            <p class="text-[17px] font-bold text-ink tracking-tight">Alejandro <span class="text-vantage">✦</span></p>
          </div>
          <div class="w-8 h-8 rounded-full bg-surface hairline flex items-center justify-center relative">
            <i data-lucide="bell" class="w-3.5 h-3.5 text-ink/80"></i>
            <span class="w-1.5 h-1.5 rounded-full bg-vantage absolute top-1.5 right-1.5"></span>
          </div>
        </div>
        <div class="bg-surface/90 hairline rounded-xl px-3 py-2 flex items-center gap-2 text-[11px] text-muted">
          <i data-lucide="search" class="w-3.5 h-3.5"></i>
          <span>Buscar movimientos...</span>
        </div>
        <div class="flex items-center justify-between text-[11px] pt-1">
          <span class="font-bold text-ink">Cuentas</span>
          <span class="text-vantage font-medium">Ver todo</span>
        </div>
        <div class="rounded-2xl p-4 border border-vantage/35 bg-gradient-to-br from-[#2B240E] via-[#15130C] to-[#0C0C0E] flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[10px] text-ink/70">Balance total</span>
              <div class="text-[22px] font-bold text-ink tabular-nums tracking-tight">$842,910.45</div>
              <span class="text-[10px] text-gain font-bold tabular-nums">↑ 8.3% respecto al mes pasado</span>
            </div>
            <div class="w-8 h-8 rounded-xl bg-vantage/15 border border-vantage/35 flex items-center justify-center text-vantage">
              <i data-lucide="wallet" class="w-4 h-4"></i>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-1.5 pt-2 border-t border-white/10 text-center text-[9px] text-ink/80">
            <div class="bg-obsidian/60 rounded-lg py-1.5 flex flex-col items-center gap-1"><i data-lucide="send" class="w-3 h-3 text-vantage"></i><span>Enviar</span></div>
            <div class="bg-obsidian/60 rounded-lg py-1.5 flex flex-col items-center gap-1"><i data-lucide="download" class="w-3 h-3 text-vantage"></i><span>Recibir</span></div>
            <div class="bg-obsidian/60 rounded-lg py-1.5 flex flex-col items-center gap-1"><i data-lucide="repeat" class="w-3 h-3 text-vantage"></i><span>Cambio</span></div>
            <div class="bg-obsidian/60 rounded-lg py-1.5 flex flex-col items-center gap-1"><i data-lucide="more-horizontal" class="w-3 h-3 text-vantage"></i><span>Más</span></div>
          </div>
        </div>
        <div class="flex flex-col gap-2 pt-1">
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-bold text-ink">Recientes</span>
            <span class="text-vantage">Ver todo</span>
          </div>
          <div class="bg-surface/80 hairline rounded-xl p-2.5 flex items-center justify-between text-[11px] tabular-nums">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-lg bg-vantage/15 text-vantage flex items-center justify-center"><i data-lucide="landmark" class="w-3.5 h-3.5"></i></div>
              <div><div class="font-bold text-ink">US Treasury SGOV</div><div class="text-[9px] text-muted">Hoy · 09:12</div></div>
            </div>
            <span class="text-gain font-bold">+$1,310.00</span>
          </div>
          <div class="bg-surface/80 hairline rounded-xl p-2.5 flex items-center justify-between text-[11px] tabular-nums">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-lg bg-elevated text-ink flex items-center justify-center"><i data-lucide="globe" class="w-3.5 h-3.5"></i></div>
              <div><div class="font-bold text-ink">SEPA Instant · Madrid</div><div class="text-[9px] text-muted">Ayer · 18:40</div></div>
            </div>
            <span class="text-ink font-bold">-€4,250.00</span>
          </div>
        </div>
      `,
    },
    swapping: {
      title: 'Cambio Multi-Divisa A Tasa Mid-Market Real',
      desc: 'Convierte USD, EUR, GBP y USDC en milisegundos con ejecución institucional 24/7 y cero comisiones ocultas de banca corresponsal.',
      icon1: 'zap',
      sub1: 'Liquidación en ~15s',
      subdesc1: 'Enrutamiento automático vía FedNow, SEPA Instant y Faster Payments sin intermediarios lentos.',
      icon2: 'shield-check',
      sub2: 'Tasa bloqueada 24h',
      subdesc2: 'Congela el tipo de cambio antes de aprobar pagos internacionales de alto volumen.',
      screen: `
        <div class="flex items-center justify-between text-[10px] text-ink/80 font-semibold px-1 pt-0.5 tabular-nums">
          <span>9:41</span>
          <div class="w-16 h-4 rounded-full bg-black border border-white/10"></div>
          <span class="text-vantage font-bold">FX LIVE</span>
        </div>
        <div class="pt-2 flex items-center justify-between">
          <span class="text-[15px] font-bold text-ink">Cambio Instantáneo</span>
          <span class="text-[10px] font-bold text-gain bg-gain/15 px-2 py-0.5 rounded-full">0% Spread</span>
        </div>
        <div class="bg-surface hairline rounded-2xl p-3.5 flex flex-col gap-1.5 tabular-nums">
          <div class="flex justify-between text-[10px] text-muted"><span>Conviertes</span><span>Saldo: $324,500</span></div>
          <div class="flex items-center justify-between">
            <span class="text-[22px] font-bold text-ink">50,000.00</span>
            <span class="px-2.5 py-1 rounded-lg bg-elevated hairline text-[11px] font-bold text-ink">USD</span>
          </div>
        </div>
        <div class="flex justify-center -my-3 z-10">
          <div class="w-8 h-8 rounded-full bg-vantage text-obsidian flex items-center justify-center shadow-lg">
            <i data-lucide="arrow-down" class="w-4 h-4 stroke-[2.5]"></i>
          </div>
        </div>
        <div class="bg-surface hairline-gold rounded-2xl p-3.5 flex flex-col gap-1.5 tabular-nums">
          <div class="flex justify-between text-[10px] text-muted"><span>Recibes al instante</span><span class="text-vantage">Mid-Market</span></div>
          <div class="flex items-center justify-between">
            <span class="text-[22px] font-bold text-vantage">46,296.00</span>
            <span class="px-2.5 py-1 rounded-lg bg-elevated hairline text-[11px] font-bold text-ink">EUR</span>
          </div>
        </div>
        <div class="bg-obsidian hairline rounded-xl p-3 flex flex-col gap-1.5 text-[10px] tabular-nums">
          <div class="flex justify-between"><span class="text-muted">Tipo de cambio</span><span class="text-ink font-bold">1 USD = 0.92592 EUR</span></div>
          <div class="flex justify-between"><span class="text-muted">Comisión Vantage</span><span class="text-gain font-bold">$0.00</span></div>
          <div class="flex justify-between"><span class="text-muted">Ahorro vs. banco</span><span class="text-vantage font-bold">+$1,400.00</span></div>
        </div>
        <div class="mt-auto rounded-xl py-2.5 bg-vantage text-obsidian text-center text-[12px] font-bold">Confirmar conversión</div>
      `,
    },
    cards: {
      title: 'Tarjetas Virtuales Y Metal Con Control Absoluto',
      desc: 'Emite tarjetas corporativas o desechables en un segundo para viajes, SaaS o proveedores con reglas automáticas por comercio.',
      icon1: 'credit-card',
      sub1: 'Emisión inmediata',
      subdesc1: 'Crea tarjetas en Apple Pay y Google Wallet al instante para cada miembro o proyecto.',
      icon2: 'lock',
      sub2: 'Límites programables',
      subdesc2: 'Congela, ajusta topes diarios o revoca permisos con un toque desde el teléfono o panel web.',
      screen: `
        <div class="flex items-center justify-between text-[10px] text-ink/80 font-semibold px-1 pt-0.5 tabular-nums">
          <span>9:41</span>
          <div class="w-16 h-4 rounded-full bg-black border border-white/10"></div>
          <span class="text-ink/70">NFC</span>
        </div>
        <div class="pt-2 flex items-center justify-between">
          <span class="text-[15px] font-bold text-ink">Mis Tarjetas</span>
          <span class="text-[10px] font-bold text-vantage">+ Nueva virtual</span>
        </div>
        <div class="rounded-2xl p-4 aspect-[1.6/1] bg-gradient-to-br from-[#23232A] via-[#121216] to-[#08080A] hairline-gold flex flex-col justify-between shadow-xl">
          <div class="flex justify-between items-center">
            <span class="text-[11px] font-bold text-ink">Vantage Infinite</span>
            <span class="text-[9px] font-bold text-vantage uppercase tracking-widest">Metal · 0% FX</span>
          </div>
          <div class="text-[14px] tracking-[0.18em] font-medium text-ink/90 tabular-nums">••••  ••••  ••••  4092</div>
          <div class="flex justify-between text-[9px] text-muted tabular-nums"><span>CORPORATE TREASURY</span><span>09/29</span></div>
        </div>
        <div class="bg-surface hairline rounded-xl p-3 flex flex-col gap-2 tabular-nums">
          <div class="flex justify-between text-[11px]"><span class="text-muted">Límite mensual</span><span class="font-bold text-ink">$18,400 / $50,000</span></div>
          <div class="w-full h-1.5 rounded-full bg-obsidian overflow-hidden"><div class="w-[37%] h-full bg-vantage rounded-full"></div></div>
        </div>
        <div class="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div class="bg-surface hairline rounded-xl py-2.5 flex flex-col items-center gap-1 text-ink"><i data-lucide="snowflake" class="w-3.5 h-3.5 text-vantage"></i><span>Congelar</span></div>
          <div class="bg-surface hairline rounded-xl py-2.5 flex flex-col items-center gap-1 text-ink"><i data-lucide="sliders" class="w-3.5 h-3.5 text-vantage"></i><span>Límites</span></div>
          <div class="bg-surface hairline rounded-xl py-2.5 flex flex-col items-center gap-1 text-ink"><i data-lucide="eye" class="w-3.5 h-3.5 text-vantage"></i><span>Datos</span></div>
        </div>
      `,
    },
    history: {
      title: 'Trazabilidad Y Auditoría Contable Sin Esfuerzo',
      desc: 'Cada transferencia, dividendo del Tesoro y gasto con tarjeta queda etiquetado automáticamente y sincronizado con tu ERP en segundos.',
      icon1: 'file-check-2',
      sub1: 'Conciliación automática',
      subdesc1: 'Adjunta comprobantes fiscales y sincroniza pólizas contables en NetSuite, Xero o QuickBooks.',
      icon2: 'activity',
      sub2: 'Reportes auditables',
      subdesc2: 'Exporta estados patrimoniales multi-divisa listos para auditoría, junta directiva o comité fiscal.',
      screen: `
        <div class="flex items-center justify-between text-[10px] text-ink/80 font-semibold px-1 pt-0.5 tabular-nums">
          <span>9:41</span>
          <div class="w-16 h-4 rounded-full bg-black border border-white/10"></div>
          <span class="text-gain font-bold">SYNC</span>
        </div>
        <div class="pt-2 flex items-center justify-between">
          <span class="text-[15px] font-bold text-ink">Libro Mayor</span>
          <span class="text-[10px] font-bold text-vantage bg-vantage/10 px-2 py-0.5 rounded-full">CSV / ERP</span>
        </div>
        <div class="flex gap-1.5 text-[10px]">
          <span class="px-2.5 py-1 rounded-full bg-vantage text-obsidian font-bold">Todo</span>
          <span class="px-2.5 py-1 rounded-full bg-surface hairline text-muted">Tesorería</span>
          <span class="px-2.5 py-1 rounded-full bg-surface hairline text-muted">FX</span>
        </div>
        <div class="flex flex-col gap-2 tabular-nums">
          <div class="bg-surface hairline rounded-xl p-2.5 flex items-center justify-between text-[11px]">
            <div><div class="font-bold text-ink">Cupón US T-Bill 3M</div><div class="text-[9px] text-muted">Conciliado · NetSuite</div></div>
            <span class="text-gain font-bold">+$2,418.20</span>
          </div>
          <div class="bg-surface hairline rounded-xl p-2.5 flex items-center justify-between text-[11px]">
            <div><div class="font-bold text-ink">AWS Cloud Services</div><div class="text-[9px] text-muted">Virtual ••9104 · Recibo OK</div></div>
            <span class="text-ink font-bold">-$3,840.00</span>
          </div>
          <div class="bg-surface hairline rounded-xl p-2.5 flex items-center justify-between text-[11px]">
            <div><div class="font-bold text-ink">Wire FedNow · NY</div><div class="text-[9px] text-muted">Aprobación 2/2 firmas</div></div>
            <span class="text-ink font-bold">-$42,000.00</span>
          </div>
          <div class="bg-surface hairline rounded-xl p-2.5 flex items-center justify-between text-[11px]">
            <div><div class="font-bold text-ink">USDC Institutional Vault</div><div class="text-[9px] text-muted">Liquidación 14s</div></div>
            <span class="text-gain font-bold">+$15,000.00</span>
          </div>
        </div>
      `,
    },
  };

  let activeFeatureTab = 'budgeting';
  const featureTabBtns = document.querySelectorAll('.feature-tab-btn');
  const tabIndicator = document.getElementById('feature-tab-indicator');
  const ftTitle = document.getElementById('ft-title');
  const ftDesc = document.getElementById('ft-desc');
  const ftIcon1 = document.getElementById('ft-icon-1');
  const ftSub1 = document.getElementById('ft-sub-1');
  const ftSubDesc1 = document.getElementById('ft-subdesc-1');
  const ftIcon2 = document.getElementById('ft-icon-2');
  const ftSub2 = document.getElementById('ft-sub-2');
  const ftSubDesc2 = document.getElementById('ft-subdesc-2');
  const phoneScreen = document.getElementById('showcase-phone-screen');
  const featureCopyWrap = document.getElementById('feature-tab-copy');

  function positionTabIndicator(btn, animate) {
    if (!btn || !tabIndicator) return;
    const bar = document.getElementById('feature-tabs-bar');
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = btnRect.left - barRect.left;
    const width = btnRect.width;
    if (animate && window.gsap) {
      gsap.to(tabIndicator, { x: left, width, duration: 0.42, ease: 'power3.out' });
    } else {
      tabIndicator.style.transform = `translateX(${left}px)`;
      tabIndicator.style.width = `${width}px`;
    }
  }

  function renderFeatureTab(key, animate) {
    const data = featureData[key];
    if (!data || !phoneScreen) return;
    activeFeatureTab = key;

    let activeBtn = null;
    featureTabBtns.forEach((b) => {
      const isMatch = b.dataset.featureTab === key;
      if (isMatch) activeBtn = b;
      b.classList.toggle('text-ink', isMatch);
      b.classList.toggle('font-bold', isMatch);
      b.classList.toggle('text-muted', !isMatch);
      b.classList.toggle('font-medium', !isMatch);
    });
    positionTabIndicator(activeBtn, animate);

    const applyContent = () => {
      ftTitle.textContent = data.title;
      ftDesc.textContent = data.desc;
      ftIcon1.setAttribute('data-lucide', data.icon1);
      ftSub1.textContent = data.sub1;
      ftSubDesc1.textContent = data.subdesc1;
      ftIcon2.setAttribute('data-lucide', data.icon2);
      ftSub2.textContent = data.sub2;
      ftSubDesc2.textContent = data.subdesc2;
      phoneScreen.innerHTML = data.screen;
      refreshIcons();
    };

    if (animate && window.gsap) {
      gsap.to([featureCopyWrap, phoneScreen], {
        opacity: 0,
        y: 12,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          applyContent();
          gsap.fromTo(
            [featureCopyWrap, phoneScreen],
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' }
          );
        },
      });
    } else {
      applyContent();
    }
  }

  featureTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.featureTab !== activeFeatureTab) {
        renderFeatureTab(btn.dataset.featureTab, true);
      }
    });
  });

  renderFeatureTab('budgeting', false);
  window.addEventListener('resize', () => {
    const activeBtn = document.querySelector(`.feature-tab-btn[data-feature-tab="${activeFeatureTab}"]`);
    positionTabIndicator(activeBtn, false);
  });

  // ===========================================================================
  // 4. YIELD SIMULATOR & FX SAVINGS CALCULATOR
  // ===========================================================================
  const yieldRates = {
    USD: { apy: 0.0485, sym: '$' },
    EUR: { apy: 0.034, sym: '€' },
    GBP: { apy: 0.046, sym: '£' },
  };
  let activeYieldCur = 'USD';
  const yieldSlider = document.getElementById('yield-slider');

  function updateYield() {
    if (!yieldSlider) return;
    const p = Number(yieldSlider.value);
    const cfg = yieldRates[activeYieldCur];
    const annual = Math.round(p * cfg.apy);
    const monthly = Math.round(annual / 12);
    document.getElementById('yield-principal-out').textContent = `${cfg.sym}${p.toLocaleString('en-US')}`;
    document.getElementById('yield-annual-out').textContent = `+${cfg.sym}${annual.toLocaleString('en-US')} / año`;
    document.getElementById('yield-monthly-out').textContent = `+${cfg.sym}${monthly.toLocaleString('en-US')} / mes`;
  }

  if (yieldSlider) {
    yieldSlider.addEventListener('input', updateYield);
    document.querySelectorAll('.yield-cur-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeYieldCur = btn.dataset.yieldCur;
        document.querySelectorAll('.yield-cur-btn').forEach((b) => {
          b.className = 'yield-cur-btn tactile px-3 py-1.5 rounded-full text-[12px] font-medium bg-surface text-muted hairline';
        });
        btn.className = 'yield-cur-btn tactile px-3 py-1.5 rounded-full text-[12px] font-bold bg-elevated text-ink hairline-gold';
        updateYield();
      });
    });
    updateYield();
  }

  const fxSlider = document.getElementById('fx-vol-slider');
  function updateFxCalc() {
    if (!fxSlider) return;
    const m = Number(fxSlider.value);
    const saved = Math.round(m * 12 * 0.028);
    document.getElementById('fx-vol-out').textContent = `$${m.toLocaleString('en-US')} / mes`;
    document.getElementById('fx-bank-cost').textContent = `$${saved.toLocaleString('en-US')} / año`;
    document.getElementById('fx-vantage-save').textContent = `+$${saved.toLocaleString('en-US')} / año`;
  }
  if (fxSlider) {
    fxSlider.addEventListener('input', updateFxCalc);
    updateFxCalc();
  }

  // ===========================================================================
  // 5. INTEGRATIONS ORBITAL NODES INTERACTION
  // ===========================================================================
  document.querySelectorAll('.orbital-node').forEach((node) => {
    node.addEventListener('click', () => {
      showToast(`Integración: ${node.dataset.integration}`, 'Conexión OAuth / API bidireccional lista en menos de 2 minutos.');
    });
  });

  // ===========================================================================
  // 6. FAQ CATEGORY TABS + SPLIT-TILE ACCORDION (SCREENSHOT 6)
  // ===========================================================================
  const faqCatalog = {
    general: [
      {
        q: '¿Cuánto tiempo toma abrir una cuenta y comenzar a operar?',
        a: 'El onboarding digital toma menos de 10 minutos. Para patrimonios privados y tesorerías corporativas, la verificación KYB/KYC se completa en menos de 48 horas con un especialista dedicado.',
      },
      {
        q: '¿Necesito conectar mi banco actual o ERP para usar Vantage Capital?',
        a: 'No es obligatorio. Puedes operar de inmediato con tus cuentas locales en USD, EUR, GBP y USDC, o vincular tu ERP (NetSuite, Xero, QuickBooks, SAP) cuando quieras automatizar tu conciliación.',
      },
      {
        q: '¿Puedo cambiar de membresía o retirar mi liquidez en cualquier momento?',
        a: 'Totalmente. No existen plazos forzosos ni penalizaciones por retiro anticipado. Tus posiciones en Bonos del Tesoro 0-3M (SGOV) mantienen liquidez T+1 en todo momento.',
      },
      {
        q: '¿Cómo protege Vantage Capital nuestros datos financieros y fondos?',
        a: 'Todos los saldos se custodían en cuentas segregadas 1:1 en instituciones Tier-1 de EE. UU. y Europa, con cifrado AES-256, aprobación multi-firma y autenticación biométrica Passkey.',
      },
      {
        q: '¿Soportan empresas y patrimonios que operan en múltiples divisas?',
        a: 'Sí. Soportamos pagos locales e internacionales en más de 75 divisas y 120 países a tasa mid-market real, sin spreads ocultos en USD ↔ EUR ↔ GBP.',
      },
    ],
    implementacion: [
      {
        q: '¿Cómo se integra Vantage con NetSuite, Xero o QuickBooks?',
        a: 'Conecta tu ERP en dos clics vía OAuth seguro. Cada transacción, recibo y rendimiento del Tesoro se sincroniza automáticamente con tus centros de costo y catálogo de cuentas.',
      },
      {
        q: '¿Puedo configurar flujos de aprobación multi-firma por monto?',
        a: 'Sí. Define reglas granulares por rol, departamento y umbral de monto para que pagos estratégicos requieran 2 o 3 firmas biométricas antes de ejecutarse.',
      },
      {
        q: '¿Ofrecen API REST y webhooks para tesorerías automatizadas?',
        a: 'Nuestro plan Corporate Treasury incluye acceso completo a API REST, llaves con alcance limitado y webhooks firmados en tiempo real para pagos masivos y lectura de saldos.',
      },
      {
        q: '¿Cuánto tarda emitir tarjetas físicas y virtuales para mi equipo?',
        a: 'Las tarjetas virtuales se emiten en menos de 3 segundos con Apple Pay / Google Wallet. Las tarjetas metálicas Vantage Infinite llegan por mensajería privada en 3 a 5 días hábiles.',
      },
      {
        q: '¿Asignan un gerente de implementación durante la migración?',
        a: 'Cada cuenta institucional recibe un especialista de tesorería encargado de migrar beneficiarios recurrentes, permisos de equipo y conciliación contable.',
      },
    ],
    cumplimiento: [
      {
        q: '¿Dónde se custodían legalmente los saldos y Bonos del Tesoro?',
        a: 'Los fondos y títulos del Tesoro de EE. UU. se mantienen en cuentas segregadas a nombre del cliente ante bancos custodios y brókeres regulados Tier-1, completamente aislados del balance de Vantage.',
      },
      {
        q: '¿Cuentan con certificación SOC 2 Tipo II y auditorías independientes?',
        a: 'Sí. Nuestra infraestructura pasa auditorías continuas SOC 2 Tipo II, pruebas de penetración trimestrales y monitoreo antifraude 24/7 con motor Zero-Trust.',
      },
      {
        q: '¿Generan reportes fiscales y estados patrimoniales listos para auditoría?',
        a: 'Exporta resúmenes mensuales, intereses devengados y movimientos FX en formatos PDF certificado, CSV y JSON compatibles con auditores externos.',
      },
      {
        q: '¿Qué controles anti-lavado (AML/KYC) aplican en transferencias internacionales?',
        a: 'Cada liquidación se valida en tiempo real contra listas internacionales OFAC, UE y ONU, garantizando cumplimiento normativo sin frenar la velocidad de liquidación.',
      },
      {
        q: '¿Cómo se gestionan permisos de solo lectura para auditores externos?',
        a: 'Puedes invitar a tu contador o firma auditora con un perfil de solo lectura temporal, con trazabilidad completa de accesos y descargas.',
      },
    ],
  };

  let activeFaqCat = 'general';
  let refreshTimer = null;
  const faqContainer = document.getElementById('faq-list-container');

  function scheduleScrollTriggerRefresh() {
    if (!window.ScrollTrigger) return;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 300);
  }

  function renderFaqList(cat, animate) {
    if (!faqContainer || !faqCatalog[cat]) return;
    activeFaqCat = cat;

    faqContainer.innerHTML = faqCatalog[cat]
      .map(
        (item, idx) => `
        <div class="faq-item flex items-stretch gap-2.5" data-open="${idx === 0 ? 'true' : 'false'}">
          <div class="faq-card-main flex-1 bg-surface/90 hairline rounded-xl overflow-hidden transition-colors">
            <button type="button" class="faq-trigger w-full px-5 py-[18px] text-left flex items-center justify-between gap-4">
              <span class="text-[15px] font-medium text-ink leading-snug">${item.q}</span>
            </button>
            <div class="faq-content">
              <div class="overflow-hidden">
                <p class="px-5 pb-5 text-[14px] text-muted leading-relaxed">${item.a}</p>
              </div>
            </div>
          </div>
          <button type="button" aria-label="Expandir respuesta" class="faq-trigger faq-plus-box tactile w-14 shrink-0 bg-surface/90 hairline hover:border-vantage/45 rounded-xl flex items-center justify-center text-ink">
            <i data-lucide="plus" class="faq-plus w-4 h-4"></i>
          </button>
        </div>
      `
      )
      .join('');

    refreshIcons();

    faqContainer.querySelectorAll('.faq-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const row = btn.closest('.faq-item');
        const isOpen = row.getAttribute('data-open') === 'true';
        // Close siblings for clean Fexiva rhythm
        faqContainer.querySelectorAll('.faq-item').forEach((other) => {
          if (other !== row) other.setAttribute('data-open', 'false');
        });
        row.setAttribute('data-open', isOpen ? 'false' : 'true');
        scheduleScrollTriggerRefresh();
      });
    });

    if (animate && window.gsap) {
      gsap.from(faqContainer.querySelectorAll('.faq-item'), {
        y: 16,
        opacity: 0,
        duration: 0.42,
        stagger: 0.055,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        onComplete: scheduleScrollTriggerRefresh,
      });
    }
  }

  document.querySelectorAll('.faq-cat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.faqCat;
      if (cat === activeFaqCat) return;
      document.querySelectorAll('.faq-cat-btn').forEach((b) => {
        b.className = 'faq-cat-btn tactile px-4 py-2 rounded-lg text-[13px] font-medium bg-surface hairline text-muted hover:text-ink';
      });
      btn.className = 'faq-cat-btn tactile px-4 py-2 rounded-lg text-[13px] font-bold bg-vantage text-obsidian shadow-[0_0_20px_-4px_rgba(242,206,22,0.5)]';
      renderFaqList(cat, true);
    });
  });

  renderFaqList('general', false);

  // ===========================================================================
  // 7. BLOG ARTICLE READER MODAL (SCREENSHOT 5)
  // ===========================================================================
  const blogArticles = [
    {
      author: 'Sofía Navarro',
      readTime: '6 Min de lectura',
      img: './assets/blog-1.jpg',
      title: 'Construyendo Una Cultura De Seguridad Que Tu Equipo Financiero Adopte',
      paragraphs: [
        'Los controles de tesorería más sólidos fracasan cuando añaden fricción innecesaria al día a día operativo. El secreto está en diseñar políticas invisibles: aprobaciones biométricas en dos segundos y tarjetas virtuales con límites pre-autorizados por proveedor.',
        'En Vantage Capital combinamos autenticación Passkey, segmentación de roles y alertas instantáneas en Slack para que los equipos de finanzas operen con velocidad sin ceder un milímetro en gobernanza.',
      ],
    },
    {
      author: 'Arturo Méndez',
      readTime: '8 Min de lectura',
      img: './assets/blog-2.jpg',
      title: 'Pagos Zero-Trust: Protegiendo Cada Transacción Institucional',
      paragraphs: [
        'Las transferencias internacionales tradicionales dependen de correos, PDFs estáticos y validaciones manuales vulnerables a suplantación. Una arquitectura Zero-Trust verifica criptográficamente tanto la identidad del firmante como los datos bancarios de destino.',
        'Al combinar cuentas segregadas Tier-1 con firmas múltiples dinámicas, cada movimiento de capital cuenta con trazabilidad auditable desde la solicitud hasta la liquidación en FedNow o SEPA Instant.',
      ],
    },
    {
      author: 'Elena Vargas',
      readTime: '5 Min de lectura',
      img: './assets/blog-3.jpg',
      title: 'Cinco Señales De Que Tu Empresa Superó Su Banca Tradicional',
      paragraphs: [
        'Si tu tesorería paga más del 2% en spreads cambiarios, mantiene millones en cuentas corrientes al 0% de rendimiento o tarda cinco días en conciliar tarjetas corporativas, la infraestructura bancaria se ha convertido en un lastre silencioso.',
        'Migrar a una plataforma unificada multi-divisa con Bonos del Tesoro T+1 y conciliación ERP directa suele recuperar entre 280 y 450 puntos base anuales sobre el flujo operativo.',
      ],
    },
  ];

  const blogModal = document.getElementById('blog-modal');
  const blogCard = document.getElementById('blog-modal-card');
  const blogMeta = document.getElementById('blog-modal-meta');
  const blogBody = document.getElementById('blog-modal-body');

  function openBlogModal(idx) {
    const art = blogArticles[idx];
    if (!art || !blogModal) return;
    blogMeta.textContent = `${art.author} · ${art.readTime}`;
    blogBody.innerHTML = `
      <div class="rounded-xl overflow-hidden hairline aspect-[16/9]">
        <img src="${art.img}" alt="${art.title}" class="w-full h-full object-cover" />
      </div>
      <h3 class="text-[24px] font-bold tracking-tight text-ink leading-snug">${art.title}</h3>
      <div class="flex flex-col gap-3 text-[15px] text-muted leading-relaxed">
        ${art.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      </div>
      <div class="pt-2 border-t border-white/[0.08] flex justify-end">
        <button id="blog-cta-open-access" class="tactile px-5 py-2.5 rounded-full bg-vantage text-obsidian text-[13px] font-bold">Hablar con un especialista</button>
      </div>
    `;
    const btn = document.getElementById('blog-cta-open-access');
    if (btn) btn.addEventListener('click', () => { closeBlogModal(); openAccessModal('Corporate Treasury'); });

    blogModal.classList.remove('hidden');
    blogModal.classList.add('flex');
    requestAnimationFrame(() => {
      blogModal.classList.remove('opacity-0');
      blogCard.classList.remove('scale-95');
      blogCard.classList.add('scale-100');
    });
  }

  function closeBlogModal() {
    if (!blogModal) return;
    blogModal.classList.add('opacity-0');
    blogCard.classList.add('scale-95');
    setTimeout(() => {
      blogModal.classList.add('hidden');
      blogModal.classList.remove('flex');
    }, 180);
  }

  document.querySelectorAll('.blog-card').forEach((card) => {
    card.addEventListener('click', () => openBlogModal(Number(card.dataset.blogId)));
  });
  const blogCloseBtn = document.getElementById('blog-close-btn');
  if (blogCloseBtn) blogCloseBtn.addEventListener('click', closeBlogModal);
  if (blogModal) blogModal.addEventListener('click', (e) => { if (e.target === blogModal) closeBlogModal(); });

  const blogAllBtn = document.getElementById('blog-view-all-btn');
  if (blogAllBtn) {
    blogAllBtn.addEventListener('click', () => {
      showToast('Centro de Análisis Vantage', 'Mostrando las 3 publicaciones destacadas más recientes.');
      openBlogModal(0);
    });
  }

  // ===========================================================================
  // 8. DEMO MODAL & ACCESS MODAL + NEWSLETTER + SOCIALS
  // ===========================================================================
  const demoModal = document.getElementById('demo-modal');
  const demoCard = document.getElementById('demo-modal-card');
  const demoBody = document.getElementById('demo-modal-body');
  let demoTab = 'overview';

  function renderDemoTab() {
    document.querySelectorAll('.demo-tab-btn').forEach((b) => {
      const active = b.dataset.demoTab === demoTab;
      b.className = active
        ? 'demo-tab-btn tactile px-3 py-1 rounded-md bg-elevated text-ink font-bold hairline-strong'
        : 'demo-tab-btn tactile px-3 py-1 rounded-md text-muted hover:text-ink font-medium';
    });

    if (demoTab === 'overview') {
      demoBody.innerHTML = `
        <div class="bg-surface hairline rounded-2xl p-5 flex flex-col gap-4">
          <div class="flex items-end justify-between flex-wrap gap-3">
            <div class="flex flex-col gap-1">
              <span class="text-[11px] uppercase tracking-wider text-muted font-medium">Balance Neto Total</span>
              <div class="text-[36px] font-bold tabular-nums leading-none text-ink">$842,910<span class="text-muted text-[24px] font-medium">.45</span> <span class="text-[13px] font-medium text-muted">USD</span></div>
            </div>
            <span class="px-2.5 py-1 rounded-md bg-gain/12 text-gain text-[12px] font-bold tabular-nums">+14.2% · +$104,820.00 (30d)</span>
          </div>
          <div class="relative w-full h-[140px]">
            <svg viewBox="0 0 1000 200" preserveAspectRatio="none" width="100%" height="100%" class="w-full h-full block">
              <defs>
                <linearGradient id="demoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#F2CE16" stop-opacity="0.22" />
                  <stop offset="100%" stop-color="#F2CE16" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 180 C 120 155, 220 140, 350 118 C 480 95, 580 112, 700 68 C 820 28, 900 32, 1000 36 L 1000 200 L 0 200 Z" fill="url(#demoGrad)" />
              <path d="M 0 180 C 120 155, 220 140, 350 118 C 480 95, 580 112, 700 68 C 820 28, 900 32, 1000 36" fill="none" stroke="#F2CE16" stroke-width="2.25" vector-effect="non-scaling-stroke" stroke-linecap="round" />
            </svg>
            <div style="left: 100%; top: 18%;" class="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-vantage ring-[3px] ring-obsidian"></div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/[0.06] tabular-nums text-[12px]">
            <div class="bg-obsidian hairline rounded-xl p-3"><span class="text-muted block">USD Treasury</span><span class="font-bold text-ink text-[15px]">$324,500</span></div>
            <div class="bg-obsidian hairline rounded-xl p-3"><span class="text-muted block">EUR SEPA</span><span class="font-bold text-ink text-[15px]">€148,200</span></div>
            <div class="bg-obsidian hairline rounded-xl p-3"><span class="text-muted block">GBP Reserve</span><span class="font-bold text-ink text-[15px]">£62,400</span></div>
            <div class="bg-obsidian hairline rounded-xl p-3"><span class="text-muted block">USDC Vault</span><span class="font-bold text-ink text-[15px]">$54,120</span></div>
          </div>
        </div>
      `;
    } else if (demoTab === 'portfolio') {
      demoBody.innerHTML = `
        <div class="bg-surface hairline rounded-2xl p-5 flex flex-col gap-4 tabular-nums">
          <div class="flex items-center justify-between">
            <span class="text-[14px] font-bold text-ink">Asignación Institucional</span>
            <span class="text-[12px] font-bold text-vantage">4.82% APY ponderado</span>
          </div>
          <div class="w-full h-2.5 rounded-full overflow-hidden flex gap-1 bg-obsidian">
            <div style="width: 34%" class="bg-vantage"></div>
            <div style="width: 26%" class="bg-zinc-200"></div>
            <div style="width: 20%" class="bg-zinc-500"></div>
            <div style="width: 11%" class="bg-zinc-400"></div>
            <div style="width: 9%" class="bg-gain"></div>
          </div>
          <div class="flex flex-col divide-y divide-white/[0.06] text-[13px]">
            <div class="py-3 flex justify-between"><div><span class="font-bold text-ink">SGOV</span> <span class="text-muted ml-2">Bonos del Tesoro 0-3M</span></div><span class="font-bold text-ink">$287,145 <span class="text-gain text-[11px] ml-1">4.92%</span></span></div>
            <div class="py-3 flex justify-between"><div><span class="font-bold text-ink">VOO</span> <span class="text-muted ml-2">Vanguard S&amp;P 500 ETF</span></div><span class="font-bold text-ink">$218,400 <span class="text-gain text-[11px] ml-1">+1.84%</span></span></div>
            <div class="py-3 flex justify-between"><div><span class="font-bold text-ink">CASH</span> <span class="text-muted ml-2">Liquidez Multi-Divisa</span></div><span class="font-bold text-ink">$168,745 <span class="text-gain text-[11px] ml-1">4.35%</span></span></div>
            <div class="py-3 flex justify-between"><div><span class="font-bold text-ink">USDC</span> <span class="text-muted ml-2">Institutional Yield Vault</span></div><span class="font-bold text-ink">$74,120 <span class="text-gain text-[11px] ml-1">5.10%</span></span></div>
          </div>
        </div>
      `;
    } else {
      demoBody.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
          <div class="rounded-2xl p-6 aspect-[1.586/1] bg-gradient-to-br from-[#1C1C21] via-[#101014] to-[#08080A] hairline-strong flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-[13px] font-bold text-ink">Vantage Infinite</span>
              <span class="text-[10px] uppercase tracking-widest text-vantage font-bold">Metal · 0% FX</span>
            </div>
            <div class="text-[18px] tracking-[0.15em] text-ink font-medium tabular-nums">••••  ••••  ••••  4092</div>
            <div class="flex justify-between text-[11px] text-muted tabular-nums"><span>ALEJANDRO MORALES</span><span>09/29</span></div>
          </div>
          <div class="flex flex-col gap-3 text-[13px]">
            <h4 class="text-[16px] font-bold text-ink">Control granular en tiempo real</h4>
            <p class="text-muted leading-relaxed">Ajusta límites mensuales al instante, congela tarjetas con un toque y liquida compras internacionales a tasa mid-market real.</p>
            <button id="demo-request-cta" class="tactile self-start px-5 py-2.5 rounded-full bg-vantage text-obsidian font-bold text-[13px]">Solicitar esta tarjeta</button>
          </div>
        </div>
      `;
      const reqBtn = document.getElementById('demo-request-cta');
      if (reqBtn) reqBtn.addEventListener('click', () => { closeDemoModal(); openAccessModal('Private Wealth'); });
    }
  }

  function openDemoModal() {
    renderDemoTab();
    demoModal.classList.remove('hidden');
    demoModal.classList.add('flex');
    requestAnimationFrame(() => {
      demoModal.classList.remove('opacity-0');
      demoCard.classList.remove('scale-95');
      demoCard.classList.add('scale-100');
    });
  }

  function closeDemoModal() {
    demoModal.classList.add('opacity-0');
    demoCard.classList.add('scale-95');
    setTimeout(() => {
      demoModal.classList.add('hidden');
      demoModal.classList.remove('flex');
    }, 180);
  }

  const accessModal = document.getElementById('access-modal');
  const accessCard = document.getElementById('access-modal-card');
  function openAccessModal(defaultPlan) {
    if (defaultPlan) document.getElementById('access-type').value = defaultPlan;
    accessModal.classList.remove('hidden');
    accessModal.classList.add('flex');
    requestAnimationFrame(() => {
      accessModal.classList.remove('opacity-0');
      accessCard.classList.remove('scale-95');
      accessCard.classList.add('scale-100');
    });
    setTimeout(() => document.getElementById('access-email').focus(), 180);
  }
  function closeAccessModal() {
    accessModal.classList.add('opacity-0');
    accessCard.classList.add('scale-95');
    setTimeout(() => {
      accessModal.classList.add('hidden');
      accessModal.classList.remove('flex');
    }, 180);
  }

  ['nav-demo-btn', 'hero-demo-btn', 'section-demo-btn', 'cta-demo-btn', 'float-deposit-btn', 'float-send-btn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', openDemoModal);
  });

  const copilotBtn = document.getElementById('float-copilot-btn');
  if (copilotBtn) {
    copilotBtn.addEventListener('click', () => {
      showToast('Vantage Copilot', '+0.85% APY adicional proyectado al asignar 5% a Bonos del Tesoro (SGOV).');
    });
  }

  ['nav-access-btn', 'hero-access-btn', 'cta-access-btn', 'about-cta-btn', 'footer-contact-btn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => openAccessModal('Private Wealth'));
  });
  document.querySelectorAll('.plan-cta-btn').forEach((btn) => {
    btn.addEventListener('click', () => openAccessModal(btn.dataset.plan));
  });

  document.getElementById('demo-close-btn').addEventListener('click', closeDemoModal);
  demoModal.addEventListener('click', (e) => { if (e.target === demoModal) closeDemoModal(); });
  document.querySelectorAll('.demo-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => { demoTab = btn.dataset.demoTab; renderDemoTab(); });
  });

  document.getElementById('modal-close-btn').addEventListener('click', closeAccessModal);
  accessModal.addEventListener('click', (e) => { if (e.target === accessModal) closeAccessModal(); });
  document.getElementById('access-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('access-email').value.trim();
    closeAccessModal();
    showToast('Solicitud registrada', `Enviamos tu invitación privada a ${email}.`);
    document.getElementById('access-email').value = '';
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletter-email');
      const email = input.value.trim();
      showToast('Suscripción confirmada', `Recibirás los reportes de Vantage Capital en ${email}.`);
      input.value = '';
    });
  }

  document.querySelectorAll('.social-tile').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(`Vantage en ${link.dataset.social}`, 'Canal oficial @vantagecapital.');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAccessModal();
      closeDemoModal();
      closeBlogModal();
    }
  });

  // ===========================================================================
  // 9. GSAP + SCROLLTRIGGER CHOREOGRAPHY (FEXIVA SCROLL & TEXT REVEALS)
  // ===========================================================================
  // Smooth anchor scrolling in JS (keeps native CSS scroll-behavior clean for ScrollTrigger)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Bulletproof recursive word/char mask splitter (preserves colored spans & <br> tags)
  function splitElementText(el, mode) {
    if (!el || el.dataset.splitDone === 'true') return [];
    el.dataset.splitDone = 'true';
    const pieces = [];
    const maskClass = mode === 'chars' ? 'reveal-char-mask' : 'reveal-word-mask';
    const innerClass = mode === 'chars' ? 'reveal-char' : 'reveal-word';

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        if (!text || !text.trim()) return;
        const frag = document.createDocumentFragment();
        const tokens = mode === 'chars' ? Array.from(text) : text.split(/(\s+)/);
        tokens.forEach((tok) => {
          if (mode !== 'chars' && /^\s+$/.test(tok)) {
            frag.appendChild(document.createTextNode(tok));
          } else if (tok === ' ') {
            frag.appendChild(document.createTextNode('\u00A0'));
          } else if (tok.length > 0) {
            const mask = document.createElement('span');
            mask.className = maskClass;
            const inner = document.createElement('span');
            inner.className = innerClass;
            inner.textContent = tok;
            mask.appendChild(inner);
            frag.appendChild(mask);
            pieces.push(inner);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
        Array.from(node.childNodes).forEach(walk);
      }
    }

    Array.from(el.childNodes).forEach(walk);
    return pieces;
  }

  let gsapInitialized = false;

  function initGSAPChoreography() {
    if (gsapInitialized) return;
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn('[Vantage] GSAP o ScrollTrigger no cargó desde CDN.');
      return;
    }
    gsapInitialized = true;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // 0. Top Scroll Progress Bar
    gsap.to('#scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
      },
    });

    // A. HERO MASTER ENTRANCE TIMELINE (runs immediately on page load)
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.85 },
    });

    heroTl.from('.nav-enter', { y: -26, autoAlpha: 0, duration: 0.7 });

    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
      const heroWords = splitElementText(heroHeadline, 'words');
      if (heroWords.length) {
        heroTl.from(
          heroWords,
          { yPercent: 120, opacity: 0, duration: 0.95, stagger: 0.065, ease: 'power4.out' },
          '-=0.35'
        );
      }
    }

    heroTl
      .from('.hero-enter', { y: 28, autoAlpha: 0, stagger: 0.1 }, '-=0.55')
      .from('#hero-phone-parallax', { y: 74, scale: 0.92, autoAlpha: 0, duration: 1.05, ease: 'power4.out' }, '-=0.55')
      .from('.hero-enter-left', { x: -46, y: 22, autoAlpha: 0, duration: 0.9 }, '-=0.75')
      .from('.hero-enter-right', { x: 46, y: 22, autoAlpha: 0, duration: 0.9 }, '<0.1');

    // B. TRUSTED BY ENTRANCE (Infinite leftward marquee runs smoothly via CSS @keyframes marqueeLeft)
    const trustedSection = document.getElementById('trusted');
    if (trustedSection) {
      gsap.from(trustedSection.querySelectorAll('.trusted-enter'), {
        y: 36,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: trustedSection,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // C. ALL SECTION SPLIT HEADINGS (Fexiva masked word-by-word scroll reveals)
    document.querySelectorAll('.split-heading').forEach((heading) => {
      const words = splitElementText(heading, 'words');
      if (!words.length) return;
      gsap.from(words, {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        stagger: 0.042,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // D. ABOUT BENTO SECTION: EDITORIAL FADE + IMAGE UNVEIL + SCRUB PARALLAX + COUNTERS
    const aboutSection = document.getElementById('sobre');
    if (aboutSection) {
      gsap.from(aboutSection.querySelectorAll('.about-fade'), {
        y: 42,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      aboutSection.querySelectorAll('.about-img-card').forEach((card, i) => {
        const img = card.querySelector('img');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        });
        tl.from(card, {
          clipPath: 'inset(18% 0% 18% 0% round 16px)',
          y: 40,
          autoAlpha: 0,
          duration: 0.95,
          delay: i * 0.08,
          ease: 'power3.out',
        });
        if (img) {
          tl.from(img, { scale: 1.18, duration: 1.15, ease: 'power3.out' }, '<');
        }
      });

      // Stat Counters Roll-Up
      aboutSection.querySelectorAll('.about-stat-block').forEach((block) => {
        gsap.from(block, {
          y: 36,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      aboutSection.querySelectorAll('.count-metric').forEach((el) => {
        const target = parseFloat(el.dataset.countTo);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const hasPlus = el.dataset.plus === 'true';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        if (isNaN(target)) return;

        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reset',
          },
          onUpdate: () => {
            const num = decimals > 0 ? proxy.val.toFixed(decimals) : Math.round(proxy.val);
            el.innerHTML = `${prefix}${num}${suffix}${hasPlus ? '<span class="text-vantage">+</span>' : ''}`;
          },
        });
      });
    }

    // E. TABBED PLATFORM SHOWCASE ENTRANCE
    const platSection = document.getElementById('plataforma');
    if (platSection) {
      const platTl = gsap.timeline({
        scrollTrigger: {
          trigger: platSection,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });
      platTl
        .from('#feature-tabs-bar', { y: 28, autoAlpha: 0, duration: 0.7, ease: 'power3.out' })
        .from('#feature-tab-copy', { y: 40, autoAlpha: 0, duration: 0.85, ease: 'power3.out' }, '-=0.45')
        .from('.silk-stage', { y: 48, scale: 0.95, autoAlpha: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .from('#showcase-phone-frame', { y: 64, scale: 0.94, autoAlpha: 0, duration: 0.95, ease: 'power4.out', clearProps: 'transform' }, '-=0.6');
    }

    // F. BENTO CALCULATORS & METALLIC CARD
    const funcSection = document.getElementById('funciones');
    if (funcSection) {
      funcSection.querySelectorAll('.bento-reveal').forEach((card, i) => {
        gsap.from(card, {
          y: 54,
          scale: 0.97,
          autoAlpha: 0,
          duration: 0.85,
          delay: (i % 2) * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }

    // G. INTEGRATIONS ORBITAL ARC CHOREOGRAPHY (360° rotating wheel driven by CSS, GSAP scroll reveal)
    const integSection = document.getElementById('integraciones');
    if (integSection) {
      const integTl = gsap.timeline({
        scrollTrigger: {
          trigger: integSection.querySelector('.orbital-stage'),
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      });

      integTl
        .from('.orbital-wheel-mask', { autoAlpha: 0, y: 40, duration: 1.0, ease: 'power3.out' })
        .from('.orbital-core-wrap', { y: 32, scale: 0.84, autoAlpha: 0, duration: 0.85, ease: 'back.out(1.5)' }, '-=0.65');
    }

    // H. PLANS STAGGER
    const planesSection = document.getElementById('planes');
    if (planesSection) {
      gsap.from(planesSection.querySelectorAll('.plan-card'), {
        y: 50,
        scale: 0.97,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: planesSection.querySelector('.grid'),
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // I. BLOG CARDS STAGGERED ENTRANCE
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      gsap.from(blogSection.querySelectorAll('.blog-card'), {
        y: 54,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: blogSection.querySelector('.grid'),
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // J. FAQ 3D COIN LEVITATION + SPLIT-TILE ACCORDION ENTRANCE
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      gsap.from('#faq-coin-float', {
        y: 52,
        scale: 0.86,
        autoAlpha: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#faq-coin-float',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('#faq-coin-float img', {
        y: -14,
        rotation: 1.5,
        duration: 3.0,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.from('#faq-list-container .faq-item', {
        x: 34,
        y: 16,
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#faq-list-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // K. CLOSING GOLD CTA BANNER
    const closingBanner = document.getElementById('closing-cta-banner');
    if (closingBanner) {
      gsap.from(closingBanner, {
        y: 52,
        scale: 0.95,
        autoAlpha: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: closingBanner,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    // L. FOOTER COLUMNS + CLEAN BOTTOM REVEAL
    const footer = document.getElementById('footer');
    if (footer) {
      gsap.from(footer.querySelectorAll('.footer-col'), {
        y: 36,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      const footerBottom = document.getElementById('footer-bottom');
      if (footerBottom) {
        gsap.from(footerBottom, {
          y: 28,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerBottom,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }

    // M. METALLIC CARD 3D MAGNETIC TILT (gsap.quickTo)
    const metalCard = document.querySelector('.metal-card');
    if (metalCard) {
      const xTo = gsap.quickTo(metalCard, 'x', { duration: 0.35, ease: 'power3.out' });
      const yTo = gsap.quickTo(metalCard, 'y', { duration: 0.35, ease: 'power3.out' });
      const rotXTo = gsap.quickTo(metalCard, 'rotationX', { duration: 0.4, ease: 'power3.out' });
      const rotYTo = gsap.quickTo(metalCard, 'rotationY', { duration: 0.4, ease: 'power3.out' });

      metalCard.addEventListener('mousemove', (e) => {
        const r = metalCard.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        xTo(nx * 8);
        yTo(ny * 8);
        rotYTo(nx * 7);
        rotXTo(-ny * 7);
      });
      metalCard.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
        rotXTo(0);
        rotYTo(0);
      });
    }

    // N. DESKTOP CONTINUOUS SCROLL-SCRUBBED DEPTH PARALLAX
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.to('#hero-phone-parallax', {
        y: -38,
        ease: 'none',
        scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: 1.0 },
      });
      gsap.to('.hero-enter-left', {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.hero-enter-right', {
        y: -26,
        ease: 'none',
        scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
    });

    // Safety refresh after Tailwind Play CDN & images finish final layout
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 350);
    setTimeout(() => ScrollTrigger.refresh(), 1000);
  }

  // Wait for full page load (Tailwind CDN styles + images + fonts) so ScrollTrigger positions are 100% accurate
  function bootAnimations() {
    const start = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const activeBtn = document.querySelector(`.feature-tab-btn[data-feature-tab="${activeFeatureTab}"]`);
          positionTabIndicator(activeBtn, false);
          initGSAPChoreography();
        });
      });
    };

    if (document.readyState === 'complete') {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(start);
      } else {
        start();
      }
    } else {
      window.addEventListener('load', () => {
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(start);
        } else {
          start();
        }
      });
    }
  }

  bootAnimations();
})();
