import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SceneJourney = ({ onNext }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

  const phases = [
    {
      name: 'fight',
      title: 'Fight',
      background: 'linear-gradient(to bottom, #708090, #4a5568)',
      text: 'We fought, and I know I hurt you, Pookie.',
      elements: {
        teddies: {
          left: { transform: 'translateX(-20px) rotate(-15deg)', expression: 'angry' },
          right: { transform: 'translateX(20px) rotate(15deg)', expression: 'angry' }
        },
        weather: 'storm',
        cat: { position: 'middle', mood: 'sad' }
      }
    },
    {
      name: 'regret',
      title: 'Regret',
      background: 'linear-gradient(to bottom, #4a5568, #2d3748)',
      text: 'Happiness, I realized how much you mean to me.',
      elements: {
        teddies: {
          left: { transform: 'translateX(-100px)', expression: 'sad' },
          right: { display: 'none' }
        },
        weather: 'rain',
        cat: { position: 'near-left', mood: 'caring', item: 'umbrella' }
      }
    },
    {
      name: 'revival',
      title: 'Revival',
      background: 'linear-gradient(to bottom, #87ceeb, #98ff98)',
      text: 'All I want is a chance to make our love stronger.',
      elements: {
        teddies: {
          left: { transform: 'translateX(0)', expression: 'happy' },
          right: { transform: 'translateX(0)', expression: 'happy' }
        },
        weather: 'rainbow',
        cat: { position: 'jumping', mood: 'happy' }
      }
    }
  ];

  const nextPhase = () => {
    if (currentPhase < phases.length - 1) {
      setCurrentPhase(prev => prev + 1);
      setShowNextButton(false);
      setTimeout(() => setShowNextButton(true), 2000);
    } else {
      onNext();
    }
  };

  React.useEffect(() => {
    setTimeout(() => setShowNextButton(true), 2000);
  }, []);

  const currentPhaseData = phases[currentPhase];

  const renderWeather = () => {
    switch (currentPhaseData.elements.weather) {
      case 'storm':
        return (
          <motion.div
            className="absolute top-8 left-1/2 transform -translate-x-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.div
                className="w-16 h-12 sm:w-20 sm:h-16 bg-gray-700 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-400"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        );
      
      case 'rain':
        return (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }, (_, i) => (
              <motion.div
                key={`rain-${i}`}
                className="absolute w-0.5 h-8 bg-blue-300 opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-20px'
                }}
                animate={{
                  y: [0, 800]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        );
      
      case 'rainbow':
        return (
          <motion.div
            className="absolute top-12 left-1/2 transform -translate-x-1/2"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            <svg className="w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40" viewBox="0 0 200 100">
              <path
                d="M 0 100 Q 100 0 200 100"
                fill="none"
                stroke="rgba(255,0,0,0.6)"
                strokeWidth="8"
              />
              <path
                d="M 0 95 Q 100 -5 200 95"
                fill="none"
                stroke="rgba(255,165,0,0.6)"
                strokeWidth="8"
              />
              <path
                d="M 0 90 Q 100 -10 200 90"
                fill="none"
                stroke="rgba(255,255,0,0.6)"
                strokeWidth="8"
              />
              <path
                d="M 0 85 Q 100 -15 200 85"
                fill="none"
                stroke="rgba(0,255,0,0.6)"
                strokeWidth="8"
              />
              <path
                d="M 0 80 Q 100 -20 200 80"
                fill="none"
                stroke="rgba(0,0,255,0.6)"
                strokeWidth="8"
              />
              <path
                d="M 0 75 Q 100 -25 200 75"
                fill="none"
                stroke="rgba(75,0,130,0.6)"
                strokeWidth="8"
              />
            </svg>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  const renderTeddyBear = (side, config) => {
    if (config.display === 'none') return null;

    const baseClasses = "absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-yellow-600 rounded-full transition-all duration-1000";
    const positionClasses = side === 'left' ? 'left-1/2 transform -translate-x-1/2' : 'right-1/2 transform translate-x-1/2';

    return (
      <motion.div
        className={`${baseClasses} ${positionClasses}`}
        style={{ transform: config.transform }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Teddy ears */}
        <div className="absolute -top-3 left-3 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-600 rounded-full"></div>
        <div className="absolute -top-3 right-3 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-600 rounded-full"></div>
        
        {/* Teddy face */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
            config.expression === 'angry' ? 'bg-red-500' : 
            config.expression === 'sad' ? 'bg-blue-500' : 'bg-black'
          }`}></div>
          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
            config.expression === 'angry' ? 'bg-red-500' : 
            config.expression === 'sad' ? 'bg-blue-500' : 'bg-black'
          }`}></div>
        </div>
        
        {/* Teddy mouth */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
          {config.expression === 'angry' && (
            <div className="w-6 h-1 border-b-2 border-red-500 rounded-full"></div>
          )}
          {config.expression === 'sad' && (
            <motion.div
              className="w-6 h-3 border-b-2 border-blue-500 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {config.expression === 'happy' && (
            <motion.div
              className="w-8 h-4 border-b-4 border-black rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>
    );
  };

  const renderCat = (config) => {
    const getPositionClasses = () => {
      switch (config.position) {
        case 'middle':
          return 'bottom-0 left-1/2 transform -translate-x-1/2';
        case 'near-left':
          return 'bottom-0 left-1/3 transform -translate-x-1/2';
        case 'jumping':
          return 'bottom-0 left-1/2 transform -translate-x-1/2';
        default:
          return 'bottom-0 left-1/2 transform -translate-x-1/2';
      }
    };

    return (
      <motion.div
        className={`absolute w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-16 bg-white rounded-full ${getPositionClasses()}`}
        animate={{
          y: config.position === 'jumping' ? [-20, -40, -20] : 0
        }}
        transition={{
          duration: 1,
          repeat: config.position === 'jumping' ? Infinity : 0
        }}
      >
        {/* Cat ears */}
        <div className="absolute -top-2 left-2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white sm:border-l-8 sm:border-r-8 sm:border-b-8"></div>
        <div className="absolute -top-2 right-2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white sm:border-l-8 sm:border-r-8 sm:border-b-8"></div>
        
        {/* Cat face */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
          <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
        </div>
        
        {/* Umbrella for regret phase */}
        {config.item === 'umbrella' && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-4 sm:w-10 sm:h-5 bg-red-500 rounded-t-full"></div>
            <div className="w-0.5 h-6 sm:h-8 bg-gray-600 mx-auto"></div>
          </div>
        )}
        
        {/* Pink bow */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-1.5 sm:w-4 sm:h-2 bg-pookie-pink rounded"></div>
      </motion.div>
    );
  };

  return (
    <div className="scene-container transition-all duration-1000" style={{ background: currentPhaseData.background }}>
      {/* Weather Effects */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhaseData.elements.weather}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {renderWeather()}
        </motion.div>
      </AnimatePresence>

      {/* City Lights for Regret Phase */}
      {currentPhase === 1 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={`light-${i}`}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full blur-sm"
              style={{
                bottom: `${Math.random() * 30}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Phase Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-elegant text-white mb-6 text-center"
          key={currentPhaseData.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {currentPhaseData.title}
        </motion.h1>

        {/* Characters Container */}
        <motion.div
          className="relative h-48 sm:h-64 md:h-80 w-full max-w-2xl mb-8"
          key={`characters-${currentPhase}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {renderTeddyBear('left', currentPhaseData.elements.teddies.left)}
          {renderTeddyBear('right', currentPhaseData.elements.teddies.right)}
          {renderCat(currentPhaseData.elements.cat)}

          {/* Hearts for Revival Phase */}
          {currentPhase === 2 && (
            <>
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-pookie-pink"
                  style={{
                    top: `${20 + Math.random() * 40}%`,
                    left: `${10 + Math.random() * 80}%`
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        {/* Phase Text */}
        <motion.div
          className="text-center mb-8 max-w-md"
          key={`text-${currentPhase}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-white text-lg sm:text-xl md:text-2xl font-medium">
            {currentPhaseData.text}
          </p>
        </motion.div>

        {/* Navigation Button */}
        <AnimatePresence>
          {showNextButton && (
            <motion.button
              key={`button-${currentPhase}`}
              onClick={nextPhase}
              className="pookie-button bg-white text-gray-800 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentPhase < phases.length - 1 ? 'Continue Journey →' : 'Tap to feel what I feel 🎧'}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Phase Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentPhase 
                  ? 'bg-white w-8' 
                  : index < currentPhase 
                    ? 'bg-white bg-opacity-60' 
                    : 'bg-white bg-opacity-30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SceneJourney;
