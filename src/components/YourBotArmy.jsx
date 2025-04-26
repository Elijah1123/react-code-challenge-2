import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ army, releaseBot, dischargeBot }) {
  return (
    <div>
      <h2>Your Bot Army</h2>
      <div className="bot-army">
        {army.map((bot) => (
          <div key={bot.id} className="bot-card">
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>{bot.bot_class}</p>
            <button onClick={() => releaseBot(bot)}>Release</button>
            <button className="danger" onClick={() => dischargeBot(bot)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
