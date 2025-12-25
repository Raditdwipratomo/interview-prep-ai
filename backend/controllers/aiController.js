const Groq = require("groq-sdk");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");
const { extractJSON } = require("../utils/helper");
// const { extractJSON } = require("../utils/helper");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ===============================
// Generate Interview Questions
// ===============================
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that strictly follows instructions and returns ONLY valid JSON. Do not include any text outside JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 1500,
    });

    const rawText = completion.choices[0].message.content;

    let data;
    try {
      data = extractJSON(rawText);
    } catch (parseError) {
      console.error("JSON Parse Error:", rawText);
      return res.status(500).json({
        message: "Invalid JSON returned by AI",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// ===============================
// Generate Concept Explanation
// ===============================
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that strictly follows instructions and returns ONLY valid JSON. Do not include any text outside JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 1200,
    });

    const rawText = completion.choices[0].message.content;

    let data;
    try {
      data = extractJSON(rawText);
    } catch (parseError) {
      console.error("JSON Parse Error:", rawText);
      return res.status(500).json({
        message: "Invalid JSON returned by AI",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Groq Error:", error);

    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
