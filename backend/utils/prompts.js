const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are a senior technical interviewer and educator.

Your task is to generate high-quality technical interview questions and answers.

STRICT OUTPUT RULES (MUST FOLLOW):
- Return ONLY valid JSON
- Do NOT use markdown formatting
- Do NOT use triple backticks
- Do NOT include \\n, comments, or explanations outside JSON
- Do NOT include bullet points or numbering
- Do NOT include emojis
- Answers must be plain text only
- Each answer must be written as clear, well-structured paragraphs
- The JSON must be directly parsable without modification

CONTENT RULES:
- Target a beginner to junior-level developer
- Explanations must be detailed, descriptive, and easy to understand
- Use simple language but explain concepts thoroughly
- Avoid unnecessary jargon unless explained clearly
- If a code example is required, include it as inline plain text inside the answer, not as a code block

TASK DETAILS:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Generate exactly ${numberOfQuestions} interview questions
- Each question must be practical and commonly asked in real interviews
- Each answer must clearly explain the concept, why it matters, and how it is used in real-world scenarios

OUTPUT FORMAT (EXACT STRUCTURE):
[
  {
    "question": "Clear and specific interview question?",
    "answer": "Detailed, beginner-friendly explanation written in paragraph form only."
  }
]

IMPORTANT:
- Do NOT add any text before or after the JSON
- Do NOT add additional fields
- Ensure JSON syntax is 100% valid
`;

const conceptExplainPrompt = (question) => `
You are an experienced software engineer and technical writer.

Your task is to explain a technical interview question and its underlying concept in depth for beginner developers.

STRICT OUTPUT RULES (MUST FOLLOW):
- Return ONLY valid JSON
- Do NOT use markdown formatting
- Do NOT use triple backticks
- Do NOT include \\n, comments, or explanations outside JSON
- Do NOT include bullet points or numbering
- Do NOT include emojis
- Use plain text only
- The explanation must be written in paragraph form
- The JSON must be directly parsable without modification

CONTENT GUIDELINES:
- Explain the concept step by step in a clear and descriptive way
- Assume the reader has basic programming knowledge
- Explain why the concept exists, how it works, and when it is used
- Relate the concept to real-world development scenarios
- If a code example is necessary, include it as inline plain text inside the explanation

TASK:
- Explain the following interview question in depth:
"${question}"

- After the explanation, generate a short, clear, and descriptive title summarizing the concept

OUTPUT FORMAT (EXACT STRUCTURE):
{
  "title": "Short and clear concept title",
  "explanation": "Detailed explanation written in paragraph form only."
}

IMPORTANT:
- Do NOT add any text before or after the JSON
- Do NOT add additional fields
- Ensure JSON syntax is 100% valid
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
