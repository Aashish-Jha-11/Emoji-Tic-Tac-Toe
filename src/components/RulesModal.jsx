import React from 'react';
import { motion } from 'framer-motion';
import X from 'lucide-react/dist/esm/icons/x';

const RulesModal = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-800">Game Rules</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <X size={24} />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          <RuleSection 
            title="Basic Rules" 
            content="This is a twist on the classic Tic Tac Toe game using emojis. Get 3 of your emojis in a line (horizontal, vertical, or diagonal) to win!"
            emoji="🎮"
          />
          
          <RuleSection 
            title="Emoji Categories" 
            content="Each player chooses a different emoji category at the start. During gameplay, you'll get random emojis from your chosen category."
            emoji="🎭"
          />
          
          <RuleSection 
            title="Vanishing Rule (FIFO)" 
            content="You can only have 3 emojis on the board at a time! When you place your 4th emoji, your oldest emoji (First In) disappears from the board (First Out)."
            emoji="👻"
          />
          
          <RuleSection 
            title="Taking Turns" 
            content="Players alternate turns. On your turn, click any empty cell to place your current emoji."
            emoji="🔄"
          />
          
          <RuleSection 
            title="Winning" 
            content="Get 3 of your emojis in a line to win! Your score increases and you can play again to continue the competition."
            emoji="🏆"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary w-full mt-6"
          onClick={onClose}
        >
          Got it!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const RuleSection = ({ title, content, emoji }) => {
  return (
    <div className="bg-purple-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-semibold text-purple-800">{title}</h3>
      </div>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default RulesModal;