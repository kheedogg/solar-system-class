/*
 * Solar System — class edition
 * ============================================================
 * TEACHER NOTE: All the words kids see live in the data arrays below
 * (PLANETS, EARTH_MOON, EXTRA_BODIES, SUN, CONSTELLATIONS).
 * To change a fact, edit the `en` (English) and `ko` (Korean) text.
 * Everything is illustrative for teaching — not exact size or distance.
 * ============================================================
 *
 * Each planet:
 *   name/nameKo — names      emoji — popup icon       color — planet color
 *   size  — screen size (px) in "easy to see" mode
 *   orbit — distance from Sun (px) in "easy to see" mode
 *   speed — seconds for one trip (smaller = faster)
 *   dia   — real size compared to Earth (Earth = 1)   } used by
 *   au    — real distance from Sun (Earth = 1 AU)     } "Real scale" mode
 *   ring  — true only for Saturn        dwarf — true only for Pluto
 *   facts — list of { en, ko }
 */
const PLANETS = [
  { name:"Mercury", nameKo:"수성", emoji:"🪨", color:"#b0a18f", size:18, orbit:70,  speed:8,  dia:0.38, au:0.39,
    facts:[{en:"The smallest planet.",ko:"가장 작은 행성이에요."},{en:"Closest to the Sun.",ko:"태양과 가장 가까워요."},{en:"One year is only 88 days!",ko:"1년이 88일밖에 안 돼요!"}] },
  { name:"Venus", nameKo:"금성", emoji:"🌕", color:"#e7c884", size:26, orbit:100, speed:12, dia:0.95, au:0.72,
    facts:[{en:"The hottest planet.",ko:"가장 뜨거운 행성이에요."},{en:"It shines bright in our sky.",ko:"하늘에서 밝게 빛나요."},{en:"It spins backwards!",ko:"거꾸로 돌아요!"}] },
  { name:"Earth", nameKo:"지구", emoji:"🌍", color:"#4a90d9", size:28, orbit:135, speed:16, dia:1, au:1, moon:true,
    facts:[{en:"Our home planet!",ko:"우리가 사는 행성이에요!"},{en:"The only planet with life.",ko:"생명이 사는 유일한 행성이에요."},{en:"Has lots of water.",ko:"물이 아주 많아요."}] },
  { name:"Mars", nameKo:"화성", emoji:"🔴", color:"#d1573c", size:22, orbit:168, speed:20, dia:0.53, au:1.52,
    facts:[{en:"The Red Planet.",ko:"붉은 행성이에요."},{en:"It has the tallest volcano.",ko:"가장 높은 화산이 있어요."},{en:"Robots explore it!",ko:"로봇이 탐험하고 있어요!"}] },
  { name:"Jupiter", nameKo:"목성", emoji:"🟠", color:"#d8a86a", size:52, orbit:215, speed:28, dia:11.2, au:5.2,
    facts:[{en:"The biggest planet.",ko:"가장 큰 행성이에요."},{en:"Has a giant red storm.",ko:"거대한 붉은 폭풍이 있어요."},{en:"Has many moons.",ko:"위성이 아주 많아요."}] },
  { name:"Saturn", nameKo:"토성", emoji:"🪐", color:"#e3d2a2", size:46, orbit:262, speed:36, dia:9.4, au:9.5, ring:true,
    facts:[{en:"Famous for its beautiful rings.",ko:"아름다운 고리로 유명해요."},{en:"Made mostly of gas.",ko:"대부분 기체로 되어 있어요."},{en:"It could float on water!",ko:"물 위에 뜰 수 있어요!"}] },
  { name:"Uranus", nameKo:"천왕성", emoji:"🔵", color:"#9fe0e6", size:34, orbit:312, speed:44, dia:4.0, au:19.2,
    facts:[{en:"It rolls on its side.",ko:"옆으로 누워서 돌아요."},{en:"A pretty blue-green color.",ko:"예쁜 청록색이에요."},{en:"Very, very cold.",ko:"아주아주 추워요."}] },
  { name:"Neptune", nameKo:"해왕성", emoji:"🔵", color:"#3b6fd1", size:33, orbit:355, speed:52, dia:3.9, au:30,
    facts:[{en:"The farthest planet.",ko:"가장 먼 행성이에요."},{en:"It has super strong winds.",ko:"엄청나게 강한 바람이 불어요."},{en:"A deep blue color.",ko:"짙은 파란색이에요."}] },
  { name:"Pluto", nameKo:"명왕성", emoji:"🤍", color:"#cdbfae", size:12, orbit:372, speed:60, dia:0.19, au:39.5, dwarf:true,
    facts:[{en:"A dwarf planet.",ko:"왜소행성이에요."},{en:"Smaller than our Moon.",ko:"우리 달보다 작아요."},{en:"Very far and very cold.",ko:"아주 멀고 아주 추워요."}] }
];

const EARTH_MOON = { name:"The Moon", nameKo:"달", emoji:"🌙",
  facts:[{en:"Earth's only natural satellite.",ko:"지구의 하나뿐인 위성이에요."},{en:"People have walked on it!",ko:"사람이 걸어본 적이 있어요!"},{en:"It makes the ocean tides.",ko:"바다의 밀물과 썰물을 만들어요."}] };

const COMET = { name:"Comet", nameKo:"혜성", emoji:"☄️",
  facts:[{en:"A ball of ice and dust.",ko:"얼음과 먼지로 된 덩어리예요."},{en:"It grows a long glowing tail.",ko:"길고 빛나는 꼬리가 생겨요."},{en:"It visits from far away.",ko:"아주 먼 곳에서 찾아와요."}] };

const ASTEROIDS = { name:"Asteroid Belt", nameKo:"소행성대", emoji:"🪨",
  facts:[{en:"Millions of space rocks.",ko:"수많은 우주 바위들이에요."},{en:"Found between Mars and Jupiter.",ko:"화성과 목성 사이에 있어요."},{en:"Leftovers from when planets formed.",ko:"행성이 만들어질 때 남은 조각이에요."}] };

const SUN = { name:"The Sun", nameKo:"태양", emoji:"☀️",
  facts:[{en:"A giant ball of hot gas.",ko:"뜨거운 기체로 된 거대한 공이에요."},{en:"It gives us light and heat.",ko:"우리에게 빛과 열을 줘요."},{en:"Every planet orbits it.",ko:"모든 행성이 태양 주위를 돌아요."}] };

/* Famous constellations — coordinates are on a 1000 x 600 sky. */
const CONSTELLATIONS = [
  { name:"Big Dipper", nameKo:"북두칠성", emoji:"✨",
    stars:[[120,120],[180,108],[242,128],[302,150],[300,212],[228,232],[166,206]],
    lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
    facts:[{en:"Part of the Great Bear (Ursa Major).",ko:"큰곰자리의 일부예요."},{en:"Looks like a big spoon or ladle.",ko:"큰 국자처럼 생겼어요."},{en:"It helps you find the North Star.",ko:"북극성을 찾는 데 도움이 돼요."}] },
  { name:"Cassiopeia", nameKo:"카시오페아", emoji:"✨",
    stars:[[680,150],[742,188],[804,148],[866,196],[928,156]],
    lines:[[0,1],[1,2],[2,3],[3,4]],
    facts:[{en:"Shaped like the letter W.",ko:"알파벳 W 모양이에요."},{en:"Named after a queen in an old story.",ko:"옛이야기 속 왕비의 이름이에요."},{en:"Also helps find north.",ko:"북쪽을 찾는 데 도움이 돼요."}] },
  { name:"Orion", nameKo:"오리온자리", emoji:"✨",
    stars:[[500,300],[600,300],[522,382],[548,392],[576,402],[505,476],[612,470]],
    lines:[[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]],
    facts:[{en:"Orion the Hunter.",ko:"사냥꾼 오리온이에요."},{en:"Three stars in a row are his belt.",ko:"나란한 세 별은 오리온의 허리띠예요."},{en:"Easy to see in winter.",ko:"겨울에 잘 보여요."}] },
  { name:"Leo", nameKo:"사자자리", emoji:"✨",
    stars:[[742,360],[784,332],[824,346],[850,388],[936,408],[806,452]],
    lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]],
    facts:[{en:"Looks like a resting lion.",ko:"쉬고 있는 사자처럼 보여요."},{en:"A curve of stars makes its mane.",ko:"별이 굽은 모양으로 갈기를 만들어요."},{en:"Best seen in spring.",ko:"봄에 가장 잘 보여요."}] }
];

/* ===================== Shared details popup ===================== */
const overlay = document.getElementById("overlay");
const details = document.getElementById("details");

function openDetails(body) {
  document.getElementById("details-emoji").textContent = body.emoji;
  document.getElementById("details-name").textContent = body.name;
  document.getElementById("details-name-ko").textContent = body.nameKo;
  const list = document.getElementById("details-facts");
  list.innerHTML = "";
  body.facts.forEach((f) => {
    const li = document.createElement("li");
    const en = document.createElement("span"); en.className = "fact-en"; en.textContent = "• " + f.en;
    const ko = document.createElement("span"); ko.className = "fact-ko"; ko.textContent = f.ko;
    li.append(en, ko);
    list.appendChild(li);
  });
  overlay.hidden = false; details.hidden = false;
  document.getElementById("close-details").focus();
}
function closeDetails() { overlay.hidden = true; details.hidden = true; }
document.getElementById("close-details").addEventListener("click", closeDetails);
overlay.addEventListener("click", closeDetails);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !details.hidden) closeDetails(); });

/* ===================== View 1: Solar system ===================== */
const system = document.getElementById("solar-system");

function renderSolar(realScale) {
  // Clear everything except the Sun
  system.querySelectorAll(".orbit, .asteroid-belt, .comet-orbit").forEach((el) => el.remove());

  PLANETS.forEach((p, i) => {
    const size  = realScale ? Math.min(60, Math.max(5, Math.round(p.dia * 4) + 6)) : p.size;
    const orbit = realScale ? Math.min(372, Math.round(p.au * 9.5) + 50) : p.orbit;
    // Spread planets evenly around their orbits at load (negative delay = start partway)
    const startDelay = "-" + (p.speed * (i / PLANETS.length)).toFixed(2) + "s";

    const ring = document.createElement("div");
    ring.className = "orbit";
    ring.style.width = ring.style.height = orbit * 2 + "px";
    ring.style.animationDuration = p.speed + "s";
    ring.style.animationDelay = startDelay;
    if (p.dwarf) ring.style.borderStyle = "dotted";

    const planet = document.createElement("button");
    planet.type = "button";
    planet.className = "planet";
    planet.style.width = planet.style.height = size + "px";
    planet.style.background = `radial-gradient(circle at 35% 30%, #ffffff55, ${p.color} 55%)`;
    planet.style.animationDuration = p.speed + "s";
    planet.style.animationDelay = startDelay;
    planet.setAttribute("aria-label", `${p.name} / ${p.nameKo}`);

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = `${p.name} · ${p.nameKo}`;
    planet.appendChild(label);

    if (p.ring) {
      const r = document.createElement("span");
      r.className = "ring-decor";
      r.style.width = size * 1.9 + "px";
      r.style.height = size * 1.9 * 0.45 + "px";
      planet.appendChild(r);
    }

    // Earth gets a small clickable Moon
    if (p.moon) {
      const moon = document.createElement("button");
      moon.type = "button";
      moon.className = "moon-mini";
      const ms = Math.max(6, Math.round(size * 0.32));
      moon.style.width = moon.style.height = ms + "px";
      moon.style.top = "-" + ms + "px";
      moon.style.right = "-" + ms + "px";
      moon.setAttribute("aria-label", "The Moon / 달");
      moon.addEventListener("click", (e) => { e.stopPropagation(); openDetails(EARTH_MOON); });
      planet.appendChild(moon);
    }

    planet.addEventListener("click", () => openDetails(p));
    ring.appendChild(planet);
    system.appendChild(ring);
  });

  // Asteroid belt between Mars and Jupiter
  const beltR = realScale ? Math.round(((PLANETS[3].au + PLANETS[4].au) / 2) * 9.5) + 50 : 192;
  const belt = document.createElement("div");
  belt.className = "asteroid-belt";
  belt.style.width = belt.style.height = beltR * 2 + "px";
  belt.style.animationDuration = "30s";
  belt.setAttribute("role", "button");
  belt.setAttribute("tabindex", "0");
  belt.setAttribute("aria-label", "Asteroid Belt / 소행성대");
  for (let i = 0; i < 48; i++) {
    const a = document.createElement("span");
    a.className = "asteroid";
    const ang = (i / 48) * Math.PI * 2;
    const rr = beltR + (i % 3 - 1) * 5;
    a.style.left = "calc(50% + " + Math.cos(ang) * rr + "px)";
    a.style.top  = "calc(50% + " + Math.sin(ang) * rr + "px)";
    belt.appendChild(a);
  }
  belt.addEventListener("click", () => openDetails(ASTEROIDS));
  belt.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetails(ASTEROIDS); } });
  system.appendChild(belt);

  // Comet on its own orbit
  const cometR = 335;
  const cOrbit = document.createElement("div");
  cOrbit.className = "comet-orbit";
  cOrbit.style.width = cOrbit.style.height = cometR * 2 + "px";
  cOrbit.style.animationDuration = "24s";
  const comet = document.createElement("button");
  comet.type = "button";
  comet.className = "comet";
  comet.setAttribute("aria-label", "Comet / 혜성");
  comet.addEventListener("click", () => openDetails(COMET));
  cOrbit.appendChild(comet);
  system.appendChild(cOrbit);
}

renderSolar(false);
document.getElementById("sun").addEventListener("click", () => openDetails(SUN));

/* Pause / play orbits */
const motionBtn = document.getElementById("toggle-motion");
motionBtn.addEventListener("click", () => {
  const paused = document.body.classList.toggle("motion-paused");
  motionBtn.setAttribute("aria-pressed", String(paused));
  motionBtn.innerHTML = paused ? '▶️ Play <span class="ko">움직이기</span>' : '⏸️ Pause <span class="ko">멈추기</span>';
});

/* Real-scale toggle */
let realScale = false;
const scaleBtn = document.getElementById("toggle-scale");
const scaleCaption = document.getElementById("scale-caption");
scaleBtn.addEventListener("click", () => {
  realScale = !realScale;
  scaleBtn.setAttribute("aria-pressed", String(realScale));
  renderSolar(realScale);
  scaleCaption.hidden = !realScale;
  if (realScale) {
    scaleCaption.textContent = "Real scale: inner planets are close together, and Jupiter is huge! · 실제 크기: 안쪽 행성은 옹기종기, 목성은 아주 커요!";
  }
});

/* Scroll / pinch to zoom */
const viewport = document.getElementById("zoom-viewport");
let zoom = 1;
function applyZoom() { system.style.transform = "scale(" + zoom + ")"; }
viewport.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoom = Math.min(3, Math.max(0.5, zoom * (e.deltaY < 0 ? 1.1 : 0.9)));
  applyZoom();
}, { passive: false });
document.getElementById("zoom-reset").addEventListener("click", () => { zoom = 1; applyZoom(); });
// Pinch zoom (two fingers)
let pinchStart = null;
viewport.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) pinchStart = { d: touchDist(e), z: zoom };
}, { passive: true });
viewport.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2 && pinchStart) {
    e.preventDefault();
    zoom = Math.min(3, Math.max(0.5, pinchStart.z * (touchDist(e) / pinchStart.d)));
    applyZoom();
  }
}, { passive: false });
viewport.addEventListener("touchend", () => { pinchStart = null; });
function touchDist(e) {
  const dx = e.touches[0].clientX - e.touches[1].clientX;
  const dy = e.touches[0].clientY - e.touches[1].clientY;
  return Math.hypot(dx, dy);
}

/* ===================== View navigation ===================== */
const navButtons = document.querySelectorAll(".nav-btn[data-view]");
const views = { solar: "view-solar", sky: "view-sky", constellations: "view-constellations" };
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.view;
    navButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
    Object.entries(views).forEach(([key, id]) => {
      const el = document.getElementById(id);
      const active = key === target;
      el.classList.toggle("is-active", active);
      el.hidden = !active;
    });
  });
});

/* ===================== View 2: Sky from Earth ===================== */
const slider = document.getElementById("sky-slider");
const skyDome = document.getElementById("sky-dome");
const skyStars = document.getElementById("sky-stars");
const skySun = document.getElementById("sky-sun");
const skyMoon = document.getElementById("sky-moon");
const timeLabel = document.getElementById("time-label");

function arcPos(p) { // p in 0..1 → {x%, y%} along an arc above the horizon
  const x = 8 + p * 84;
  const y = 80 - Math.sin(p * Math.PI) * 66;
  return { x, y };
}
function updateSky(v) {
  // Sky color
  let top, mid, starOp, label;
  if (v < 12)      { top = "#ff9e6d"; mid = "#ffd9a0"; starOp = 0.2; label = "🌅 Sunrise · 해돋이"; }
  else if (v < 42) { top = "#6db8ff"; mid = "#cdeaff"; starOp = 0;   label = "☀️ Daytime · 낮"; }
  else if (v < 55) { top = "#ff8c5a"; mid = "#7a5a8a"; starOp = 0.4; label = "🌇 Sunset · 해넘이"; }
  else             { top = "#0a1640"; mid = "#142a5a"; starOp = 1;   label = "🌙 Night · 밤"; }
  skyDome.style.background = `linear-gradient(180deg, ${top} 0%, ${mid} 75%)`;
  skyStars.style.opacity = starOp;

  // Sun visible during day (v 0..52), Moon during night (v 48..100)
  const sunP = Math.min(1, Math.max(0, v / 52));
  const s = arcPos(sunP);
  skySun.style.left = s.x + "%"; skySun.style.top = s.y + "%";
  skySun.style.opacity = v <= 54 ? 1 : 0;

  const moonP = Math.min(1, Math.max(0, (v - 48) / 52));
  const m = arcPos(moonP);
  skyMoon.style.left = m.x + "%"; skyMoon.style.top = m.y + "%";
  skyMoon.style.opacity = v >= 48 ? 1 : 0;

  timeLabel.textContent = label;
}
slider.addEventListener("input", () => updateSky(Number(slider.value)));
updateSky(Number(slider.value));
skySun.addEventListener("click", () => openDetails(SUN));
skyMoon.addEventListener("click", () => openDetails(EARTH_MOON));

const skyPlay = document.getElementById("sky-play");
let skyTimer = null;
skyPlay.addEventListener("click", () => {
  if (skyTimer) {
    clearInterval(skyTimer); skyTimer = null;
    skyPlay.setAttribute("aria-pressed", "false");
    skyPlay.innerHTML = '▶️ Play <span class="ko">자동</span>';
  } else {
    skyPlay.setAttribute("aria-pressed", "true");
    skyPlay.innerHTML = '⏸️ Stop <span class="ko">멈춤</span>';
    skyTimer = setInterval(() => {
      let v = (Number(slider.value) + 1) % 101;
      slider.value = v; updateSky(v);
    }, 120);
  }
});

/* ===================== View 3: Constellations (SVG) ===================== */
const cSky = document.getElementById("constellation-sky");
const SVGNS = "http://www.w3.org/2000/svg";
const svg = document.createElementNS(SVGNS, "svg");
svg.setAttribute("viewBox", "0 0 1000 600");
svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

CONSTELLATIONS.forEach((c) => {
  const g = document.createElementNS(SVGNS, "g");
  g.setAttribute("class", "cst-group");
  g.setAttribute("tabindex", "0");
  g.setAttribute("role", "button");
  g.setAttribute("aria-label", `${c.name} / ${c.nameKo}`);

  // lines
  c.lines.forEach(([a, b]) => {
    const ln = document.createElementNS(SVGNS, "line");
    ln.setAttribute("class", "cst-line");
    ln.setAttribute("x1", c.stars[a][0]); ln.setAttribute("y1", c.stars[a][1]);
    ln.setAttribute("x2", c.stars[b][0]); ln.setAttribute("y2", c.stars[b][1]);
    g.appendChild(ln);
  });
  // transparent hit area covering the constellation
  const xs = c.stars.map((s) => s[0]), ys = c.stars.map((s) => s[1]);
  const pad = 26;
  const hit = document.createElementNS(SVGNS, "rect");
  hit.setAttribute("class", "cst-hit");
  hit.setAttribute("x", Math.min(...xs) - pad); hit.setAttribute("y", Math.min(...ys) - pad);
  hit.setAttribute("width", Math.max(...xs) - Math.min(...xs) + pad * 2);
  hit.setAttribute("height", Math.max(...ys) - Math.min(...ys) + pad * 2);
  g.appendChild(hit);
  // stars
  c.stars.forEach(([x, y]) => {
    const st = document.createElementNS(SVGNS, "circle");
    st.setAttribute("class", "cst-star");
    st.setAttribute("cx", x); st.setAttribute("cy", y); st.setAttribute("r", "3.5");
    g.appendChild(st);
  });
  // label
  const label = document.createElementNS(SVGNS, "text");
  label.setAttribute("class", "cst-label");
  label.setAttribute("x", Math.min(...xs));
  label.setAttribute("y", Math.min(...ys) - 14);
  label.textContent = `${c.name} · ${c.nameKo}`;
  g.appendChild(label);

  g.addEventListener("click", () => openDetails(c));
  g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDetails(c); } });
  svg.appendChild(g);
});
cSky.appendChild(svg);

/* ===================== Worksheet + print ===================== */
const wsCards = document.getElementById("ws-cards");
PLANETS.forEach((p) => {
  const card = document.createElement("div");
  card.className = "ws-card";
  const h = document.createElement("h3");
  h.textContent = `${p.emoji} ${p.name} / ${p.nameKo}`;
  card.appendChild(h);
  p.facts.slice(0, 2).forEach((f) => {
    const fl = document.createElement("p");
    fl.className = "ws-fact";
    fl.textContent = `• ${f.en} (${f.ko})`;
    card.appendChild(fl);
  });
  const blank = document.createElement("p");
  blank.textContent = "My drawing / 내 그림:";
  card.appendChild(blank);
  const line = document.createElement("div");
  line.className = "ws-blank";
  card.appendChild(line);
  wsCards.appendChild(card);
});
document.getElementById("print-btn").addEventListener("click", () => window.print());
