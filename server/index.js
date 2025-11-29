import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'tracking-data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ sessions: [] }, null, 2));
}

// Helper to read data
const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (error) {
    return { sessions: [] };
  }
};

// Helper to write data
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Get client IP address
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress ||
         'unknown';
};

// ============================================
// API ENDPOINTS
// ============================================

// Track session start
app.post('/api/session/start', (req, res) => {
  const data = readData();
  const ip = getClientIP(req);
  const userAgent = req.headers['user-agent'] || 'unknown';
  
  const session = {
    id: Date.now().toString(),
    ip,
    userAgent,
    startTime: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    slidesViewed: [],
    songsPlayed: [],
    finalAnswer: null,
    completed: false,
    device: {
      isMobile: /Mobile|Android|iPhone|iPad/i.test(userAgent),
      browser: userAgent.match(/(Chrome|Safari|Firefox|Edge|Opera)/i)?.[0] || 'unknown'
    }
  };
  
  data.sessions.push(session);
  writeData(data);
  
  console.log(`\n🆕 New session started`);
  console.log(`   IP: ${ip}`);
  console.log(`   Time: ${session.startTime}`);
  console.log(`   Device: ${session.device.isMobile ? 'Mobile' : 'Desktop'} - ${session.device.browser}`);
  
  res.json({ success: true, sessionId: session.id });
});

// Track slide view
app.post('/api/track/slide', (req, res) => {
  const { sessionId, slideId, slideName } = req.body;
  const data = readData();
  
  const session = data.sessions.find(s => s.id === sessionId);
  if (session) {
    const slideView = {
      slideId,
      slideName,
      viewedAt: new Date().toISOString()
    };
    
    // Only add if not already viewed
    if (!session.slidesViewed.find(s => s.slideId === slideId)) {
      session.slidesViewed.push(slideView);
    }
    session.lastActivity = new Date().toISOString();
    writeData(data);
    
    console.log(`👁️  Slide viewed: "${slideName}" (Session: ${sessionId.slice(-6)})`);
  }
  
  res.json({ success: true });
});

// Track song played
app.post('/api/track/song', (req, res) => {
  const { sessionId, songTitle, songArtist } = req.body;
  const data = readData();
  
  const session = data.sessions.find(s => s.id === sessionId);
  if (session) {
    session.songsPlayed.push({
      title: songTitle,
      artist: songArtist,
      playedAt: new Date().toISOString()
    });
    session.lastActivity = new Date().toISOString();
    writeData(data);
    
    console.log(`🎵 Song played: "${songTitle}" by ${songArtist} (Session: ${sessionId.slice(-6)})`);
  }
  
  res.json({ success: true });
});

// Track final answer
app.post('/api/track/answer', (req, res) => {
  const { sessionId, answer } = req.body;
  const data = readData();
  
  const session = data.sessions.find(s => s.id === sessionId);
  if (session) {
    session.finalAnswer = {
      answer,
      answeredAt: new Date().toISOString()
    };
    session.completed = true;
    session.lastActivity = new Date().toISOString();
    writeData(data);
    
    const emoji = answer === 'yes' ? '💖' : '💔';
    console.log(`\n${emoji} FINAL ANSWER RECEIVED ${emoji}`);
    console.log(`   Answer: ${answer.toUpperCase()}`);
    console.log(`   Session: ${sessionId.slice(-6)}`);
    console.log(`   IP: ${session.ip}`);
    console.log(`   Time: ${session.finalAnswer.answeredAt}\n`);
  }
  
  res.json({ success: true });
});

// Get all tracking data (for you to check)
app.get('/api/stats', (req, res) => {
  const data = readData();
  
  const stats = {
    totalSessions: data.sessions.length,
    completedSessions: data.sessions.filter(s => s.completed).length,
    yesAnswers: data.sessions.filter(s => s.finalAnswer?.answer === 'yes').length,
    noAnswers: data.sessions.filter(s => s.finalAnswer?.answer === 'no').length,
    sessions: data.sessions.map(s => ({
      id: s.id,
      ip: s.ip,
      startTime: s.startTime,
      lastActivity: s.lastActivity,
      device: s.device,
      slidesViewed: s.slidesViewed.length,
      slidesViewedNames: s.slidesViewed.map(sv => sv.slideName),
      songsPlayed: s.songsPlayed.length,
      songsPlayedTitles: s.songsPlayed.map(sp => sp.title),
      finalAnswer: s.finalAnswer?.answer || 'not answered yet',
      completed: s.completed
    }))
  };
  
  res.json(stats);
});

// Get detailed session info
app.get('/api/session/:id', (req, res) => {
  const data = readData();
  const session = data.sessions.find(s => s.id === req.params.id);
  
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

// Clear all data (use carefully!)
app.delete('/api/clear', (req, res) => {
  writeData({ sessions: [] });
  console.log('🗑️  All tracking data cleared');
  res.json({ success: true, message: 'All data cleared' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 Pookie Tracking Server Running`);
  console.log(`${'='.repeat(50)}`);
  console.log(`\n📊 View stats: http://localhost:${PORT}/api/stats`);
  console.log(`🌐 Server port: ${PORT}`);
  console.log(`\nWaiting for activity...\n`);
});
