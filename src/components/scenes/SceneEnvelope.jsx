import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SceneEnvelope = ({ onNext }) => {
  const [envelopeGlowing, setEnvelopeGlowing] = useState(false);

  const openFinalMessage = () => {
    setEnvelopeGlowing(true);
    setTimeout(() => onNext(), 2000);
  };

  const fallingPetals = Array.from({ length: 12 }, (_, i) => i);
  const bannerMessages = [
    'I\'m sorry',
    'I miss you', 
    'For Pookie',
    'Always yours',
    'My Happiness',
    'Forever'
  ];

  return (
    <div className="scene-container" style={{ background: 'linear-gradient(135deg, #ffb6c1, #fff8dc)' }}>
      {/* Falling Petals */}
      {fallingPetals.map((i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-pookie-rose rounded-full opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`
          }}
          animate={{
            y: [-100, 800],
            x: [0, Math.sin(i) * 50],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.7, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.7
          }}
        />
      ))}

      {/* Bokeh Lights */}
      {Array.from({ length: 15 }, (_, i) => (
        <motion.div
          key={`bokeh-${i}`}
          className="absolute rounded-full bg-white opacity-20 blur-xl"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
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
          Final Message for Pookie
        </motion.h1>

        {/* Central Envelope */}
        <motion.div
          className="relative mb-8 sm:mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className={`w-32 h-24 sm:w-40 sm:h-30 md:w-48 md:h-36 bg-pookie-cream border-4 border-pookie-gold rounded-lg shadow-2xl relative ${
              envelopeGlowing ? 'animate-pulse-glow' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={openFinalMessage}
          >
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-pookie-cream border-4 border-pookie-gold border-b-0 rounded-t-lg transform origin-top">
              <motion.div
                animate={{ rotateY: envelopeGlowing ? 180 : 0 }}
                transition={{ duration: 1 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-full h-full bg-pookie-cream rounded-t-lg"></div>
              </motion.div>
            </div>

            {/* Golden light from inside */}
            {envelopeGlowing && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-yellow-200 to-pookie-gold opacity-60 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.8] }}
                transition={{ duration: 2 }}
              />
            )}

            {/* Heart inside */}
            {envelopeGlowing && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 1.5 }}
              >
                <span className="text-4xl sm:text-5xl md:text-6xl">💖</span>
              </motion.div>
            )}

            {/* "To my Happiness" watermark */}
            <div className="absolute bottom-2 right-2 text-xs text-pookie-indigo opacity-50 font-handwritten">
              To my Happiness
            </div>
          </motion.div>
        </motion.div>

        {/* Teddy Bears and Cats with Banners */}
        <motion.div
          className="relative w-full max-w-4xl h-48 sm:h-64 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Left Teddy with Banner */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            animate={{ y: ['-50%', '-55%', '-50%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-600 rounded-full">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full"></div>
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pookie-pink text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                {bannerMessages[0]}
              </div>
            </div>
          </motion.div>

          {/* Right Teddy with Banner */}
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            animate={{ y: ['-50%', '-45%', '-50%'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-600 rounded-full">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full"></div>
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pookie-gold text-pookie-indigo text-xs px-2 py-1 rounded-full whitespace-nowrap">
                {bannerMessages[1]}
              </div>
            </div>
          </motion.div>

          {/* Cats with Banners */}
          {bannerMessages.slice(2, 5).map((message, index) => (
            <motion.div
              key={`cat-${index}`}
              className="absolute"
              style={{
                bottom: `${index * 20}px`,
                left: `${25 + index * 15}%`
              }}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2 + index * 0.5,
                repeat: Infinity
              }}
            >
              <div className="relative">
                <div className="w-12 h-10 sm:w-14 sm:h-12 bg-white rounded-full">
                  <div className="absolute -top-2 left-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white sm:border-l-6 sm:border-r-6 sm:border-b-6"></div>
                  <div className="absolute -top-2 right-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white sm:border-l-6 sm:border-r-6 sm:border-b-6"></div>
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-pookie-indigo text-xs px-2 py-0.5 rounded whitespace-nowrap">
                  {message}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Messages */}
        <motion.div
          className="text-center mb-8 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-pookie-indigo text-lg sm:text-xl mb-3 font-medium">
            Pookie, I really love you.
          </p>
          <p className="text-pookie-storm text-lg sm:text-xl mb-3 font-handwritten">
            Happiness, I want you back in my life.
          </p>
          <p className="text-pookie-indigo text-base sm:text-lg mb-3 italic">
            Even if you're hurt or angry, I just want you to talk to me once.
          </p>
          <p className="text-pookie-gold text-base sm:text-lg font-bold">
            You are my everything, always.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button
          onClick={openFinalMessage}
          className="pookie-button bg-pookie-gold text-pookie-indigo px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tap to answer me 💖
        </motion.button>
      </div>
    </div>
  );
};

export default SceneEnvelope;
