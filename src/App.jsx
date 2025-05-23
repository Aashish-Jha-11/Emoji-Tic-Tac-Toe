import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';
import Volume2 from 'lucide-react/dist/esm/icons/volume-2';
import VolumeX from 'lucide-react/dist/esm/icons/volume-x';
import Trophy from 'lucide-react/dist/esm/icons/trophy';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw';
import Timer from 'lucide-react/dist/esm/icons/timer';
import CategorySelection from './components/CategorySelection';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import RulesModal from './components/RulesModal';
import { useSoundEffects } from './hooks/useSoundEffects';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerCategories, setPlayerCategories] = useState({
    player1: null,
    player2: null
  });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [showRules, setShowRules] = useState(false);
  const [timeLimit, setTimeLimit] = useState(15); // 15 seconds per turn
  const [currentTimer, setCurrentTimer] = useState(timeLimit);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { isMuted, toggleMute, playSound } = useSoundEffects();

  useEffect(() => {
    let timer;
    if (isTimerRunning && currentTimer > 0) {
      timer = setInterval(() => {
        setCurrentTimer(prev => prev - 1);
      }, 1000);
    } else if (currentTimer === 0) {
      handleTimeUp();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, currentTimer]);

  const handleTimeUp = () => {
    playSound('timeout');
    setCurrentTimer(timeLimit);
  };

  const handleCategorySelection = (player, category) => {
    const updatedCategories = { ...playerCategories, [player]: category };
    setPlayerCategories(updatedCategories);
    playSound('select');
    
    if (player === 'player1' && playerCategories.player2 || player === 'player2' && playerCategories.player1) {
      setGameStarted(true);
      setIsTimerRunning(true);
    }
  };

  const handleGameWin = (player) => {
    setScores(prevScores => ({
      ...prevScores,
      [player]: prevScores[player] + 1
    }));
    setIsTimerRunning(false);
    playSound('win');
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayerCategories({ player1: null, player2: null });
    setCurrentTimer(timeLimit);
    setIsTimerRunning(false);
    playSound('select');
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0 });
    playSound('reset');
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100">
      <motion.header 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-teal-400"
          whileHover={{ scale: 1.05 }}
        >
        Tic Tac Toe
        </motion.h1>
        <div className="flex gap-2">
          {gameStarted && (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-full">
              <Timer size={20} className="text-teal-400" />
              <span className={`font-bold ${currentTimer <= 5 ? 'text-red-400' : 'text-teal-400'}`}>
                {currentTimer}s
              </span>
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetScores}
            className="p-2 rounded-full bg-slate-700 text-teal-400 hover:bg-slate-600"
            aria-label="Reset Scores"
          >
            <RotateCcw size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRules(true)}
            className="p-2 rounded-full bg-slate-700 text-teal-400 hover:bg-slate-600"
            aria-label="Game Rules"
          >
            <HelpCircle size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="p-2 rounded-full bg-slate-700 text-teal-400 hover:bg-slate-600"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </motion.button>
        </div>
      </motion.header>

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      <main className="max-w-4xl mx-auto">
        {!gameStarted ? (
          <CategorySelection 
            onSelect={handleCategorySelection} 
            playerCategories={playerCategories} 
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScoreBoard scores={scores} playerCategories={playerCategories} />
            <GameBoard 
              playerCategories={playerCategories}
              onWin={handleGameWin}
              onPlayAgain={resetGame}
              playSound={playSound}
              currentTimer={currentTimer}
              onTimeUp={handleTimeUp}
              setIsTimerRunning={setIsTimerRunning}
              setCurrentTimer={setCurrentTimer}
              timeLimit={timeLimit}
            />
          </motion.div>
        )}
      </main>
      
      <motion.footer 
        className="text-center mt-8 text-slate-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Made By Aashish Jha</p>
      </motion.footer>
    </div>
  );
}

export default App;