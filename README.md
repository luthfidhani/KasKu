# KasKu - Your AI-Powered Finance Buddy on Telegram 💳💎

**KasKu** is your personal **AI-powered finance companion** on **Telegram** that makes tracking your income and expenses as easy as chatting with a friend. Simply send casual messages, and KasKu will understand, categorize, and log your financial data directly into **Google Sheets**. Plus, it adds a little fun with witty remarks or motivational quotes to keep your financial journey exciting! 🎉

---

## 🚀 Quick Setup Guide

Follow these simple steps to get KasKu up and running:

1. **Create a new Google Spreadsheet**.
2. Add two sheets:
   - `log`
   - `data` with the following columns:
     - `no`, `date`, `type`, `category`, `amount`, `description`, `commentary`
3. Navigate to **Extensions -> Apps Script**.
4. Rename the Apps Script project to **KasKu** for easy identification.
5. Copy and paste the code from `Code.gs` in this repository into your Apps Script project.
6. Configure the following environment variables within the script:
   - `GROQ_API`: Your Groq API endpoint.
   - `GROQ_MODEL`: The specific Groq model you are using.
   - `TG_API_TOKEN`: Your Telegram bot token.
   - `TG_ALLOWED_USER_ID`: Your Telegram user ID to restrict bot access (ensures only you can use the bot).
7. Deploy the script:
   - Go to **Deploy -> New deployment**.
   - **Select type**: Web app.
   - **Execute as**: Me.
   - **Who has access**: Anyone.
   - Click **Deploy**.
8. Copy the generated **Web App URL**.
9. Paste this URL into the `APP_URL` variable within the script.
10. In the Apps Script editor, select the `setWebhook` function from the dropdown (next to the debug icon).
11. Click **Run**. If successful, you will see a confirmation message:
   ```json
   {"ok":true,"result":true,"description":"Webhook is already set"}
   ```
   This means your bot is now successfully connected to Telegram! 🚀📢

---

## 📱 Available Bot Commands

- `/start` – Start bot. 
- `/database` – Receive the link to your Google Spreadsheet.
- `/report` – View your income, expenses, and balance summary for the current month.
- `/exportcsv` – Export your financial data as a CSV file for further independent analysis.

---

Enjoy effortless financial tracking with **KasKu** 💰📈📉. Make managing your money fun and stress-free!

## 📸 Screenshot
![image](https://github.com/user-attachments/assets/f1d6868a-57f8-4a82-bd18-d9aca24fd002)
