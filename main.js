/* ==========================================================================
   THE NEW BMW M4 COMPETITION // QUAD-SEQUENCE SCROLL ENGINE
   Seamless Blend of:
     - Chapter 1: The Midnight Reveal (73 Frames)
     - Chapter 2: Arena Smoke & Burnout (161 Frames)
     - Chapter 3: Sunset Drift Horizon (130 Frames)
     - Chapter 4: 360° Studio Precision Dynamics (242 Frames)
   Total: 606 Curated Frames rendered on single high-performance Canvas
   ========================================================================== */

// ==========================================================================
// SCROLL RESET ON REFRESH & LOAD
// Always ensure user starts at frame 0 / top of the showcase
// ==========================================================================
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
if (document.documentElement) document.documentElement.scrollTop = 0;
if (document.body) document.body.scrollTop = 0;

// Lock scroll completely while preloader is active
document.documentElement.classList.add("preloader-active");
document.body.classList.add("preloader-active");

let experienceStarted = false;

const lockScrollHandler = (e) => {
  if (!experienceStarted) {
    e.preventDefault();
    return false;
  }
};

window.addEventListener("wheel", lockScrollHandler, { passive: false });
window.addEventListener("touchmove", lockScrollHandler, { passive: false });
window.addEventListener("keydown", (e) => {
  if (!experienceStarted) {
    if (e.key === "F5" || e.key === "F12") return;
    const blockedKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Space", "Home", "End", "Enter", "Tab"];
    if (blockedKeys.includes(e.code) || blockedKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
}, { passive: false });

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* --------------------------------------------------------------------------
     1. ASSET CONFIGURATION & TRIPLE PRELOADER
     -------------------------------------------------------------------------- */
  const REVEAL_COUNT = 73;
  const ARENA_COUNT = 201;
  const STUDIO_COUNT = 242;
  const TOTAL_FRAMES = REVEAL_COUNT + ARENA_COUNT + STUDIO_COUNT; // 516 Pure BMW M4 Frames

  const revealImages = [];
  const arenaImages = [];
  const studioImages = [];
  let loadedCount = 0;

  const preloader = document.getElementById("preloader");
  const preloaderBar = document.getElementById("preloaderBar");
  const preloaderPercent = document.getElementById("preloaderPercent");
  const preloaderStatusText = document.getElementById("preloaderStatusText");
  const preloaderActionHint = document.getElementById("preloaderActionHint");
  const preloaderArtwork = document.getElementById("preloaderArtworkImg");
  const bmwLoaderAudio = document.getElementById("bmwLoaderAudio");
  const canvas = document.getElementById("car-canvas");
  const ctx = canvas.getContext("2d");
  const transitionFlash = document.getElementById("transition-flash");

  // Frame paths
  const getRevealPath = (i) => `frames_reveal/frame_${String(i).padStart(6, '0')}.jpg`;
  const getArenaPath = (i) => `frames_arena/frame_${String(i).padStart(6, '0')}.jpg`;
  const getStudioPath = (i) => `frames/frame_${String(i).padStart(6, '0')}.png`;

  

  /* --------------------------------------------------------------------------
     PRELOADER AUDIO CONTROLLER & SYNCHRONIZED CALIBRATION
     Click on logo (or anywhere on preloader screen) starts cold-start exhaust
     audio and simultaneously triggers 0% -> 100% telemetry calibration.
     -------------------------------------------------------------------------- */
  let preloaderRunning = false;
  let loaderStartTime = 0;
  const MIN_LOADER_MS = 2900; // ~2.9s pacing synced with engine cold-start audio
  let progressRaf = null;

  function stopLoaderAudio() {
    if (!bmwLoaderAudio) return;
    if (bmwLoaderAudio.paused) return;
    let vol = bmwLoaderAudio.volume;
    const fadeTimer = setInterval(() => {
      vol -= 0.15;
      if (vol <= 0.05) {
        clearInterval(fadeTimer);
        bmwLoaderAudio.pause();
        bmwLoaderAudio.currentTime = 0;
      } else {
        bmwLoaderAudio.volume = Math.max(0, vol);
      }
    }, 30);
  }

  const startExperience = () => {
    if (experienceStarted) return;
    experienceStarted = true;
    stopLoaderAudio();
    // Unlock scroll
    document.documentElement.classList.remove("preloader-active");
    document.body.classList.remove("preloader-active");
    window.removeEventListener("wheel", lockScrollHandler);
    window.removeEventListener("touchmove", lockScrollHandler);

    preloader.classList.add("loaded");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);

    // Reset scroll to top / frame 0
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    initScrollExperience();
  };

  function updatePreloaderDisplay() {
    const elapsed = performance.now() - loaderStartTime;
    const timeProgress = Math.min(1, elapsed / MIN_LOADER_MS);
    const assetProgress = loadedCount / TOTAL_FRAMES;

    // Both assets and audio-pacing timer advance together
    const combinedProgress = (loadedCount === TOTAL_FRAMES)
      ? timeProgress
      : Math.min(timeProgress, assetProgress);

    const pct = Math.min(100, Math.floor(combinedProgress * 100));

    if (preloaderBar) preloaderBar.style.width = `${pct}%`;
    if (preloaderPercent) preloaderPercent.textContent = pct;

    if (pct >= 100 && loadedCount === TOTAL_FRAMES) {
      if (preloaderStatusText) {
        preloaderStatusText.textContent = "BEAST AWAKENED // 503 HP ONLINE // ENTERING M4";
      }
      if (preloaderActionHint) {
        preloaderActionHint.innerHTML = `
          <span class="hint-m-stripes">
            <span class="hint-m-stripe hint-m-stripe-1"></span>
            <span class="hint-m-stripe hint-m-stripe-2"></span>
            <span class="hint-m-stripe hint-m-stripe-3"></span>
          </span>
          <span>BEAST AWAKENED // ENTERING M4</span>
        `;
      }
      setTimeout(() => {
        startExperience();
      }, 350);
    } else {
      progressRaf = requestAnimationFrame(updatePreloaderDisplay);
    }
  }

  function startLoadingAndSound() {
    if (preloaderRunning) return;
    preloaderRunning = true;
    loaderStartTime = performance.now();

    // Remove cursor pointers and click listeners
    if (preloaderArtwork) preloaderArtwork.style.cursor = "default";
    preloader.style.cursor = "default";

    // Trigger high-voltage lightning storm & thunder strobe flash
    // Start BMW M4 Cold-Start & Exhaust Audio immediately with full volume
    if (bmwLoaderAudio) {
      bmwLoaderAudio.currentTime = 0;
      bmwLoaderAudio.volume = 1.0;
      bmwLoaderAudio.play().catch(() => {});
    }

    // Update banner & status text with official BMW M tri-color emblem
    if (preloaderActionHint) {
      preloaderActionHint.classList.add("loading-active");
      preloaderActionHint.innerHTML = `
        <span class="hint-m-stripes">
          <span class="hint-m-stripe hint-m-stripe-1"></span>
          <span class="hint-m-stripe hint-m-stripe-2"></span>
          <span class="hint-m-stripe hint-m-stripe-3"></span>
        </span>
        <span>AWAKENING THE BEAST...</span>
      `;
    }
    if (preloaderStatusText) {
      preloaderStatusText.textContent = "IGNITION ACTIVE // S58 COLD START ROAR // AWAKENING THE BEAST";
    }

    // Begin progress animation
    requestAnimationFrame(updatePreloaderDisplay);
  }

  // Preloader initiates EXCLUSIVELY when user clicks the "TAP TO AWAKEN THE BEAST" button.
  // Absolutely no auto-advancing, no keydown triggers, and no background/artwork click triggers.
  if (preloaderActionHint) {
    preloaderActionHint.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      startLoadingAndSound();
    }, { once: true });
  }

  const onAssetLoaded = () => {
    loadedCount++;

    if (loadedCount === 25 && !window.initialDrawn) {
      window.initialDrawn = true;
      renderCurrentState();
    }
  };

  // Preload Reveal Frames (Chapter 1)
  for (let i = 0; i < REVEAL_COUNT; i++) {
    const img = new Image();
    img.src = getRevealPath(i);
    img.onload = onAssetLoaded;
    img.onerror = onAssetLoaded;
    revealImages.push(img);
  }

  // Preload Arena Drift Frames (Chapter 2)
  for (let i = 0; i < ARENA_COUNT; i++) {
    const img = new Image();
    img.src = getArenaPath(i);
    img.onload = onAssetLoaded;
    img.onerror = onAssetLoaded;
    arenaImages.push(img);
  }

  // Preload Studio Frames (Chapter 3)
  for (let i = 0; i < STUDIO_COUNT; i++) {
    const img = new Image();
    img.src = getStudioPath(i);
    img.onload = onAssetLoaded;
    img.onerror = onAssetLoaded;
    studioImages.push(img);
  }

  /* --------------------------------------------------------------------------
     2. QUAD-SEQUENCE CANVAS RENDERING ENGINE
     -------------------------------------------------------------------------- */
  let currentChapter = 1; // 1 = Reveal, 2 = Arena, 3 = Drift, 4 = Studio
  let currentFrameIdx = 0;

  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    renderCurrentState();
  };

  const drawFittedImage = (img, imgAspect) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const screenAspect = w / h;
    let drawW, drawH, drawX, drawY;

    if (screenAspect > imgAspect) {
      drawW = w;
      drawH = w / imgAspect;
      drawX = 0;
      drawY = (h - drawH) / 2;
    } else {
      drawH = h;
      drawW = h * imgAspect;
      drawX = (w - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  const renderCurrentState = () => {
    if (currentChapter === 1) {
      const img = revealImages[currentFrameIdx] || revealImages[0];
      drawFittedImage(img, 1920 / 1012);
    } else if (currentChapter === 2) {
      const img = arenaImages[currentFrameIdx] || arenaImages[0];
      drawFittedImage(img, 1920 / 1080);
    } else {
      const img = studioImages[currentFrameIdx] || studioImages[0];
      drawFittedImage(img, 1920 / 1080);
    }
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();



  /* --------------------------------------------------------------------------
     4. UNIFIED SCROLL JOURNEY & STORYLINE SWITCHER
     -------------------------------------------------------------------------- */
  const hudChapter = document.getElementById("hudChapter");
  const hudVelocity = document.getElementById("hudVelocity");
  const hudProgress = document.getElementById("hudProgress");
  const hudPercent = document.getElementById("hudPercent");

  const secRevealIntro = document.getElementById("sec-reveal-intro");
  const secRevealFitment = document.getElementById("sec-reveal-fitment");
  const secArenaIntro = document.getElementById("sec-arena-intro");
  const secArenaTelemetry = document.getElementById("sec-arena-telemetry");
  const secStudioIntro = document.getElementById("sec-studio-intro");
  const secStudioSpecs = document.getElementById("sec-studio-specs");
  const secCta = document.getElementById("sec-cta");

  function updateStorySections(p) {
    // Act 1 Reveal Intro: 0% to 10%
    if (p < 0.10) {
      secRevealIntro.classList.add("active");
      secRevealFitment.classList.remove("active");
      secArenaIntro.classList.remove("active");
      secArenaTelemetry.classList.remove("active");
      secStudioIntro.classList.remove("active");
      secStudioSpecs.classList.remove("active");
      secCta.classList.remove("active");
    }
    // Act 1 Reveal Fitment: 10% to 20%
    else if (p >= 0.10 && p < 0.20) {
      secRevealIntro.classList.remove("active");
      secRevealFitment.classList.add("active");
      secArenaIntro.classList.remove("active");
      secArenaTelemetry.classList.remove("active");
      secStudioIntro.classList.remove("active");
      secStudioSpecs.classList.remove("active");
      secCta.classList.remove("active");
    }
    // Act 2 Arena Intro: 20% to 36%
    else if (p >= 0.20 && p < 0.36) {
      secRevealIntro.classList.remove("active");
      secRevealFitment.classList.remove("active");
      secArenaIntro.classList.add("active");
      secArenaTelemetry.classList.remove("active");
      secStudioIntro.classList.remove("active");
      secStudioSpecs.classList.remove("active");
      secCta.classList.remove("active");
    }
    // Act 2 Arena Telemetry: 36% to 55%
    else if (p >= 0.36 && p < 0.55) {
      secRevealIntro.classList.remove("active");
      secRevealFitment.classList.remove("active");
      secArenaIntro.classList.remove("active");
      secArenaTelemetry.classList.add("active");
      secStudioIntro.classList.remove("active");
      secStudioSpecs.classList.remove("active");
      secCta.classList.remove("active");
    }
    // Act 3 Studio Intro: 55% to 70%
    else if (p >= 0.55 && p < 0.70) {
      secRevealIntro.classList.remove("active");
      secRevealFitment.classList.remove("active");
      secArenaIntro.classList.remove("active");
      secArenaTelemetry.classList.remove("active");
      secStudioIntro.classList.add("active");
      secStudioSpecs.classList.remove("active");
      secCta.classList.remove("active");
    }
    // Act 3 Studio Specs: 70% to 88%
    else if (p >= 0.70 && p < 0.88) {
      secRevealIntro.classList.remove("active");
      secRevealFitment.classList.remove("active");
      secArenaIntro.classList.remove("active");
      secArenaTelemetry.classList.remove("active");
      secStudioIntro.classList.remove("active");
      secStudioSpecs.classList.add("active");
      secCta.classList.remove("active");
    }
    // Final CTA: 88% to 100%
    else {
      secRevealIntro.classList.remove("active");
      secRevealFitment.classList.remove("active");
      secArenaIntro.classList.remove("active");
      secArenaTelemetry.classList.remove("active");
      secStudioIntro.classList.remove("active");
      secStudioSpecs.classList.remove("active");
      secCta.classList.add("active");
    }
  }

  function initScrollExperience() {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.25
    });

    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      hudVelocity.textContent = Math.abs(e.velocity).toFixed(2);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Master Scroll Progress
    const journey = { progress: 0 };

    gsap.to(journey, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
        onUpdate: (self) => {
          const p = self.progress;

          // HUD progress bar
          const pct = (p * 100).toFixed(1);
          hudProgress.style.width = `${pct}%`;
          hudPercent.textContent = `${pct}%`;

          // Handle 3-sequence switching (Pure BMW M4 Showcase)
          if (p < 0.20) {
            // CHAPTER 1: REVEAL SEQUENCE (73 frames mapped from 0.0 to 0.20)
            currentChapter = 1;
            const revealProg = p / 0.20;
            currentFrameIdx = Math.min(REVEAL_COUNT - 1, Math.max(0, Math.floor(revealProg * REVEAL_COUNT)));
            hudChapter.textContent = `CH-1: REVEAL (${String(currentFrameIdx).padStart(2, '0')}/${REVEAL_COUNT - 1})`;
            transitionFlash.style.opacity = 0;
          } else if (p >= 0.20 && p < 0.55) {
            // CHAPTER 2: ARENA SMOKE & BURNOUT (201 frames mapped from 0.20 to 0.55)
            currentChapter = 2;
            const arenaProg = (p - 0.20) / 0.35;
            currentFrameIdx = Math.min(ARENA_COUNT - 1, Math.max(0, Math.floor(arenaProg * ARENA_COUNT)));
            hudChapter.textContent = `CH-2: ARENA (${String(currentFrameIdx).padStart(3, '0')}/${ARENA_COUNT - 1})`;
            
            // Subtle flash right at threshold
            if (p >= 0.195 && p <= 0.208) {
              transitionFlash.style.opacity = 0.28;
            } else {
              transitionFlash.style.opacity = 0;
            }
          } else {
            // CHAPTER 3: STUDIO 360 SEQUENCE (242 frames mapped from 0.55 to 1.0)
            currentChapter = 3;
            const studioProg = (p - 0.55) / 0.45;
            currentFrameIdx = Math.min(STUDIO_COUNT - 1, Math.max(0, Math.floor(studioProg * STUDIO_COUNT)));
            hudChapter.textContent = `CH-3: STUDIO (${String(currentFrameIdx).padStart(3, '0')}/${STUDIO_COUNT - 1})`;
            
            // Subtle flash right at threshold
            if (p >= 0.545 && p <= 0.558) {
              transitionFlash.style.opacity = 0.28;
            } else {
              transitionFlash.style.opacity = 0;
            }
          }

          // Draw current frame on canvas
          renderCurrentState();

          // Update active storyline text
          updateStorySections(p);
        }
      }
    });
  }
});
