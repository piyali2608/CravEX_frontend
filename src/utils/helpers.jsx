export const VENDOR_NO = 1;

export const DISH_EMOJIS = ["🍛","🥘","🍜","🥗","🍲","🫕","🍱","🥙","🌮","🍝"];

export const dishEmoji = (id) => DISH_EMOJIS[id % DISH_EMOJIS.length];

export const qtyColor = (qty) => {
  if (qty <= 5)  return "var(--danger)";
  if (qty <= 15) return "#f59e0b";
  return "var(--success)";
};

export function highlight(text, query) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark style={{ background: "none", color: "var(--accent)", fontWeight: 800 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}
