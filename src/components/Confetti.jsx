import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Confetti = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const colors = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];
    const newParticles = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
          initial={{ 
            y: particle.y, 
            x: particle.x,
            rotate: particle.rotation
          }}
          animate={{ 
            y: '120%',
            x: [
              particle.x - 10, 
              particle.x + 10, 
              particle.x - 5, 
              particle.x + 5, 
              particle.x
            ],
            rotate: particle.rotation + 360
          }}
          transition={{ 
            duration: 2.5 + Math.random() * 2,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;