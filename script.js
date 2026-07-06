/* ═══════════════════════════════════════════════════
   B.E. Romdhane — Main Script
   ═══════════════════════════════════════════════════ */

/* ── Project data ── */
const PROJECTS = [
  { src:'projects/img-01.jpg', title:'Unité Industrielle – Sfax',          cat:'industriel' },
  { src:'projects/img-02.jpg', title:'Hangar Métallique – Sousse',          cat:'structure'  },
  { src:'projects/img-03.jpg', title:'Bâtiment Bureaux – Tunis',            cat:'batiment'   },
  { src:'projects/img-04.jpg', title:'Structure Béton Armé – Monastir',     cat:'structure'  },
  { src:'projects/img-05.jpg', title:'Entrepôt Logistique – Bizerte',       cat:'industriel' },
  { src:'projects/img-06.jpg', title:'Charpente Métallique – Sfax',         cat:'structure'  },
  { src:'projects/img-07.jpg', title:'Usine Agroalimentaire – Kairouan',    cat:'industriel' },
  { src:'projects/img-08.jpg', title:'Atelier de Production – Gafsa',       cat:'industriel' },
  { src:'projects/img-09.jpg', title:'Résidence R+5 – Sousse',              cat:'batiment'   },
  { src:'projects/img-10.jpg', title:'Silo Béton – Tunis Nord',             cat:'structure'  },
  { src:'projects/img-11.jpg', title:'Zone Industrielle – Ben Arous',       cat:'industriel' },
  { src:'projects/img-12.jpg', title:'Façade Aluminium – Sfax',             cat:'batiment'   },
  { src:'projects/img-13.jpg', title:'Pont Dalle – Ariana',                 cat:'structure'  },
  { src:'projects/img-14.jpg', title:'Station Service – Nabeul',            cat:'batiment'   },
  { src:'projects/img-15.jpg', title:'Ossature Métallique – Mahdia',        cat:'structure'  },
  { src:'projects/img-16.jpg', title:'Chambre Froide – Gabès',              cat:'industriel' },
  { src:'projects/img-17.jpg', title:'Unité Textile – Monastir',            cat:'industriel' },
  { src:'projects/img-18.jpg', title:'Structure Préfabriquée – Sfax',       cat:'structure'  },
  { src:'projects/img-19.jpg', title:'Immeuble Commercial – Sousse',        cat:'batiment'   },
  { src:'projects/img-20.jpg', title:'Dépôt Pétrolier – Bizerte',           cat:'industriel' },
  { src:'projects/img-21.jpg', title:'Hangar Agricole – Kasserine',         cat:'industriel' },
  { src:'projects/img-22.jpg', title:'Poteau Béton Armé – Mateur',          cat:'structure'  },
  { src:'projects/img-23.jpg', title:'Clinique Privée – Tunis',             cat:'batiment'   },
  { src:'projects/img-24.jpg', title:'Station de Pompage – Sfax',           cat:'industriel' },
  { src:'projects/img-25.jpg', title:'Dalle Nervurée – Sousse',             cat:'structure'  },
  { src:'projects/img-26.jpg', title:'Entrepôt Frigorifique – Sfax',        cat:'industriel' },
  { src:'projects/img-27.jpg', title:'Châssis Métallique – Tunis',          cat:'structure'  },
  { src:'projects/img-28.jpg', title:'Bâtiment Mixte – La Marsa',           cat:'batiment'   },
  { src:'projects/img-29.jpg', title:'Serre Industrielle – Nabeul',         cat:'industriel' },
  { src:'projects/img-30.jpg', title:'Fondation Profonde – Sfax',           cat:'structure'  },
  { src:'projects/img-31.jpg', title:'Usine Plastique – Tunis',             cat:'industriel' },
  { src:'projects/img-32.jpg', title:'Radier Béton – Hammam Sousse',        cat:'structure'  },
  { src:'projects/img-33.jpg', title:'Centre Commercial – Sousse',          cat:'batiment'   },
  { src:'projects/img-34.jpg', title:'Structure Mixte – Sfax',              cat:'structure'  },
  { src:'projects/img-35.jpg', title:'Atelier Mécanique – Tunis',           cat:'industriel' },
  { src:'projects/img-36.jpg', title:'Voirie Industrielle – Gabes',         cat:'industriel' },
  { src:'projects/img-37.jpg', title:'Ossature BA – Sousse',                cat:'structure'  },
  { src:'projects/img-38.jpg', title:'Immeuble R+7 – Hammam-Lif',           cat:'batiment'   },
  { src:'projects/img-39.jpg', title:'Zone Logistique – Sfax',              cat:'industriel' },
  { src:'projects/img-40.jpg', title:'Couverture Métallique – Gafsa',       cat:'structure'  },
  { src:'projects/img-41.jpg', title:'Dépôt Matériaux – Bizerte',           cat:'industriel' },
  { src:'projects/img-42.jpg', title:'Structure Passerelle – Tunis',        cat:'structure'  },
  { src:'projects/img-43.jpg', title:'Hôtel Boutique – Djerba',             cat:'batiment'   },
  { src:'projects/img-44.jpg', title:'Réservoir Béton – Sfax',              cat:'industriel' },
  { src:'projects/img-45.jpg', title:'Plancher Mixte – Monastir',           cat:'structure'  },
  { src:'projects/img-46.jpg', title:'Unité Chimique – Ben Arous',          cat:'industriel' },
  { src:'projects/img-47.jpg', title:'Tour Bureaux – Tunis',                cat:'batiment'   },
  { src:'projects/img-48.jpg', title:'Structure Hangar – Sfax',             cat:'structure'  },
  { src:'projects/img-49.jpg', title:'Usine Câbles – Manouba',              cat:'industriel' },
  { src:'projects/img-50.jpg', title:'Complexe Industriel – Sfax',          cat:'industriel' },
];

/* ── Carousel State ── */
let filtered    = [...PROJECTS];
let carOffset   = 0;      // index of first visible slide
let visibleCount = 3;     // slides shown at once (responsive)
let lbIndex     = 0;
let autoTimer   = null;

/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 1800);
});

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initParticles();
  initReveal();
  initStats();
  setVisibleCount();
  buildCarousel();
  initCarouselNav();
  initFilterTabs();
  initLightbox();
  initBackToTop();
  window.addEventListener('resize', () => {
    setVisibleCount();
    renderCarousel();
  });
});

/* ─── Navbar ─── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive:true });
}

/* ─── Mobile menu ─── */
function initMobileMenu() {
  const btn   = document.getElementById('menuBtn');
  const links = document.getElementById('navLinks');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('open');
    links.classList.remove('open');
  }));
}

/* ─── Reveal ─── */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        io.unobserve(e.target);
      }
    });
  }, { threshold:0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ─── Stats ─── */
function initStats() {
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
      const target = +el.dataset.target;
      const step   = target / (2000 / 16);
      let count    = 0;
      const tick = () => {
        count = Math.min(count + step, target);
        el.textContent = Math.ceil(count);
        if (count < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.disconnect();
  }, { threshold:0.5 });
  const s = document.getElementById('stats');
  if (s) io.observe(s);
}

/* ═══════════════
   CAROUSEL
═══════════════ */
function setVisibleCount() {
  visibleCount = window.innerWidth < 540 ? 1 : window.innerWidth < 768 ? 2 : 3;
}

function buildCarousel() {
  carOffset = 0;
  renderCarousel();
  renderDots();
}

function renderCarousel() {
  const track = document.getElementById('carTrack');
  if (!track) return;
  track.innerHTML = '';
  filtered.forEach((p, idx) => {
    const slide = document.createElement('div');
    slide.className = 'car-slide';
    slide.innerHTML = `
      <img src="${p.src}" alt="${p.title}" loading="lazy" />
      <div class="car-slide-overlay">
        <strong>${p.title}</strong>
        <span>${p.cat}</span>
      </div>
      <div class="car-expand"><i class="fa-solid fa-expand"></i></div>`;
    slide.addEventListener('click', () => openLightbox(idx));
    track.appendChild(slide);
  });
  // Size each slide properly
  updateTrackPosition(false);
  updateNavBtns();
}

function updateTrackPosition(animate = true) {
  const track = document.getElementById('carTrack');
  if (!track) return;
  const outer  = track.parentElement;
  const gap    = 19.2; // 1.2rem ≈ 19.2px
  const slideW = (outer.offsetWidth - gap * (visibleCount - 1)) / visibleCount;
  // Resize slides
  track.querySelectorAll('.car-slide').forEach(s => {
    s.style.flex = `0 0 ${slideW}px`;
  });
  if (!animate) track.style.transition = 'none';
  const offset = carOffset * (slideW + gap);
  track.style.transform = `translateX(-${offset}px)`;
  if (!animate) setTimeout(() => track.style.transition = '', 50);
}

function renderDots() {
  const dots = document.getElementById('carDots');
  if (!dots) return;
  dots.innerHTML = '';
  const pages = Math.max(1, filtered.length - visibleCount + 1);
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'car-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => { carOffset = i; updateTrackPosition(); updateDots(); updateNavBtns(); });
    dots.appendChild(d);
  }
}

function updateDots() {
  document.querySelectorAll('.car-dot').forEach((d, i) => d.classList.toggle('active', i === carOffset));
}

function updateNavBtns() {
  const prev = document.getElementById('carPrev');
  const next = document.getElementById('carNext');
  if (!prev || !next) return;
  const maxOffset = Math.max(0, filtered.length - visibleCount);
  prev.disabled = carOffset <= 0;
  next.disabled = carOffset >= maxOffset;
}

function initCarouselNav() {
  document.getElementById('carPrev')?.addEventListener('click', () => {
    if (carOffset > 0) { carOffset--; updateTrackPosition(); updateDots(); updateNavBtns(); }
  });
  document.getElementById('carNext')?.addEventListener('click', () => {
    if (carOffset < filtered.length - visibleCount) { carOffset++; updateTrackPosition(); updateDots(); updateNavBtns(); }
  });

  // Auto-advance every 4 s
  startAutoPlay();
  const wrapper = document.querySelector('.carousel-wrapper');
  wrapper?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  wrapper?.addEventListener('mouseleave', startAutoPlay);

  // Touch swipe
  let touchX = 0;
  const track = document.getElementById('carTrack');
  track?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive:true });
  track?.addEventListener('touchend', e => {
    const dx = touchX - e.changedTouches[0].clientX;
    if (Math.abs(dx) < 40) return;
    const max = filtered.length - visibleCount;
    if (dx > 0 && carOffset < max) { carOffset++; }
    else if (dx < 0 && carOffset > 0) { carOffset--; }
    updateTrackPosition(); updateDots(); updateNavBtns();
  }, { passive:true });
}

function startAutoPlay() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    const max = Math.max(0, filtered.length - visibleCount);
    carOffset = carOffset >= max ? 0 : carOffset + 1;
    updateTrackPosition(); updateDots(); updateNavBtns();
  }, 4000);
}

/* ─── Filter tabs ─── */
function initFilterTabs() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      filtered = f === 'all' ? [...PROJECTS] : PROJECTS.filter(p => p.cat === f);
      buildCarousel();
      renderDots();
    });
  });
}

/* ═══════════════
   LIGHTBOX
═══════════════ */
function initLightbox() {
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev' )?.addEventListener('click', () => moveLb(-1));
  document.getElementById('lbNext' )?.addEventListener('click', () => moveLb(+1));
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   moveLb(-1);
    if (e.key === 'ArrowRight')  moveLb(+1);
  });
}

function openLightbox(idx) {
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
  clearInterval(autoTimer);
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
  startAutoPlay();
}

function moveLb(dir) {
  lbIndex = (lbIndex + dir + filtered.length) % filtered.length;
  updateLightbox();
}

function updateLightbox() {
  const p   = filtered[lbIndex];
  const img = document.getElementById('lbImg');
  img.style.opacity = 0;
  img.src = p.src; img.alt = p.title;
  img.onload = () => { img.style.transition = 'opacity .3s'; img.style.opacity = 1; };
  document.getElementById('lbTitle').textContent   = p.title;
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${filtered.length}`;
}

/* ═══════════════
   PARTICLES
═══════════════ */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    pts = Array.from({ length: Math.floor((W * H) / 16000) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + .4,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      a: Math.random() * .5 + .1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,130,32,${p.a})`;
      ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(245,130,32,${0.07 * (1 - d/110)})`;
          ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize(); draw();
}

/* ─── Back to top ─── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 600), { passive:true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ═══════════════
   WHATSAPP FORM
═══════════════ */
function sendToWhatsApp() {
  const prenom = document.getElementById('prenom').value.trim();
  const nom    = document.getElementById('nom').value.trim();
  const vous   = document.getElementById('vousEtes').value;
  const tel    = document.getElementById('telephone').value.trim();
  const email  = document.getElementById('email').value.trim();
  const motif  = document.getElementById('motif').value;
  const desc   = document.getElementById('description').value.trim();
  const file   = document.getElementById('file');

  if (!prenom || !nom || !vous || !tel || !motif || !desc) {
    toast('Veuillez remplir tous les champs obligatoires (*).');
    return;
  }

  let msg  = `Bonjour Bureau d'Étude Romdhane 👋\n\n`;
  msg += `*Service souhaité :* ${motif}\n`;
  msg += `*Nom & Prénom :* ${prenom} ${nom}\n`;
  msg += `*Profil :* ${vous}\n`;
  msg += `*Téléphone :* ${tel}\n`;
  if (email) msg += `*Email :* ${email}\n`;
  msg += `\n*Description :*\n${desc}\n`;
  if (file.files.length > 0) msg += `\n_(Document joint — je vous l'envoie juste après)_`;

  const url = `https://wa.me/21696300558?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function toast(msg) {
  const n = Object.assign(document.createElement('div'), { textContent: msg });
  Object.assign(n.style, {
    position:'fixed', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
    background:'#ef4444', color:'#fff', padding:'.8rem 2rem',
    borderRadius:'8px', fontWeight:'600', fontSize:'.95rem',
    zIndex:'9999', boxShadow:'0 8px 24px rgba(239,68,68,.3)',
  });
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 3500);
}
