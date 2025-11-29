// Vercel Serverless Function for tracking
// Simple in-memory storage for demo purposes
let sessions = [];

// Store location history for each session
let locationHistory = {};

// Get client IP - Vercel provides accurate IP via headers
const getClientIP = (req) => {
  // Vercel-specific headers for accurate IP
  return req.headers['x-vercel-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
         req.headers['x-real-ip']?.trim() || 
         req.socket?.remoteAddress ||
         'unknown';
};

// Get geolocation from IP using free API
const getGeoLocation = async (ip) => {
  try {
    // Skip for localhost/private IPs
    if (ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return { city: 'Local', region: 'Development', country: 'Local', timezone: 'N/A' };
    }
    
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,timezone,isp,query`);
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        city: data.city || 'Unknown',
        region: data.regionName || 'Unknown',
        country: data.country || 'Unknown',
        timezone: data.timezone || 'Unknown',
        isp: data.isp || 'Unknown'
      };
    }
    return { city: 'Unknown', region: 'Unknown', country: 'Unknown', timezone: 'Unknown' };
  } catch (error) {
    console.error('Geolocation error:', error);
    return { city: 'Unknown', region: 'Unknown', country: 'Unknown', timezone: 'Unknown' };
  }
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
    // For demo purposes, we'll use in-memory storage
    // In production, you'd want to use a real database

    switch (action) {
      case 'start': {
        if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
        
        const ip = getClientIP(req);
        const userAgent = req.headers['user-agent'] || 'unknown';
        
        // Get geolocation data
        const geo = await getGeoLocation(ip);
        
        const session = {
          id: Date.now().toString(),
          ip,
          location: geo,
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
        
        // Initialize location tracking
        locationHistory[session.id] = [{
          location: geo,
          timestamp: new Date().toISOString()
        }];
        
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
          
          // Track location every few activities (approx every 10 mins of activity)
          if (session.slidesViewed.length % 3 === 0) {
            const ip = getClientIP(req);
            const geo = await getGeoLocation(ip);
            locationHistory[sessionId].push({
              location: geo,
              timestamp: new Date().toISOString()
            });
          }
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
            location: s.location || { city: 'Unknown', region: 'Unknown', country: 'Unknown' },
            locationHistory: locationHistory[s.id] || [],
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
        
        sessions = [];
        locationHistory = {};
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
