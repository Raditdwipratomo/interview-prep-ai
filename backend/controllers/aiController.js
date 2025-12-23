const Groq = require("groq-sdk");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private

// @desc    Generate interview questions and answers using Groq
// @route   POST /api/ai/generate-questions
// @access  Private

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
            "You are an AI that ONLY returns valid JSON. Do not include explanations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const rawText = completion.choices[0].message.content;

    // Parse JSON safely
    const data = JSON.parse(rawText);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Groq Error:", error);

    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Generate explains a interview question
// @route   POST /api/ai/generate-explanation
// @access  Private

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
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const rawText = completion.choices[0].message.content;

    // Parse JSON safely
    const data = JSON.parse(rawText);

    return res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate questions", error: error.message });
  }
};

module.exports = { generateConceptExplanation, generateInterviewQuestions };
