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
    console.log('🔍 Tracking: Starting session at', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('🔍 Tracking: Response status', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('🔍 Tracking: Session created', data);
    
    sessionId = data.sessionId;
    
    // Store in localStorage for persistence
    localStorage.setItem('pookie_session_id', sessionId);
    
    return sessionId;
  } catch (error) {
    console.error('🔍 Tracking: Session creation failed', error);
    return null;
  }
};

// Get existing session or create new one
export const getOrCreateSession = async () => {
  // Check for existing session
  const existingSession = localStorage.getItem('pookie_session_id');
  console.log('🔍 Tracking: Existing session from localStorage:', existingSession);
  
  if (existingSession) {
    sessionId = existingSession;
    console.log('🔍 Tracking: Using existing session:', sessionId);
    return sessionId;
  }
  
  console.log('🔍 Tracking: No existing session, creating new one');
  return await initSession();
};

// Track slide view
export const trackSlideView = async (slideId, slideName) => {
  if (!sessionId) {
    console.log('🔍 Tracking: No session ID for slide tracking');
    return;
  }
  
  try {
    const url = isDev ? `${API_BASE}/track/slide` : `${API_BASE}?action=slide`;
    console.log('🔍 Tracking: Tracking slide', slideId, slideName, 'at', url);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, slideId, slideName })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    console.log('🔍 Tracking: Slide tracked successfully');
  } catch (error) {
    console.error('🔍 Tracking: Slide tracking failed', error);
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
