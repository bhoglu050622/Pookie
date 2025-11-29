import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SceneIntro = ({ onNext }) => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const openEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => onNext(), 1500);
  };

  return (
    <div className="scene-container" style={{ background: 'linear-gradient(to bottom, #1a1a3e, #0f0f2e)' }}>
      {/* Stars */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute top-8 right-8 sm:top-12 sm:right-12 w-16 h-16 sm:w-20 sm:h-20 bg-yellow-100 rounded-full"
        animate={{
          boxShadow: [
            '0 0 20px rgba(255, 255, 224, 0.5)',
            '0 0 40px rgba(255, 255, 224, 0.8)',
            '0 0 20px rgba(255, 255, 224, 0.5)'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      />

      {/* Floating Hearts */}
      {Array.from({ length: 6 }, (_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pookie-pink"
          style={{
            bottom: '-50px',
            left: `${20 + i * 12}%`,
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(i) * 30],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.8
          }}
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant text-white mb-4 text-center glow-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          For Pookie
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-pookie-pink mb-8 text-center font-handwritten"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          To my Happiness
        </motion.p>

        {/* Teddy Bear and Cat with Envelope */}
        <motion.div
          className="relative mb-8 sm:mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Teddy Bear */}
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-yellow-600 rounded-full mx-auto"
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
          >
            {/* Teddy ears */}
            <div className="absolute -top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full"></div>
            <div className="absolute -top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full"></div>
            
            {/* Teddy face */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-black rounded-full"></div>

            {/* Envelope */}
            <AnimatePresence>
              {!envelopeOpen && (
                <motion.div
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-12 h-8 sm:w-16 sm:h-10 bg-pookie-cream border-2 border-pookie-gold rounded shadow-lg"
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-xs sm:text-sm text-center mt-1 font-bold text-pookie-indigo">
                    For Pookie
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Opened envelope animation */}
            <AnimatePresence>
              {envelopeOpen && (
                <motion.div
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <div className="w-16 h-12 sm:w-20 sm:h-16 bg-pookie-cream border-2 border-pookie-gold rounded shadow-lg transform rotate-12">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-2xl sm:text-3xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: 2 }}
                      >
                        💖
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cat */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 sm:w-20 sm:h-16 bg-white rounded-full"
            animate={{
              x: [0, 5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            {/* Cat ears */}
            <div className="absolute -top-2 left-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white sm:border-l-10 sm:border-r-10 sm:border-b-10"></div>
            <div className="absolute -top-2 right-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white sm:border-l-10 sm:border-r-10 sm:border-b-10"></div>
            
            {/* Cat face */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Pink bow */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 sm:w-6 sm:h-3 bg-pookie-pink rounded"></div>
          </motion.div>
        </motion.div>

        {/* Message Text */}
        <motion.div
          className="text-center mb-8 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-white text-base sm:text-lg mb-2">
            Pookie, this is just for you.
          </p>
          <p className="text-pookie-pink text-base sm:text-lg font-handwritten">
            Happiness, I'm really, really sorry.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={openEnvelope}
          className="pookie-button bg-pookie-gold text-pookie-indigo px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tap to open my heart 💌
        </motion.button>
      </div>
    </div>
  );
};

export default SceneIntro;
