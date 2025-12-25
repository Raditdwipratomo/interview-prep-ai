const extractJSON = (text) => {
  const startObject = text.indexOf("{");
  const startArray = text.indexOf("[");

  let start;
  let openChar;
  let closeChar;

  if (startObject === -1 && startArray === -1) {
    throw new Error("No JSON found in AI response");
  }

  if (startArray !== -1 && (startObject === -1 || startArray < startObject)) {
    start = startArray;
    openChar = "[";
    closeChar = "]";
  } else {
    start = startObject;
    openChar = "{";
    closeChar = "}";
  }

  let depth = 0;
  let end = -1;

  for (let i = start; i < text.length; i++) {
    if (text[i] === openChar) depth++;
    if (text[i] === closeChar) depth--;

    if (depth === 0) {
      end = i + 1;
      break;
    }
  }

  if (end === -1) {
    throw new Error("Incomplete JSON returned by AI");
  }

  const jsonString = text.slice(start, end).trim();
  return JSON.parse(jsonString);
};

module.exports = { extractJSON };
