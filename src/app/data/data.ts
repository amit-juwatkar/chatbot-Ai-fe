//imoprt models
import { ChatMessage } from "../models/models";

// Initial welcome message to be displayed when the chat starts
export const data: ChatMessage[] = [
  {
    id: 1,
    type: 'welcome',
    message: '🤖 Hi There! Welcome to AI Assistant. Ask me anything to get started.',
    createdAt: new Date(),
    performanceTime: '00.00s'
  }
];

// This file also contains a list of AI models that can be used in the chat application.
export const AIModel : string[] = [ 
    "llama3", "deepseek-coder-v2"
];  

//Bot Status
export const botStatus : string[] = [
    "Online", "Offline", "Busy"
];