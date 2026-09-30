(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // stagger indices
  $$('.stagger').forEach((p) => [...p.children].forEach((c, i) => c.style.setProperty('--i', i)));

  // tabs + routing
  const tabs = $('.tabs'), thumb = $('.thumb', tabs);
  const moveThumb = (a) => { if (!a) return; thumb.style.width = a.offsetWidth + 'px'; thumb.style.transform = `translateX(${a.offsetLeft - 4}px)`; };
  function show(id, focusItem) {
    const panel = document.getElementById(id)?.classList.contains('panel') ? id : 'about';
    const swap = () => {
      $$('.panel').forEach((p) => p.classList.toggle('is-active', p.id === panel));
      $$('a', tabs).forEach((a) => a.setAttribute('aria-selected', a.hash === '#' + panel));
      const cur = $(`a[href="#${panel}"]`, tabs);
      moveThumb(cur);
      cur && tabs.scrollTo({ left: cur.offsetLeft - tabs.clientWidth / 2 + cur.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
      document.title = (panel === 'about' ? '' : cur.textContent + ' | ') + 'Benjamin Lebrun';
    };
    swap();
    if (focusItem) {
      const el = document.getElementById(focusItem);
      if (el) {
        el.classList.remove('is-hidden');
        if (el.querySelector('.row-body')) el.classList.add('is-open');
        el.classList.remove('is-flash'); void el.offsetWidth; el.classList.add('is-flash');
        setTimeout(() => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 120, behavior: reduce ? 'auto' : 'smooth' }), 60);
      }
    } else window.scrollTo({ top: 0 });
  }
  const route = () => show((location.hash || '#about').slice(1));
  addEventListener('hashchange', route);
  addEventListener('resize', () => moveThumb($('[aria-selected="true"]', tabs)));
  document.fonts?.ready.then(() => moveThumb($('[aria-selected="true"]', tabs)));
  route();

  // tile links
  $$('[data-go]').forEach((t) => t.addEventListener('click', (e) => {
    if (e.target.closest('button, a[href^="mailto"]')) return;
    location.hash = t.dataset.go;
  }));
  $$('[data-go]').forEach((t) => t.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target === t) location.hash = t.dataset.go; }));

  // accordion
  $$('.row-btn[aria-expanded]').forEach((b) => b.addEventListener('click', () => {
    const row = b.closest('.row'); const open = row.classList.toggle('is-open');
    b.setAttribute('aria-expanded', open);
  }));

  // spotlight
  document.addEventListener('pointermove', (e) => {
    const t = e.target.closest?.('.tile, .row');
    if (t) { const r = t.getBoundingClientRect(); t.style.setProperty('--mx', e.clientX - r.left + 'px'); t.style.setProperty('--my', e.clientY - r.top + 'px'); }
  }, { passive: true });

  // portrait tilt
  const prof = $('.b-profile'), portrait = $('.portrait', prof);
  if (prof && !reduce) {
    prof.addEventListener('pointermove', (e) => {
      const r = portrait.getBoundingClientRect();
      portrait.style.setProperty('--rx', ((e.clientX - r.left) / r.width - .5) * 10 + 'deg');
      portrait.style.setProperty('--ry', -((e.clientY - r.top) / r.height - .5) * 10 + 'deg');
    });
    prof.addEventListener('pointerleave', () => { portrait.style.setProperty('--rx', '0deg'); portrait.style.setProperty('--ry', '0deg'); });
  }

  // neural canvas in profile tile
  const cv = $('.b-profile canvas');
  if (cv) {
    const ctx = cv.getContext('2d'), dpr = Math.min(2, devicePixelRatio || 1), A = '182,130,53';
    let w = 0, h = 0, nodes = [], mx = -999, my = -999;
    const size = () => {
      const r = cv.getBoundingClientRect(); if (Math.abs(r.width - w) < 1 && Math.abs(r.height - h) < 1) return;
      w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.round((w * h) / 5200) + 10 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2 }));
    };
    prof.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    prof.addEventListener('pointerleave', () => { mx = my = -999; });
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        const dx = mx - n.x, dy = my - n.y, d = Math.hypot(dx, dy);
        if (d < 120 && d > 1) { n.vx += dx / d * .01; n.vy += dy / d * .01; }
        n.vx *= .985; n.vy *= .985;
        if (Math.hypot(n.vx, n.vy) < .06) { n.vx += (Math.random() - .5) * .03; n.vy += (Math.random() - .5) * .03; }
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 80) { ctx.strokeStyle = `rgba(${A},${.22 * (1 - d / 80)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      ctx.fillStyle = `rgba(${A},.5)`;
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, 1.3, 0, 7); ctx.fill(); }
      if (!reduce) requestAnimationFrame(frame);
    };
    size(); new ResizeObserver(() => requestAnimationFrame(size)).observe(prof); frame();
  }

  // publications filter + search
  const seg = $('#publications .seg');
  if (seg) {
    const sthumb = $('.thumb', seg), q = $('#pub-search'), count = $('#pub-count');
    const pubs = $$('#publications .row');
    pubs.forEach((p) => { const t = $('.what', p); t.dataset.raw = t.innerHTML; });
    let year = 'all';
    const move = (b) => { sthumb.style.width = b.offsetWidth + 'px'; sthumb.style.transform = `translateX(${b.offsetLeft - 3}px)`; };
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const apply = () => {
      const term = q.value.trim(); let n = 0;
      pubs.forEach((p) => {
        const ok = (year === 'all' || p.dataset.year === year) && p.textContent.toLowerCase().includes(term.toLowerCase());
        p.classList.toggle('is-hidden', !ok); if (ok) n++;
        const t = $('.what', p);
        t.innerHTML = term ? t.dataset.raw.replace(new RegExp(`(${esc(term)})(?![^<]*>)`, 'gi'), '<mark>$1</mark>') : t.dataset.raw;
      });
      count.textContent = `${n} of ${pubs.length}`;
    };
    $$('button', seg).forEach((b) => b.addEventListener('click', () => {
      $$('button', seg).forEach((x) => x.setAttribute('aria-pressed', x === b)); year = b.dataset.year; move(b); apply();
    }));
    q.addEventListener('input', apply);
    const ro = new ResizeObserver(() => requestAnimationFrame(() => move($('[aria-pressed="true"]', seg)))); ro.observe(seg);
    apply();
  }

  // copy
  const toast = $('.toast');
  const flash = (m) => { toast.textContent = m; toast.classList.add('show'); clearTimeout(flash.t); flash.t = setTimeout(() => toast.classList.remove('show'), 1600); };
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async (e) => {
    e.stopPropagation();
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (_) {}
    flash(b.dataset.msg || 'Copied');
  }));

  // poster viewer
  const viewer = $('.viewer');
  const lb = $('.lightbox');
  if (viewer) {
    const data = JSON.parse($('#poster-data').textContent);
    const img = $('.stage img', viewer), k = $('.viewer-cap .k', viewer), t = $('.viewer-cap h3', viewer);
    const open = $('[data-v-open]', viewer), dl = $('[data-v-dl]', viewer), dots = $('.dots', viewer);
    dots.innerHTML = data.map((d, i) => `<button aria-label="${d.k}"></button>`).join('');
    let cur = 0;
    const set = (i) => {
      cur = (i + data.length) % data.length; const d = data[cur];
      img.classList.add('out');
      setTimeout(() => { img.alt = 'Poster – ' + d.t; const st = img.parentElement; st.classList.remove('no-img'); if (/\.pdf$/i.test(d.img)) { img.removeAttribute('src'); st.classList.add('no-img'); img.classList.remove('out'); return; } img.src = d.img; img.onload = () => img.classList.remove('out'); img.onerror = () => { img.classList.remove('out'); st.classList.add('no-img'); }; }, reduce ? 0 : 180);
      k.textContent = d.k; t.textContent = d.t; open.href = dl.href = d.pdf;
      $$('button', dots).forEach((b, j) => b.setAttribute('aria-current', j === cur));
    };
    $$('button', dots).forEach((b, i) => b.addEventListener('click', () => set(i)));
    $('[data-v-prev]', viewer).addEventListener('click', () => set(cur - 1));
    $('[data-v-next]', viewer).addEventListener('click', () => set(cur + 1));
    $('.stage', viewer).addEventListener('click', () => { if ($('.stage', viewer).classList.contains('no-img')) { window.open(open.href, '_blank'); return; } $('img', lb).src = img.src; $('img', lb).alt = img.alt; lb.classList.add('is-open'); });
    addEventListener('keydown', (e) => {
      if (!$('#presentations').classList.contains('is-active') || palette.classList.contains('is-open') || lb.classList.contains('is-open')) return;
      if (e.key === 'ArrowRight') set(cur + 1); if (e.key === 'ArrowLeft') set(cur - 1);
    });
    set(0);
    lb.addEventListener('click', () => lb.classList.remove('is-open'));
  }

  // phantom-cost scenario
  const gift = $('#gift');
  if (gift) {
    const say = $('.say', gift), why = $('.why', gift), bubble = $('.bubble', gift), explain = $('#explain', gift), result = $('.result', gift);
    const gseg = $('.gift-seg', gift), gthumb = $('.thumb', gseg), dot = $('.pc-dot', gift);
    const pts = { '1-0': [30, 78], '1-1': [30, 86], '20-0': [200, 22], '20-1': [200, 64] };
    let amt = 20, choice = null;
    const gmove = (b) => { gthumb.style.width = b.offsetWidth + 'px'; gthumb.style.transform = `translateX(${b.offsetLeft - 3}px)`; };
    const lines = {
      1: ['Here is $1. It\u2019s yours, for free.', 'I\u2019m handing out small thank-you gifts to visitors today.'],
      20: ['Here is $20. It\u2019s yours, for free.', 'I\u2019m giving these out to test a new rewards programme.']
    };
    const reads = {
      'accept-1-0': 'A small free gift rarely raises suspicion. You likely saw no hidden catch, and there was little to lose.',
      'accept-1-1': 'A modest amount and a plausible reason left little room for doubt. No ulterior motive stood out to you.',
      'accept-20-0': 'You took a generous offer with no reason given. Either you did not suspect an ulterior motive, or the benefit felt too good to turn down despite any doubt.',
      'accept-20-1': 'The explanation made the robot\u2019s generosity plausible. Any sense of a hidden catch was outweighed by the benefit.',
      'decline-1-0': 'Even a small gift can feel odd coming from a robot. You may have wondered what it wanted in return.',
      'decline-1-1': 'Despite a small amount and a reason, you still sensed a possible catch. That suspicion is a phantom cost.',
      'decline-20-0': 'This is the typical phantom cost: an unexplained, generous offer leads people to infer hidden risks or bad intentions.',
      'decline-20-1': 'Even with an explanation, the offer still felt too good to be true, so a hidden cost seemed likely.'
    };
    const render = () => {
      const ex = explain.checked ? 1 : 0, key = amt + '-' + ex;
      say.textContent = lines[amt][0]; why.textContent = lines[amt][1];
      bubble.classList.toggle('explained', !!ex);
      bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
      dot.style.transform = `translate(${pts[key][0]}px, ${pts[key][1]}px)`;
      $$('[data-choice]', gift).forEach((b) => b.setAttribute('aria-pressed', b.dataset.choice === choice));
      if (!choice) return;
      result.innerHTML = `<p class="you">You <b>${choice === 'accept' ? 'accepted' : 'declined'}</b> $${amt}${ex ? ' with an explanation' : ' with no explanation'}.</p>
        <p class="read">${reads[choice + '-' + key]}</p>`;
    };
    $$('button', gseg).forEach((b) => b.addEventListener('click', () => { $$('button', gseg).forEach((x) => x.setAttribute('aria-pressed', x === b)); amt = +b.dataset.amt; gmove(b); render(); }));
    explain.addEventListener('change', render);
    $$('[data-choice]', gift).forEach((b) => b.addEventListener('click', () => { choice = b.dataset.choice; render(); }));
    new ResizeObserver(() => requestAnimationFrame(() => gmove($('[aria-pressed="true"]', gseg)))).observe(gseg);
    render();
  }

  // command palette
  const palette = $('.palette'), pin = $('input', palette), plist = $('ul', palette);
  const index = $$('[data-idx]').map((el) => ({ id: el.id, panel: el.closest('.panel').id, t: el.dataset.idx, s: el.closest('.panel').dataset.name }));
  $$('a', tabs).forEach((a) => index.unshift({ id: null, panel: a.hash.slice(1), t: a.textContent, s: 'Section' }));
  let sel = 0, results = [];
  const render = () => {
    const q = pin.value.trim().toLowerCase();
    results = (q ? index.filter((r) => (r.t + ' ' + r.s).toLowerCase().includes(q)) : index.filter((r) => r.s === 'Section')).slice(0, 40);
    sel = Math.min(sel, Math.max(0, results.length - 1));
    plist.innerHTML = results.length ? results.map((r, i) => `<li role="option" aria-selected="${i === sel}" data-i="${i}"><span class="t">${r.t}</span><span class="s">${r.s}</span></li>`).join('') : '<li class="empty">No results</li>';
  };
  const openPal = () => { palette.classList.add('is-open'); pin.value = ''; sel = 0; render(); setTimeout(() => pin.focus(), 20); };
  const closePal = () => palette.classList.remove('is-open');
  const pick = (r) => { if (!r) return; closePal(); if (location.hash !== '#' + r.panel) history.pushState(null, '', '#' + r.panel); show(r.panel, r.id); };
  $$('[data-palette]').forEach((b) => b.addEventListener('click', openPal));
  pin.addEventListener('input', () => { sel = 0; render(); });
  pin.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(results.length - 1, sel + 1); render(); keep(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); render(); keep(); }
    if (e.key === 'Enter') pick(results[sel]);
  });
  const keep = () => { const li = plist.children[sel]; if (li) { const top = li.offsetTop, b = top + li.offsetHeight; if (top < plist.scrollTop) plist.scrollTop = top - 6; else if (b > plist.scrollTop + plist.clientHeight) plist.scrollTop = b - plist.clientHeight + 6; } };
  plist.addEventListener('click', (e) => { const li = e.target.closest('[data-i]'); if (li) pick(results[+li.dataset.i]); });
  palette.addEventListener('click', (e) => { if (e.target === palette) closePal(); });
  addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.classList.contains('is-open') ? closePal() : openPal(); }
    else if (e.key === '/' && !typing) { e.preventDefault(); openPal(); }
    else if (e.key === 'Escape') { closePal(); lb?.classList.remove('is-open'); }
  });
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) $$('.kbd-mod').forEach((k) => k.textContent = 'Ctrl');
})();
