import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots, handleBotClick }) {
  return (
    <div className="bot-collection">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} handleClick={() => handleBotClick(bot)} />
      ))}
    </div>
  );
}

export default BotCollection;
