import React from "react";

function BotSpecs({ bot, goBack, enlistBot }) {
  return (
    <div className="bot-specs">
      <h2>{bot.name}</h2>
      <img src={bot.avatar_url} alt={bot.name} />
      <p><strong>Class:</strong> {bot.bot_class}</p>
      <p><strong>Health:</strong> {bot.health}</p>
      <p><strong>Damage:</strong> {bot.damage}</p>
      <p><strong>Armor:</strong> {bot.armor}</p>
      <p><em>{bot.catchphrase}</em></p>
      <button onClick={goBack}>⬅ Back</button>
      <button onClick={enlistBot}>➕ Enlist</button>
    </div>
  );
}

export default BotSpecs;
