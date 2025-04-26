import React, { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import BotSpecs from "./components/BotSpecs";
import SortBar from "./components/SortBar";
import FilterBar from "./components/FilterBar";
import "./App.css";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const botsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:3000/bots")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setBots(data))
      .catch((error) => console.error("There was a problem with the fetch operation:", error));
  }, []);

  const enlistBot = (bot) => {
    const alreadyInClass = army.some((b) => b.bot_class === bot.bot_class);
    if (!army.find((b) => b.id === bot.id) && !alreadyInClass) {
      setArmy([...army, bot]);
    } else if (alreadyInClass) {
      alert(`Only one bot allowed per class: ${bot.bot_class}`);
    }
  };

  const releaseBot = (bot) => {
    setArmy(army.filter((b) => b.id !== bot.id));
  };

  const dischargeBot = (bot) => {
    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBots(bots.filter((b) => b.id !== bot.id));
        setArmy(army.filter((b) => b.id !== bot.id));
      })
      .catch((error) => console.error("There was an error deleting the bot:", error));
  };

  const handleBotClick = (bot) => {
    setSelectedBot(bot);
  };

  const handleBackClick = () => {
    setSelectedBot(null);
  };

  const sortedBots = [...bots].sort((a, b) => {
    if (!sortBy) return 0;
    return b[sortBy] - a[sortBy];
  });

  const filteredBots =
    selectedClasses.length === 0
      ? sortedBots
      : sortedBots.filter((bot) => selectedClasses.includes(bot.bot_class));

  const searchedBots = filteredBots.filter((bot) =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBot = currentPage * botsPerPage;
  const indexOfFirstBot = indexOfLastBot - botsPerPage;
  const currentBots = searchedBots.slice(indexOfFirstBot, indexOfLastBot);
  const totalPages = Math.ceil(searchedBots.length / botsPerPage);

  return (
    <div className="app-container">
      <h1>🤖 Bot Battlr</h1>

      <YourBotArmy
        army={army}
        releaseBot={releaseBot}
        dischargeBot={dischargeBot}
      />

      <SortBar setSortBy={setSortBy} />
      <FilterBar
        selectedClasses={selectedClasses}
        setSelectedClasses={setSelectedClasses}
      />

      <input
        type="text"
        placeholder="Search bots..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {selectedBot ? (
        <BotSpecs
          bot={selectedBot}
          goBack={handleBackClick}
          enlistBot={() => {
            enlistBot(selectedBot);
            setSelectedBot(null);
          }}
        />
      ) : (
        <BotCollection bots={currentBots} handleBotClick={handleBotClick} />
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
