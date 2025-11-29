// Script to create Google Sheet and get its ID
import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';

// Load service account credentials
const creds = JSON.parse(fs.readFileSync('/Users/amanbhogal/Downloads/pookie-tracker-key.json', 'utf8'));

async function createSheet() {
  try {
    // Create a new spreadsheet with direct authentication
    const newDoc = new GoogleSpreadsheet();
    
    // Authenticate with service account
    await newDoc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
    });
    
    // Create new spreadsheet
    const spreadsheet = await newDoc.createNewSpreadsheetDocument({
      title: 'Pookie Tracking Data',
    });
    
    console.log('✅ Google Sheet created successfully!');
    console.log('📊 Spreadsheet ID:', spreadsheet.spreadsheetId);
    console.log('🔗 Sheet URL:', `https://docs.google.com/spreadsheets/d/${spreadsheet.spreadsheetId}`);
    
    // Load the spreadsheet to add sheets
    await spreadsheet.loadInfo();
    
    // Create the required sheets
    await spreadsheet.addSheet({ title: 'Sessions' });
    await spreadsheet.addSheet({ title: 'Location History' });
    
    console.log('✅ Sheets created: Sessions, Location History');
    
    return spreadsheet.spreadsheetId;
  } catch (error) {
    console.error('❌ Error creating sheet:', error.message);
    console.log('💡 You can manually create a sheet and share it with:', creds.client_email);
    return null;
  }
}

createSheet().then(id => {
  if (id) {
    console.log('\n🎉 Setup complete! Add these to your Vercel environment variables:');
    console.log('\nGOOGLE_SPREADSHEET_ID=' + id);
    console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL=' + creds.client_email);
    console.log('GOOGLE_PRIVATE_KEY="' + creds.private_key.replace(/\n/g, '\\n') + '"');
  }
});
