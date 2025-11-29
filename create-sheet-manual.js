// Manual Google Sheet creation instructions and environment setup
import fs from 'fs';

// Load service account credentials
const creds = JSON.parse(fs.readFileSync('/Users/amanbhogal/Downloads/pookie-tracker-key.json', 'utf8'));

console.log('🔧 Google Sheets Setup Instructions:\n');
console.log('1️⃣  Go to: https://sheets.google.com/create');
console.log('2️⃣  Name it: "Pookie Tracking Data"');
console.log('3️⃣  Share this sheet with: ' + creds.client_email);
console.log('4️⃣  Give "Editor" permissions\n');

console.log('📋 Your Environment Variables for Vercel:\n');
console.log('GOOGLE_SPREADSHEET_ID=YOUR_SPREADSHEET_ID_HERE');
console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL=' + creds.client_email);
console.log('GOOGLE_PRIVATE_KEY="' + creds.private_key.replace(/\n/g, '\\n') + '"\n');

console.log('🔍 To get your Spreadsheet ID:');
console.log('1. Open the sheet you created');
console.log('2. Look at the URL: https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit');
console.log('3. Copy the [SPREADSHEET_ID] part\n');

console.log('⚡  Quick Setup:');
console.log('1. Create sheet: https://sheets.google.com/create');
console.log('2. Share with: ' + creds.client_email);
console.log('3. Get ID from URL');
console.log('4. Add to Vercel: https://vercel.com/[your-project]/settings/environment-variables');
