import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';

const WinScreen = ({ winner, playerCategories, onPlayAgain }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Confetti />
      
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="text-center mb-6">
          <motion.div 
            className="text-6xl mb-4 inline-block"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold text-purple-800">
            {winner === 'player1' ? 'Player 1' : 'Player 2'} Wins!
          </h2>
          <p className="text-gray-600 mt-1 capitalize">
            {playerCategories[winner]} emojis for the win!
          </p>
        </div>
        
        <div className="flex justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={onPlayAgain}
          >
            Play Again
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WinScreen;