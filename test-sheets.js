// Test Google Sheets connection and setup
import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';

// Load environment variables
const SPREADSHEET_ID = '1ZIo-pN2u_GV_BUYH4uGTmC50z0tChqy9p2DRoPECyV8';
const SERVICE_ACCOUNT_EMAIL = 'pookie-tracker@pookie-tracker.iam.gserviceaccount.com';
const creds = JSON.parse(fs.readFileSync('/Users/amanbhogal/Downloads/pookie-tracker-key.json', 'utf8'));

async function testSheetsConnection() {
  try {
    console.log('🔍 Testing Google Sheets connection...');
    
    // Initialize the spreadsheet with auth
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, creds);
    
    // Load spreadsheet info
    await doc.loadInfo();
    console.log('✅ Connected to Google Sheets:', doc.title);
    
    // Check existing sheets
    console.log('📊 Existing sheets:');
    Object.keys(doc.sheetsByTitle).forEach(title => {
      console.log(`  - ${title}`);
    });
    
    // Create required sheets if they don't exist
    let sessionsSheet = doc.sheetsByTitle['Sessions'];
    if (!sessionsSheet) {
      sessionsSheet = await doc.addSheet({ title: 'Sessions' });
      console.log('✅ Created "Sessions" sheet');
    }
    
    let locationSheet = doc.sheetsByTitle['Location History'];
    if (!locationSheet) {
      locationSheet = await doc.addSheet({ title: 'Location History' });
      console.log('✅ Created "Location History" sheet');
    }
    
    // Add headers if sheets are empty
    const sessionsRows = await sessionsSheet.getRows();
    if (sessionsRows.length === 0) {
      await sessionsSheet.setHeaderRow([
        'Session ID', 'IP Address', 'Location', 'User Agent', 'Start Time', 'Last Activity', 
        'Device Type', 'Browser', 'Slides Viewed', 'Songs Played', 'Final Answer', 'Completed'
      ]);
      console.log('✅ Added headers to Sessions sheet');
    }
    
    const locationRows = await locationSheet.getRows();
    if (locationRows.length === 0) {
      await locationSheet.setHeaderRow([
        'Session ID', 'Timestamp', 'Location City', 'Location Country', 'Latitude', 'Longitude'
      ]);
      console.log('✅ Added headers to Location History sheet');
    }
    
    // Test adding a sample row
    const testRow = {
      'Session ID': 'test_' + Date.now(),
      'IP Address': '127.0.0.1',
      'Location': 'Test City, Test Country',
      'User Agent': 'Test Browser',
      'Start Time': new Date().toISOString(),
      'Last Activity': new Date().toISOString(),
      'Device Type': 'Desktop',
      'Browser': 'Test',
      'Slides Viewed': 1,
      'Songs Played': 0,
      'Final Answer': 'Not answered',
      'Completed': 'No'
    };
    
    await sessionsSheet.addRow(testRow);
    console.log('✅ Added test row to Sessions sheet');
    
    console.log('\n🎉 Google Sheets setup is complete and working!');
    console.log('📈 Your tracking data will now be saved permanently!');
    console.log('🔗 Sheet URL: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure you shared the sheet with:', SERVICE_ACCOUNT_EMAIL);
  }
}

testSheetsConnection();
