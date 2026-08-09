import axios from "axios";

const chatbotApi = axios.create({
baseURL: "http://localhost:8000",
});

export const sendMessageToChatbot = async (message) => {
const response = await chatbotApi.post("/chat", {
message: message,
});

return response.data.response;
};
