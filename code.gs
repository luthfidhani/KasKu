// Groq config
var GROQ_API = "REPLACE_ME!"
var GROQ_MODEL = "deepseek-r1-distill-llama-70b"
var GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

// Telegram config
var TG_API_TOKEN = "REPLACE_ME!";
var TG_API_URL = "https://api.telegram.org/bot" + TG_API_TOKEN;
var TG_ALLOWED_USER_ID = "REPLACE_ME!";

var APP_URL = "REPLACE_ME!";

var SYSTEM_PROMPT = `
  You are a financial record assistant that receives transaction inputs from users in natural language and converts them into structured JSON.

  Use the following format:
  {
    "type": "savings/income/expense",
    "category": "transaction category",
    "description": "transaction description",
    "amount": amount in numbers,
    "commentary": "add some words about this transaction. Either funny, teasing, or any kind of witty remark to annoy the reader."
  }

  Here is the list of transaction types and categories to be used:

  ### Savings
  - type: savings, category: emergency_fund, description: funds set aside for emergencies.
  - type: savings, category: savings, description: money saved for future needs.
  - type: savings, category: investment, description: funds allocated to generate future profit.
  - type: savings, category: vehicle_tax, description: funds set aside to pay vehicle taxes.
  - type: savings, category: qurban, description: funds prepared for the Qurban ritual.
  - type: savings, category: general_savings, description: savings not included in other specific categories, prepared for various purposes.

  ### Income
  - type: income, category: main_salary, description: main income received regularly.
  - type: income, category: side_business, description: income from side business or ventures.
  - type: income, category: freelancer, description: income from freelance work or specific projects.
  - type: income, category: investment_returns, description: income from past investments.
  - type: income, category: bonuses_allowances, description: additional income outside the main salary.
  - type: income, category: passive_income, description: income earned without active work, such as from properties or royalties.
  - type: income, category: sales, description: income from selling goods or services.
  - type: income, category: grants_aid, description: funds received as aid, gifts, or voluntary contributions.
  - type: income, category: tax_refund, description: funds obtained from tax refunds or incentives.
  - type: income, category: other_income, description: income or funds received not included in the main income categories like salary, business, or investment.

  ### Expense
  - type: expense, category: food, description: expenses for buying ready-to-eat food or dining out.
  - type: expense, category: beverages, description: expenses for buying drinks like coffee, tea, or juice.
  - type: expense, category: groceries, description: expenses for buying groceries to cook at home.
  - type: expense, category: rent, description: payments for renting accommodation, vehicles, equipment, or other properties.
  - type: expense, category: electricity, description: monthly electricity usage cost.
  - type: expense, category: water, description: clean water usage cost.
  - type: expense, category: gas, description: cost of buying gas for cooking.
  - type: expense, category: internet, description: home internet subscription cost.
  - type: expense, category: phone_credit, description: cost of buying phone credit or SMS packages.
  - type: expense, category: data_package, description: cost of buying mobile internet data packages.
  - type: expense, category: fuel, description: cost of buying fuel for personal vehicles.
  - type: expense, category: parking, description: vehicle parking fees in public places or certain facilities.
  - type: expense, category: public_transportation, description: costs for using public transportation such as buses, trains, or ride-hailing services.
  - type: expense, category: medicine, description: cost for purchasing medicines.
  - type: expense, category: medical_treatment, description: costs for health checkups, doctor consultations, or other medical treatments.
  - type: expense, category: entertainment_subscriptions, description: subscription costs for digital entertainment services like Netflix, Spotify, YouTube Premium, gym, server, domain, or other digital services.
  - type: expense, category: entertainment, description: costs for entertainment activities like watching movies, concerts, gaming, attending events, or traveling.
  - type: expense, category: clothing_accessories, description: costs for buying clothes and accessories like bags, shoes, or jewelry.
  - type: expense, category: hobbies_recreation, description: costs for hobbies or recreational activities like musical instruments, collections, sports, or traveling.
  - type: expense, category: community, description: membership fees or dues for a community or organization.
  - type: expense, category: education, description: costs for courses, training, books, or other formal/non-formal education.
  - type: expense, category: gifts, description: costs for buying gifts or giving to others like partners, family, or friends.
  - type: expense, category: donations_zakat, description: costs for donations, alms, or zakat payments.
  - type: expense, category: home_repairs, description: costs for home repairs or renovations, including household appliances.
  - type: expense, category: vehicle_repairs, description: costs for vehicle services or repairs such as motorcycles, cars, or bicycles.
  - type: expense, category: beauty, description: costs for beauty treatments like skincare, salon, spa, or other body treatments.
  - type: expense, category: unexpected_expenses, description: unplanned expenses such as accidents, loss of items, or other emergencies.
  - type: expense, category: installments, description: installment payments for houses, vehicles, or other goods.
  - type: expense, category: services, description: payments for services provided by someone, like religious teachers, handymen, or other professionals.
  - type: expense, category: treating_others, description: expenses for treating others to food or drinks in social activities or gatherings.

  ## Conversion Rules:
  - Type is determined based on the category:
      * If the category is in Savings, set "type": "savings".
      * If the category is in Income, set "type": "income".
      * If the category is in Expense, set "type": "expense".
  - Number Conversion:
      * Numbers in text like "20 thousand", "5 million", "1.5 million, 500, 10,000", must be converted to numeric format (e.g., 20000, 5000000, 1500000, 500, 10000).
      * Ensure no currency symbols or other units are present in the final result.
  - Category Validation:
      * Type and category must match the predefined list.
      * If no exact category is found, select the closest matching category.
  - Category Limitation:
      * Do not add types or categories outside the existing list.
  - Output Format:
      * The result must be concise JSON without additional information beyond the requested data.
      * No explanatory text or other metadata outside the converted data.

  ### **Example Input & Output**
  **Input:**  
  - "I just bought coffee for 20 thousand"  
  - "Received salary 5 million from the office"  
  - "Paid internet 300 thousand"  
  - "Saved 100 thousand for emergency fund"  

  **Output:**  
  {
    "type": "expense",
    "category": "beverages",
    "description": "Bought coffee",
    "amount": 20000,
    "commentary": "Spending money on coffee again? Aren't you afraid of becoming a caffeine slave? ☕💸"
  },
  {
    "type": "income",
    "category": "main_salary",
    "description": "Salary from the office",
    "amount": 5000000,
    "commentary": "Payday! But remember, you'll still be crying at the end of the month. 💰😂"
  },
  {
    "type": "savings",
    "category": "emergency_fund",
    "description": "Saving for emergency fund",
    "amount": 100000,
    "commentary": "Nice saving! Don't just do it for show, make sure it counts. 🏦💪"
  }
`

// Spreadsheet instance
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

function setWebhook() {
  var url = TG_API_URL + "/setwebhook?url=" + APP_URL;
  var response = UrlFetchApp.fetch(url).getContentText();
  Logger.log(response);
}

function deleteWebhook() {
  var url = TG_API_URL + "/deletewebhook?url=" + APP_URL;
  var response = UrlFetchApp.fetch(url).getContentText();
  Logger.log(response);
}

// Function to log errors
function logError(errorMessage) {
  var sheet = spreadsheet.getSheetByName("log");
  var today = new Date();
  sheet.appendRow([today, errorMessage]);
  sendTelegramMessage(TG_ALLOWED_USER_ID, errorMessage);
}

function sendTypingAction(chatId) {
  const url = `${TG_API_URL}/sendChatAction`;
  const payload = {
    chat_id: chatId,
    action: 'typing'
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  };

  const response = UrlFetchApp.fetch(url, options);
}

function callGroqAPI(message) {
  const payload = {
    "messages": [
      {
        "role": "system",
        "content": SYSTEM_PROMPT
      },
      {
        "role": "user",
        "content": message
      }
    ],
    "model": GROQ_MODEL,
    "temperature": 0.6,
    "max_completion_tokens": 4096,
    "top_p": 0.95,
    "stream": false,
    "response_format": {
      "type": "text"
    },
    "stop": null
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + GROQ_API
    },
    "payload": JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(GROQ_URL, options);
    const json = JSON.parse(response.getContentText());
    const content = json.choices[0].message.content

    const jsonRegex = /```json\n([\s\S]*?)\n```/;
    const match = content.match(jsonRegex);

    if (match) {
      return JSON.parse(match[1]);
    } else {
      logError("No JSON found in the response.");
    }
  } catch (err) {
    logError("Groq API Error: " + err.message)
    sendTelegramMessage(TG_ALLOWED_USER_ID, "Groq API Error: " + err.message);
  }
}

function sendTelegramMessage(chatId, message, parseMode = 'Markdown') {
  var url = `${TG_API_URL}/sendMessage`;
  var payload = {
    chat_id: chatId,
    text: message,
    parse_mode: parseMode,
    disable_web_page_preview: true
  };
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  UrlFetchApp.fetch(url, options).getContentText();
}

function sendTelegramDocument(chatId, documentBlob, caption = null) {
  const url = `${TG_API_URL}/sendDocument`;
  const payload = {
    chat_id: chatId,
    document: documentBlob,
    caption: caption
  };
  const options = {
    method: 'post',
    payload: payload
  };
  UrlFetchApp.fetch(url, options);
}

function formatJsonMessage(data) {
  return `✅ *Record Successfully Saved!* ✅\n\n` +
         `📅 *Date:* ${formatDate(new Date())}\n` +
         `📂 *Type:* ${data.type.replace(/_/g, ' ')}\n` +
         `📌 *Category:* ${data.category.replace(/_/g, ' ')}\n` +
         `📝 *Description:* ${data.description}\n` +
         `💰 *Amount:* Rp ${data.amount.toLocaleString()}\n` +
         `\n💡 *${data.commentary}* 💡`;
}

function addData(data) {
  var sheet = spreadsheet.getSheetByName("data");
  sheet.appendRow(
    [
      sheet.getLastRow(),
      formatDate(new Date()),
      data.type,
      data.category,
      data.amount,
      data.description,
      data.commentary,
    ]
  );
}

function generateMonthlyReport() {
  var sheet = spreadsheet.getSheetByName("data");
  var data = sheet.getDataRange().getValues(); // Get all data
  var today = new Date();
  var currentMonth = today.getMonth() + 1; // getMonth() starts from 0
  var currentYear = today.getFullYear();

  var totalIncome = 0;
  var totalExpense = 0;

  for (var i = 1; i < data.length; i++) { // Start from 1 to skip the header
    var date = new Date(data[i][1]); // Column B (date)
    var type = data[i][2]; // Column C (type)
    var amount = Number(data[i][4]); // Column E (amount)

    if (date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
      if (type === "income") {
        totalIncome += amount;
      } else if (type === "expense") {
        totalExpense += amount;
      }
    }
  }

  var reportMessage =
    `📊 *This Month's Financial Report (${currentMonth}/${currentYear})* 📊\n\n` +
    `💰 *Total Income:* Rp ${totalIncome.toLocaleString()}\n` +
    `💸 *Total Expense:* Rp ${totalExpense.toLocaleString()}\n\n` +
    `💡 *Remaining Balance:* Rp ${(totalIncome - totalExpense).toLocaleString()}`;

  return reportMessage;
}

// Function to handle POST requests
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var message = data.message;
    sendTypingAction(message.chat.id);

    var chatId = String(message.chat.id);
    if (chatId !== TG_ALLOWED_USER_ID) { // Compare as string
      sendTelegramMessage(chatId, "🚨 You are not authorized to use this bot.");
      return;
    }

    // Check if the message contains text
    if (!message.text) {
      sendTelegramMessage(TG_ALLOWED_USER_ID, "❌ Sorry, the bot can only receive text messages.");
      return;
    }

    var text = message.text;

    if (text === "/start") {
      sendTelegramMessage(TG_ALLOWED_USER_ID, "🚀");
      return;
    } else if (text === "/database") {
      sendTelegramMessage(TG_ALLOWED_USER_ID, "📝 [Database](REPLACE_ME!)");
      return;
    } else if (text === "/dashboard") {
      sendTelegramMessage(TG_ALLOWED_USER_ID, "🚧 Dashboard is still under development");
      return;
    } else if (text === "/report") {
      reportMessage = generateMonthlyReport();
      sendTelegramMessage(TG_ALLOWED_USER_ID, reportMessage);
      return;
    } else if (text === "/exportcsv") {
      const csvBlob = exportSheetToCsv();
      if (csvBlob) {
        sendTelegramDocument(chatId, csvBlob, "📝 Data exported to CSV");
      } else {
        sendTelegramMessage(chatId, "❌ Failed to export or sheet not found.");
      }
      return;
    } else if (text === "/chatgpt") {
      sendTelegramMessage(TG_ALLOWED_USER_ID, "🤖 [Chat GPT](REPLACE_ME!)");
      return;
    } else {
      var response = callGroqAPI(text);
      var message = formatJsonMessage(response);

      addData(response);
      sendTelegramMessage(TG_ALLOWED_USER_ID, message);
    }

  } catch (error) {
    logError(error.message);
  }
}

function exportSheetToCsv() {
  try {
    const sheetName = "data"; // Change to the sheet name you want to export
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      Logger.log("Sheet not found: " + sheetName);
      return null;
    }

    // Get data up to column F
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(1, 1, lastRow, 6); // Start from row 1, column 1, to the last row, column 6 (F)
    const data = dataRange.getValues();

    let csvString = "";
    for (let i = 0; i < data.length; i++) {
      const rowData = data[i].map((cell, index) => {
        let value = cell;
        // Format the date column (assumed in the second column, index 1)
        if (index === 1 && cell instanceof Date) {
          const year = cell.getFullYear();
          const month = ("0" + (cell.getMonth() + 1)).slice(-2);
          const day = ("0" + cell.getDate()).slice(-2);
          const hours = ("0" + cell.getHours()).slice(-2);
          const minutes = ("0" + cell.getMinutes()).slice(-2);
          const seconds = ("0" + cell.getSeconds()).slice(-2);
          value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Format YYYY-MM-DD HH:mm:ss
        }
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(",");
      csvString += rowData + "\n";
    }

    const fileName = sheetName.replace(/ /g, "_") + ".csv";
    Logger.log(csvString);
    return Utilities.newBlob(csvString, "text/csv", fileName);
  } catch (error) {
    logError(error.message);
  }
}

/**
 * Format date to 'YYYY-MM-DD HH:mm:ss'
 */
function formatDate(date) {
  return date.getFullYear() + "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("0" + date.getDate()).slice(-2) + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2) + ":" +
    ("0" + date.getSeconds()).slice(-2);
}