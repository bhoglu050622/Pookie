import React, { useState, useEffect } from 'react';
import { getStats } from '../services/tracking';

const StatsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching stats...');
        const data = await getStats();
        console.log('Stats received:', data);
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error('Stats fetch error:', err);
        setError('Could not fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <p className="text-red-400">{error}</p>
          <p className="text-sm text-gray-400 mt-2">Try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-light mb-8 text-center">📊 Pookie Tracking Stats</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">👁️</div>
            <div className="text-2xl font-light">{stats.totalSessions}</div>
            <div className="text-sm text-gray-400">Total Views</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-light">{stats.completedSessions}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">💖</div>
            <div className="text-2xl font-light">{stats.yesAnswers}</div>
            <div className="text-sm text-gray-400">Yes Answers</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">💔</div>
            <div className="text-2xl font-light">{stats.noAnswers}</div>
            <div className="text-sm text-gray-400">No Answers</div>
          </div>
        </div>

        {/* Session Details */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-light mb-6">📝 Session Details</h2>
          
          {stats.sessions.length === 0 ? (
            <p className="text-gray-400">No sessions yet...</p>
          ) : (
            <div className="space-y-4">
              {stats.sessions.map((session, index) => (
                <div key={session.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm text-gray-400">Session #{index + 1}</span>
                      <div className="font-medium">{session.ip}</div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        session.completed 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {session.completed ? 'Completed' : 'In Progress'}
                      </div>
                      {session.finalAnswer && (
                        <div className={`mt-2 px-3 py-1 rounded-full text-sm ${
                          session.finalAnswer === 'yes'
                            ? 'bg-pink-500/20 text-pink-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {session.finalAnswer === 'yes' ? '💖 Yes' : '💔 No'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>📱 {session.device?.isMobile ? 'Mobile' : 'Desktop'} • {session.device?.browser}</div>
                    <div>🕐 Started: {new Date(session.startTime).toLocaleString()}</div>
                    <div>📍 Location: {session.location?.city || 'Unknown'}, {session.location?.country || 'Unknown'}</div>
                    <div>👁️ Slides viewed: {session.slidesViewedNames.join(', ') || 'None'}</div>
                    {session.songsPlayedTitles.length > 0 && (
                      <div>🎵 Songs played: {session.songsPlayedTitles.join(', ')}</div>
                    )}
                    {session.locationHistory && session.locationHistory.length > 1 && (
                      <div className="mt-2 p-2 bg-white/5 rounded text-xs">
                        <div className="font-medium mb-1">🗺️ Location History:</div>
                        {session.locationHistory.map((loc, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{loc.location.city}, {loc.location.country}</span>
                            <span>{new Date(loc.timestamp).toLocaleTimeString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
