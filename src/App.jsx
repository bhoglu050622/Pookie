import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOrCreateSession, trackSlideView, trackSongPlayed, trackFinalAnswer } from './services/tracking';

// ============================================
// PREMIUM ANIMATION SYSTEM
// ============================================
const ease = {
  gentle: [0.25, 0.1, 0.25, 1],
  smooth: [0.43, 0.13, 0.23, 0.96],
  cinematic: [0.16, 1, 0.3, 1],
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: ease.gentle },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, delay, ease: ease.gentle },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: ease.smooth },
  }),
};

// ============================================
// SLIDE CONFIGURATION
// ============================================
const slides = [
  {
    id: 'hero',
    title: 'For My Pookie',
    subtitle: 'A message written with love, meant only for you',
    cta: 'Open My Heart',
  },
  {
    id: 'apology',
    title: "I'm Truly Sorry",
    subtitle: 'These words come from the deepest part of my heart',
    message: 'I know I hurt you, and nothing I say can undo that pain. But I want you to know that every moment since has been filled with regret. You deserve so much better, and I promise to be that person.',
  },
  {
    id: 'memories',
    title: 'Our Beautiful Moments',
    subtitle: 'The memories I hold closest to my heart',
    memories: [
      { icon: '💫', text: 'The first time you smiled at me' },
      { icon: '🌙', text: 'Our late night conversations' },
      { icon: '☀️', text: 'Lazy Sunday mornings together' },
      { icon: '💕', text: 'The way you make everything better' },
    ],
  },
  {
    id: 'promise',
    title: 'My Promise to You',
    subtitle: 'From this moment forward, I vow...',
    promises: [
      'To listen with my whole heart',
      'To cherish every moment we share',
      'To be patient and understanding',
      'To love you more each day',
    ],
  },
  {
    id: 'music',
    title: 'Songs That Speak My Heart',
    subtitle: 'Every lyric reminds me of you',
  },
  {
    id: 'final',
    title: 'Will You Give Us Another Chance?',
    subtitle: 'My happiness begins and ends with you',
  },
];

const songs = [
  { title: 'Perfect', artist: 'Ed Sheeran', videoId: '2Vv-BfVoq4g' },
  { title: 'All of Me', artist: 'John Legend', videoId: '450p7goxZqg' },
  { title: 'Tum Hi Ho', artist: 'Arijit Singh', videoId: 'IJq0yyWug1k' },
  { title: 'Tera Ban Jaunga', artist: 'Akhil Sachdeva', videoId: 'ue8dS4qLOZ0' },
  { title: 'Thinking Out Loud', artist: 'Ed Sheeran', videoId: 'lp-EO5I60KA' },
  { title: 'Raabta', artist: 'Arijit Singh', videoId: 'uPVX-J3RlGs' },
];

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Floating particles background
const ParticleField = ({ count = 30, color = 'white' }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-1 h-1 rounded-full bg-${color} opacity-20`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 4,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// Gradient orb for ambient lighting
const GradientOrb = ({ className, color1, color2, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
    style={{
      background: `radial-gradient(circle, ${color1}, ${color2})`,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.35, 0.2],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

// Progress indicator
const ProgressBar = ({ current, total }) => (
  <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
    <motion.div
      className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400"
      initial={{ width: 0 }}
      animate={{ width: `${((current + 1) / total) * 100}%` }}
      transition={{ duration: 0.8, ease: ease.smooth }}
    />
  </div>
);

// Navigation dots
const NavDots = ({ current, total, onNavigate }) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onNavigate(i)}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
          i === current
            ? 'bg-white scale-125'
            : 'bg-white/30 hover:bg-white/50'
        }`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
);

// Premium button component
const PremiumButton = ({ children, onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-white text-slate-900 hover:bg-white/90',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
    success: 'bg-emerald-500 text-white hover:bg-emerald-400',
    danger: 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

// Card component
const Card = ({ children, className = '', delay = 0 }) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    animate="visible"
    custom={delay}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}
  >
    {children}
  </motion.div>
);

// ============================================
// SLIDE COMPONENTS
// ============================================

const HeroSlide = ({ slide, onNext }) => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <GradientOrb className="w-96 h-96 -top-48 -left-48" color1="#f43f5e" color2="transparent" />
    <GradientOrb className="w-96 h-96 -bottom-48 -right-48" color1="#ec4899" color2="transparent" delay={2} />
    <ParticleField count={40} />
    
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
        className="mb-8"
      >
        <span className="text-6xl">💝</span>
      </motion.div>
      
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight"
      >
        {slide.title}
      </motion.h1>
      
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
        className="text-xl sm:text-2xl text-white/60 mb-12 font-light max-w-2xl mx-auto"
      >
        {slide.subtitle}
      </motion.p>
      
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.9}
      >
        <PremiumButton onClick={onNext}>
          {slide.cta}
          <span className="ml-2">→</span>
        </PremiumButton>
      </motion.div>
    </div>
  </div>
);

const ApologySlide = ({ slide, onNext }) => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950">
    <GradientOrb className="w-[500px] h-[500px] top-1/4 left-1/4" color1="#3b82f6" color2="transparent" />
    <ParticleField count={25} />
    
    <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4"
      >
        {slide.title}
      </motion.h2>
      
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="text-lg text-white/50 mb-12"
      >
        {slide.subtitle}
      </motion.p>
      
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.4}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 mb-12"
      >
        <p className="text-xl sm:text-2xl text-white/80 font-light leading-relaxed">
          "{slide.message}"
        </p>
      </motion.div>
      
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
      >
        <PremiumButton onClick={onNext} variant="secondary">
          Continue
        </PremiumButton>
      </motion.div>
    </div>
  </div>
);

const MemoriesSlide = ({ slide, onNext }) => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-amber-950/30 to-slate-950">
    <GradientOrb className="w-[400px] h-[400px] top-0 right-0" color1="#f59e0b" color2="transparent" />
    <GradientOrb className="w-[300px] h-[300px] bottom-0 left-0" color1="#fbbf24" color2="transparent" delay={3} />
    <ParticleField count={20} />
    
    <div className="relative z-10 px-6 max-w-4xl mx-auto w-full">
      <motion.div className="text-center mb-12">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-lg text-white/50"
        >
          {slide.subtitle}
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {slide.memories.map((memory, i) => (
          <Card key={i} delay={0.3 + i * 0.15}>
            <div className="flex items-center gap-4">
              <span className="text-3xl">{memory.icon}</span>
              <p className="text-white/80 text-lg">{memory.text}</p>
            </div>
          </Card>
        ))}
      </div>
      
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="text-center"
      >
        <PremiumButton onClick={onNext} variant="secondary">
          Continue
        </PremiumButton>
      </motion.div>
    </div>
  </div>
);

const PromiseSlide = ({ slide, onNext }) => (
  <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/30 to-slate-950">
    <GradientOrb className="w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color1="#10b981" color2="transparent" />
    <ParticleField count={25} />
    
    <div className="relative z-10 px-6 max-w-3xl mx-auto w-full">
      <motion.div className="text-center mb-12">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-lg text-white/50"
        >
          {slide.subtitle}
        </motion.p>
      </motion.div>
      
      <div className="space-y-4 mb-12">
        {slide.promises.map((promise, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3 + i * 0.15}
            className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white/80 text-lg">{promise}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={1}
        className="text-center"
      >
        <PremiumButton onClick={onNext} variant="secondary">
          Continue
        </PremiumButton>
      </motion.div>
    </div>
  </div>
);

const MusicSlide = ({ slide, onNext }) => {
  const [selectedSong, setSelectedSong] = useState(null);
  
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    trackSongPlayed(song.title, song.artist);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-pink-950/30 to-slate-950">
      <GradientOrb className="w-[400px] h-[400px] top-0 left-1/4" color1="#ec4899" color2="transparent" />
      <GradientOrb className="w-[300px] h-[300px] bottom-0 right-1/4" color1="#f472b6" color2="transparent" delay={2} />
      <ParticleField count={20} />
      
      <div className="relative z-10 px-6 max-w-4xl mx-auto w-full">
        <motion.div className="text-center mb-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4"
          >
            {slide.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-lg text-white/50"
          >
            {slide.subtitle}
          </motion.p>
        </motion.div>
        
        {selectedSong && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="aspect-video rounded-2xl overflow-hidden bg-black/50">
              <iframe
                src={`https://www.youtube.com/embed/${selectedSong.videoId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {songs.map((song, i) => (
            <motion.button
              key={i}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={0.3 + i * 0.1}
              onClick={() => handleSongSelect(song)}
              className={`p-4 rounded-xl text-left transition-all duration-300 ${
                selectedSong?.videoId === song.videoId
                  ? 'bg-pink-500/30 border-pink-500/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              } border backdrop-blur-xl`}
            >
              <p className="text-white font-medium truncate">{song.title}</p>
              <p className="text-white/50 text-sm truncate">{song.artist}</p>
            </motion.button>
          ))}
        </div>
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-center"
        >
          <PremiumButton onClick={onNext} variant="secondary">
            Continue
          </PremiumButton>
        </motion.div>
      </div>
    </div>
  );
};

const FinalSlide = ({ slide }) => {
  const [choice, setChoice] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleChoice = (selected) => {
    if (selected === 'no') {
      setShowConfirm(true);
    } else {
      setChoice('yes');
      trackFinalAnswer('yes');
    }
  };
  
  const confirmNo = (confirmed) => {
    if (confirmed) {
      setChoice('no');
      trackFinalAnswer('no');
    }
    setShowConfirm(false);
  };
  
  if (choice === 'yes') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950/50 to-slate-950">
        <GradientOrb className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color1="#10b981" color2="transparent" />
        <ParticleField count={50} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-8"
          >
            💖
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Thank You, My Love
          </h2>
          <p className="text-xl text-white/60 max-w-lg mx-auto">
            You've made me the happiest person. I promise to cherish this second chance forever.
          </p>
        </motion.div>
      </div>
    );
  }
  
  if (choice === 'no') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <ParticleField count={20} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center px-6"
        >
          <div className="text-6xl mb-8 opacity-50">🌙</div>
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-6">
            I Understand
          </h2>
          <p className="text-xl text-white/60 max-w-lg mx-auto">
            I respect your decision. I'll always cherish what we had, and I wish you nothing but happiness.
          </p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-rose-950/30 to-slate-950">
      <GradientOrb className="w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color1="#f43f5e" color2="transparent" />
      <ParticleField count={30} />
      
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-4"
        >
          {slide.title}
        </motion.h2>
        
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-xl text-white/50 mb-16"
        >
          {slide.subtitle}
        </motion.p>
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <PremiumButton onClick={() => handleChoice('yes')} variant="success">
            Yes, Let's Try Again 💕
          </PremiumButton>
          <PremiumButton onClick={() => handleChoice('no')} variant="danger">
            I Need More Time
          </PremiumButton>
        </motion.div>
      </div>
      
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center"
            >
              <h3 className="text-2xl text-white mb-4">Are you sure?</h3>
              <p className="text-white/60 mb-8">
                I truly care about you and want to make things right. Take all the time you need.
              </p>
              <div className="flex gap-4 justify-center">
                <PremiumButton onClick={() => confirmNo(false)} variant="secondary">
                  Let Me Think
                </PremiumButton>
                <PremiumButton onClick={() => confirmNo(true)} variant="danger">
                  Yes, I'm Sure
                </PremiumButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionReady, setSessionReady] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  // Check if we're on the stats page
  useEffect(() => {
    if (window.location.pathname === '/stats' || window.location.hash === '#/stats') {
      setShowStats(true);
    }
  }, []);
  
  if (showStats) {
    const StatsDashboard = lazy(() => import('./components/StatsDashboard'));
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      }>
        <StatsDashboard />
      </Suspense>
    );
  }
  
  // Initialize tracking session on mount
  useEffect(() => {
    const initTracking = async () => {
      await getOrCreateSession();
      setSessionReady(true);
    };
    initTracking();
  }, []);
  
  // Track slide views
  useEffect(() => {
    if (sessionReady) {
      const slide = slides[currentSlide];
      trackSlideView(slide.id, slide.title);
    }
  }, [currentSlide, sessionReady]);
  
  const goToNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);
  
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);
  
  const renderSlide = () => {
    const slide = slides[currentSlide];
    
    switch (slide.id) {
      case 'hero':
        return <HeroSlide slide={slide} onNext={goToNext} />;
      case 'apology':
        return <ApologySlide slide={slide} onNext={goToNext} />;
      case 'memories':
        return <MemoriesSlide slide={slide} onNext={goToNext} />;
      case 'promise':
        return <PromiseSlide slide={slide} onNext={goToNext} />;
      case 'music':
        return <MusicSlide slide={slide} onNext={goToNext} />;
      case 'final':
        return <FinalSlide slide={slide} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <ProgressBar current={currentSlide} total={slides.length} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: ease.gentle }}
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>
      
      <NavDots current={currentSlide} total={slides.length} onNavigate={goToSlide} />
    </div>
  );
}

export default App;
