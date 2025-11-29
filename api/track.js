// Vercel Serverless Function for tracking
import { kv } from '@vercel/kv';

// Get client IP
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         'unknown';
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action } = req.query;

  try {
    // Get existing sessions or initialize
    let sessions = await kv.get('pookie_sessions') || [];

    switch (action) {
      case 'start': {
        if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
        
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
        
        sessions.push(session);
        await kv.set('pookie_sessions', sessions);
        
        return res.status(200).json({ success: true, sessionId: session.id });
      }

      case 'slide': {
        if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
        
        const { sessionId, slideId, slideName } = req.body;
        const session = sessions.find(s => s.id === sessionId);
        
        if (session) {
          if (!session.slidesViewed.find(s => s.slideId === slideId)) {
            session.slidesViewed.push({
              slideId,
              slideName,
              viewedAt: new Date().toISOString()
            });
          }
          session.lastActivity = new Date().toISOString();
          await kv.set('pookie_sessions', sessions);
        }
        
        return res.status(200).json({ success: true });
      }

      case 'song': {
        if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
        
        const { sessionId, songTitle, songArtist } = req.body;
        const session = sessions.find(s => s.id === sessionId);
        
        if (session) {
          session.songsPlayed.push({
            title: songTitle,
            artist: songArtist,
            playedAt: new Date().toISOString()
          });
          session.lastActivity = new Date().toISOString();
          await kv.set('pookie_sessions', sessions);
        }
        
        return res.status(200).json({ success: true });
      }

      case 'answer': {
        if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
        
        const { sessionId, answer } = req.body;
        const session = sessions.find(s => s.id === sessionId);
        
        if (session) {
          session.finalAnswer = {
            answer,
            answeredAt: new Date().toISOString()
          };
          session.completed = true;
          session.lastActivity = new Date().toISOString();
          await kv.set('pookie_sessions', sessions);
        }
        
        return res.status(200).json({ success: true });
      }

      case 'stats': {
        if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
        
        const stats = {
          totalSessions: sessions.length,
          completedSessions: sessions.filter(s => s.completed).length,
          yesAnswers: sessions.filter(s => s.finalAnswer?.answer === 'yes').length,
          noAnswers: sessions.filter(s => s.finalAnswer?.answer === 'no').length,
          sessions: sessions.map(s => ({
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
        
        return res.status(200).json(stats);
      }

      case 'clear': {
        if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });
        
        await kv.set('pookie_sessions', []);
        return res.status(200).json({ success: true, message: 'All data cleared' });
      }

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Tracking error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
