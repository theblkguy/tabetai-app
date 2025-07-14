import React from "react";

function EmojiRainbow() {
  const emojis = ["🍣", "🍱", "🍙", "🥠", "🍇", "🧊", "🍮", "🍪", "🍔", "🌮", "🍬"];
  const centerX = 191; // move left
  const centerY = 196; // move down
  const radius = 199; // arc radius
  const arcStart = Math.PI * 0.16; // start angle 
  const arcEnd = Math.PI * 0.83; // end angle 
  return (
    <>
      {emojis.map((emoji, i) => {
        const angle = arcStart + (arcEnd - arcStart) * (i / (emojis.length - 1));
        const left = centerX + radius * Math.cos(angle) - 18; // -18 to center emoji
        const top = centerY - radius * Math.sin(angle); // arc
        const size = 14; // fixed size for uniformity
        return (
          <span
            key={i}
            className="absolute hover:scale-125 transition-transform duration-200"
            style={{
              left: `${left}px`,
              top: `${top}px`,
              fontSize: `${size}px`,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </>
  );
}

export default EmojiRainbow;
