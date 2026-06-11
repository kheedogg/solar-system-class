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
    name: "Mercury", nameKo: "수성", emoji: "🪨", color: "#b0a18f", size: 18, orbit: 77, speed: 8,
    facts: [
      { en: "The smallest planet.", ko: "가장 작은 행성이에요." },
      { en: "Closest to the Sun.", ko: "태양과 가장 가까워요." },
      { en: "One year is only 88 days!", ko: "1년이 88일밖에 안 돼요!" }
    ]
  },
  {
    name: "Venus", nameKo: "금성", emoji: "🌕", color: "#e7c884", size: 26, orbit: 111, speed: 12,
    facts: [
      { en: "The hottest planet.", ko: "가장 뜨거운 행성이에요." },
      { en: "It shines bright in our sky.", ko: "하늘에서 밝게 빛나요." },
      { en: "It spins backwards!", ko: "거꾸로 돌아요!" }
    ]
  },
  {
    name: "Earth", nameKo: "지구", emoji: "🌍", color: "#4a90d9", size: 28, orbit: 149, speed: 16,
    facts: [
      { en: "Our home planet!", ko: "우리가 사는 행성이에요!" },
      { en: "The only planet with life.", ko: "생명이 사는 유일한 행성이에요." },
      { en: "Has lots of water.", ko: "물이 아주 많아요." }
    ]
  },
  {
    name: "Mars", nameKo: "화성", emoji: "🔴", color: "#d1573c", size: 22, orbit: 183, speed: 20,
    facts: [
      { en: "The Red Planet.", ko: "붉은 행성이에요." },
      { en: "It has the tallest volcano.", ko: "가장 높은 화산이 있어요." },
      { en: "Robots explore it!", ko: "로봇이 탐험하고 있어요!" }
    ]
  },
  {
    name: "Jupiter", nameKo: "목성", emoji: "🟠", color: "#d8a86a", size: 52, orbit: 242, speed: 28,
    facts: [
      { en: "The biggest planet.", ko: "가장 큰 행성이에요." },
      { en: "Has a giant red storm.", ko: "거대한 붉은 폭풍이 있어요." },
      { en: "Has many moons.", ko: "위성이 아주 많아요." }
    ]
  },
  {
    name: "Saturn", nameKo: "토성", emoji: "🪐", color: "#e3d2a2", size: 46, orbit: 293, speed: 36, ring: true,
    facts: [
      { en: "Famous for its beautiful rings.", ko: "아름다운 고리로 유명해요." },
      { en: "Made mostly of gas.", ko: "대부분 기체로 되어 있어요." },
      { en: "It could float on water!", ko: "물 위에 뜰 수 있어요!" }
    ]
  },
  {
    name: "Uranus", nameKo: "천왕성", emoji: "🔵", color: "#9fe0e6", size: 34, orbit: 336, speed: 44,
    facts: [
      { en: "It rolls on its side.", ko: "옆으로 누워서 돌아요." },
      { en: "A pretty blue-green color.", ko: "예쁜 청록색이에요." },
      { en: "Very, very cold.", ko: "아주아주 추워요." }
    ]
  },
  {
    name: "Neptune", nameKo: "해왕성", emoji: "🔵", color: "#3b6fd1", size: 33, orbit: 370, speed: 52,
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

// ---- TTS (Text-to-Speech) engine ----
// Uses the Web Speech API — no external libraries required.

let enVoice = null;
let koVoice = null;
// ttsReady: true once voices are confirmed available, false if unsupported or timed out
let ttsReady = ('speechSynthesis' in window);

function initVoices() {
  if (!ttsReady) return;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return; // Not loaded yet — wait for voiceschanged event

  // Prefer Google voices on Chrome; fall back to any matching locale
  koVoice = voices.find(v => v.lang.startsWith('ko') && v.name.includes('Google'))
          || voices.find(v => v.lang.startsWith('ko'));
  enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'))
          || voices.find(v => v.lang.startsWith('en-US'))
          || voices.find(v => v.lang.startsWith('en'));

  // If no English voice at all, hide TTS UI (nothing can be spoken)
  if (!enVoice) {
    ttsReady = false;
    hideTtsButtons();
  }
}

// Chrome loads voices asynchronously; also try immediately for other browsers
if (ttsReady) {
  speechSynthesis.addEventListener('voiceschanged', initVoices);
  initVoices();

  // 3-second safety timeout: if voices never arrive, hide TTS buttons
  setTimeout(() => {
    if (!enVoice) {
      ttsReady = false;
      hideTtsButtons();
    }
  }, 3000);
}

function hideTtsButtons() {
  document.querySelectorAll('.tts-btn, .tts-read-all').forEach(el => {
    el.hidden = true;
  });
}

/**
 * Speak one fact: English first, then a 300 ms pause, then Korean.
 * If koVoice is unavailable, reads English only.
 * @param {string} enText  - English text to read
 * @param {string} koText  - Korean text to read
 * @param {Function} [onComplete] - Called when both utterances finish
 */
// Calm ~10-year-old child tone. Korean voices warble/slur when pitch is raised,
// so Korean stays near-natural and a touch slower for clear pronunciation.
// pitch: 0–2 (1 = normal). rate: speech speed.
const TTS_PITCH_EN = 1.25; // youthful, child-like (English handles raised pitch well)
const TTS_PITCH_KO = 1.05; // near-natural → no tremor/slurring on Korean
const TTS_RATE_EN = 0.9;   // calm and steady
const TTS_RATE_KO = 0.86;  // slightly slower → crisper Korean pronunciation

function speakFact(enText, koText, onComplete) {
  speechSynthesis.cancel(); // Stop any currently playing speech

  const enUtterance = new SpeechSynthesisUtterance(enText);
  if (enVoice) enUtterance.voice = enVoice;
  enUtterance.lang = 'en-US';
  enUtterance.rate = TTS_RATE_EN;
  enUtterance.pitch = TTS_PITCH_EN;

  enUtterance.onend = () => {
    if (!koVoice) {
      // No Korean voice — skip to completion
      if (onComplete) onComplete();
      return;
    }
    setTimeout(() => {
      const koUtterance = new SpeechSynthesisUtterance(koText);
      koUtterance.voice = koVoice;
      koUtterance.lang = 'ko-KR';
      koUtterance.rate = TTS_RATE_KO;
      koUtterance.pitch = TTS_PITCH_KO;
      koUtterance.onend = () => { if (onComplete) onComplete(); };
      speechSynthesis.speak(koUtterance);
    }, 300);
  };

  speechSynthesis.speak(enUtterance);
}

// ---- Details popup ----
function openDetails(body) {
  document.getElementById("details-emoji").textContent = body.emoji;
  document.getElementById("details-name").textContent = body.name;
  document.getElementById("details-name-ko").textContent = body.nameKo;

  const list = document.getElementById("details-facts");
  list.innerHTML = "";

  // Remove any previously inserted "Read All" button (it lives outside the <ul>)
  const oldReadAll = document.querySelector(".tts-read-all");
  if (oldReadAll) oldReadAll.remove();

  // "Read All" button — inserted before the facts list
  const readAllBtn = document.createElement("button");
  readAllBtn.type = "button";
  readAllBtn.className = "tts-read-all";
  readAllBtn.innerHTML = "🔊 Read All / 모두 읽기";
  if (!ttsReady) readAllBtn.hidden = true;
  list.before(readAllBtn); // inserts just above the <ul>

  // Build fact items with per-fact speaker buttons
  body.facts.forEach((f, index) => {
    const li = document.createElement("li");

    // Wrap text spans so flex layout keeps them together on the left
    const textWrap = document.createElement("span");
    textWrap.className = "fact-text";

    const en = document.createElement("span");
    en.className = "fact-en";
    en.textContent = "• " + f.en;

    const ko = document.createElement("span");
    ko.className = "fact-ko";
    ko.textContent = f.ko;

    textWrap.appendChild(en);
    textWrap.appendChild(ko);
    li.appendChild(textWrap);

    // Per-fact speaker button
    const ttsBtn = document.createElement("button");
    ttsBtn.type = "button";
    ttsBtn.className = "tts-btn";
    ttsBtn.setAttribute("aria-label", `Read fact ${index + 1} aloud / ${index + 1}번 사실 읽기`);
    ttsBtn.textContent = "🔊";
    if (!ttsReady) ttsBtn.hidden = true;

    ttsBtn.addEventListener("click", () => {
      if (!ttsReady) return;

      // Mark this button as speaking; clear any other speaking buttons
      document.querySelectorAll('.tts-btn.speaking').forEach(b => b.classList.remove('speaking'));
      ttsBtn.classList.add('speaking');

      speakFact(f.en, f.ko, () => {
        ttsBtn.classList.remove('speaking');
      });
    });

    li.appendChild(ttsBtn);
    list.appendChild(li);
  });

  // "Read All" logic: reads every fact in sequence, EN then KO, 500 ms between facts
  let readingAll = false;
  readAllBtn.addEventListener("click", () => {
    if (!ttsReady) return;

    if (readingAll) {
      // Toggle off — cancel speech and reset state
      speechSynthesis.cancel();
      readingAll = false;
      readAllBtn.innerHTML = "🔊 Read All / 모두 읽기";
      readAllBtn.classList.remove('reading');
      document.querySelectorAll('.tts-btn.speaking').forEach(b => b.classList.remove('speaking'));
      return;
    }

    readingAll = true;
    readAllBtn.innerHTML = "⏹ Stop / 멈추기";
    readAllBtn.classList.add('reading');

    const facts = body.facts;
    const ttsBtns = list.querySelectorAll('.tts-btn');

    function readIndex(i) {
      if (!readingAll || i >= facts.length) {
        // Completed naturally (i >= length) vs cancelled (!readingAll)
        const completed = readingAll && i >= facts.length;
        readingAll = false;
        readAllBtn.innerHTML = "🔊 Read All / 모두 읽기";
        readAllBtn.classList.remove("reading");
        document.querySelectorAll(".tts-btn.speaking").forEach(b => b.classList.remove("speaking"));
        // Brief gold flash only when all facts were read (not on cancel)
        if (completed) {
          readAllBtn.classList.remove("done");
          void readAllBtn.offsetWidth; /* reflow to restart animation */
          readAllBtn.classList.add("done");
        }
        return;
      }

      // Highlight the matching per-fact button while it's being read
      document.querySelectorAll('.tts-btn.speaking').forEach(b => b.classList.remove('speaking'));
      if (ttsBtns[i]) ttsBtns[i].classList.add('speaking');

      speakFact(facts[i].en, facts[i].ko, () => {
        if (ttsBtns[i]) ttsBtns[i].classList.remove('speaking');
        // 500 ms gap between facts before reading the next one
        setTimeout(() => readIndex(i + 1), 500);
      });
    }

    readIndex(0);
  });

  overlay.hidden = false;
  details.hidden = false;
  document.getElementById("close-details").focus();
}

function closeDetails() {
  // Stop any speech when the popup is dismissed
  if ('speechSynthesis' in window) speechSynthesis.cancel();
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

/* ═══════════════════════════════════════════════════════════════════
   PHASE 2 — FAB + Quiz Game
   ───────────────────────────────────────────────────────────────────
   TEACHER NOTE: The quiz is auto-generated from the PLANETS array
   and SUN object above. No changes needed here to update questions —
   just update the facts/names in PLANETS or SUN and the quiz updates!
   ═══════════════════════════════════════════════════════════════════ */

// ── FAB open / close ────────────────────────────────────────────────
const fabContainer = document.getElementById("fab-container");
const fabBtn       = document.getElementById("fab-btn");
const fabMenu      = document.getElementById("fab-menu");
const fabQuizBtn   = document.getElementById("fab-quiz");

fabBtn.addEventListener("click", () => {
  const isOpen = !fabMenu.hidden;
  fabMenu.hidden = isOpen;
  fabBtn.setAttribute("aria-expanded", String(!isOpen));
});

// Close FAB menu when clicking anywhere outside it
document.addEventListener("click", (e) => {
  if (!fabContainer.contains(e.target)) {
    fabMenu.hidden = true;
    fabBtn.setAttribute("aria-expanded", "false");
  }
});

fabQuizBtn.addEventListener("click", () => {
  fabMenu.hidden = true;
  fabBtn.setAttribute("aria-expanded", "false");
  openQuiz();
});

// ── Quiz state ──────────────────────────────────────────────────────
// state: "idle" | "playing" | "result"
let quizState        = "idle";
let quizQuestions    = [];   // array of generated question objects for this round
let quizIndex        = 0;    // current question index (0-7)
let quizScore        = 0;    // first-try correct count
let quizFirstTry     = true; // reset each question; false after a wrong answer
let quizPausedBefore = false; // was motion paused before quiz opened?

const quizOverlay  = document.getElementById("quiz-overlay");
const quizBody     = document.getElementById("quiz-body");
const quizProgress = document.getElementById("quiz-progress");
const quizScoreEl  = document.getElementById("quiz-score");
const quizClose    = document.getElementById("quiz-close");

// ── Question bank builder ────────────────────────────────────────────
/**
 * Build a flat pool of every possible question, then pick 8 at random.
 * Three question types:
 *   "which_body"  — a fact is shown; player picks the planet it describes
 *   "order"       — player picks the planet at position N from the Sun
 *   "about"       — a planet name is shown; player picks a true fact about it
 */
function buildQuestionPool() {
  const pool = [];
  const allBodies = [SUN, ...PLANETS]; // Sun + all 8 planets = 9 bodies

  // Type 1: "which_body" — one question per fact per body
  allBodies.forEach((body) => {
    body.facts.forEach((fact) => {
      pool.push({
        type: "which_body",
        en: `Which one is described by: "${fact.en}"`,
        ko: `"${fact.ko}" 는(은) 어디일까요?`,
        emoji: body.emoji,
        answer: body,          // correct body
      });
    });
  });

  // Type 2: "order" — one question per planet's position (Sun excluded)
  PLANETS.forEach((planet, idx) => {
    const n = idx + 1;
    pool.push({
      type: "order",
      en: `Which planet is #${n} from the Sun?`,
      ko: `태양에서 ${n}번째 행성은 무엇일까요?`,
      emoji: "☀️",             // show the sun emoji for context
      answer: planet,
    });
  });

  // Type 3: "about" — pick a random true fact about a planet/body as the correct answer
  allBodies.forEach((body) => {
    // Use the first fact as the "correct" answer choice text
    const correctFact = body.facts[0];
    pool.push({
      type: "about",
      en: `What is true about ${body.name}?`,
      ko: `${body.nameKo}에 대해 맞는 것은?`,
      emoji: body.emoji,
      answer: body,
      // The correct answer choice shows the fact text, not the body name
      answerFact: correctFact,
    });
  });

  return pool;
}

/**
 * Pick 8 questions from the pool, shuffled, avoiding the same
 * planet appearing in two consecutive questions.
 */
function pickQuestions(pool) {
  // Shuffle the pool
  const shuffled = pool.slice().sort(() => Math.random() - 0.5);
  const chosen = [];
  let lastAnswerName = "";

  for (const q of shuffled) {
    if (chosen.length >= 8) break;
    // Skip if this question's answer is the same body as the previous one
    if (q.answer.name === lastAnswerName) continue;
    chosen.push(q);
    lastAnswerName = q.answer.name;
  }

  // If we didn't reach 8 (extremely unlikely), pad without the consecutive check
  for (const q of shuffled) {
    if (chosen.length >= 8) break;
    if (!chosen.includes(q)) chosen.push(q);
  }

  return chosen;
}

/**
 * Generate 3 answer choices for a question: 1 correct + 2 wrong.
 * For "about" type, choices are fact texts; for others, they are body names.
 */
function makeChoices(question) {
  const allBodies = [SUN, ...PLANETS];

  if (question.type === "about") {
    // Correct choice = first fact of the answer body
    const correct = question.answerFact;
    // Wrong choices = first facts from two different random bodies
    const others = allBodies
      .filter(b => b.name !== question.answer.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(b => b.facts[0]);

    const choices = [
      { en: correct.en, ko: correct.ko, isCorrect: true },
      { en: others[0].en, ko: others[0].ko, isCorrect: false },
      { en: others[1].en, ko: others[1].ko, isCorrect: false },
    ].sort(() => Math.random() - 0.5);

    return choices;
  }

  // For "which_body" and "order": choices are body names
  const correct = question.answer;
  const others = allBodies
    .filter(b => b.name !== correct.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const choices = [
    { en: correct.name, ko: correct.nameKo, isCorrect: true },
    { en: others[0].name, ko: others[0].nameKo, isCorrect: false },
    { en: others[1].name, ko: others[1].nameKo, isCorrect: false },
  ].sort(() => Math.random() - 0.5);

  return choices;
}

// ── Quiz open / close ────────────────────────────────────────────────
function openQuiz() {
  // Save current pause state; then pause orbits so they don't distract
  quizPausedBefore = document.body.classList.contains("motion-paused");
  if (!quizPausedBefore) {
    document.body.classList.add("motion-paused");
  }

  // Hide the FAB while the quiz is open
  fabContainer.style.display = "none";

  // Build and start a fresh round
  const pool = buildQuestionPool();
  quizQuestions = pickQuestions(pool);
  quizIndex  = 0;
  quizScore  = 0;
  quizState  = "playing";

  quizOverlay.hidden = false;
  renderQuestion();
  quizClose.focus();
}

function closeQuiz() {
  // Cancel any speech
  if ('speechSynthesis' in window) speechSynthesis.cancel();

  // Restore orbit motion state
  if (!quizPausedBefore) {
    document.body.classList.remove("motion-paused");
  }

  quizOverlay.hidden = true;
  quizState = "idle";

  // Show the FAB again
  fabContainer.style.display = "";
  fabBtn.focus();
}

quizClose.addEventListener("click", closeQuiz);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !quizOverlay.hidden) closeQuiz();
});

// ── Render helpers ───────────────────────────────────────────────────
function updateHeader() {
  quizProgress.textContent = `${quizIndex + 1} / ${quizQuestions.length}`;
  quizScoreEl.textContent  = `⭐ ${quizScore}`;
}

/** Render the current question card into #quiz-body */
function renderQuestion() {
  const q = quizQuestions[quizIndex];
  quizFirstTry = true;
  updateHeader();

  const choices = makeChoices(q);

  // Build the inner HTML for the question card
  quizBody.innerHTML = `
    <div class="quiz-emoji">${q.emoji}</div>
    <div class="quiz-question">
      <span class="q-en">${q.en}</span>
      <span class="q-ko">${q.ko}</span>
    </div>
    ${ttsReady ? `<button class="quiz-tts-btn" id="quiz-tts" type="button">🔊 Read / 읽기</button>` : ""}
    <div class="quiz-answers" id="quiz-answers">
      ${choices.map((c, i) => `
        <button class="answer-btn" data-index="${i}" data-correct="${c.isCorrect}" type="button">
          <span class="ans-en">${c.en}</span>
          <span class="ans-ko">${c.ko}</span>
        </button>
      `).join("")}
    </div>
    <div class="quiz-feedback" id="quiz-feedback"></div>
  `;

  // Wire up TTS button for reading the question aloud
  const ttsBtnEl = document.getElementById("quiz-tts");
  if (ttsBtnEl) {
    ttsBtnEl.addEventListener("click", () => {
      if (!ttsReady) return;
      ttsBtnEl.classList.add("speaking");
      speakFact(q.en, q.ko, () => ttsBtnEl.classList.remove("speaking"));
    });
  }

  // Wire up answer buttons
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(btn, q));
  });
}

/** Handle a tap on an answer button */
function handleAnswer(btn, q) {
  const isCorrect = btn.dataset.correct === "true";
  const feedbackEl = document.getElementById("quiz-feedback");
  const allBtns = document.querySelectorAll(".answer-btn");

  if (isCorrect) {
    // Stop any reading
    if ('speechSynthesis' in window) speechSynthesis.cancel();

    // Count score only if this was the first try on this question
    if (quizFirstTry) quizScore++;
    updateHeader();

    // Visual celebration
    btn.classList.add("correct");
    feedbackEl.textContent = "✨ Correct! / 정답!";
    feedbackEl.className = "quiz-feedback ok";

    // Disable all buttons for 1 second so kid can't double-tap
    allBtns.forEach(b => { b.disabled = true; });

    setTimeout(() => {
      quizIndex++;
      if (quizIndex >= quizQuestions.length) {
        renderResult();
      } else {
        renderQuestion();
      }
    }, 1000);

  } else {
    // Wrong answer
    quizFirstTry = false;       // score will not be counted for this question

    btn.classList.add("wrong");
    feedbackEl.textContent = "Try again! / 다시 해봐요!";
    feedbackEl.className = "quiz-feedback err";

    // Disable this wrong button permanently (mastery-based: kid picks from remaining choices).
    // The .wrong class keeps it visually dimmed (opacity .45) so they know not to try it again.
    btn.disabled = true;
  }
}

/** Render the result / celebration screen */
function renderResult() {
  quizState = "result";
  if ('speechSynthesis' in window) speechSynthesis.cancel();

  const total = quizQuestions.length;
  const score = quizScore;
  const stars = score >= 7 ? "⭐⭐⭐" : score >= 4 ? "⭐⭐" : "⭐";

  const msgs = {
    3: { en: "Amazing! You're a space expert!", ko: "대단해요! 우주 박사예요!" },
    2: { en: "Great work! Keep exploring!",     ko: "잘했어요! 더 알아봐요!" },
    1: { en: "Good try! Let's learn more!",     ko: "좋은 시도예요! 더 배워봐요!" },
  };
  const tier = score >= 7 ? 3 : score >= 4 ? 2 : 1;
  const msg = msgs[tier];

  // Update header to show final state
  quizProgress.textContent = `${total} / ${total}`;
  quizScoreEl.textContent  = `⭐ ${score}`;

  quizBody.innerHTML = `
    <div class="quiz-result">
      <div class="result-header">Great job!</div>
      <div class="result-ko">잘했어요!</div>
      <div class="result-stars">${stars}</div>
      <div class="result-score-text">
        You got <strong>${score}</strong> out of <strong>${total}</strong> on the first try!
      </div>
      <div class="result-score-text result-ko">
        ${total}개 중 <strong>${score}</strong>개를 한번에 맞혔어요!
      </div>
      <div class="result-msg">${msg.en}<br><span class="ko">${msg.ko}</span></div>
      <button class="result-btn-primary" id="quiz-play-again" type="button">
        🔄 Play Again / 다시 하기
      </button>
      <button class="result-btn-secondary" id="quiz-back" type="button">
        🌍 Back to Solar System / 태양계로 돌아가기
      </button>
    </div>
  `;

  document.getElementById("quiz-play-again").addEventListener("click", () => {
    // Start a fresh round without closing/reopening the overlay
    const pool = buildQuestionPool();
    quizQuestions = pickQuestions(pool);
    quizIndex  = 0;
    quizScore  = 0;
    quizState  = "playing";
    renderQuestion();
  });

  document.getElementById("quiz-back").addEventListener("click", closeQuiz);
}
