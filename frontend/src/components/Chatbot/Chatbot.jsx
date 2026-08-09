import { useState } from "react";
import { sendMessageToChatbot } from "../../services/chatbotService";
import "./Chatbot.css";

function Chatbot() {
const [isOpen, setIsOpen] = useState(false);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([
{
sender: "bot",
text: "Hi! I'm MarketMate. How can I help you today?",
},
]);
const [loading, setLoading] = useState(false);

const handleSend = async () => {
const userMessage = message.trim();


if (!userMessage || loading) {
  return;
}

setMessages((previousMessages) => [
  ...previousMessages,
  {
    sender: "user",
    text: userMessage,
  },
]);

setMessage("");
setLoading(true);

try {
  const botResponse = await sendMessageToChatbot(userMessage);

  setMessages((previousMessages) => [
    ...previousMessages,
    {
      sender: "bot",
      text: botResponse,
    },
  ]);
} catch (error) {
  console.error("Chatbot error:", error);

  setMessages((previousMessages) => [
    ...previousMessages,
    {
      sender: "bot",
      text: "Sorry, I'm unable to connect to MarketMate right now.",
    },
  ]);
} finally {
  setLoading(false);
}


};

const handleKeyDown = (event) => {
if (event.key === "Enter") {
handleSend();
}
};

return (
<>
{isOpen && ( <div className="chatbot-window">


      <div className="chatbot-header">
        <div>
          <strong>MarketMate</strong>
          <span>AI Assistant</span>
        </div>

        <button
          className="chatbot-close"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((chat, index) => (
          <div
            key={index}
            className={
              chat.sender === "user"
                ? "chat-message user-message"
                : "chat-message bot-message"
            }
          >
            {chat.text}
          </div>
        ))}

        {loading && (
          <div className="chat-message bot-message">
            MarketMate is typing...
          </div>
        )}
      </div>

      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Ask MarketMate..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>

    </div>
  )}

  <button
    className="chatbot-button"
    onClick={() => setIsOpen(!isOpen)}
  >
    💬
  </button>
</>

);
}

export default Chatbot;
