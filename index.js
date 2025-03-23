const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let conversationsDB = {};
let conversationNames = {};

const responses = {
  hi: "Hi, This is AI Model. How may I help you?",
  hello: "Hi, This is AI Model. How may I help you?",
  default: "Can you elaborate?",
  bye: "Bye, It was nice talking.",
};

app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase();
  const randomResponse = responses[msg] || responses.default;

  setTimeout(() => {
    res.json({ response: randomResponse });
  }, 1000);
});

app.post("/api/conversations", (req, res) => {
  const { id, messages, feedback, rating } = req.body;
  conversationsDB[id] = { messages, feedback, rating };

  if (messages.length > 0 && !conversationNames[id]) {
    conversationNames[id] = messages[0].text.slice(0, 20);
  }

  res.json({ success: true, id });
});

app.get("/api/conversations", (req, res) => {
  res.json({ conversations: conversationsDB, names: conversationNames });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
