const LOCAL_KEY = 'cotizacion_v1';

// Los datos de `webPlans`, `services` y `urgencies` se cargan desde `plans.js`

let selectedPlan = null;
let selectedServices = [];
let selectedUrgency = urgencies[0];
let currentStep = 1; // 1: plan, 2: urgency, 3: extras, 4: contacto (modal)


function goToCardIndex(containerSelector, index) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const cards = Array.from(container.querySelectorAll('.card'));
  if (!cards.length) return;

  const isMobile = window.matchMedia && window.matchMedia('(max-width:600px)').matches;
  if (!isMobile) return;

  const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
  const prevIndex = container._currentIndex || 0;

  cards.forEach((card, i) => {
    card.classList.remove('mobile-active');
    if (i === safeIndex) {
      // dirección: viene de la derecha si avanzamos, de la izquierda si retrocedemos
      const dir = safeIndex > prevIndex ? 1 : -1;
      // posicionar fuera antes de animar
      card.style.transition = 'none';
      card.style.transform = `translateX(${dir * 100}%)`;
      card.style.opacity = '0';
      card.style.position = 'absolute';
      // forzar reflow
      card.offsetHeight;
      // animar hacia el centro
      card.style.transition = 'transform 0.35s cubic-bezier(0.2,0.9,0.2,1), opacity 0.25s ease';
      card.style.transform = 'translateX(0%)';
      card.style.opacity = '1';
      card.style.position = 'relative';
      card.classList.add('mobile-active');
    } else {
      card.style.transition = 'none';
      card.style.transform = `translateX(${i < safeIndex ? '-100%' : '100%'})`;
      card.style.opacity = '0';
      card.style.position = 'absolute';
    }
  });

  container._currentIndex = safeIndex;
  updateCardCounterFor(containerSelector);
}



(function() {
      const STORAGE_KEY = 'ecualink_theme';
      const toggle = document.getElementById('themeToggle');
      
      function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
      }

      // Leer preferencia guardada o preferencia del sistema
      const saved = localStorage.getItem(STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(saved || (prefersDark ? 'dark' : 'light'));

      if (toggle) {
        toggle.addEventListener('click', () => {
          const current = document.documentElement.getAttribute('data-theme');
          applyTheme(current === 'dark' ? 'light' : 'dark');
        });
      }

      // Escuchar cambios del sistema operativo
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    })();


    





function initAnimations() {
      setTimeout(function() {

        function reveal(selector, delay, tx, scale) {
          document.querySelectorAll(selector).forEach(function(el) {
            if (tx) el.style.transform = 'translateX(' + tx + 'px)';
            if (scale) el.style.transform = 'scale(' + scale + ')';

            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
              setTimeout(function() {
                el.style.opacity = '1';
                el.style.transform = 'none';
              }, delay);
            } else {
              (function(capturedEl, capturedDelay) {
                var obs = new IntersectionObserver(function(entries) {
                  entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                      setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'none';
                      }, capturedDelay);
                      obs.unobserve(entry.target);
                    }
                  });
                }, { threshold: 0.05, rootMargin: '0px 0px 60px 0px' });
                obs.observe(capturedEl);
              })(el, delay);
            }
          });
        }

        // Hero
        reveal('.hero-badge',   0,    0, 0);
        reveal('.hero-title',   100,  0, 0);
        reveal('.hero-sub',     200,  0, 0);
        reveal('.hero-actions', 300,  0, 0);
        reveal('.hero-stats',   400,  0, 0);

        // Testimonios
        reveal('.section-testimonios .section-tag',   0,   0, 0);
        reveal('.section-testimonios .section-title', 80,  0, 0);
        reveal('.section-testimonios .section-sub',   160, 0, 0);
        reveal('.testimonio-card:nth-child(1)', 80,  -40, 0);
        reveal('.testimonio-card:nth-child(2)', 180,  0,  0);
        reveal('.testimonio-card:nth-child(3)', 280,  40, 0);

        // Proceso
        reveal('.section-proceso .section-tag',   0,   0, 0);
        reveal('.section-proceso .section-title', 80,  0, 0);
        reveal('.section-proceso .section-sub',   160, 0, 0);
        reveal('.step-bar-item:nth-child(1)', 80,  -40, 0);
        reveal('.step-bar-item:nth-child(3)', 180,  0,  0);
        reveal('.step-bar-item:nth-child(5)', 280,  40, 0);
        reveal('.process-card:nth-child(1)',  80,  0, 0);
        reveal('.process-card:nth-child(2)',  180, 0, 0);
        reveal('.process-card:nth-child(3)',  280, 0, 0);

        // Diferente
        reveal('.section-diferente .section-tag',   0,   0, 0);
        reveal('.section-diferente .section-title', 80,  0, 0);
        reveal('.diferente-card:nth-child(1)', 80,  0, 0.93);
        reveal('.diferente-card:nth-child(2)', 180, 0, 0.93);
        reveal('.diferente-card:nth-child(3)', 280, 0, 0.93);

        // FAQ
        reveal('.section-faq .section-tag',   0,  0, 0);
        reveal('.section-faq .section-title', 80, 0, 0);
        reveal('.faq-item:nth-child(1)', 80,  0, 0);
        reveal('.faq-item:nth-child(2)', 160, 0, 0);
        reveal('.faq-item:nth-child(3)', 240, 0, 0);
        reveal('.faq-item:nth-child(4)', 80,  0, 0);
        reveal('.faq-item:nth-child(5)', 160, 0, 0);
        reveal('.faq-item:nth-child(6)', 240, 0, 0);

      }, 100);
    }

    // Ejecutar siempre — si load ya pasó corre directo, si no espera
    if (document.readyState === 'complete') {
      initAnimations();
    } else {
      window.addEventListener('load', initAnimations);
    }




 
    // ===== CARRUSEL PORTAFOLIO =====
    // ===== CARRUSEL PORTAFOLIO =====
    (function() {
      var track      = document.getElementById('portafolioTrack');
      var dotsWrap   = document.getElementById('portafolioDots');
      var prevBtn    = document.querySelector('.portafolio-prev');
      var nextBtn    = document.querySelector('.portafolio-next');
      if (!track) return;

      // ORIGINALES
      var originalCards = Array.from(track.querySelectorAll('.portafolio-card'));
      var total         = originalCards.length;

      var current    = 0;
      var autoTimer  = null;
      var visible    = 0;

      function visibleCount() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
      }

      function stepWidth() {
        var card = track.querySelector('.portafolio-card');
        var gap = 24;
        return card.offsetWidth + gap;
      }

      // ===== CLONAR ELEMENTOS PARA LOOP =====
      function setupClones() {
        visible = visibleCount();
        track.innerHTML = '';

        // Insertar originales
        originalCards.forEach(function(card) {
          track.appendChild(card.cloneNode(true));
        });

        var allCards = Array.from(track.children);

        // Clonar últimos "visible" al inicio
        for (var i = total - visible; i < total; i++) {
          var clone = allCards[i].cloneNode(true);
          track.insertBefore(clone, track.firstChild);
        }

        // Clonar primeros "visible" al final
        for (var i = 0; i < visible; i++) {
          var clone = allCards[i].cloneNode(true);
          track.appendChild(clone);
        }

        // Posicionar en el primer slide “real”
        current = visible;
        moveWithoutAnimation();
      }

      function moveWithoutAnimation() {
        track.style.transition = 'none';
        track.style.transform = 'translateX(-' + (current * stepWidth()) + 'px)';
      }

      function goTo(index) {
        current = index;
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = 'translateX(-' + (current * stepWidth()) + 'px)';
        updateDots();
      }

      // ===== LOOP INFINITO =====
      track.addEventListener('transitionend', function() {
        if (current >= total + visible) {
          track.style.transition = 'none';
          current = visible; // reset al primer slide real
          moveWithoutAnimation();
        }
        if (current < visible) {
          track.style.transition = 'none';
          current = total + visible - 1; // reset al último slide real
          moveWithoutAnimation();
        }
      });

      // ===== DOTS =====
      function buildDots() {
        dotsWrap.innerHTML = '';

        for (var i = 0; i < total; i++) {
          var dot = document.createElement('button');
          dot.className = 'portafolio-dot' + (i === 0 ? ' active' : '');
          dot.dataset.index = i;

          dot.addEventListener('click', function() {
            var index = parseInt(this.dataset.index);
            goTo(index + visible); // ajustar con clones
            resetAuto();
          });

          dotsWrap.appendChild(dot);
        }
      }

      function updateDots() {
        var dots = dotsWrap.querySelectorAll('.portafolio-dot');
        var realIndex = (current - visible) % total;
        if (realIndex < 0) realIndex += total;

        dots.forEach(function(d, i) {
          d.classList.toggle('active', i === realIndex);
        });
      }

      // ===== AUTO PLAY =====
      function startAuto() {
        autoTimer = setInterval(function() {
          goTo(current + 1);
        }, 3000);
      }

      function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
      }

      // ===== BOTONES =====
      prevBtn.addEventListener('click', function() {
        goTo(current - 1);
        resetAuto();
      });

      nextBtn.addEventListener('click', function() {
        goTo(current + 1);
        resetAuto();
      });

      // ===== SWIPE =====
      var touchStartX = 0;

      track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });

      track.addEventListener('touchend', function(e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goTo(diff > 0 ? current + 1 : current - 1);
          resetAuto();
        }
      }, { passive: true });

      // ===== RESIZE =====
      var lastVisible = visibleCount();
      window.addEventListener('resize', function() {
        clearTimeout(window._portafolioResizeTimer);

        window._portafolioResizeTimer = setTimeout(function() {
          var newVisible = visibleCount();
          if (newVisible !== lastVisible) {
            setupClones();
            buildDots();
            lastVisible = newVisible;
          }
        }, 200);
      });

      // ===== INIT =====
      setupClones();
      buildDots();
      startAuto();

    })();





function goToStep(n){
  const max = 4; const min = 1; n = Math.max(min, Math.min(max, n));
  currentStep = n;
  // slide panels horizontally (panels contains panels for steps 1-3). Step 4 opens modal.
  const panels = document.querySelector('.panels');
  if(panels){
    const tx = `translateX(${-(n-1)*100}%)`;
    panels.style.transform = tx;
  }

  // After sliding panels, resync the heights for the active step only and adjust wrapper height
  setTimeout(()=>{
    const map = {1: '#webPlans', 2: '#urgencyOptions', 3: '#services'};
    const selector = map[n];
    if(selector) updateGroupHeights(selector);
    adjustPanelsWrapperHeight(n);
  }, 140);

  // update wizard UI
  document.querySelectorAll('#wizard .step').forEach(el=>{
    const s = Number(el.dataset.step);
    el.classList.remove('active','completed');
    if(s < n) el.classList.add('completed');
    if(s === n) el.classList.add('active');
  });

  // prev button
  const prev = document.getElementById('prevStepBtn');
  if(prev) prev.style.display = (n>1) ? 'inline-block' : 'none';

  // if step 4, open modal
  if(n === 4) openContactModal(); else closeContactModal();

    // Agregar esto al final de goToStep(), antes del cierre de la función:
// Al cambiar de paso en mobile, resetear el índice del nuevo grupo al card 1
    const isMobileStep = window.matchMedia && window.matchMedia('(max-width:600px)').matches;
    if (isMobileStep && n <= 3) {
      goToCardIndex(getGroupSelectorForStep(n), 0);
    }

  // update mobile card counter for the active step (only on mobile)
  try{
      const groupSel = getGroupSelectorForStep(n);
      if(window.matchMedia && window.matchMedia('(max-width:600px)').matches){
        const container = document.querySelector(groupSel);
        if(container){
          requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
              container.scrollLeft = 0;
              updateCardCounterFor(groupSel);
            });
          });
        }
      }
    }catch(e){}
}

const webContainer = document.getElementById("webPlans");
const serviceContainer = document.getElementById("services");
const presetContainer = document.getElementById('presetPlans');
const urgencyContainer = document.getElementById('urgencyOptions');

function formatUSD(v){ return '$' + Number(v).toLocaleString('en-US'); }

function saveState(){
  const state = {
    planId: selectedPlan ? selectedPlan.id : null,
    serviceIds: selectedServices.map(s=>s.id),
    urgencyId: selectedUrgency ? selectedUrgency.id : 'standard'
  };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
}

function loadState(){
  try{
    const raw = localStorage.getItem(LOCAL_KEY);
    if(!raw) return;
    const obj = JSON.parse(raw);
    if(obj.planId){
      const p = webPlans.find(x=>x.id===obj.planId);
      if(p) selectedPlan = p;
    }
    if(Array.isArray(obj.serviceIds)){
      selectedServices = services.filter(s=>obj.serviceIds.includes(s.id));
    }
    if(obj.urgencyId){
      const u = urgencies.find(x=>x.id===obj.urgencyId);
      if(u) selectedUrgency = u;
    }
  }catch(e){console.warn('Error leyendo estado:', e)}
}

function renderPresetPlans(){
  if(!presetContainer) return;
  presetContainer.innerHTML='';
  webPlans.forEach(plan =>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h3>${plan.name}</h3>
        <span class="badge">${plan.days}</span>
      </div>
      <p class="price">${formatUSD(plan.price)}</p>
      <p style="color:var(--muted);margin-top:8px">${plan.desc}</p>
    `;
    presetContainer.appendChild(card);
  })
}

function renderPlans() {
  webContainer.innerHTML='';
  webPlans.forEach((plan) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.planId = plan.id;

    // build features list and expanded content
    const features = Array.isArray(plan.features) ? plan.features : [];
    const ideal = Array.isArray(plan.idealFor) ? plan.idealFor : [];
    const visible = features.slice(0,3);
    const hidden = features.slice(3);
    const extrasCount = hidden.length;
    const moreBtnHtml = extrasCount > 0 ? `<button class="more-btn" aria-expanded="false">Ver más (${extrasCount} características más)</button>` : '';

    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h3>${plan.name}</h3>
        <span class="badge">${plan.days}</span>
      </div>
      <p class="large-price">${formatUSD(plan.price)}</p>
      <div class="tagline">${plan.tagline || ''}</div>
      <div class="shortDesc">${plan.shortDesc || plan.desc || ''}</div>
      ${moreBtnHtml}
      <div class="includes">
        <strong>Incluye:</strong>
        <ul class="features">${visible.map(f=>`<li>${f}</li>`).join('')}</ul>
        <div class="extra-details">
          ${hidden.length ? `<ul class="features hidden-list">${hidden.map(f=>`<li>${f}</li>`).join('')}</ul>` : ''}
          ${ideal.length ? `<div class="ideal"><strong>Ideal para:</strong><ul class="ideal-list">${ideal.map(i=>`<li>${i}</li>`).join('')}</ul></div>` : ''}
        </div>
      </div>
    `;

    // selection on card click
    div.onclick = () => {
      selectedPlan = plan;
      document.querySelectorAll("#webPlans .card").forEach(c => c.classList.remove("active"));
      div.classList.add("active");
      updateSummary();
      saveState();
    };

    // more button toggles expanded state without selecting the card
    if(extrasCount > 0){
      setTimeout(()=>{
        const btn = div.querySelector('.more-btn');
        if(!btn) return;
        btn.addEventListener('click', (e)=>{
          e.stopPropagation();
          // toggle only this card's expanded state
          const expanded = div.classList.toggle('expanded');
          btn.innerText = expanded ? 'Ver menos' : `Ver más (${extrasCount} características más)`;
          btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          // sync heights for this group only (do not affect other steps)
          updateGroupHeights('#webPlans');
          adjustPanelsWrapperHeight(currentStep);
        });
      }, 10);
    }

    webContainer.appendChild(div);
  });
  // after rendering all cards in this group, ensure they share the same height
  setTimeout(()=>{ updateGroupHeights('#webPlans'); adjustPanelsWrapperHeight(currentStep); }, 20);
}

function renderUrgencies(){
  urgencyContainer.innerHTML='';
  urgencies.forEach(u=>{
    const div = document.createElement('div');
    div.className='card';
    div.dataset.urgency = u.id;
    div.innerHTML = `<h3>${u.name}</h3><p class="small">${u.label}</p><p class="muted" style="margin-top:8px">${u.desc}</p>`;
    div.onclick = ()=>{
      selectedUrgency = u;
      document.querySelectorAll('#urgencyOptions .card').forEach(c=>c.classList.remove('active'));
      div.classList.add('active');
      updateSummary();
      saveState();
    };
    urgencyContainer.appendChild(div);
  });
  // ensure urgency option cards have equal height among themselves
  setTimeout(()=>{ updateGroupHeights('#urgencyOptions'); adjustPanelsWrapperHeight(currentStep); }, 20);
}

function updateCardHeights(){
  // backward-compatible wrapper: equalize heights for #webPlans group
  updateGroupHeights('#webPlans');
}

function updateGroupHeights(containerSelector) {
  // En mobile no igualar alturas — las cards se muestran una por una con altura natural
  if (window.matchMedia && window.matchMedia('(max-width:600px)').matches) {
    const container = document.querySelector(containerSelector);
    if (container) container.querySelectorAll('.card').forEach(c => c.style.height = 'auto');
    return;
  }
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const cards = Array.from(container.querySelectorAll('.card'));
  if (!cards.length) return;
  cards.forEach(c => c.style.height = 'auto');
  const expanded = cards.find(c => c.classList.contains('expanded'));
  let maxH = 0;
  if (expanded) {
    maxH = expanded.offsetHeight;
  } else {
    cards.forEach(c => { const h = c.offsetHeight; if (h > maxH) maxH = h; });
  }
  if (maxH > 0) cards.forEach(c => c.style.height = `${maxH}px`);
}

function adjustPanelsWrapperHeight(step) {
  if (window.matchMedia && window.matchMedia('(max-width:600px)').matches) {
    const wrapper = document.querySelector('.panels-wrapper');
    if (wrapper) wrapper.style.height = 'auto';
    return;
  }
  const wrapper = document.querySelector('.panels-wrapper');
  const panels = Array.from(document.querySelectorAll('.panel'));
  if (!wrapper || panels.length === 0) return;
  const idx = Math.max(0, Math.min(panels.length - 1, (step || currentStep) - 1));
  const panel = panels[idx];
  if (!panel) { wrapper.style.height = 'auto'; return; }
  panel.style.minHeight = '';
  const h = panel.offsetHeight;
  wrapper.style.height = h + 'px';
}

// ----- Mobile card navigator helpers -----
function getGroupSelectorForStep(step){
  const map = {1: '#webPlans', 2: '#urgencyOptions', 3: '#services'};
  return map[step] || '#webPlans';
}

function updateCardCounterFor(selector) {
  const counter = document.getElementById('cardCounter');
  const prevBtn = document.getElementById('cardPrev');
  const nextBtn = document.getElementById('cardNext');
  const container = document.querySelector(selector);
  if (!container || !counter) return;
  const cards = Array.from(container.querySelectorAll('.card'));
  if (!cards.length) { counter.innerText = '0 / 0'; return; }
  const idx = container._currentIndex || 0;
  counter.innerText = `${idx + 1} / ${cards.length}`;
  if (prevBtn) prevBtn.disabled = (idx === 0);
  if (nextBtn) nextBtn.disabled = (idx >= cards.length - 1);
}


function getCurrentCardIndex(container) {
  const isMobile = window.matchMedia && window.matchMedia('(max-width:600px)').matches;
  if (isMobile) return container._currentIndex || 0;
  return 0;
}





function scrollToCardIndex(container, index, instant){
  const cards = Array.from(container.querySelectorAll('.card'));
  if(!cards[index]) return;
  const behavior = instant ? 'auto' : 'smooth';
  try{
    // Prefer scrollIntoView which works well with scroll-snap
    cards[index].scrollIntoView({ behavior, inline: 'start', block: 'nearest' });
  }catch(e){
    // fallback to manual scroll calculation
    const contRect = container.getBoundingClientRect();
    const cardRect = cards[index].getBoundingClientRect();
    const delta = cardRect.left - contRect.left;
    const targetLeft = container.scrollLeft + delta;
    container.scrollTo({ left: targetLeft, behavior });
  }
}
function bindMobileCardNav() {
  const prev = document.getElementById('cardPrev');
  const next = document.getElementById('cardNext');
  if (!prev || !next) return;

  prev.addEventListener('click', () => {
    const sel = getGroupSelectorForStep(currentStep);
    const container = document.querySelector(sel);
    if (!container) return;
    const idx = container._currentIndex || 0;
    goToCardIndex(sel, idx - 1);
  });

  next.addEventListener('click', () => {
    const sel = getGroupSelectorForStep(currentStep);
    const container = document.querySelector(sel);
    if (!container) return;
    const idx = container._currentIndex || 0;
    goToCardIndex(sel, idx + 1);
  });
}

function syncAllCardGroups(){
  // apply to each step's card group so no vertical gaps appear
  updateGroupHeights('#webPlans');
  updateGroupHeights('#services');
  updateGroupHeights('#urgencyOptions');
}

// keep heights in sync on resize
window.addEventListener('resize', ()=>{
  // small debounce
  clearTimeout(window._cardHeightTimer);
  window._cardHeightTimer = setTimeout(()=>{ syncAllCardGroups(); adjustPanelsWrapperHeight(currentStep); }, 120);
});

function renderServices() {
  serviceContainer.innerHTML = '';
  services.forEach((service) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.svcId = service.id;
    div.innerHTML = `
      <h3>${service.name}</h3>
      <p class="price">${formatUSD(service.price)} ${service.type === 'monthly' ? '/mes' : ''}</p>
    `;

    div.onclick = () => {
      const exists = selectedServices.find(s=>s.id===service.id);
      if(exists){
        selectedServices = selectedServices.filter(s=>s.id!==service.id);
        div.classList.remove('active');
      } else {
        selectedServices.push(service);
        div.classList.add('active');
      }
      updateSummary();
      saveState();
    };

    serviceContainer.appendChild(div);
  });
  // equalize service cards heights within this group
  setTimeout(()=>{ updateGroupHeights('#services'); adjustPanelsWrapperHeight(currentStep); }, 20);
}

function computeTotals(){
  let initial = 0;
  let monthly = 0;
  let urgencyAdd = 0;

  if(selectedPlan){
    initial += selectedPlan.price;
    urgencyAdd = Math.round(selectedPlan.price * (selectedUrgency ? selectedUrgency.mult : 0));
    initial += urgencyAdd;
  }

  selectedServices.forEach(s=>{
    if(s.type === 'one-time') initial += s.price;
    else monthly += s.price;
  });

  return { initial, monthly, urgencyAdd };
}

function updateSummary(){
  const totals = computeTotals();

  document.getElementById('summaryPlan').innerText = selectedPlan ? `${selectedPlan.name} (${formatUSD(selectedPlan.price)})` : '—';
  document.getElementById('summaryUrgency').innerText = formatUSD(totals.urgencyAdd);
  document.getElementById('summaryExtras').innerText = formatUSD(selectedServices.filter(s=>s.type==='one-time').reduce((a,b)=>a+b.price,0));
  document.getElementById('summaryMonthly').innerText = formatUSD(selectedServices.filter(s=>s.type==='monthly').reduce((a,b)=>a+b.price,0));
  document.getElementById('initial').innerText = formatUSD(totals.initial);
}

function openContactModal(){
  const target = document.getElementById('finalSummary');
  const totals = computeTotals();
  const oneTime = selectedServices.filter(s=>s.type==='one-time');
  const monthly = selectedServices.filter(s=>s.type==='monthly');
  let html = '';
  html += `<div class="row"><strong>Plan</strong><strong>${selectedPlan ? selectedPlan.name : '-'} ${selectedPlan?formatUSD(selectedPlan.price):''}</strong></div>`;
  html += `<div class="row"><span>Urgencia</span><span>${selectedUrgency?selectedUrgency.name:'Estándar'} (${formatUSD(totals.urgencyAdd)})</span></div>`;
  if(oneTime.length){
    oneTime.forEach(s=> html += `<div class="row"><span>${s.name}</span><span>${formatUSD(s.price)}</span></div>`);
  }
  if(monthly.length){
    html += `<div class="row"><strong>Mensualidades</strong><strong>${formatUSD(monthly.reduce((a,b)=>a+b.price,0))} /mes</strong></div>`;
    monthly.forEach(s=> html += `<div class="row"><span>${s.name}</span><span>${formatUSD(s.price)}/mes</span></div>`);
  }
  html += `<div class="row"><strong>Total inicial</strong><strong>${formatUSD(totals.initial)}</strong></div>`;
  target.innerHTML = html;

  const modal = document.getElementById('contactModal');
  modal.setAttribute('aria-hidden','false');

  // Restaurar datos guardados
  const stored = JSON.parse(localStorage.getItem('client_info') || '{}');
  if(stored.name)     document.getElementById('clientName').value     = stored.name;
  if(stored.lastName) document.getElementById('clientLastName').value = stored.lastName;
  if(stored.phone)    document.getElementById('clientPhone').value    = stored.phone;
  if(stored.email)    document.getElementById('clientEmail').value    = stored.email;
  if(stored.empresa)  document.getElementById('clientEmpresa').value  = stored.empresa;
  if(stored.cargo)    document.getElementById('clientCargo').value    = stored.cargo;
  if(stored.note)     document.getElementById('clientNote').value     = stored.note;

  setTimeout(()=>{ const inp = document.getElementById('clientName'); if(inp) inp.focus(); },120);
}

function closeContactModal(){
  const modal = document.getElementById('contactModal');
  if(modal) modal.setAttribute('aria-hidden','true');
}

const OWNER_WA = '5930989559127';

function buildWhatsAppMessage(){
  const name     = document.getElementById('clientName').value.trim();
  const lastName = document.getElementById('clientLastName').value.trim();
  const phone    = document.getElementById('clientPhone').value.trim();
  const email    = document.getElementById('clientEmail').value.trim();
  const empresa  = document.getElementById('clientEmpresa').value.trim();
  const cargo    = document.getElementById('clientCargo').value.trim();
  const note     = document.getElementById('clientNote').value.trim();

  const totals = computeTotals();
  const lines = [];

  lines.push(`Hola, soy ${name} ${lastName}`.trim());
  if(empresa) lines.push(`Empresa: ${empresa}${cargo ? ' — ' + cargo : ''}`);
  lines.push(`WhatsApp: ${phone}`);
  if(email) lines.push(`Email: ${email}`);
  lines.push('─────────────────');
  lines.push('Solicito cotización para:');
  if(selectedPlan) lines.push(`• Plan: ${selectedPlan.name} (${formatUSD(selectedPlan.price)})`);
  lines.push(`• Urgencia: ${selectedUrgency?selectedUrgency.name:'Estándar'} (+${formatUSD(totals.urgencyAdd)})`);
  const one = selectedServices.filter(s=>s.type==='one-time');
  if(one.length){ one.forEach(s=> lines.push(`• Extra: ${s.name} (${formatUSD(s.price)})`)); }
  const monthly = selectedServices.filter(s=>s.type==='monthly');
  if(monthly.length){ monthly.forEach(s=> lines.push(`• Mensual: ${s.name} (${formatUSD(s.price)}/mes)`)); }
  lines.push('─────────────────');
  lines.push(`Total inicial: ${formatUSD(totals.initial)}`);
  if(monthly.length) lines.push(`Total mensual: ${formatUSD(monthly.reduce((a,b)=>a+b.price,0))}/mes`);
  if(note) lines.push(`\nNotas: ${note}`);

  return lines.join('\n');
}



document.addEventListener('DOMContentLoaded', ()=>{
  loadState();
  renderPresetPlans();
  renderPlans();
  renderUrgencies();
  renderServices();

  // restore UI selections
  if(selectedPlan){
    const el = document.querySelector(`#webPlans .card[data-plan-id="${selectedPlan.id}"]`);
    if(el) el.classList.add('active');
    updateSummary();
  }
  // sync heights in case some card is expanded (restores natural sizes otherwise)
  syncAllCardGroups();
  adjustPanelsWrapperHeight(1);
  if(selectedServices.length){
    selectedServices.forEach(s=>{
      const el = document.querySelector(`#services .card[data-svc-id="${s.id}"]`);
      if(el) el.classList.add('active');
    });
    updateSummary();
  }
  if(selectedUrgency){
    const el = document.querySelector(`#urgencyOptions .card[data-urgency="${selectedUrgency.id}"]`);
    if(el) el.classList.add('active');
    updateSummary();
  }

  // initialize wizard UI
  goToStep(1);

  // bind mobile card navigator (arrows + counter)
  bindMobileCardNav();


  const isMobileInit = window.matchMedia && window.matchMedia('(max-width:600px)').matches;
  if (isMobileInit) {
    ['#webPlans', '#urgencyOptions', '#services'].forEach(sel => {
      const container = document.querySelector(sel);
      if (!container) return;
      container._currentIndex = 0;
      goToCardIndex(sel, 0);
    });
    updateCardCounterFor(getGroupSelectorForStep(1));
  } else {
    ['#webPlans .card', '#urgencyOptions .card', '#services .card'].forEach(sel => {
      document.querySelectorAll(sel).forEach(c => {
        c.style.transform = '';
        c.style.transition = '';
        c.style.opacity = '';
        c.style.position = '';
        c.classList.remove('mobile-active');
      });
    });
  }


  const continueBtn = document.getElementById('continueBtn');
  continueBtn.addEventListener('click', ()=>{
    if(!selectedPlan){
      alert('Selecciona primero un plan para continuar.');
      return;
    }
    // avanzar por el wizard: si estamos en 1-2-3 -> ir al siguiente; si 3 -> abrir modal (4)
    if(currentStep < 3){
      goToStep(currentStep + 1);
      // focus first element of the new step if any
      return;
    }
    if(currentStep === 3){
      goToStep(4);
      return;
    }
  });

  // prev step button
  const prevStepBtn = document.getElementById('prevStepBtn');
  if(prevStepBtn) prevStepBtn.addEventListener('click', ()=>{
    if(currentStep > 1) goToStep(currentStep - 1);
  });

  // back button inside modal: volver al paso 3
  document.getElementById('backBtn').addEventListener('click', ()=>{
    closeContactModal();
    goToStep(3);
  });


  document.getElementById('whatsappBtn').addEventListener('click', async ()=>{
    const name     = document.getElementById('clientName').value.trim();
    const lastName = document.getElementById('clientLastName').value.trim();
    const phone    = document.getElementById('clientPhone').value.trim();
    const email    = document.getElementById('clientEmail').value.trim();
    const empresa  = document.getElementById('clientEmpresa').value.trim();
    const cargo    = document.getElementById('clientCargo').value.trim();
    const note     = document.getElementById('clientNote').value.trim();

    if(!name || !phone){
      alert('Por favor completa nombre y WhatsApp.');
      return;
    }

    // Guardar en localStorage
    localStorage.setItem('client_info', JSON.stringify(
      { name, lastName, phone, email, empresa, cargo, note }
    ));

    const totals = computeTotals();
    const one     = selectedServices.filter(s=>s.type==='one-time');
    const monthly = selectedServices.filter(s=>s.type==='monthly');

    const extrasText   = one.length     ? one.map(s=>`${s.name} (${formatUSD(s.price)})`).join(', ')     : 'Ninguno';
    const mensualText  = monthly.length ? monthly.map(s=>`${s.name} (${formatUSD(s.price)}/mes)`).join(', ') : 'Ninguno';

    // Parámetros para el template de EmailJS
    const templateParams = {
      from_name:      name,
      from_lastname:  lastName,
      from_email:     email || 'No proporcionado',
      from_phone:     phone,
      empresa:        empresa || 'No proporcionada',
      cargo:          cargo   || 'No proporcionado',
      plan:           selectedPlan ? `${selectedPlan.name} — ${formatUSD(selectedPlan.price)}` : 'No seleccionado',
      urgencia:       selectedUrgency ? `${selectedUrgency.name} (+${formatUSD(totals.urgencyAdd)})` : 'Estándar',
      extras:         extrasText,
      total_mensual:  mensualText,
      total_inicial:  formatUSD(totals.initial),
      mensaje:        note || 'Sin mensaje adicional'
    };

    // Enviar email — no bloquea el flujo de WhatsApp
    try {
      await emailjs.send(
        'service_ykex2sa',   // reemplaza
        'template_446jf8k',  // reemplaza
        templateParams
      );
      console.log('Email enviado correctamente');
    } catch(err) {
      console.warn('Error enviando email:', err);
      // No mostrar error al usuario — WhatsApp sigue funcionando igual
    }

    // Abrir WhatsApp igual que antes
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${OWNER_WA}?text=` + encodeURIComponent(msg);
    window.open(url, '_blank');
  });
});




window.addEventListener('resize', () => {
  clearTimeout(window._cardHeightTimer);
  window._cardHeightTimer = setTimeout(() => {
    const isMobile = window.matchMedia && window.matchMedia('(max-width:600px)').matches;
    if (!isMobile) {
      // Limpiar todos los transforms que mobile pudo haber puesto
      ['#webPlans .card', '#urgencyOptions .card', '#services .card'].forEach(sel => {
        document.querySelectorAll(sel).forEach(c => {
          c.style.transform = '';
          c.style.transition = '';
          c.style.height = '';
        });
      });
    }
    syncAllCardGroups();
    adjustPanelsWrapperHeight(currentStep);
  }, 120);
});