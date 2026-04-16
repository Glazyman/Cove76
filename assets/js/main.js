/* ============================================================
   COVE76 — Main JavaScript
   ============================================================ */

document.documentElement.classList.add('js-anim');
document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky nav ─────────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link ────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Mobile menu ────────────────────────────────────────── */
  const hamburger  = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', closeMobile);
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobile);
    });
  }

  function closeMobile() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ── FAQ accordion ──────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  /* ── Directory filters ──────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const providerCards = document.querySelectorAll('.provider-card');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;

        providerCards.forEach(card => {
          const cardCat = card.dataset.category;
          if (category === 'all' || cardCat === category) {
            card.style.display = '';
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = 'fadeIn 0.3s ease forwards';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Scroll reveal ──────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── YouTube lazy load ──────────────────────────────────── */
  document.querySelectorAll('[data-youtube-id]').forEach(wrapper => {
    const videoId = wrapper.dataset.youtubeId;
    const thumb   = wrapper.querySelector('.yt-thumb');
    const play    = wrapper.querySelector('.yt-play');

    if (thumb && play) {
      thumb.style.backgroundImage = `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`;
    }

    wrapper.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.cssText = 'width:100%;aspect-ratio:16/9;border:none;display:block;';
      wrapper.innerHTML = '';
      wrapper.appendChild(iframe);
    });
  });

  /* ── Contact tab toggle ─────────────────────────────────── */
  document.querySelectorAll('[data-tabs]').forEach(tabset => {
    const tabs   = Array.from(tabset.querySelectorAll('[data-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-tab-panel]'));

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        tabs.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        panels.forEach(panel => {
          panel.hidden = panel.dataset.tabPanel !== target;
        });
      });
    });
  });

  /* ── Form success message ───────────────────────────────── */
  document.querySelectorAll('form[data-success]').forEach(form => {
    form.addEventListener('submit', e => {
      const msg = form.dataset.success;
      if (msg) {
        const successEl = form.nextElementSibling;
        if (successEl && successEl.classList.contains('form-success')) {
          // Formspree handles submit; show success on load if ?submitted param
        }
      }
    });
  });

  /* ── Smooth scroll for anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Counter animation ──────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-item__num[data-count]');
  if (statNums.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => countObserver.observe(el));
  }

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ── Page-specific: load referrals from JSON ────────────── */
  const providerGrid = document.getElementById('providerGrid');
  if (providerGrid) {
    loadReferrals();
  }

  async function loadReferrals() {
    try {
      const res  = await fetch('data/referrals.json');
      const data = await res.json();
      renderProviders(data);
    } catch (err) {
      console.warn('Could not load referrals:', err);
    }
  }

  function renderProviders(providers) {
    const grid = document.getElementById('providerGrid');
    if (!grid) return;

    grid.innerHTML = providers.map(p => `
      <div class="provider-card reveal" data-category="${p.category}">
        <div class="provider-card__header">
          <div class="provider-card__avatar">${p.initials}</div>
          <div>
            <span class="provider-card__name">${p.name}</span>
            <span class="provider-card__title">${p.credentials}</span>
          </div>
        </div>
        <span class="provider-card__tag">${p.categoryLabel}</span>
        <div class="provider-card__details">
          <div class="provider-card__detail">
            <span>🎯</span>
            <span>${p.specialty}</span>
          </div>
          <div class="provider-card__detail">
            <span>👥</span>
            <span>Serves: ${p.serves}</span>
          </div>
          <div class="provider-card__detail">
            <span>📍</span>
            <span>${p.location}</span>
          </div>
          ${p.jewish_affirming ? `<div class="provider-card__detail"><span>✡️</span><span>Jewish community affirming</span></div>` : ''}
        </div>
        <div class="provider-card__contact">
          ${p.phone ? `<a href="tel:${p.phone}">📞 ${p.phone}</a>` : ''}
          ${p.email ? `<a href="mailto:${p.email}">✉ ${p.email}</a>` : ''}
          ${p.website ? `<a href="${p.website}" target="_blank" rel="noopener">🌐 Website</a>` : ''}
        </div>
      </div>
    `).join('');

    // Re-observe new elements for scroll reveal
    grid.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

});

/* fadeIn keyframe via JS injection (for filter animation) */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: none; }
  }
`;
document.head.appendChild(style);
