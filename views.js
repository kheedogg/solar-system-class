/*
 * views.js — Phase 4: multi-view navigation
 * ------------------------------------------
 * Adds three more class views on top of the Solar System screen:
 *   ⭐ Constellations   — clickable SVG star maps
 *   🌅 Sky from Earth   — a day↔night slider (sun rises & sets, moon comes out)
 *   🖨️ Worksheet        — printable planet cards
 *
 * Reuses globals from script.js (loaded first): PLANETS, SUN, openDetails().
 * No libraries, no build step.
 *
 * TEACHER NOTE: constellation facts live in CONSTELLATIONS below; moon facts
 * in MOON. Edit the { en, ko } pairs to change what the popup says.
 */
(function () {
  "use strict";

  const SVGNS = "http://www.w3.org/2000/svg";
  const svgEl = (tag, attrs) => {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };

  /* =========================================================
     View switching
     ========================================================= */
  const SUBTITLES = {
    solar: "Click a planet to learn about it! &nbsp;·&nbsp; 행성을 눌러 보세요!",
    constellations: "Find the famous star pictures! &nbsp;·&nbsp; 유명한 별그림을 찾아보세요!",
    sky: "Slide from day to night! &nbsp;·&nbsp; 낮에서 밤으로 밀어 보세요!",
    worksheet: "Print &amp; draw your own planets! &nbsp;·&nbsp; 인쇄해서 행성을 그려 보세요!"
  };

  const nav = document.getElementById("view-nav");
  const navBtns = Array.from(nav.querySelectorAll(".nav-btn"));
  const subtitle = document.getElementById("subtitle");
  const motionBtn = document.getElementById("toggle-motion");
  const views = {
    solar: document.getElementById("view-solar"),
    constellations: document.getElementById("view-constellations"),
    sky: document.getElementById("view-sky"),
    worksheet: document.getElementById("view-worksheet")
  };

  let currentView = "solar";
  const built = {};        // lazy one-time DOM build per view
  const teardown = {};     // per-view cleanup (stop timers when leaving)

  function showView(name) {
    if (!views[name] || name === currentView) return;

    if (teardown[currentView]) teardown[currentView]();

    views[currentView].classList.remove("is-active");
    views[currentView].hidden = true;

    if (!built[name]) {
      if (name === "constellations") buildConstellations();
      else if (name === "worksheet") buildWorksheet();
      built[name] = true;
    }

    views[name].hidden = false;
    views[name].classList.add("is-active");

    navBtns.forEach((b) => {
      const active = b.dataset.view === name;
      b.classList.toggle("is-active", active);
      if (active) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });

    subtitle.innerHTML = SUBTITLES[name] || "";
    // The Pause-orbits button only makes sense on the solar view
    if (motionBtn) motionBtn.style.display = name === "solar" ? "" : "none";

    currentView = name;
    if (name === "sky") activateSky();
  }

  navBtns.forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));

  /* =========================================================
     ⭐ Constellations
     star coords are on a 0–100 viewBox; lines connect star indices
     ========================================================= */
  const CONSTELLATIONS = [
    {
      emoji: "🥄", name: "Big Dipper", nameKo: "북두칠성",
      stars: [[22,70],[20,52],[36,48],[38,66],[52,44],[67,38],[82,32]],
      lines: [[0,1],[1,2],[2,3],[3,0],[2,4],[4,5],[5,6]],
      facts: [
        { en: "Seven bright stars shaped like a soup ladle.", ko: "국자 모양의 일곱 개 밝은 별이에요." },
        { en: "It is part of the Great Bear (Ursa Major).", ko: "큰곰자리의 일부예요." },
        { en: "Find it: look to the northern sky on a clear night.", ko: "찾는 법: 맑은 밤 북쪽 하늘을 보세요." }
      ]
    },
    {
      emoji: "👑", name: "Cassiopeia", nameKo: "카시오페아",
      stars: [[14,42],[33,62],[50,38],[67,62],[86,42]],
      lines: [[0,1],[1,2],[2,3],[3,4]],
      facts: [
        { en: "Five stars in a 'W' (or 'M') shape.", ko: "'W'(또는 'M') 모양의 다섯 별이에요." },
        { en: "Named after a queen in an old Greek story.", ko: "옛 그리스 이야기 속 여왕의 이름이에요." },
        { en: "Find it: across the North Star from the Big Dipper.", ko: "찾는 법: 북극성 건너편, 북두칠성 반대쪽이에요." }
      ]
    },
    {
      emoji: "🗡️", name: "Orion", nameKo: "오리온자리",
      stars: [[50,14],[32,32],[68,30],[42,55],[50,57],[58,59],[33,84],[67,84]],
      lines: [[0,1],[0,2],[1,2],[1,3],[2,5],[3,4],[4,5],[3,6],[5,7]],
      facts: [
        { en: "Look for the three stars in a row — Orion's Belt.", ko: "나란한 세 별 '오리온의 띠'를 찾아보세요." },
        { en: "One of the easiest constellations to find.", ko: "가장 찾기 쉬운 별자리 중 하나예요." },
        { en: "It shines brightest in the winter sky.", ko: "겨울 하늘에서 가장 밝게 보여요." }
      ]
    },
    {
      emoji: "🦁", name: "Leo", nameKo: "사자자리",
      stars: [[78,32],[76,20],[68,14],[59,18],[58,30],[38,42],[18,54],[34,56]],
      lines: [[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[5,7],[6,7]],
      facts: [
        { en: "It looks like a crouching lion.", ko: "웅크린 사자처럼 생겼어요." },
        { en: "The curved 'sickle' is the lion's head.", ko: "굽은 '낫' 모양이 사자의 머리예요." },
        { en: "Best seen on spring evenings.", ko: "봄 저녁에 가장 잘 보여요." }
      ]
    }
  ];

  function buildConstellations() {
    const sky = document.getElementById("constellation-sky");
    CONSTELLATIONS.forEach((c) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "constellation-tile";
      tile.setAttribute("aria-label", `${c.name} / ${c.nameKo}`);

      const svg = svgEl("svg", { viewBox: "0 0 100 100", class: "constellation-svg" });
      c.lines.forEach(([a, b]) => {
        const [x1, y1] = c.stars[a];
        const [x2, y2] = c.stars[b];
        svg.appendChild(svgEl("line", { x1, y1, x2, y2, class: "c-line" }));
      });
      c.stars.forEach(([x, y], i) => {
        const star = svgEl("circle", { cx: x, cy: y, r: i === 0 ? 2.7 : 2, class: "c-star" });
        star.style.animationDelay = (i * 0.18) + "s";
        svg.appendChild(star);
      });
      tile.appendChild(svg);

      const label = document.createElement("span");
      label.className = "constellation-label";
      label.innerHTML = `${c.emoji} ${c.name} <span class="ko">${c.nameKo}</span>`;
      tile.appendChild(label);

      tile.addEventListener("click", () => openDetails(c));
      sky.appendChild(tile);
    });
  }

  /* =========================================================
     🌅 Sky from Earth — day↔night slider
     ========================================================= */
  const MOON = {
    emoji: "🌙", name: "The Moon", nameKo: "달",
    facts: [
      { en: "Earth's only natural satellite.", ko: "지구의 하나뿐인 위성이에요." },
      { en: "It has no light of its own — it reflects the Sun.", ko: "스스로 빛나지 않고 햇빛을 반사해요." },
      { en: "People have actually walked on it!", ko: "사람이 직접 걸어 본 적이 있어요!" }
    ]
  };

  // Sky color keyframes: pos 0–100 → [top, bottom] gradient colors
  const SKY_STOPS = [
    { p: 0,   top: "#16244e", bot: "#e8a06b" }, // pre-dawn, warm horizon
    { p: 20,  top: "#3d7fd0", bot: "#cfe9ff" }, // morning
    { p: 38,  top: "#5aa0e6", bot: "#dff1ff" }, // midday
    { p: 50,  top: "#2b2c6b", bot: "#ff9c5b" }, // sunset glow
    { p: 64,  top: "#0d1335", bot: "#241a4a" }, // dusk
    { p: 100, top: "#05060f", bot: "#0d1030" }  // deep night
  ];
  const hex2rgb = (h) => {
    h = h.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const mix = (a, b, f) => {
    const ca = hex2rgb(a), cb = hex2rgb(b);
    const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * f));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  };
  function skyGradient(t) {
    let lo = SKY_STOPS[0], hi = SKY_STOPS[SKY_STOPS.length - 1];
    for (let i = 0; i < SKY_STOPS.length - 1; i++) {
      if (t >= SKY_STOPS[i].p && t <= SKY_STOPS[i + 1].p) { lo = SKY_STOPS[i]; hi = SKY_STOPS[i + 1]; break; }
    }
    const f = (t - lo.p) / ((hi.p - lo.p) || 1);
    return `linear-gradient(to bottom, ${mix(lo.top, hi.top, f)} 0%, ${mix(lo.bot, hi.bot, f)} 100%)`;
  }

  const TIME_LABELS = [
    { max: 12,  html: "🌅 Sunrise <span class='ko'>해돋이</span>" },
    { max: 44,  html: "☀️ Daytime <span class='ko'>낮</span>" },
    { max: 56,  html: "🌇 Sunset <span class='ko'>노을</span>" },
    { max: 101, html: "🌙 Night <span class='ko'>밤</span>" }
  ];

  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  let skyRefs = null;
  let skyTimer = null;

  function placeBody(el, phase, opacity) {
    // phase 0→1 traces a left→right arc across the sky
    const angle = phase * Math.PI;
    const left = 5 + phase * 90;        // 5% → 95%
    const top = 86 - Math.sin(angle) * 74; // dips to the horizon at both ends
    el.style.left = left + "%";
    el.style.top = top + "%";
    el.style.opacity = opacity;
    el.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
  }

  function renderSky(t) {
    const r = skyRefs;
    r.scene.style.background = skyGradient(t);

    // Daytime sun crosses 0→52; night moon crosses 48→100
    const sunPhase = clamp01(t / 52);
    const sunOpacity = t <= 46 ? 1 : clamp01((52 - t) / 6);
    placeBody(r.sun, sunPhase, sunOpacity);

    const moonPhase = clamp01((t - 48) / 52);
    const moonOpacity = t >= 54 ? 1 : clamp01((t - 48) / 6);
    placeBody(r.moon, moonPhase, moonOpacity);

    // Stars fade in toward night
    r.stars.style.opacity = clamp01((t - 46) / 22);

    const label = TIME_LABELS.find((l) => t < l.max) || TIME_LABELS[TIME_LABELS.length - 1];
    r.label.innerHTML = label.html;
  }

  function stopSkyPlay() {
    if (skyTimer) { clearInterval(skyTimer); skyTimer = null; }
    if (skyRefs && skyRefs.play) {
      skyRefs.play.setAttribute("aria-pressed", "false");
      skyRefs.play.innerHTML = '▶️ Play <span class="ko">자동</span>';
    }
  }

  function activateSky() {
    if (!skyRefs) {
      skyRefs = {
        scene: document.getElementById("sky-scene"),
        sun: document.getElementById("sky-sun"),
        moon: document.getElementById("sky-moon"),
        stars: document.getElementById("sky-stars"),
        label: document.getElementById("sky-time-label"),
        slider: document.getElementById("sky-slider"),
        play: document.getElementById("sky-play")
      };
      skyRefs.slider.addEventListener("input", (e) => {
        stopSkyPlay();
        renderSky(+e.target.value);
      });
      skyRefs.sun.addEventListener("click", () => openDetails(typeof SUN !== "undefined" ? SUN : MOON));
      skyRefs.moon.addEventListener("click", () => openDetails(MOON));
      skyRefs.play.addEventListener("click", () => {
        if (skyTimer) { stopSkyPlay(); return; }
        skyRefs.play.setAttribute("aria-pressed", "true");
        skyRefs.play.innerHTML = '⏸️ Stop <span class="ko">멈춤</span>';
        skyTimer = setInterval(() => {
          let v = (+skyRefs.slider.value + 1) % 101;
          skyRefs.slider.value = v;
          renderSky(v);
        }, 90);
      });
      // teardown: stop the auto-play timer whenever we leave the sky view
      teardown.sky = stopSkyPlay;
    }
    renderSky(+skyRefs.slider.value);
  }

  /* =========================================================
     🖨️ Worksheet — printable planet cards
     ========================================================= */
  function buildWorksheet() {
    const sheet = document.getElementById("ws-sheet");
    const bodies = [
      (typeof SUN !== "undefined" ? SUN : null),
      ...(typeof PLANETS !== "undefined" ? PLANETS : [])
    ].filter(Boolean);

    const heading = document.createElement("h2");
    heading.className = "ws-heading";
    heading.innerHTML = "🪐 Solar System Worksheet <span class='ko'>태양계 학습지</span>";
    sheet.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "ws-grid";
    bodies.forEach((b) => {
      const card = document.createElement("article");
      card.className = "ws-card";
      const first = b.facts && b.facts[0] ? b.facts[0] : { en: "", ko: "" };
      card.innerHTML =
        `<h3 class="ws-name">${b.name} <span class="ko">${b.nameKo}</span></h3>` +
        `<div class="ws-draw">✏️<span>Draw it · 그려요</span></div>` +
        `<p class="ws-fact">${first.en}<br><span class="ko">${first.ko}</span></p>` +
        `<div class="ws-write" aria-hidden="true"></div>`;
      grid.appendChild(card);
    });
    sheet.appendChild(grid);
  }

  const printBtn = document.getElementById("ws-print");
  if (printBtn) printBtn.addEventListener("click", () => window.print());
})();
