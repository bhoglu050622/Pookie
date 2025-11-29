// Tracking service for monitoring viewer activity
// Uses local server in development, Vercel API in production
const isDev = import.meta.env.DEV;
const API_BASE = isDev ? 'http://localhost:3003/api' : '/api/track';

let sessionId = null;

// Build URL based on environment
const buildUrl = (action) => {
  if (isDev) {
    return `${API_BASE}/session/${action}`;
  }
  return `${API_BASE}?action=${action}`;
};

// Initialize session when app loads
export const initSession = async () => {
  try {
    const url = isDev ? `${API_BASE}/session/start` : `${API_BASE}?action=start`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    sessionId = data.sessionId;
    
    // Store in localStorage for persistence
    localStorage.setItem('pookie_session_id', sessionId);
    
    return sessionId;
  } catch (error) {
    console.log('Tracking unavailable');
    return null;
  }
};

// Get existing session or create new one
export const getOrCreateSession = async () => {
  // Check for existing session
  const existingSession = localStorage.getItem('pookie_session_id');
  if (existingSession) {
    sessionId = existingSession;
    return sessionId;
  }
  
  return await initSession();
};

// Track slide view
export const trackSlideView = async (slideId, slideName) => {
  if (!sessionId) return;
  
  try {
    const url = isDev ? `${API_BASE}/track/slide` : `${API_BASE}?action=slide`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, slideId, slideName })
    });
  } catch (error) {
    // Silently fail - don't interrupt user experience
  }
};

// Track song played
export const trackSongPlayed = async (songTitle, songArtist) => {
  if (!sessionId) return;
  
  try {
    const url = isDev ? `${API_BASE}/track/song` : `${API_BASE}?action=song`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, songTitle, songArtist })
    });
  } catch (error) {
    // Silently fail
  }
};

// Track final answer
export const trackFinalAnswer = async (answer) => {
  if (!sessionId) return;
  
  try {
    const url = isDev ? `${API_BASE}/track/answer` : `${API_BASE}?action=answer`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, answer })
    });
  } catch (error) {
    // Silently fail
  }
};

// Get stats (for you to check)
export const getStats = async () => {
  try {
    const url = isDev ? `${API_BASE}/stats` : `${API_BASE}?action=stats`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Could not fetch stats');
    return null;
  }
};

export default {
  initSession,
  getOrCreateSession,
  trackSlideView,
  trackSongPlayed,
  trackFinalAnswer,
  getStats
};
