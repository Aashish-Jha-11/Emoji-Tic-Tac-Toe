import React from 'react';
import { motion } from 'framer-motion';
import { emojiCategories } from '../data/emojiCategories';

const CategorySelection = ({ onSelect, playerCategories }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderPlayerSelection = (player, playerLabel) => {
    const isSelected = playerCategories[player] !== null;
    
    return (
      <motion.div 
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: player === 'player1' ? 0 : 0.2 }}
      >
        <h2 className="text-xl font-bold text-center mb-4 text-purple-800">{playerLabel} - Choose Your Emoji Category</h2>
        
        {isSelected ? (
          <motion.div 
            className="text-center py-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="text-5xl mb-3">
              {emojiCategories[playerCategories[player]].emojis[0]}
            </div>
            <p className="text-lg font-semibold text-pink-600 capitalize">
              {playerCategories[player]} Selected!
            </p>
            {!playerCategories[player === 'player1' ? 'player2' : 'player1'] && (
              <p className="text-sm text-gray-600 mt-2">
                Waiting for {player === 'player1' ? 'Player 2' : 'Player 1'} to select...
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(emojiCategories).map(([category, { name, emojis }]) => (
              <motion.button
                key={category}
                className={`p-4 rounded-lg border-2 transition duration-300 hover:bg-purple-50 ${
                  playerCategories[player === 'player1' ? 'player2' : 'player1'] === category 
                    ? 'opacity-50 cursor-not-allowed border-gray-200' 
                    : 'border-purple-200 hover:border-purple-400'
                }`}
                onClick={() => {
                  if (playerCategories[player === 'player1' ? 'player2' : 'player1'] !== category) {
                    onSelect(player, category);
                  }
                }}
                disabled={playerCategories[player === 'player1' ? 'player2' : 'player1'] === category}
                variants={itemVariants}
              >
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2 flex gap-1">
                    {emojis.slice(0, 2).map((emoji, idx) => (
                      <span key={idx}>{emoji}</span>
                    ))}
                  </div>
                  <span className="text-sm font-medium capitalize">{name}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-purple-900">Welcome to Emoji Tic Tac Toe!</h2>
        <p className="text-gray-600 mt-2">Each player, choose your emoji category to begin</p>
      </motion.div>
      
      {renderPlayerSelection('player1', 'Player 1')}
      {renderPlayerSelection('player2', 'Player 2')}
    </div>
  );
};

export default CategorySelection;