import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { songs } from '../../config/scenes';

const SceneMusic = ({ onNext }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstInteraction, setFirstInteraction] = useState(true);
  const iframeRef = useRef(null);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsPlaying(true);
    if (firstInteraction) {
      setFirstInteraction(false);
    }
  };

  const getEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&showinfo=0&controls=1&modestbranding=1`;
  };

  useEffect(() => {
    // Pause video when switching songs
    if (iframeRef.current && selectedSong) {
      const iframe = iframeRef.current;
      iframe.src = getEmbedUrl(selectedSong.watchUrl);
    }
  }, [selectedSong]);

  return (
    <div className="scene-container" style={{ background: 'linear-gradient(135deg, #98ff98, #e6e6fa)' }}>
      {/* Musical Notes Animation */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-pookie-indigo opacity-30"
          style={{
            bottom: '-50px',
            left: `${10 + i * 12}%`,
            fontSize: `${20 + Math.random() * 10}px`
          }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(i) * 20],
            opacity: [0, 0.3, 0.3, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 1.5
          }}
        >
          ♪
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 w-full max-w-6xl mx-auto">
        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-elegant text-pookie-indigo mb-4 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Play My Feelings for Pookie
        </motion.h1>

        {/* Teddy with Headphones */}
        <motion.div
          className="relative mb-6 sm:mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-yellow-600 rounded-full mx-auto">
            {/* Teddy ears */}
            <div className="absolute -top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full"></div>
            <div className="absolute -top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-600 rounded-full"></div>
            
            {/* Headphones */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 sm:w-32 sm:h-8 bg-pookie-indigo rounded-full"></div>
            <div className="absolute top-4 left-0 w-4 h-8 sm:w-6 sm:h-10 bg-pookie-indigo rounded-full"></div>
            <div className="absolute top-4 right-0 w-4 h-8 sm:w-6 sm:h-10 bg-pookie-indigo rounded-full"></div>
            
            {/* Teddy face */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-black rounded-full"></div>

            {/* Happy expression */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-black rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Cat with Phone */}
          <motion.div
            className="absolute -bottom-4 right-1/4 transform translate-x-1/2"
            animate={{
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            <div className="relative">
              <div className="w-12 h-10 sm:w-16 sm:h-12 bg-white rounded-full">
                {/* Cat ears */}
                <div className="absolute -top-2 left-2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white sm:border-l-8 sm:border-r-8 sm:border-b-8"></div>
                <div className="absolute -top-2 right-2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-white sm:border-l-8 sm:border-r-8 sm:border-b-8"></div>
                
                {/* Cat face */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Phone with heart */}
              <div className="absolute -right-8 top-0 w-6 h-10 sm:w-8 sm:h-12 bg-gray-800 rounded-lg">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-pookie-pink text-xs sm:text-sm">
                  💖
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Introductory Text */}
        <motion.div
          className="text-center mb-6 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-pookie-indigo text-sm sm:text-base mb-2">
            These songs remind me of you, Pookie.
          </p>
          <p className="text-pookie-storm text-sm sm:text-base mb-2 font-handwritten">
            Each one holds a piece of my heart, Happiness.
          </p>
          <p className="text-pookie-indigo text-sm sm:text-base italic">
            Listen to what I can't put into words.
          </p>
        </motion.div>

        {/* YouTube Player */}
        <AnimatePresence>
          {selectedSong && (
            <motion.div
              className="w-full max-w-3xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 border border-white border-opacity-20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-pookie-indigo font-bold text-lg sm:text-xl">
                      {selectedSong.title}
                    </h3>
                    <p className="text-pookie-storm text-sm sm:text-base">
                      {selectedSong.artist} • {selectedSong.language}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSong(null)}
                    className="text-white hover:text-pookie-pink transition-colors"
                    aria-label="Close player"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* YouTube Iframe */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    ref={iframeRef}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={getEmbedUrl(selectedSong.watchUrl)}
                    title={selectedSong.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Song Playlist */}
        <motion.div
          className="w-full max-w-3xl max-h-96 overflow-y-auto custom-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="grid gap-3 sm:gap-4">
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                className={`song-card ${
                  selectedSong?.id === song.id 
                    ? 'bg-pookie-gold bg-opacity-30 border-pookie-gold' 
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
                onClick={() => handleSongSelect(song)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="text-2xl sm:text-3xl">
                      {song.language === 'Hindi' ? '🎵' : '🎶'}
                    </div>
                    <div>
                      <h4 className="text-pookie-indigo font-bold text-sm sm:text-base">
                        {song.title}
                      </h4>
                      <p className="text-pookie-storm text-xs sm:text-sm">
                        {song.artist}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          {song.language}
                        </span>
                        {selectedSong?.id === song.id && (
                          <span className="text-xs text-pookie-gold font-medium">
                            ▶️ Playing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-pookie-indigo opacity-60">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skip Button */}
        <motion.button
          onClick={onNext}
          className="mt-6 px-4 py-2 sm:px-6 sm:py-3 text-pookie-indigo text-sm sm:text-base font-medium underline hover:no-underline transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          Skip songs, read my heart
        </motion.button>
      </div>
    </div>
  );
};

export default SceneMusic;
