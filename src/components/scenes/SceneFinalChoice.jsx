import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SceneFinalChoice = ({ onChoice, choice, showConfirmation, onConfirm }) => {
  const handleChoice = (selectedChoice) => {
    onChoice(selectedChoice);
  };

  const renderCelebration = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Confetti */}
      {Array.from({ length: 30 }, (_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute w-2 h-3 sm:w-3 sm:h-4"
          style={{
            backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c'][i % 7],
            left: `${Math.random() * 100}%`,
            top: '-20px'
          }}
          animate={{
            y: [0, 800],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Floating Hearts */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pookie-pink"
          style={{
            bottom: '-50px',
            left: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(i) * 30],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </motion.div>
      ))}

      {/* Celebrating Teddies */}
      <motion.div
        className="absolute bottom-20 left-1/4 transform -translate-x-1/2"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-600 rounded-full relative">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 border-b-4 border-black rounded-full"></div>
          {/* Party hat */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-pookie-pink"></div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-1/4 transform translate-x-1/2"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-600 rounded-full relative">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 border-b-4 border-black rounded-full"></div>
          {/* Party hat */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-pookie-gold"></div>
        </div>
      </motion.div>

      {/* Happy Cat */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, -50, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-12 h-10 sm:w-16 sm:h-12 bg-white rounded-full relative">
          <div className="absolute -top-2 left-2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white sm:border-l-8 sm:border-r-8 sm:border-b-8"></div>
          <div className="absolute -top-2 right-2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white sm:border-l-8 sm:border-r-8 sm:border-b-8"></div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-2 border-b-2 border-black rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );

  const renderFarewell = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Sunset colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-200 via-pink-200 to-purple-200 opacity-30"></div>

      {/* Walking away animation */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
        animate={{ x: [-200, 200] }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      >
        <div className="flex items-center space-x-2">
          {/* Teddy with letter */}
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-600 rounded-full">
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-2 border-b-2 border-gray-600 rounded-full"></div>
            </div>
            {/* Letter being placed */}
            <motion.div
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-pookie-cream border border-pookie-gold rounded"
              animate={{ y: [0, 20, 20] }}
              transition={{ duration: 5, ease: 'easeInOut' }}
            />
          </div>

          {/* Cat following */}
          <motion.div
            className="w-10 h-8 sm:w-12 sm:h-10 bg-white rounded-full"
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="absolute -top-2 left-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white sm:border-l-6 sm:border-r-6 sm:border-b-6"></div>
            <div className="absolute -top-2 right-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white sm:border-l-6 sm:border-r-6 sm:border-b-6"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Gentle falling petals */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-3 h-3 bg-pookie-rose rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }}
          animate={{
            y: [0, 800],
            x: [0, Math.sin(i) * 20],
            opacity: [0, 0.5, 0.5, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="scene-container" style={{ background: 'linear-gradient(to bottom, #87ceeb, #ffffff)' }}>
      {/* Background Effects */}
      <AnimatePresence>
        {choice === 'up' && renderCelebration()}
        {choice === 'down' && renderFarewell()}
      </AnimatePresence>

      {/* Soft clouds */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute bg-white rounded-full opacity-60"
          style={{
            width: `${60 + Math.random() * 40}px`,
            height: `${30 + Math.random() * 20}px`,
            top: `${10 + Math.random() * 30}%`,
            left: `${Math.random() * 100}%`
          }}
          animate={{
            x: [0, 30, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant text-pookie-indigo mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Will you give me a chance?
        </motion.h1>

        {/* Choice Questions */}
        <motion.div
          className="text-center mb-12 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-pookie-indigo text-lg sm:text-xl mb-4 font-medium">
            Pookie, will you give him a chance?
          </p>
          <p className="text-pookie-storm text-lg sm:text-xl font-handwritten">
            Happiness, will you let me try to make things right?
          </p>
        </motion.div>

        {/* Choice Buttons */}
        <AnimatePresence>
          {choice === 'none' && (
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.button
                onClick={() => handleChoice('up')}
                className="choice-button bg-green-500 hover:bg-green-600 text-white shadow-green-300 focus:ring-green-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl sm:text-4xl mr-3">👍</span>
                <span className="text-lg sm:text-xl">Yes, I'll give you a chance</span>
              </motion.button>

              <motion.button
                onClick={() => handleChoice('down')}
                className="choice-button bg-red-500 hover:bg-red-600 text-white shadow-red-300 focus:ring-red-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl sm:text-4xl mr-3">👎</span>
                <span className="text-lg sm:text-xl">No, I can't</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {choice === 'up' && (
            <motion.div
              className="text-center max-w-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-6 sm:p-8 border-2 border-pookie-gold">
                <h2 className="text-2xl sm:text-3xl font-bold text-pookie-indigo mb-4">
                  Thank you, Pookie! 💖
                </h2>
                <p className="text-lg sm:text-xl text-pookie-indigo mb-2">
                  I won't let you down, Happiness!
                </p>
                <p className="text-base sm:text-lg text-pookie-storm font-handwritten">
                  This means everything to me.
                </p>
                <div className="mt-6 text-4xl sm:text-5xl animate-bounce">
                  🎉🥰💕
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Popup */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg p-6 sm:p-8 max-w-sm w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg sm:text-xl font-bold text-pookie-indigo mb-4 text-center">
                  Are you sure?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
                  I truly care about you, Pookie, and I'm really sorry.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => onConfirm(true)}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => onConfirm(false)}
                    className="flex-1 px-4 py-2 bg-pookie-lavender hover:bg-pookie-lavender-80 text-pookie-indigo rounded-lg font-medium transition-colors"
                  >
                    Let me think again
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Farewell Message */}
        <AnimatePresence>
          {choice === 'down' && !showConfirmation && (
            <motion.div
              className="text-center max-w-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
                  I understand
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-4">
                  I wish you all the happiness in the world, my Happiness.
                </p>
                <p className="text-base sm:text-lg text-gray-500 italic">
                  Always caring about you,
                </p>
                <p className="text-lg sm:text-xl text-gray-600 font-handwritten mt-2">
                  Forever yours
                </p>
                <div className="mt-6 text-3xl sm:text-4xl opacity-60">
                  🌅💙
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SceneFinalChoice;
