import fs from 'fs';
import path from 'path';

const projectRoot = '../../books/tech/typescript-to-deployment';
const folders = [
  '01-typescript', '02-nextjs', '03-node-core',
  '04-ecosystem', '05-data', '06-api-design',
  '07-ai-sdks', '08-deployment', '09-ai-practices'
];

const covers = folders.map(f => {
  const metaPath = path.join(projectRoot, f, 'meta.json');
  if (fs.existsSync(metaPath)) {
    return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }
  return null;
}).filter(Boolean);

let html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/TextPlugin.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body {
        width: 1920px; height: 1080px; overflow: hidden;
        background: #000;
        font-family: 'Inter', sans-serif;
        color: #fff;
      }
      #root { position: relative; width: 100%; height: 100%; }
      .clip { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
      
      /* Global Helpers */
      .bg-panel { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
      
      /* S1: Terminal */
      .terminal { font-family: 'JetBrains Mono', monospace; font-size: 50px; z-index: 10; font-weight: 700; color: #fff; }
      .success { color: #00ffcc; display: none; margin-top: 20px;}
      
      /* S2: Stats Kinetic Sliding */
      .stat-panel { width: 100%; height: 100%; position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; color: #000; }
      .stat-text { font-size: 200px; font-weight: 900; letter-spacing: -0.05em; line-height: 1; text-transform: uppercase; text-align: center; }
      .stat-sub { font-size: 60px; font-weight: 700; letter-spacing: -0.02em; margin-top: 20px; color: #555; }
      
      /* S3: Cover Carousel */
      .cover-panel { width: 100%; height: 100%; position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; text-align: center; }
      .cover-title { font-size: 160px; font-weight: 900; letter-spacing: -0.04em; line-height: 1; text-transform: uppercase; color: #fff; }
      .cover-banner { font-family: 'JetBrains Mono', monospace; font-size: 35px; letter-spacing: 0.1em; color: #000; background: #fff; padding: 15px 30px; margin-top: 60px; font-weight: 700; }

      /* S4: Topic Flashcards */
      .topic-panel { width: 100%; height: 100%; position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; }
      .topic-text { font-size: 220px; font-weight: 900; color: #fff; text-transform: uppercase; letter-spacing: -0.04em; text-align: center; line-height: 0.9; }

      /* S5: Final Tagline */
      .final-panel { width: 100%; height: 100%; position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; }
      .tagline { font-size: 130px; font-weight: 900; color: #fff; text-align: center; line-height: 1.1; letter-spacing: -0.02em; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="35" data-width="1920" data-height="1080">
      <audio id="bgm" src="assets/music/chaotic-energy.mp3" data-start="0" data-duration="35" data-track-index="1"></audio>
      
      <!-- S1: Terminal (0-3) -->
      <div id="scene1" class="clip" data-start="0" data-duration="3" data-track-index="0">
        <div class="terminal">
          <div id="typewriter"></div>
          <div class="success" id="terminal-success">✓ COMPILED 1,127 PAGES.</div>
        </div>
      </div>

      <!-- S2: Stats Kinetic (3-9) -->
      <div id="scene2" class="clip" data-layout-allow-overlap="true" data-start="3" data-duration="6" data-track-index="0">
        
        <div id="stat1" class="stat-panel" data-layout-allow-overlap="true" style="background: #111; color: #fff;">
          <div class="stat-text" data-layout-allow-overlap="true">9 BOOKLETS</div>
          <div class="stat-sub" data-layout-allow-overlap="true" style="color: #ccc;">ONE DEFINITIVE COLLECTION</div>
        </div>

        <div id="stat2" class="stat-panel" data-layout-allow-overlap="true" style="background: #e5e5e5; color: #000;">
          <div class="stat-text" data-layout-allow-overlap="true">1,127 PAGES</div>
          <div class="stat-sub" data-layout-allow-overlap="true" style="color: #666;">OF PURE ENGINEERING SIGNAL</div>
        </div>

        <div id="stat3" class="stat-panel" data-layout-allow-overlap="true" style="background: #1f6f8b; color: #fff;">
          <div class="stat-text" data-layout-allow-overlap="true">0 FLUFF</div>
          <div class="stat-sub" data-layout-allow-overlap="true" style="color: #e0f2f1;">ALL ARCHITECTURE</div>
        </div>

      </div>

      <!-- S3: Cover Carousel (9-18) - 1 second each -->
      <div id="scene3" class="clip" data-layout-allow-overlap="true" data-start="9" data-duration="9" data-track-index="0">
`;

covers.forEach((cover, idx) => {
  html += `
        <div id="cover-${idx}" class="cover-panel" data-layout-allow-overlap="true" style="background: ${cover.cover.accent}; z-index: ${idx};">
          <h1 class="cover-title" data-layout-allow-overlap="true">${cover.cover.title.join('<br>')}</h1>
          <div class="cover-banner" data-layout-allow-overlap="true">${cover.cover.banner}</div>
        </div>
  `;
});

html += `
      </div>

      <!-- S4: Topic Flashcards (18-27) -->
      <!-- 9 seconds for 9 topics => 1 sec each -->
      <div id="scene4" class="clip" data-layout-allow-overlap="true" data-start="18" data-duration="9" data-track-index="0">
`;

const stackTopics = covers.map(c => c.cover.stack[0].split('·')[0].trim()); // E.g., "TypeScript", "Next.js", "Node.js Core"
stackTopics.forEach((topic, idx) => {
  html += `
        <div id="topic-${idx}" class="topic-panel" data-layout-allow-overlap="true" style="z-index: ${idx};">
          <div class="topic-text" data-layout-allow-overlap="true">${topic}</div>
        </div>
  `;
});

html += `
      </div>

      <!-- S5: Final Tagline (27-35) -->
      <div id="scene5" class="clip final-panel" data-start="27" data-duration="8" data-track-index="0">
        <div id="tagline-text" class="tagline">KNOW WHAT YOU SHIP.<br/><br/>OWN WHAT YOU RUN.</div>
      </div>

    </div>
    
    <script>
      gsap.registerPlugin(TextPlugin);
      const tl = gsap.timeline({ paused: true });
      
      // ==========================================
      // S1: Terminal (0 - 3s)
      // ==========================================
      tl.to("#typewriter", {
        duration: 1.5,
        text: { value: "$ build typescript-to-deployment", delimiter: "" },
        ease: "none"
      }, 0.5);
      tl.set("#terminal-success", { display: "block" }, 2.2);

      // ==========================================
      // S2: Stats Kinetic (3 - 9s)
      // ==========================================
      // Set initial positions offscreen
      tl.set("#stat1", { y: "100%" }, 0);
      tl.set("#stat2", { x: "100%" }, 0);
      tl.set("#stat3", { y: "-100%" }, 0);

      // Stat 1 slides UP at 3s
      tl.to("#stat1", { y: "0%", duration: 0.8, ease: "power4.out" }, 3);
      
      // Stat 2 slides LEFT at 5s (pushes stat1 out by being above it, or we move stat1)
      tl.to("#stat1", { x: "-50%", opacity: 0.5, duration: 0.8, ease: "power4.out" }, 5);
      tl.to("#stat2", { x: "0%", duration: 0.8, ease: "power4.out" }, 5);

      // Stat 3 slides DOWN at 7s
      tl.to("#stat2", { y: "50%", opacity: 0.5, duration: 0.8, ease: "power4.out" }, 7);
      tl.to("#stat3", { y: "0%", duration: 0.8, ease: "power4.out" }, 7);

      // ==========================================
      // S3: Cover Carousel (9 - 18s) - 1s each
      // ==========================================
`;

covers.forEach((cover, idx) => {
  const start = 9 + idx;
  const isEven = idx % 2 === 0;
  
  html += `
      // Set initial state offscreen
      tl.set("#cover-${idx}", { ${isEven ? 'x: "100%"' : 'y: "100%"'} }, 0);
      
      // Slide in
      tl.to("#cover-${idx}", { ${isEven ? 'x: "0%"' : 'y: "0%"'}, duration: 0.7, ease: "expo.out" }, ${start});
  `;
  
  // Slide previous out slightly for parallax
  if (idx > 0) {
    html += `
      tl.to("#cover-${idx - 1}", { ${isEven ? 'x: "-20%"' : 'y: "-20%"'}, opacity: 0.5, duration: 0.7, ease: "expo.out" }, ${start});
    `;
  }
});

html += `
      // ==========================================
      // S4: Topic Flashcards (18 - 27s) - 1s each
      // ==========================================
`;

stackTopics.forEach((topic, idx) => {
  const start = 18 + idx;
  
  html += `
      // Init offscreen scale
      tl.set("#topic-${idx}", { scale: 3, opacity: 0 }, 0);
      
      // Slam in
      tl.to("#topic-${idx}", { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, ${start});
  `;
  
  // Fade previous out
  if (idx > 0) {
    html += `
      tl.to("#topic-${idx - 1}", { scale: 0.5, opacity: 0, duration: 0.3, ease: "power2.in" }, ${start});
    `;
  }
});

html += `
      // ==========================================
      // S5: Final Tagline (27 - 35s)
      // ==========================================
      tl.set("#tagline-text", { opacity: 0, scale: 0.8, y: 50 }, 0);
      tl.to("#tagline-text", { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out" }, 27);
      
      // Slow zoom in on the tagline to keep momentum until the very end
      tl.to("#tagline-text", { scale: 1.05, duration: 8, ease: "none" }, 27);

      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;

fs.writeFileSync('index.html', html);
console.log('Generated index.html (Kinetic V3)');
