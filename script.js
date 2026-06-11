/*
 * Solar System — data + rendering
 * --------------------------------
 * TEACHER NOTE: To change the facts, just edit the PLANETS array below.
 * Each planet has:
 *   name   — English name
 *   nameKo — Korean name
 *   emoji  — shown in the details popup
 *   color  — planet color (CSS)
 *   size   — diameter in pixels on screen (relative, not real scale)
 *   orbit  — distance from the Sun in pixels (orbit ring radius)
 *   speed  — seconds for one full trip around the Sun (smaller = faster)
 *   ring   — true only for Saturn (draws the famous ring)
 *   facts  — list of { en, ko } kid-friendly facts
 */
const PLANETS = [
  {
    name: "Mercury", nameKo: "수성", emoji: "🪨", color: "#b0a18f", size: 18, orbit: 90, speed: 8,
    facts: [
      { en: "The smallest planet.", ko: "가장 작은 행성이에요." },
      { en: "Closest to the Sun.", ko: "태양과 가장 가까워요." },
      { en: "One year is only 88 days!", ko: "1년이 88일밖에 안 돼요!" }
    ]
  },
  {
    name: "Venus", nameKo: "금성", emoji: "🌕", color: "#e7c884", size: 26, orbit: 130, speed: 12,
    facts: [
      { en: "The hottest planet.", ko: "가장 뜨거운 행성이에요." },
      { en: "It shines bright in our sky.", ko: "하늘에서 밝게 빛나요." },
      { en: "It spins backwards!", ko: "거꾸로 돌아요!" }
    ]
  },
  {
    name: "Earth", nameKo: "지구", emoji: "🌍", color: "#4a90d9", size: 28, orbit: 175, speed: 16,
    facts: [
      { en: "Our home planet!", ko: "우리가 사는 행성이에요!" },
      { en: "The only planet with life.", ko: "생명이 사는 유일한 행성이에요." },
      { en: "Has lots of water.", ko: "물이 아주 많아요." }
    ]
  },
  {
    name: "Mars", nameKo: "화성", emoji: "🔴", color: "#d1573c", size: 22, orbit: 215, speed: 20,
    facts: [
      { en: "The Red Planet.", ko: "붉은 행성이에요." },
      { en: "It has the tallest volcano.", ko: "가장 높은 화산이 있어요." },
      { en: "Robots explore it!", ko: "로봇이 탐험하고 있어요!" }
    ]
  },
  {
    name: "Jupiter", nameKo: "목성", emoji: "🟠", color: "#d8a86a", size: 52, orbit: 285, speed: 28,
    facts: [
      { en: "The biggest planet.", ko: "가장 큰 행성이에요." },
      { en: "Has a giant red storm.", ko: "거대한 붉은 폭풍이 있어요." },
      { en: "Has many moons.", ko: "위성이 아주 많아요." }
    ]
  },
  {
    name: "Saturn", nameKo: "토성", emoji: "🪐", color: "#e3d2a2", size: 46, orbit: 345, speed: 36, ring: true,
    facts: [
      { en: "Famous for its beautiful rings.", ko: "아름다운 고리로 유명해요." },
      { en: "Made mostly of gas.", ko: "대부분 기체로 되어 있어요." },
      { en: "It could float on water!", ko: "물 위에 뜰 수 있어요!" }
    ]
  },
  {
    name: "Uranus", nameKo: "천왕성", emoji: "🔵", color: "#9fe0e6", size: 34, orbit: 395, speed: 44,
    facts: [
      { en: "It rolls on its side.", ko: "옆으로 누워서 돌아요." },
      { en: "A pretty blue-green color.", ko: "예쁜 청록색이에요." },
      { en: "Very, very cold.", ko: "아주아주 추워요." }
    ]
  },
  {
    name: "Neptune", nameKo: "해왕성", emoji: "🔵", color: "#3b6fd1", size: 33, orbit: 435, speed: 52,
    facts: [
      { en: "The farthest planet.", ko: "가장 먼 행성이에요." },
      { en: "It has super strong winds.", ko: "엄청나게 강한 바람이 불어요." },
      { en: "A deep blue color.", ko: "짙은 파란색이에요." }
    ]
  }
];

// The Sun's own facts (shown when the Sun is clicked)
const SUN = {
  name: "The Sun", nameKo: "태양", emoji: "☀️",
  facts: [
    { en: "A giant ball of hot gas.", ko: "뜨거운 기체로 된 거대한 공이에요." },
    { en: "It gives us light and heat.", ko: "우리에게 빛과 열을 줘요." },
    { en: "Every planet orbits it.", ko: "모든 행성이 태양 주위를 돌아요." }
  ]
};

const system = document.getElementById("solar-system");
const overlay = document.getElementById("overlay");
const details = document.getElementById("details");

// ---- Build the orbits + planets from the PLANETS data ----
PLANETS.forEach((p) => {
  const diameter = p.orbit * 2;

  const orbit = document.createElement("div");
  orbit.className = "orbit";
  orbit.style.width = diameter + "px";
  orbit.style.height = diameter + "px";
  orbit.style.animationDuration = p.speed + "s";

  const planet = document.createElement("button");
  planet.type = "button";
  planet.className = "planet";
  planet.style.width = p.size + "px";
  planet.style.height = p.size + "px";
  planet.style.background = `radial-gradient(circle at 35% 30%, #ffffff55, ${p.color} 55%)`;
  planet.style.animationDuration = p.speed + "s";
  planet.setAttribute("aria-label", `${p.name} / ${p.nameKo}`);

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = `${p.name} · ${p.nameKo}`;
  planet.appendChild(label);

  // Saturn's ring decoration
  if (p.ring) {
    const ring = document.createElement("span");
    ring.className = "ring-decor";
    const ringSize = p.size * 1.9;
    ring.style.width = ringSize + "px";
    ring.style.height = ringSize * 0.45 + "px";
    planet.appendChild(ring);
  }

  planet.addEventListener("click", () => openDetails(p));

  orbit.appendChild(planet);
  system.appendChild(orbit);
});

// ---- Details popup ----
function openDetails(body) {
  document.getElementById("details-emoji").textContent = body.emoji;
  document.getElementById("details-name").textContent = body.name;
  document.getElementById("details-name-ko").textContent = body.nameKo;

  const list = document.getElementById("details-facts");
  list.innerHTML = "";
  body.facts.forEach((f) => {
    const li = document.createElement("li");
    const en = document.createElement("span");
    en.className = "fact-en";
    en.textContent = "• " + f.en;
    const ko = document.createElement("span");
    ko.className = "fact-ko";
    ko.textContent = f.ko;
    li.appendChild(en);
    li.appendChild(ko);
    list.appendChild(li);
  });

  overlay.hidden = false;
  details.hidden = false;
  document.getElementById("close-details").focus();
}

function closeDetails() {
  overlay.hidden = true;
  details.hidden = true;
}

document.getElementById("sun").addEventListener("click", () => openDetails(SUN));
document.getElementById("close-details").addEventListener("click", closeDetails);
overlay.addEventListener("click", closeDetails);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !details.hidden) closeDetails();
});

// ---- Pause / play orbits ----
const motionBtn = document.getElementById("toggle-motion");
motionBtn.addEventListener("click", () => {
  const paused = document.body.classList.toggle("motion-paused");
  motionBtn.setAttribute("aria-pressed", String(paused));
  motionBtn.innerHTML = paused
    ? '▶️ Play orbits <span class="ko">움직이기</span>'
    : '⏸️ Pause orbits <span class="ko">멈추기</span>';
});
