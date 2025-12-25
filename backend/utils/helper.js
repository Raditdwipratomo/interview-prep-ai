const extractJSON = (text) => {
  const firstBrace = text.indexOf("{");
  const firstBracket = text.indexOf("[");

  const start =
    firstBrace === -1
      ? firstBracket
      : firstBracket === -1
      ? firstBrace
      : Math.min(firstBrace, firstBracket);

  if (start === -1) {
    throw new Error("No JSON found in AI response");
  }

  const jsonString = text.slice(start).trim();
  return JSON.parse(jsonString);
};

module.exports = { extractJSON };
