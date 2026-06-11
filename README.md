# 🪐 The Solar System / 태양계

An interactive, **bilingual (English / Korean)** solar system page made for an elementary classroom.
Planets orbit the Sun, and clicking any planet (or the Sun) shows kid-friendly facts in both languages.

## 🌍 Live page
**https://kheedogg.github.io/solar-system-class/**

Open it in any web browser — no installation needed. Works great on a classroom projector or on tablets.

## ✨ Features
- 8 planets animated in orbit around a glowing Sun
- Click a planet → a popup with simple facts (English + 한국어)
- A **Pause orbits / 멈추기** button to freeze the animation while teaching
- Respects the device's "reduce motion" accessibility setting
- No dependencies, no build step — just open `index.html`

## ✏️ How to edit the planet facts (for the teacher)
All the content lives in one place: the **`PLANETS`** array at the top of [`script.js`](script.js).
Each planet looks like this:

```js
{
  name: "Earth", nameKo: "지구", emoji: "🌍", color: "#4a90d9", size: 28, orbit: 175, speed: 16,
  facts: [
    { en: "Our home planet!", ko: "우리가 사는 행성이에요!" }
  ]
}
```

To change a fact, edit the `en` (English) and `ko` (Korean) text. To add a fact, add another `{ en: "...", ko: "..." }` line. Save the file and refresh the page.

## 🖥️ Running it locally
Just open `index.html` in a browser. Or, from this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---
Made for our class 🌟 우리 반을 위해 만들었어요
