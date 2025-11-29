import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SceneApology = ({ onNext }) => {
  const [memoriesVisible, setMemoriesVisible] = useState(false);

  const showMemories = () => {
    setMemoriesVisible(true);
    setTimeout(() => onNext(), 2000);
  };

  const memoryImages = [
    { emoji: '👫', label: 'Together' },
    { emoji: '🧸', label: 'Teddy Love' },
    { emoji: '🐱', label: 'Cat Cuddles' },
    { emoji: '💕', label: 'Hearts' },
    { emoji: '🌟', label: 'Magic Moments' },
    { emoji: '🎈', label: 'Happy Times' },
    { emoji: '🌙', label: 'Night Dreams' },
    { emoji: '☀️', label: 'Sunny Days' }
  ];

  return (
    <div className="scene-container" style={{ background: 'linear-gradient(135deg, #ffdab9, #e6e6fa)' }}>
      {/* Sunset Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Sun rays */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute top-1/4 left-1/2 w-2 h-64 bg-gradient-to-b from-yellow-200 to-transparent opacity-30"
            style={{
              transformOrigin: 'top center',
              transform: `translateX(-50%) rotate(${i * 45 - 90}deg)`
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>

      {/* Memory Bubbles */}
      {memoriesVisible && memoryImages.map((memory, index) => (
        <motion.div
          key={`memory-${index}`}
          className="memory-bubble w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center"
          style={{
            top: `${20 + (index % 3) * 25}%`,
            left: `${10 + (index % 4) * 20}%`,
            animationDelay: `${index * 0.2}s`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 1,
            delay: index * 0.2,
            y: { duration: 3, repeat: Infinity },
            rotate: { duration: 4, repeat: Infinity }
          }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl">{memory.emoji}</span>
          <span className="text-xs sm:text-xs mt-1 text-pookie-indigo font-medium">
            {memory.label}
          </span>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant text-pookie-indigo mb-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          I'm sorry, I want you back
        </motion.h1>

        {/* Teddy and Cat looking at memories */}
        <motion.div
          className="relative mb-8 sm:mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Teddy Bear */}
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-yellow-600 rounded-full mx-auto"
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            {/* Teddy ears */}
            <div className="absolute -top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full"></div>
            <div className="absolute -top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full"></div>
            
            {/* Teddy face - looking up */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-black rounded-full"></div>

            {/* Sad expression */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-2 border-b-2 border-black rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Cat */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 sm:w-20 sm:h-16 bg-white rounded-full"
            animate={{
              y: [0, -3, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity
            }}
          >
            {/* Cat ears */}
            <div className="absolute -top-2 left-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white sm:border-l-10 sm:border-r-10 sm:border-b-10"></div>
            <div className="absolute -top-2 right-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white sm:border-l-10 sm:border-r-10 sm:border-b-10"></div>
            
            {/* Cat face - looking up */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Pink bow */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 sm:w-6 sm:h-3 bg-pookie-pink rounded"></div>
          </motion.div>
        </motion.div>

        {/* Apology Messages */}
        <motion.div
          className="text-center mb-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-pookie-indigo text-base sm:text-lg mb-3 font-medium">
            Pookie, I'm very sorry for hurting you.
          </p>
          <p className="text-pookie-storm text-base sm:text-lg mb-3 font-handwritten">
            Happiness, everything feels empty without you.
          </p>
          <p className="text-pookie-indigo text-base sm:text-lg italic">
            Every moment without you hurts.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={showMemories}
          className="pookie-button bg-pookie-lavender text-pookie-indigo px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tap to see our journey 💫
        </motion.button>
      </div>
    </div>
  );
};

export default SceneApology;
