export const LIGHT_VARS = `
  --bg:#fbf9f4; --bg2:#ffffff; --bg3:#f4efe6;
  --surface:rgb(255, 255, 255); --surface2:#faf5eb;
  --border:rgba(249, 115, 22, 0.15);
  --accent:#f97316; --accent2:#ea580c; 
  --accent-glow:rgba(249, 115, 22, 0.25);
  --text:#1c120c; --text2:#61493c; --text3:#a3806a;
  --success:#10b981; --danger:#ef4444;
  --shadow:0 20px 40px rgba(249, 115, 22, 0.08), 0 1px 3px rgba(249, 115, 22, 0.04);
  --shadow2:0 8px 24px rgba(249, 115, 22, 0.12);
  --nav-bg:#ffffff; --input-bg:#faf5eb;
  --badge-bg:#fdf5ee; --tag-text:#ea580c;
`;

export const DARK_VARS = `
  --bg:#070503; --bg2:#0f0b08; --bg3:#17110c;
  --surface:rgba(15, 11, 8, 0.7); --surface2:#1a130d;
  --border:rgba(249, 115, 22, 0.25);
  --accent:#f97316; --accent2:#fb923c; 
  --accent-glow:rgba(249, 115, 22, 0.45);
  --text:#fefefe; --text2:#d6c4b5; --text3:#8c7361;
  --success:#34d399; --danger:#f87171;
  --shadow:0 25px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(249, 115, 22, 0.05);
  --shadow2:0 10px 30px rgba(249, 115, 22, 0.2);
  --nav-bg:#0f0b08; --input-bg:#17110c;
  --badge-bg:#261b12; --tag-text:#fb923c;
`;

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  
  body { 
    font-family:'DM Sans', sans-serif; 
    background:var(--bg); 
    color:var(--text); 
    font-size: 0.85rem;
    letter-spacing: -0.01em;
    transition:background 0.4s ease, color 0.4s ease; 
    overflow-x:hidden; 
  }
  
  /* Floating Glassmorphism Core Specs */
  .floating-glass {
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1.5px solid var(--border) !important;
    box-shadow: var(--shadow) !important;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .floating-glass:hover {
    transform: translateY(-2px);
    border-color: rgba(249, 115, 22, 0.4) !important;
    box-shadow: var(--shadow2), 0 0 20px var(--accent-glow) !important;
  }

  .dish-input {
    width: 100%;
    background: var(--input-bg);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 10px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    color: var(--text);
    outline: none;
    transition: all 0.2s ease;
  }
  .dish-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  /* High-Performance Neon Ambient Background Rotations */
  @keyframes floatGlowOrbOne {
    0% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
    50% { transform: translate(40px, -20px) scale(1.2); opacity: 0.8; }
    100% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
  }
  @keyframes floatGlowOrbTwo {
    0% { transform: translate(0px, 0px) scale(1.1); opacity: 0.4; }
    50% { transform: translate(-30px, 40px) scale(0.9); opacity: 0.7; }
    100% { transform: translate(0px, 0px) scale(1.1); opacity: 0.4; }
  }
  @keyframes continuousPan {
    from { background-position: 0 0; }
    to { background-position: 240px 240px; }
  }

  .animated-sketch-layer { animation: continuousPan 40s linear infinite; }
  .animated-glow-orb-1 { animation: floatGlowOrbOne 12s ease-in-out infinite; }
  .animated-glow-orb-2 { animation: floatGlowOrbTwo 15s ease-in-out infinite; }
`;