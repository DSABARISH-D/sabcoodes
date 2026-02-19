const https = require('https');

const MODELS_TO_TRY = [
  'gemini-2.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-pro-latest',
];

function callGemini(model, prompt, apiKey) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 8192 }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) return reject(new Error(`${model}: ${response.error.message}`));
          const textResponse = response.candidates[0].content.parts[0].text;
          resolve(textResponse);
        } catch (e) {
          reject(new Error(`${model}: Failed to parse response`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function generateQuestionsFromPDF(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set in .env');

  const prompt = `You are an expert coding interview question generator.
The following text is extracted from a PDF that may contain one or more coding questions or problems.
Extract ALL distinct problems/questions and generate structured coding questions for each one.

PDF Content:
"${text.substring(0, 6000)}"

Output ONLY a valid JSON array (even if just 1 question) with NO markdown, NO code blocks:
[
  {
    "title": "Short descriptive title",
    "description": "Clear problem statement with examples and constraints",
    "difficulty": "Easy",
    "starter_code": {
      "java": "// Write your solution here",
      "python": "# Write your solution here",
      "javascript": "// Write your solution here",
      "cpp": "// Write your solution here",
      "c": "// Write your solution here"
    },
    "test_cases": [
      { "input": "example input 1", "expected": "expected output 1" },
      { "input": "example input 2", "expected": "expected output 2" },
      { "input": "example input 3", "expected": "expected output 3" },
      { "input": "example input 4", "expected": "expected output 4" },
      { "input": "example input 5", "expected": "expected output 5" },
      { "input": "example input 6", "expected": "expected output 6" }
    ]
  }
]

Important:
- Generate one entry per distinct problem found in the PDF
- Each question MUST have exactly 6 test_cases
- Return an array always, even for a single question`;

  let lastError;
  for (const model of MODELS_TO_TRY) {
    try {
      console.log(`[Gemini] Trying model: ${model}`);
      const textResponse = await callGemini(model, prompt, apiKey);
      const jsonStr = textResponse.replace(/^```json\n?/, '').replace(/^```\n?/, '').replace(/\n?```$/, '').trim();
      const result = JSON.parse(jsonStr);
      // Ensure it's always an array
      const questions = Array.isArray(result) ? result : [result];
      console.log(`[Gemini] Success with model: ${model}, extracted ${questions.length} question(s)`);
      return questions;
    } catch (e) {
      console.warn(`[Gemini] Failed with ${model}: ${e.message}`);
      lastError = e;
    }
  }

  throw new Error('All Gemini models failed. Last error: ' + lastError.message);
}

module.exports = { generateQuestionsFromPDF };
