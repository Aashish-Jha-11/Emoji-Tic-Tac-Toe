import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cell = ({ index, value, onClick, isWinningCell }) => {
  const cellVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  };

  const winningVariants = {
    initial: { backgroundColor: 'rgba(167, 243, 208, 0)' },
    animate: { 
      backgroundColor: 'rgba(167, 243, 208, 0.6)',
      transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }
    }
  };

  return (
    <motion.div
      className={`emoji-cell aspect-square ${value ? 'emoji-cell-filled' : 'emoji-cell-empty'} ${
        isWinningCell ? 'emoji-cell-winner' : ''
      }`}
      onClick={onClick}
      whileHover={!value ? { scale: 1.05, backgroundColor: '#F3E8FF' } : {}}
      whileTap={!value ? { scale: 0.95 } : {}}
      variants={isWinningCell ? winningVariants : {}}
      animate={isWinningCell ? 'animate' : undefined}
      initial={isWinningCell ? 'initial' : undefined}
    >
      <AnimatePresence mode="wait">
        {value && (
          <motion.div
            key={`${index}-${value.emoji}-${value.moveIndex}`}
            className="text-4xl md:text-5xl"
            variants={cellVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {value.emoji}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cell;