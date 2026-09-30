// This file contains the data structure for chat messages and an initial welcome message.
export interface ChatMessage {
  id: number;
  type: 'welcome' | 'user' | 'assistant';
  message: string;
  createdAt: Date;
  performanceTime?: string;
}