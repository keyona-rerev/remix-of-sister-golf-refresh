/**
 * SisterGolf Lead Intake
 * Receives contact form posts from the website, adds one row to a Google Sheet,
 * and emails the owner. Reply-To is the lead's address.
 *
 * SETUP (one time):
 * 1. Run setup(). Approve the permissions.
 * 2. Deploy > New deployment > Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 3. Copy the Web app URL into the website config.
 * 4. Run sendTestLead() to check the Sheet and the email.
 */

var SHEET_NAME = 'Leads';
var HEADERS = ['Received', 'Name', 'Email', 'Organization', 'Interest', 'Message', 'Status'];
var STATUSES = ['New', 'Contacted', 'Meeting booked', 'Won', 'Closed'];
var MAX_LEN = { name: 120, email: 200, organization: 200, interest: 60, message: 5000 };

function setup() {
  var props = PropertiesService.getScriptProperties();
  var ss;
  var id = props.getProperty('SHEET_ID');
  if (id) {
    ss = SpreadsheetApp.openById(id);
  } else {
    ss = SpreadsheetApp.create('SisterGolf Leads');
    props.setProperty('SHEET_ID', ss.getId());
  }

  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setColumnWidth(6, 420);
    sh.getRange(2, 7, 1000, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
    );
  }
  var blank = ss.getSheetByName('Sheet1');
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) {
    ss.deleteSheet(blank);
  }

  if (!props.getProperty('NOTIFY_EMAIL')) {
    props.setProperty('NOTIFY_EMAIL', Session.getEffectiveUser().getEmail());
  }

  Logger.log('DONE. Leads sheet: ' + ss.getUrl());
  Logger.log('Notice emails go to: ' + props.getProperty('NOTIFY_EMAIL'));
  Logger.log('Next: Deploy > New deployment > Web app.');
}

function doGet() {
  return json_({ ok: true, message: 'SisterGolf lead intake is running.' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    var data = {};
    try {
      data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    } catch (err) {
      return json_({ ok: false, error: 'Bad request.' });
    }

    // Spam trap. Real people never fill this hidden field.
    if (data.website) {
      return json_({ ok: true });
    }

    var lead = {
      name: clean_(data.name, MAX_LEN.name),
      email: clean_(data.email, MAX_LEN.email),
      organization: clean_(data.organization, MAX_LEN.organization),
      interest: clean_(data.interest, MAX_LEN.interest),
      message: clean_(data.message, MAX_LEN.message)
    };

    if (!lead.name || !lead.message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) {
      return json_({ ok: false, error: 'Please fill in name, a valid email, and a message.' });
    }

    saveLead_(lead);
    notify_(lead);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'Something went wrong. Please try again.' });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function sendTestLead() {
  var lead = {
    name: 'Test Lead',
    email: Session.getEffectiveUser().getEmail(),
    organization: 'Test Company',
    interest: 'Corporate workshop',
    message: 'This is a test from sendTestLead(). You can delete this row.'
  };
  saveLead_(lead);
  notify_(lead);
  Logger.log('Test lead saved and email sent. Check the Leads sheet and your inbox.');
}

function saveLead_(lead) {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!id) throw new Error('Run setup() first.');
  var sh = SpreadsheetApp.openById(id).getSheetByName(SHEET_NAME);
  sh.appendRow([
    new Date(),
    safeCell_(lead.name),
    safeCell_(lead.email),
    safeCell_(lead.organization),
    safeCell_(lead.interest),
    safeCell_(lead.message),
    'New'
  ]);
}

function notify_(lead) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var sheetUrl = id ? SpreadsheetApp.openById(id).getUrl() : '';
  var body = [
    'New inquiry from the SisterGolf website.',
    '',
    'Name: ' + lead.name,
    'Email: ' + lead.email,
    'Organization: ' + (lead.organization || '-'),
    'Interest: ' + (lead.interest || '-'),
    '',
    'Message:',
    lead.message,
    '',
    'All leads: ' + sheetUrl
  ].join('\n');
  MailApp.sendEmail({
    to: to,
    replyTo: lead.email,
    subject: 'New SisterGolf inquiry: ' + (lead.interest || 'General') + ' - ' + lead.name,
    body: body
  });
}

function clean_(value, max) {
  return String(value == null ? '' : value).trim().slice(0, max);
}

// Stops a cell from running as a formula.
function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
