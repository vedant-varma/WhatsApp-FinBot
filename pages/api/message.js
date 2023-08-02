// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openAI = new OpenAIApi(configuration);

// export default async function handler(req, res) {
//   const MessagingResponse = require('twilio').twiml.MessagingResponse;
//   const messageResponse = new MessagingResponse();

//   // Generate a response using the OpenAI API
//   const prompt = `You are a helpful financial modeling assistant. ${req.body.Body}`;
//   const completion = await openAI.createCompletion({
//     model: "text-davinci-003",
//     prompt: prompt,
//     temperature: 0.6,
//     max_tokens: 150,
//   });

//   // Send the response back to the client
//   messageResponse.message(completion.data.choices[0].text.trim());

//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(messageResponse.toString());
// }


import { Configuration, OpenAIApi } from "openai";
const fs = require("fs");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  const messageResponse = new MessagingResponse();

  // Define the full path to the JSON file
  const jsonFilePath = "C:\\Users\\varma\\Downloads\\simplified_financial_data.json";


  // Load financial data from the JSON file
  const financialData = JSON.parse(fs.readFileSync(jsonFilePath));

  // Generate a response using the OpenAI API
  const prompt = `You are a CFO assistant. Given the following financial data, use it as a reference for any questions that I may have, do not tell me about the data unless I ask specificaly about it. If unsure, say you don't know.
    Current Revenue: ${financialData.Revenue.Current}
    Revenue Growth: ${financialData.Revenue.GrowthRate}
    Projected Revenue: ${financialData.Revenue.Projection}
    Employee Salaries: ${financialData.Costs.EmployeeSalaries}
    Cloud Services: ${financialData.Costs.CloudServices}
    Gross Margin: ${financialData.Profitability.GrossMargin}
    Net Profit Margin: ${financialData.Profitability.NetProfitMargin}
    Current Cash Flow: ${financialData.CashFlow.Current}
    ROI on Recent Project: ${financialData.CashFlow.ROI}
    Current Funding: ${financialData.Funding.Current}
    Company Valuation: ${financialData.Valuation.Current}
    ${req.body.Body}`;
  const completion = await openAI.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 150,
  });

  // Send the response back to the client
  messageResponse.message(completion.data.choices[0].text.trim());

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(messageResponse.toString());
}






