export const LIGHT_VARS = `
  --bg:#fff8f3; --bg2:#ffffff; --bg3:#fff1e6;
  --surface:#ffffff; --surface2:#fef3ea;
  --border:#f0d9c8;
  --accent:#f97316; --accent2:#ea580c; --accent-glow:rgba(249,115,22,0.18);
  --text:#1a0f00; --text2:#6b4226; --text3:#c2814e;
  --success:#16a34a; --danger:#dc2626;
  --shadow:0 4px 32px rgba(249,115,22,0.08);
  --shadow2:0 2px 12px rgba(249,115,22,0.13);
  --nav-bg:#ffffff; --input-bg:#fff8f3;
  --badge-bg:#fff1e6; --tag-text:#ea580c;
`;

export const DARK_VARS = `
  --bg:#0e0a06; --bg2:#160e07; --bg3:#1e1108;
  --surface:#1a1108; --surface2:#231508;
  --border:#3a2208;
  --accent:#f97316; --accent2:#fb923c; --accent-glow:rgba(249,115,22,0.22);
  --text:#fff7ed; --text2:#fbbf7a; --text3:#b06626;
  --success:#4ade80; --danger:#f87171;
  --shadow:0 4px 32px rgba(0,0,0,0.5);
  --shadow2:0 2px 12px rgba(249,115,22,0.15);
  --nav-bg:#130d06; --input-bg:#1e1108;
  --badge-bg:#2a1a08; --tag-text:#fb923c;
`;

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--text); transition:background 0.3s,color 0.3s; }
  @keyframes modalIn  { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes dropIn   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
  @keyframes toastIn  { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeRow  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
  .dish-row { animation:fadeRow 0.18s ease both; }
  .dish-input {
    width:100%; background:var(--input-bg); border:1.5px solid var(--border);
    border-radius:10px; padding:11px 14px; font-family:'DM Sans',sans-serif;
    font-size:0.97rem; color:var(--text); outline:none;
    transition:border-color 0.18s, box-shadow 0.18s;
  }
  .dish-input:focus { border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
  .dish-input:disabled { opacity:0.5; cursor:not-allowed; }
`;
