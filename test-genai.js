const { GoogleGenAI } = require("@google/genai");

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: "dummy_key_to_see_error" });
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "hello",
      config: {
        systemInstruction: "test",
        responseMimeType: "application/json",
      }
    });
    console.log("Success:", result.text);
  } catch (err) {
    console.error("Test Error:", err);
  }
}

test();
