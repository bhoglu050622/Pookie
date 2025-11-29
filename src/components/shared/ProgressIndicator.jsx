import React from 'react';
import { motion } from 'framer-motion';

const ProgressIndicator = ({ current, total, onSceneClick }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
        {Array.from({ length: total }, (_, index) => (
          <motion.button
            key={index}
            onClick={() => onSceneClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? 'bg-pookie-gold scale-125' 
                : index < current 
                  ? 'bg-white bg-opacity-60' 
                  : 'bg-white bg-opacity-30 hover:bg-opacity-50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to scene ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
