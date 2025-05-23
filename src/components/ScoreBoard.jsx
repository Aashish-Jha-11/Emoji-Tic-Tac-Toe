import React from 'react';
import { motion } from 'framer-motion';
import { emojiCategories } from '../data/emojiCategories';

const ScoreBoard = ({ scores, playerCategories }) => {
  return (
    <motion.div 
      className="card p-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-lg font-semibold text-center text-teal-400 mb-2">Score Board</h2>
      <div className="flex justify-between">
        <PlayerScore 
          playerName="Player 1" 
          score={scores.player1} 
          category={playerCategories.player1}
          isLeft={true}
        />
        <div className="text-xl font-bold flex items-center text-slate-400">vs</div>
        <PlayerScore 
          playerName="Player 2" 
          score={scores.player2} 
          category={playerCategories.player2}
          isLeft={false}
        />
      </div>
    </motion.div>
  );
};

const PlayerScore = ({ playerName, score, category, isLeft }) => {
  const sampleEmoji = emojiCategories[category]?.emojis[0];
  
  return (
    <motion.div 
      className={`flex items-center gap-2 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
        {sampleEmoji}
      </div>
      <div className={`text-center ${isLeft ? 'text-right' : 'text-left'}`}>
        <p className="font-semibold text-slate-200">{playerName}</p>
        <p className="text-2xl font-bold text-teal-400">{score}</p>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;