// Google Sheets API integration for persistent stats storage
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Configuration - you'll need to set these environment variables in Vercel
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let doc = null;

// Initialize Google Sheets connection
const initSheets = async () => {
  if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.log('Google Sheets credentials not configured, skipping...');
    return null;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: PRIVATE_KEY,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
    
    doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    console.log('Connected to Google Sheets:', doc.title);
    return doc;
  } catch (error) {
    console.error('Failed to connect to Google Sheets:', error);
    return null;
  }
};

// Ensure worksheet exists and has headers
const ensureWorksheet = async (sheetTitle) => {
  if (!doc) return null;

  try {
    let sheet = doc.sheetsByTitle[sheetTitle];
    
    if (!sheet) {
      sheet = await doc.addSheet({ title: sheetTitle });
      console.log(`Created new sheet: ${sheetTitle}`);
    }

    // Add headers if sheet is empty
    const rows = await sheet.getRows();
    if (rows.length === 0) {
      const headers = sheetTitle === 'Sessions' 
        ? ['Session ID', 'IP Address', 'Location', 'User Agent', 'Start Time', 'Last Activity', 
           'Device Type', 'Browser', 'Slides Viewed', 'Songs Played', 'Final Answer', 'Completed']
        : ['Session ID', 'Timestamp', 'Location City', 'Location Country', 'Latitude', 'Longitude'];
      
      await sheet.setHeaderRow(headers);
      console.log(`Added headers to ${sheetTitle}`);
    }

    return sheet;
  } catch (error) {
    console.error(`Error with worksheet ${sheetTitle}:`, error);
    return null;
  }
};

// Save session to Google Sheets
export const saveSessionToSheets = async (session) => {
  try {
    const sheetsDoc = await initSheets();
    if (!sheetsDoc) return false;

    const sheet = await ensureWorksheet('Sessions');
    if (!sheet) return false;

    const newRow = {
      'Session ID': session.id,
      'IP Address': session.ip,
      'Location': `${session.location?.city || 'Unknown'}, ${session.location?.country || 'Unknown'}`,
      'User Agent': session.userAgent,
      'Start Time': session.startTime,
      'Last Activity': session.lastActivity,
      'Device Type': session.device?.isMobile ? 'Mobile' : 'Desktop',
      'Browser': session.device?.browser || 'Unknown',
      'Slides Viewed': session.slidesViewed?.length || 0,
      'Songs Played': session.songsPlayed?.length || 0,
      'Final Answer': session.finalAnswer?.answer || 'Not answered',
      'Completed': session.completed ? 'Yes' : 'No',
    };

    await sheet.addRow(newRow);
    console.log('Session saved to Google Sheets:', session.id);
    return true;
  } catch (error) {
    console.error('Failed to save session to Google Sheets:', error);
    return false;
  }
};

// Save location update to Google Sheets
export const saveLocationUpdate = async (sessionId, location, timestamp) => {
  try {
    const sheetsDoc = await initSheets();
    if (!sheetsDoc) return false;

    const sheet = await ensureWorksheet('Location History');
    if (!sheet) return false;

    const newRow = {
      'Session ID': sessionId,
      'Timestamp': timestamp,
      'Location City': location.city || 'Unknown',
      'Location Country': location.country || 'Unknown',
      'Latitude': location.lat || '',
      'Longitude': location.lon || '',
    };

    await sheet.addRow(newRow);
    console.log('Location update saved to Google Sheets:', sessionId);
    return true;
  } catch (error) {
    console.error('Failed to save location update to Google Sheets:', error);
    return false;
  }
};

export default {
  saveSessionToSheets,
  saveLocationUpdate,
};
