(() => {
  const METEORITES = [
  ["Abbans-Dessous", 2015, "found", null, "LL6", 3.12, 47.13175, 5.87555, "Doubs (25)", 106, null],
  ["Agen", 1814, "fell", "Y", "H5", 30000, 44.427176, 0.498226, "Lot-et-Garonne (47)", null, null],
  ["Aire-sur-la-Lys", 1769, "fell", "Y", "Unknown", 6800, 50.609061, 2.486308, "Pas-de-Calais (62)", null, null],
  ["Alais", 1806, "fell", "Y", "CI1", 6000, 44.057056, 4.184386, "Gard (30)", null, null],
  ["Alby sur Chéran", 2002, "fell", "Y", "Eucrite-mmict", 252, 45.818611, 6.001111, "Haute-Savoie (74)", 88, null],
  ["Angers", 1822, "fell", "Y", "L6", 1007, 47.46667, -0.55, "Maine-et-Loire (49)", null, null],
  ["Apt", 1803, "fell", "Y", "L6", 3200, 43.889642, 5.391494, "Vaucluse (84)", null, null],
  ["Asco", 1805, "fell", "Y", "H6", 41, 42.45, 9.03333, "Haute-Corse (2B)", null, null],
  ["Aubres", 1836, "fell", "Y", "Aubrite", 800, 44.38333, 5.16667, "Drôme (26)", null, null],
  ["Aumieres", 1842, "fell", "Y", "L6", 2000, 44.292131, 3.223247, "Lozère (48)", null, null],
  ["Ausson", 1858, "fell", "Y", "L5", 50000, 43.08333, 0.58333, "Haute-Garonne (31)", null, null],
  ["Bacqueville", 1999, "found", null, "H6", 395, 49.326472, 1.355106, "Eure (27)", 87, null],
  ["Barbotan", 1790, "fell", "Y", "H5", 6400, 43.95, -0.05, "Gers (32)", null, null],
  ["Beuste", 1856, "fell", "Y", "L5", 1820, 43.21667, -0.23333, "Pyrénées-Atlantiques (64)", null, null],
  ["Bouvante", 1978, "found", null, "Eucrite-mmict", 8300, 44.92222, 5.26778, "Drôme (26)", 57, null],
  ["Chantonnay", 1812, "fell", "Y", "L6", 31500, 46.670486, -1.093161, "Vendée (85)", null, null],
  ["Charsonville", 1810, "fell", "Y", "H6", 27000, 47.922661, 1.584219, "Loiret (45)", null, null],
  ["Chassigny", 1815, "fell", "Y", "Martian (chassignite)", 4000, 47.71667, 5.381389, "Haute-Marne (52)", null, null],
  ["Chitenay", 1978, "fell", "Y", "L6", 4000, 47.473114, 1.357289, "Loir-et-Cher (41)", 56, null],
  ["Château-Renard", 1841, "fell", "Y", "L6", 30000, 47.93333, 2.91667, "Loiret (45)", null, null],
  ["Clohars", 1822, "fell", "Y", "L4", 48.6, 47.89, -4.06, "Finistère (29)", null, "Coordinates approximate"],
  ["Contis-Plage", 2000, "found", null, "H5", 44, 44.08333, -1.31667, "Landes (40)", 101, null],
  ["Draveil", 2011, "fell", "Y", "H5", 7500, 48.68667, 2.42833, "Essonne (91)", 102, null],
  ["Ensisheim", 1492, "fell", "Y", "LL6", 127000, 47.852806, 7.376111, "Haut-Rhin (68)", null, null],
  ["Épinal", 1822, "fell", "Y", "H5", 277, 48.154597, 6.588658, "Vosges (88)", null, null],
  ["Esnandes", 1837, "fell", "Y", "L6", 1500, 46.25, -1.1, "Charente-Maritime (17)", null, null],
  ["Favars", 1844, "fell", "Y", "H5", 1500, 44.38333, 2.81667, "Aveyron (12)", null, null],
  ["Galapian", 1826, "fell", "Y", "H6", 132.7, 44.3, 0.4, "Lot-et-Garonne (47)", null, null],
  ["Granes", 1964, "fell", "Y", "L6", 9000, 42.9, 2.25, "Aude (11)", null, null],
  ["Hainaut", 1934, "fell", "Y", "H3-6", 9000, 50.31667, 3.73333, "Nord (59), on the Belgian border", null, "MetBull lists it as \"France or Belgium\""],
  ["Henvic", 1991, "found", null, "L5", 19, 48.65, -3.91667, "Finistère (29)", 73, null],
  ["Jonzac", 1819, "fell", "Y", "Eucrite-mmict", 5000, 45.43333, -0.45, "Charente-Maritime (17)", null, null],
  ["Juvinas", 1821, "fell", "Y", "Eucrite-mmict", 91000, 44.71667, 4.3, "Ardèche (07)", null, null],
  ["Kerilis", 1874, "fell", "Y", "H5", 5000, 48.4, -3.3, "Côtes-d'Armor (22)", null, null],
  ["Kermichel", 1911, "found", null, "L6", 3000, 47.65, -2.76667, "Morbihan (56)", null, null],
  ["Kernouve", 1869, "fell", "Y", "H6", 80000, 48.11667, -3.08333, "Morbihan (56)", null, null],
  ["L'Aigle", 1803, "fell", "Y", "L6", 37000, 48.76667, 0.63333, "Orne (61)", null, null],
  ["La Bécasse", 1879, "fell", "Y", "L6", 2800, 47.08333, 1.75, "Indre (36)", null, null],
  ["La Caille", 1828, "found", null, "Iron, ungrouped", 626000, 43.73333, 6.78333, "Alpes-Maritimes (06)", null, null],
  ["Laborel", 1871, "fell", "Y", "H5", 3833, 44.28333, 5.58333, "Drôme (26)", null, null],
  ["Lancé", 1872, "fell", "Y", "CO3.5", 51700, 47.7, 1.06667, "Loir-et-Cher (41)", null, null],
  ["Lancon", 1897, "fell", "Y", "H6", 7000, 43.75, 5.11667, "Bouches-du-Rhône (13)", null, null],
  ["Langres", 2004, "found", null, "L4", 340, 47.86056, 5.31361, "Haute-Marne (52)", 105, null],
  ["Le Muy", 2013, "found", null, "H5", 760.2, 43.47783, 6.6015, "Var (83)", 113, null],
  ["Le Pressoir", 1845, "fell", "Y", "H5", 3000, 47.16667, 0.43333, "Indre-et-Loire (37)", null, null],
  ["Le Teilleul", 1845, "fell", "Y", "Howardite", 780, 48.53333, -0.86667, "Manche (50)", null, null],
  ["Les Ormes", 1857, "fell", "Y", "L6", 125, 48.35, 3.25, "Yonne (89)", null, null],
  ["Lucé", 1768, "fell", "Y", "L6", 3500, 47.85, 0.48333, "Sarthe (72)", null, null],
  ["Luponnas", 1753, "fell", "Y", "H3-5", 14000, 46.21667, 5.0, "Ain (01)", null, null],
  ["Marmande", 1848, "fell", "Y", "L5", 3000, 44.5, 0.15, "Lot-et-Garonne (47)", null, null],
  ["Mascombes", 1836, "fell", "Y", "L6", 1000, 45.36667, 1.86667, "Corrèze (19)", null, null],
  ["Ménétréol-sur-Sauldre", 2023, "fell", "Yc", "H5", 714, 47.43333, 2.3, "Cher (18)", 115, null],
  ["Mezel", 1949, "fell", "Y", "L6", 1300, 45.76667, 3.25, "Puy-de-Dôme (63)", null, null],
  ["Mont Dieu", 1994, "found", null, "Iron, IIE", 360000, 49.55, 4.86667, "Ardennes (08)", 81, null],
  ["Montferré", 1923, "fell", "Y", "H5", 149000, 43.39056, 1.9625, "Aude (11)", 51, null],
  ["Montlivault", 1838, "fell", "Y", "L6", 500, 47.63333, 1.58333, "Loir-et-Cher (41)", null, null],
  ["Mornans", 1875, "fell", "Y", "H5", 1300, 44.6, 5.13333, "Drôme (26)", null, null],
  ["Mount Vaisi", 1637, "fell", "Y", "Stone-uncl", 17000, 44.08333, 6.86667, "Alpes-Maritimes (06)", null, null],
  ["Nicorps", 1750, "fell", "Y", "Stone-uncl", null, 49.03333, -1.43333, "Manche (50)", null, null],
  ["Orgueil", 1864, "fell", "Y", "CI1", 14000, 43.88333, 1.38333, "Haute-Garonne (31)", null, null],
  ["Ornans", 1868, "fell", "Y", "CO3.4", 6000, 47.11667, 6.15, "Doubs (25)", null, null],
  ["Plancy-l'Abbaye", 2003, "found", null, "H4", 180, 48.66667, 4.05, "Marne (51)", 88, null],
  ["Quincay", 1851, "fell", "Y", "L6", 65, 46.6, 0.25, "Vienne (86)", null, null],
  ["Rochechouart", "201 ± 2 Ma", "crater", null, "Impact Crater", null, 45.83333, 0.93333, "Haute-Vienne (87)", null, "Crater record from the Earth Impact Database"],
  ["Saint-Aubin", 1968, "found", null, "Iron, IIIAB", 472000, 48.48333, 3.58333, "Aube (10)", 87, null],
  ["Saint-Ouen-en-Champagne", 1799, "fell", "Yp", "H5", 4600, 47.96417, -0.16111, "Sarthe (72)", 109, null],
  ["Saint-Pierre-le-Viger", 2023, "fell", "Yc", "L5-6", 1200, 49.82092, 0.8264, "Seine-Maritime (76)", 112, null],
  ["Saint-Sauveur", 1914, "fell", "Y", "EH5", 14000, 43.73333, 1.38333, "Haute-Garonne (31)", null, null],
  ["Saint-Séverin", 1966, "fell", "Y", "LL6", 271000, 45.3, 0.23333, "Charente (16)", 40, null],
  ["Salles", 1798, "fell", "Y", "L5", 9000, 46.05, 4.63333, "Rhône (69)", null, null],
  ["Sauguis", 1868, "fell", "Y", "L6", 4000, 43.15, -0.85, "Pyrénées-Atlantiques (64)", null, null],
  ["St. Caprais-de-Quinsac", 1883, "fell", "Y", "L6", 360, 44.75, 0.05, "Gironde (33)", null, null],
  ["St. Christophe-la-Chartreuse", 1841, "fell", "Y", "L6", 5500, 46.95, -1.5, "Vendée (85)", null, null],
  ["St. Germain-du-Pinel", 1890, "fell", "Y", "H6", 4000, 48.01667, -1.15, "Ille-et-Vilaine (35)", null, null],
  ["St. Mesmin", 1866, "fell", "Y", "LL6", 8300, 48.45, 3.93333, "Aube (10)", null, null],
  ["St.-Chinian", 1959, "fell", "Y", "L6", 134.3, 43.43333, 2.95, "Hérault (34)", 19, null],
  ["Ste. Marguerite", 1962, "fell", "Y", "H4", 4960, 50.76667, 3.0, "Nord (59)", 24, null],
  ["Toulouse", 1812, "fell", "Y", "H6", 1030, 43.823815, 1.156998, "Tarn-et-Garonne (82)", null, null],
  ["Villedieu", 1890, "found", null, "H4", 14000, 47.91667, 4.35, "Côte-d'Or (21)", null, null],
  ["Vouillé", 1831, "fell", "Y", "L6", 20000, 46.63333, 0.16667, "Vienne (86)", null, null]
  ].map(r => ({ name: r[0], year: r[1], kind: r[2], fall: r[3], cls: r[4], mass: r[5],
                lat: r[6], lon: r[7], place: r[8], mb: r[9], note: r[10] }));


  const DEPARTMENTS_URL = "https://cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/departements-version-simplifiee.geojson";
  const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";
  const NEIGHBOURS = ["Belgium", "Luxembourg", "Germany", "Switzerland", "Italy", "Spain", "Andorra", "Monaco", "United Kingdom", "Netherlands", "Austria", "Portugal", "Liechtenstein"];
  const NEIGHBOUR_LABELS = [["Belgium", 50.55, 4.6], ["Germany", 49.5, 8.2], ["Switzerland", 46.75, 7.8], ["Italy", 44.9, 8.4], ["Spain", 42.25, -1.8], ["United Kingdom", 51.2, -1.8], ["Luxembourg", 49.75, 6.05]];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const radius = m => m == null ? 3.4 : 3 + Math.sqrt(Math.log10(Math.max(m, 1))) * 2.4;
  const formatMass = m => m == null ? "Not recorded" : m >= 1000 ? (m / 1000).toLocaleString("en-GB", { maximumFractionDigits: 1 }) + " kg" : m.toLocaleString("en-GB", { maximumFractionDigits: 2 }) + " g";
  const dms = (v, pos, neg) => { const a = Math.abs(v), d = Math.floor(a), m = (a - d) * 60; return `${d}°${m.toFixed(2).padStart(5, "0")}′ ${v >= 0 ? pos : neg}`; };
  const FALL_TEXT = { Y: "Observed fall", Yp: "Probable fall", Yc: "Observed fall" };
  const LABEL = { fell: "Fell", found: "Found", crater: "Crater" };
  const normalise = s => (" " + s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ") + " ").replace(/ ste /g, " sainte ").replace(/ st /g, " saint ").replace(/ +/g, " ").trim();
  function markerPath(d) {
    const r = radius(d.mass);
    if (d.kind === "fell") return d3.symbol(d3.symbolCircle, Math.PI * r * r)();
    if (d.kind === "found") return d3.symbol(d3.symbolDiamond2, 3.2 * r * r)();
    return "M-7,0a7,7 0 1,0 14,0a7,7 0 1,0 -14,0M-1.6,0a1.6,1.6 0 1,0 3.2,0a1.6,1.6 0 1,0 -3.2,0";
  }
  function listIcon(d) {
    if (d.kind === "fell") return '<circle cx="6" cy="6" r="5" fill="var(--fell)"/>';
    if (d.kind === "found") return '<rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" fill="var(--found)"/>';
    return '<circle cx="6" cy="6" r="5" fill="none" stroke="var(--crater)" stroke-width="1.8"/><circle cx="6" cy="6" r="1.5" fill="var(--crater)"/>';
  }
  function rewind(fc) {
    fc.features.forEach(f => { if (d3.geoArea(f) > 2 * Math.PI) { const g = f.geometry;
      if (g.type === "Polygon") g.coordinates.forEach(r => r.reverse());
      if (g.type === "MultiPolygon") g.coordinates.forEach(p => p.forEach(r => r.reverse())); } });
    return fc;
  }

  const wrap = document.getElementById("met-mapwrap"), card = document.getElementById("met-card"), hint = document.getElementById("met-hint");
  const svg = d3.select("#met-map"), root = svg.append("g");
  const gNeighbours = root.append("g"), gNeighbourLabels = root.append("g"), gDepartments = root.append("g");
  const gRing = root.append("g"), gMarkers = root.append("g"), gLabels = root.append("g");
  const ring = gRing.append("circle").attr("class", "ring").attr("r", 6);
  let departments, neighbours, projection, width, height, k = 1, selected = null, filter = "all", first = true;

  const zoom = d3.zoom().scaleExtent([1, 20]).on("zoom", e => {
    k = e.transform.k; root.attr("transform", e.transform); positionMarkers();
    if (e.sourceEvent) hint.classList.add("gone");
  });
  svg.call(zoom).on("click", () => { selected = null; hideCard(); refreshSelection(); });
  const T = reduce ? 0 : 1;
  document.getElementById("met-zoom-in").onclick = () => svg.transition().duration(300 * T).call(zoom.scaleBy, 1.8);
  document.getElementById("met-zoom-out").onclick = () => svg.transition().duration(300 * T).call(zoom.scaleBy, 1 / 1.8);
  document.getElementById("met-zoom-reset").onclick = () => { selected = null; hideCard(); refreshSelection(); svg.transition().duration(500 * T).call(zoom.transform, d3.zoomIdentity); };

  function draw() {
    const box = wrap.getBoundingClientRect(); width = box.width; height = box.height;
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    projection = d3.geoConicConformal().parallels([44, 49]).rotate([-3, 0]).fitExtent([[36, 56], [width - 36, height - 56]], departments);
    const path = d3.geoPath(projection);
    gNeighbours.selectAll("path").data(neighbours.features).join("path").attr("class", "nb").attr("d", path);
    gNeighbourLabels.selectAll("text").data(NEIGHBOUR_LABELS).join("text").attr("class", "nb-label").text(d => d[0])
      .attr("x", d => projection([d[2], d[1]])[0]).attr("y", d => projection([d[2], d[1]])[1]);
    gDepartments.selectAll("path").data(departments.features).join("path").attr("class", first ? "dep dep-land" : "dep").attr("d", path)
      .selectAll("title").data(f => [f]).join("title").text(f => `${f.properties.nom} (${f.properties.code})`);
    const mk = gMarkers.selectAll("path").data(METEORITES, d => d.name).join("path")
      .attr("class", d => `mk ${d.kind}`).attr("d", markerPath).attr("tabindex", 0)
      .attr("aria-label", d => `${d.name}, ${d.year}, ${LABEL[d.kind]}`)
      .on("mouseenter", function (e, d) { if (!selected) showCard(d, this); })
      .on("mouseleave", () => { if (!selected) hideCard(); })
      .on("click", function (e, d) { e.stopPropagation(); select(d, false, this); })
      .on("keydown", function (e, d) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(d, false, this); } });
    if (first && !reduce) {
      const order = METEORITES.map(d => d.name).sort((a, b) => projection([METEORITES.find(m => m.name === a).lon, 0])[0] - projection([METEORITES.find(m => m.name === b).lon, 0])[0]);
      mk.classed("mk-in", true).style("animation-delay", d => 500 + order.indexOf(d.name) * 14 + "ms");
    }
    gLabels.selectAll("text").data(METEORITES, d => d.name).join("text").attr("class", "mk-label").text(d => d.name);
    first = false;
    positionMarkers(); applyFilters();
  }

  function positionMarkers() {
    gMarkers.selectAll("path").attr("transform", d => { const [x, y] = projection([d.lon, d.lat]); return `translate(${x},${y}) scale(${1 / k})`; });
    gLabels.selectAll("text").attr("transform", d => { const [x, y] = projection([d.lon, d.lat]); return `translate(${x + (radius(d.mass) + 3) / k},${y + 4 / k}) scale(${1 / k})`; })
      .style("display", k >= 2.4 ? null : "none");
    gNeighbourLabels.selectAll("text").attr("font-size", 13 / k);
    if (selected) { const [x, y] = projection([selected.lon, selected.lat]); ring.attr("transform", `translate(${x},${y}) scale(${1 / k})`); positionCard(); }
  }

  function showCard(d, el) {
    const rows = [];
    if (d.fall) rows.push(`<dt>Fall</dt><dd>${FALL_TEXT[d.fall] || d.fall} <span style="color:var(--color-muted)">(${d.fall})</span></dd>`);
    rows.push(`<dt>Class</dt><dd>${d.cls}</dd>`);
    rows.push(d.kind === "crater" ? `<dt>Age</dt><dd>${d.year.replace("Ma", "million years")}</dd>` : `<dt>Mass</dt><dd>${formatMass(d.mass)}</dd>`);
    rows.push(`<dt>Place</dt><dd>${d.place}</dd>`);
    rows.push(`<dt>Coords</dt><dd>${dms(d.lat, "N", "S")}<br>${dms(d.lon, "E", "W")}</dd>`);
    if (d.mb) rows.push(`<dt>MetBull</dt><dd>No. ${d.mb}</dd>`);
    card.innerHTML = `<h3>${d.name}</h3><div class="year">${d.year}<span class="pill ${d.kind}">${LABEL[d.kind]}</span></div><dl>${rows.join("")}</dl>${d.note ? `<div class="note">${d.note}.</div>` : ""}`;
    card.hidden = false; card.anchor = el; card.classList.toggle("pinned", selected === d);
    card.style.animation = "none"; void card.offsetWidth; card.style.animation = "";
    positionCard();
  }
  function positionCard() {
    const el = card.anchor; if (!el || !el.isConnected) return;
    const w = wrap.getBoundingClientRect(), r = el.getBoundingClientRect();
    const x = r.left + r.width / 2 - w.left, y = r.top + r.height / 2 - w.top, cw = card.offsetWidth, ch = card.offsetHeight;
    let left = x + 16; if (left + cw > w.width - 10) left = x - cw - 16;
    card.style.left = Math.max(10, left) + "px";
    card.style.top = Math.max(10, Math.min(w.height - ch - 10, y - ch / 2)) + "px";
  }
  function hideCard() { card.hidden = true; }
  const markerFor = d => gMarkers.selectAll("path").filter(m => m === d).node();

  function select(d, fromList, el) {
    if (!fromList && selected === d) { selected = null; hideCard(); refreshSelection(); return; }
    selected = d; refreshSelection();
    const marker = el || markerFor(d);
    if (fromList) {
      const [x, y] = projection([d.lon, d.lat]), s = Math.max(k, 4);
      svg.transition().duration(700 * T).ease(d3.easeCubicInOut)
        .call(zoom.transform, d3.zoomIdentity.translate(width / 2 - s * x, height / 2 - s * y).scale(s))
        .on("end", positionCard);
    } else {
      const list = document.getElementById("met-list"), li = list.querySelector(`li[data-name="${CSS.escape(d.name)}"]`);
      if (li) { const lt = li.offsetTop - list.offsetTop; if (lt < list.scrollTop || lt + li.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTo({ top: lt - list.clientHeight / 2, behavior: reduce ? "auto" : "smooth" }); }
    }
    showCard(d, marker); positionMarkers();
  }
  function refreshSelection() {
    gMarkers.selectAll("path").classed("is-selected", d => d === selected);
    ring.classed("on", !!selected);
    document.querySelectorAll("#met-list li").forEach(li => li.classList.toggle("is-selected", !!selected && li.dataset.name === selected.name));
  }

  const search = document.getElementById("met-search"), yearInput = document.getElementById("met-year"), yearOut = document.getElementById("met-year-out");
  const hist = document.getElementById("met-hist");
  const BIN = 25, MIN = 1490, MAX = 2025, bins = [];
  for (let y = MIN; y < MAX; y += BIN) bins.push({ from: y, n: METEORITES.filter(d => typeof d.year === "number" && d.year >= y && d.year < y + BIN).length });
  const maxN = Math.max(...bins.map(b => b.n));
  hist.innerHTML = bins.map((b, j) => `<span style="--j:${j};height:${b.n ? 8 + b.n / maxN * 92 : 0}%" title="${b.from}–${b.from + BIN - 1}: ${b.n}"></span>`).join("");

  function isVisible(d) {
    if (filter !== "all" && d.kind !== filter) return false;
    const minYear = +yearInput.value;
    if (minYear > MIN && (typeof d.year !== "number" || d.year < minYear)) return false;
    const q = normalise(search.value);
    return !q || [d.name, d.cls, d.place].some(v => normalise(v).includes(q));
  }
  const setN = (id, n) => { const el = document.getElementById(id); if (el.textContent !== String(n)) { el.textContent = n; el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); } };

  function applyFilters() {
    const minYear = +yearInput.value;
    yearOut.textContent = minYear > MIN ? `${minYear} → today` : "All years";
    [...hist.children].forEach((s, j) => s.classList.toggle("off", bins[j].from + BIN <= minYear));
    gMarkers.selectAll("path").classed("is-hidden", d => !isVisible(d));
    gLabels.selectAll("text").classed("is-hidden", d => !isVisible(d));
    const shown = METEORITES.filter(isVisible);
    setN("met-n-all", shown.length); setN("met-n-fell", shown.filter(d => d.kind === "fell").length);
    setN("met-n-found", shown.filter(d => d.kind === "found").length); setN("met-n-crater", shown.filter(d => d.kind === "crater").length);
    const list = document.getElementById("met-list"); list.innerHTML = "";
    if (!shown.length) list.innerHTML = '<li class="empty">No meteorites match. Clear the search or widen the date range.</li>';
    shown.forEach(d => {
      const li = document.createElement("li"); li.dataset.name = d.name; li.tabIndex = 0;
      li.innerHTML = `<svg width="12" height="12" aria-hidden="true">${listIcon(d)}</svg><span class="name">${d.name}</span><span class="year">${d.year}</span><span class="desc">${d.cls} · ${d.place}</span>`;
      li.onclick = () => select(d, true);
      li.onkeydown = e => { if (e.key === "Enter") select(d, true); };
      li.onmouseenter = () => gMarkers.selectAll("path").classed("is-dim", m => m !== d && isVisible(m));
      li.onmouseleave = () => gMarkers.selectAll("path").classed("is-dim", false);
      list.appendChild(li);
    });
    if (selected && !isVisible(selected)) { selected = null; hideCard(); }
    refreshSelection();
  }

  const seg = document.querySelector(".mseg"), thumb = seg.querySelector(".thumb");
  const moveThumb = b => { thumb.style.width = b.offsetWidth + "px"; thumb.style.transform = `translateX(${b.offsetLeft - 3}px)`; };
  seg.querySelectorAll("button").forEach(btn => btn.onclick = () => {
    filter = btn.dataset.filter;
    seg.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b === btn));
    moveThumb(btn); applyFilters();
  });
  const segSync = () => moveThumb(seg.querySelector('[aria-pressed="true"]')); requestAnimationFrame(segSync); addEventListener("resize", segSync); document.fonts && document.fonts.ready.then(segSync);
  search.oninput = applyFilters; yearInput.oninput = applyFilters;
  addEventListener("keydown", e => { if (e.key === "Escape" && selected) { selected = null; hideCard(); refreshSelection(); } if (e.key === "/" && document.activeElement !== search) { e.preventDefault(); search.focus(); } });

  // header: copy email
  document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (_) {}
    const t = document.querySelector(".toast"); t.textContent = b.dataset.msg || "Copied"; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 1600);
  }));

  Promise.all([d3.json(DEPARTMENTS_URL), d3.json(WORLD_URL)]).then(([deps, world]) => {
    departments = rewind(deps);
    const countries = topojson.feature(world, world.objects.countries);
    neighbours = { type: "FeatureCollection", features: countries.features.filter(f => NEIGHBOURS.includes(f.properties.name)) };
    draw();
    let timer, lw = width, lh = height;
    addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(() => { const b = wrap.getBoundingClientRect(); if (Math.abs(b.width - lw) < 2 && Math.abs(b.height - lh) < 2) return; lw = b.width; lh = b.height; const t = d3.zoomTransform(svg.node()); draw(); root.attr("transform", t); }, 80); });
  }).catch(() => {
    wrap.insertAdjacentHTML("beforeend", '<p style="position:absolute;inset:40% 0 auto;text-align:center;color:var(--color-muted)">The map outlines could not be loaded. Please refresh the page.</p>');
  });
})();
