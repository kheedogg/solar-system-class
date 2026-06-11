# 🪐 The Solar System / 태양계

An interactive, **bilingual (English / Korean)** space lesson made for an elementary classroom.
It has **four views**, and clicking any object (planet, Sun, Moon, comet, constellation…) opens
kid-friendly facts in both languages.

## 🌍 Live page
**https://kheedogg.github.io/solar-system-class/**

Open it in any web browser — no installation needed. Great on a classroom projector or on tablets.

## 🖼️ The four views
1. **🪐 Solar System / 태양계** — Planets orbit the Sun.
   - **Scroll or pinch to zoom** in and out (🔍 Reset zoom to go back).
   - Includes the **Moon, Pluto (dwarf planet), the asteroid belt, and a comet** — all clickable.
   - **📏 Real scale** button shows the planets' approximate real sizes and distances.
   - **⏸️ Pause** button to freeze the orbits while you teach.
2. **🌅 Sky from Earth / 지구에서 보기** — Drag the slider (or press ▶️) to watch **day turn to night**: the Sun rises and sets, then the Moon and stars come out.
3. **⭐ Constellations / 별자리** — Famous constellations (Big Dipper, Cassiopeia, Orion, Leo). Click one to learn how to find it.
4. **🖨️ Worksheet / 학습지** — Prints a clean black-and-white handout with a fact card and a drawing space for each planet.

> ✏️ **Note:** Pictures are for learning — sizes, distances, and star positions are simplified, not exact.

## ✨ Other features
- Bilingual everywhere (English + 한국어)
- Shooting stars in the background
- Respects the device's "reduce motion" accessibility setting

## ✏️ How to edit the content (for the teacher)
All the words kids see live in **data arrays** at the top of [`script.js`](script.js):
`PLANETS`, `EARTH_MOON`, `COMET`, `ASTEROIDS`, `SUN`, and `CONSTELLATIONS`.
Each fact is a simple English/Korean pair:

```js
{ en: "Our home planet!", ko: "우리가 사는 행성이에요!" }
```

Edit the text (or add another `{ en, ko }` line), save, and refresh. To publish your changes,
commit and push — the live page updates in about a minute.

## 🖥️ Running it locally
Just open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---
Made for our class 🌟 우리 반을 위해 만들었어요
