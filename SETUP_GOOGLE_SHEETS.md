# Google Sheets Integration Setup

This will save all your tracking data permanently to Google Sheets, so you never lose stats even when Vercel restarts.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing one)
3. Enable the "Google Drive API" and "Google Sheets API"

## Step 2: Create Service Account

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Give it a name like "Pookie Tracker"
4. Click "Create and Continue"
5. Skip granting roles (click "Done")
6. Find your service account and click on it
7. Go to "Keys" tab
8. Click "Add Key" → "Create new key"
9. Choose "JSON" and download the file

## Step 3: Create Google Sheet

1. Create a new Google Sheet
2. Copy the Spreadsheet ID from the URL (between `/d/` and `/edit`)
3. Share the sheet with your service account email:
   - Get the email from your JSON file (`client_email`)
   - Share the sheet with this email (give "Editor" access)

## Step 4: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Go to "Settings" → "Environment Variables"
3. Add these variables:

```
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email_here
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important:** For the private key, you need to:
- Copy the entire `private_key` field from your JSON file
- Replace `\n` with actual newlines in the Vercel variable
- Wrap the whole thing in quotes

## Step 5: Deploy

1. Push your changes to GitHub
2. Vercel will automatically redeploy
3. Your tracking data will now be saved to Google Sheets!

## What Gets Saved

**Sessions Sheet:**
- Session ID, IP Address, Location
- Device info, browser, timestamps
- Slides viewed, songs played, final answer
- Completion status

**Location History Sheet:**
- Session ID, timestamps
- Location updates over time
- City, country, coordinates

## Testing

Once deployed, visit your app and check your Google Sheet. You should see new rows appearing as users interact with your app!

## Troubleshooting

- If no data appears: Check Vercel function logs
- Make sure the service account has editor access to the sheet
- Verify the Spreadsheet ID is correct
- Check that all environment variables are set properly
