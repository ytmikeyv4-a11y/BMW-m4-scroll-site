# BMW M4 Competition // Quad-Sequence Continuous Scroll Showcase

High-performance cinematic scroll animation featuring **606 curated frames** across 4 seamless chapters:
1. **The Midnight Reveal (73 Frames)**: Underground parking garage reveal in Candy Ruby Metallic.
2. **Arena Smoke & Burnout (161 Frames)**: Yas Marina Blue M4 stadium drift, tire smoke, and donut burnout.
3. **Sunset Drift Horizon (130 Frames)**: Golden hour runway power slide with pinned drift analytics.
4. **360° Studio Precision (242 Frames)**: High-tech studio turntable rotation with full 503 HP telemetry.

---

## 🚀 How to Run on Your Laptop

### Method 1: Python HTTP Server (Fastest)
1. Open PowerShell or Command Prompt.
2. Navigate to this project folder:
   ```powershell
   cd "C:\Users\Alan Thomas\.gemini\antigravity\scratch\bmw-m4-scroll"
   ```
3. Start the server:
   ```powershell
   python -m http.server 8081
   ```
4. Open your browser and visit:
   **http://localhost:8081**

---

### Method 2: VS Code Live Server
1. Open Visual Studio Code.
2. Open this folder: `File -> Open Folder -> bmw-m4-scroll`.
3. If not already installed, install the extension **"Live Server"** by Ritwick Dey.
4. Right-click on `index.html` and click **"Open with Live Server"**.

---

## 📂 Project Structure
```
bmw-m4-scroll/
├── frames_reveal/     # Chapter 1: 73 frames (frame_000000.jpg to frame_000072.jpg)
├── frames_arena/      # Chapter 2: 161 frames (frame_000000.jpg to frame_000160.jpg)
├── frames_drift/      # Chapter 3: 130 frames (frame_000000.jpg to frame_000129.jpg)
├── frames/            # Chapter 4: 242 frames (frame_000000.png to frame_000241.png)
├── index.html         # HTML structure with HUD telemetry, preloader, audio button & cards
├── styles.css         # Styling, glassmorphic HUD, BMW M colors, 2800vh scroll container
├── main.js            # Lenis smooth scroll, GSAP ScrollTrigger, Canvas renderer & Web Audio synth
└── README.md          # Setup and usage guide
```

---

## 🛠 Tech Stack
- **Lenis 1.1**: Butter-smooth inertial momentum scrolling.
- **GSAP 3 + ScrollTrigger**: Scrub synchronization for all 4 sequences and telemetry overlays.
- **HTML5 Canvas (2D)**: Real-time dynamic aspect ratio rendering without frame jumping.
- **Web Audio API**: Synthetic exhaust engine rev synthesizer that accelerates with scroll velocity.
