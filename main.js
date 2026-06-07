require('dotenv').config()
const {findSimilarCompanies} = require('./services/ocean')
const {findDecisionMakers} = require('./services/prospeo')
const { sendEmail } = require("./services/brevo");
const { generateEmail } = require("./utils/generateEmail");

const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}) 

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function runPipeline() {
  const domain = await askQuestion("Enter company domain: ");

  console.log("Starting pipeline");
  console.log("Domain:", domain);

  const companies = await findSimilarCompanies(domain);

  for (const company of companies.slice(0, 1)) {
    const contacts = await findDecisionMakers(company);

    for (const contact of contacts.slice(0, 3)) {
      const emailBody = generateEmail(contact, company);

      console.log("OUTREACH EMAIL");
      console.log(`To: ${contact.email}`);
      console.log(`LinkedIn: ${contact.linkedin}`);
      console.log(`Status: ${contact.emailStatus}\n`);
      console.log(emailBody);
    }
  }

  rl.close();
}

runPipeline();
