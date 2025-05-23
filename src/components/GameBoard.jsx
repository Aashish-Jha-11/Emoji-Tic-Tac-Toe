import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cell from './Cell';
import { emojiCategories } from '../data/emojiCategories';
import { checkWinner } from '../utils/gameLogic';
import WinScreen from './WinScreen';

const GameBoard = ({ 
  playerCategories, 
  onWin, 
  onPlayAgain, 
  playSound,
  currentTimer,
  onTimeUp,
  setIsTimerRunning,
  setCurrentTimer,
  timeLimit
}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('player1');
  const [playerMoves, setPlayerMoves] = useState({ player1: [], player2: [] });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [currentEmojis, setCurrentEmojis] = useState({
    player1: getRandomEmoji('player1'),
    player2: getRandomEmoji('player2')
  });

  useEffect(() => {
    if (currentTimer === 0) {
      handleTimeUp();
    }
  }, [currentTimer]);

  function getRandomEmoji(player) {
    const category = playerCategories[player];
    const emojis = emojiCategories[category].emojis;
    return emojis[Math.floor(Math.random() * emojis.length)];
  }

  const handleTimeUp = () => {
    const nextPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    setCurrentPlayer(nextPlayer);
    setCurrentTimer(timeLimit);
    setCurrentEmojis(prev => ({
      ...prev,
      [nextPlayer]: getRandomEmoji(nextPlayer)
    }));
    playSound('timeout');
  };

  const handleCellClick = (index) => {
    if (board[index] !== null || winner || currentTimer === 0) return;
    
    playSound('place');
    
    const newBoard = [...board];
    newBoard[index] = {
      player: currentPlayer,
      emoji: currentEmojis[currentPlayer],
      moveIndex: playerMoves[currentPlayer].length
    };
    
    setBoard(newBoard);
    
    const newPlayerMoves = {
      ...playerMoves,
      [currentPlayer]: [...playerMoves[currentPlayer], index]
    };
    
    if (newPlayerMoves[currentPlayer].length > 3) {
      const oldestMoveIndex = newPlayerMoves[currentPlayer][0];
      newBoard[oldestMoveIndex] = null;
      newPlayerMoves[currentPlayer] = newPlayerMoves[currentPlayer].slice(1);
      playSound('vanish');
    }
    
    setPlayerMoves(newPlayerMoves);
    
    const result = checkWinner(newBoard, currentPlayer);
    if (result) {
      setWinner(currentPlayer);
      setWinningLine(result);
      setIsTimerRunning(false);
      onWin(currentPlayer);
    } else {
      const nextPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      setCurrentPlayer(nextPlayer);
      setCurrentTimer(timeLimit);
      setCurrentEmojis(prev => ({
        ...prev,
        [nextPlayer]: getRandomEmoji(nextPlayer)
      }));
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('player1');
    setPlayerMoves({ player1: [], player2: [] });
    setWinner(null);
    setWinningLine(null);
    setCurrentEmojis({
      player1: getRandomEmoji('player1'),
      player2: getRandomEmoji('player2')
    });
    setCurrentTimer(timeLimit);
    setIsTimerRunning(true);
    playSound('reset');
  };

  const isDraw = !winner && board.filter(Boolean).length === 9;

  return (
    <div className="mt-8">
      <AnimatePresence>
        {winner && (
          <WinScreen 
            winner={winner} 
            playerCategories={playerCategories}
            onPlayAgain={resetBoard}
          />
        )}
      </AnimatePresence>
      
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-4 mb-4 md:mb-0">
          <PlayerTurn 
            isActive={currentPlayer === 'player1'} 
            player="player1"
            category={playerCategories.player1}
            currentEmoji={currentEmojis.player1}
          />
          <PlayerTurn 
            isActive={currentPlayer === 'player2'} 
            player="player2"
            category={playerCategories.player2}
            currentEmoji={currentEmojis.player2}
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline"
          onClick={onPlayAgain}
        >
          Change Categories
        </motion.button>
      </div>

      <motion.div 
        className="grid grid-cols-3 gap-2 md:gap-4 max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {board.map((cell, index) => (
          <Cell
            key={index}
            index={index}
            value={cell}
            onClick={() => handleCellClick(index)}
            isWinningCell={winningLine?.includes(index)}
          />
        ))}
      </motion.div>

      {isDraw && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <p className="text-xl font-bold text-slate-200 mb-4">It's a draw! 🤝</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={resetBoard}
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

const PlayerTurn = ({ isActive, player, category, currentEmoji }) => {
  return (
    <motion.div 
      className={`flex items-center gap-2 p-2 rounded-lg ${
        isActive ? 'bg-slate-700 border-2 border-teal-400' : 'opacity-60'
      }`}
      animate={{ 
        scale: isActive ? 1.05 : 1,
        y: isActive ? -2 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-2xl">
        {currentEmoji}
      </div>
      <div>
        <p className={`font-semibold ${player === 'player1' ? 'text-teal-400' : 'text-cyan-400'}`}>
          {player === 'player1' ? 'Player 1' : 'Player 2'}
        </p>
        <p className="text-xs text-slate-300 capitalize">{category}</p>
      </div>
    </motion.div>
  );
};

export default GameBoard;