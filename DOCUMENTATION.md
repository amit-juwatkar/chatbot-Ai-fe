# Ollama Frontend Documentation

## Overview

This frontend is an Angular single-page application that provides a chat interface for the Ollama backend. It sends user prompts to the backend and renders the assistant's response as a conversational message stream.

## Purpose

The application allows users to:
- type a prompt into the chat input,
- submit it to the backend through the `/chat` endpoint,
- see their message and the AI response rendered in the UI,
- view a welcome message before any conversation starts.

## Main Components

### App shell

- [src/app/app.ts](src/app/app.ts): root component for the Angular application.
- [src/app/app.routes.ts](src/app/app.routes.ts): routes the default path to the chat screen.

### Chat experience

- [src/app/component/chat.component.ts](src/app/component/chat.component.ts): main logic for message handling and HTTP submission.
- [src/app/component/chat.component.html](src/app/component/chat.component.html): template for the chat UI.
- [src/app/component/chat.component.css](src/app/component/chat.component.css): styling for the chat area.

### Supporting UI

- [src/app/component/header/header.ts](src/app/component/header/header.ts): lightweight header component shown above the chat area.
- [src/app/component/chat-box](src/app/component/chat-box): additional chat-related UI elements if expanded in future work.

## Service Layer

- [src/app/services/chat.services.ts](src/app/services/chat.services.ts): performs the HTTP POST request to the backend.

## Data Layer

- [src/app/data/data.ts](src/app/data/data.ts): defines the `ChatMessage` interface and the initial welcome message.

## Runtime Flow

1. The app initializes with the chat component.
2. A welcome card is loaded from the data module.
3. When the user submits a prompt:
   - the prompt is appended as a user message,
   - the `ChatService` sends the prompt to the backend,
   - the backend response is appended as an assistant message.
4. The UI toggles the loading state during the request.

## Backend Endpoint

The frontend expects the backend at:

- `http://localhost:8000/chat`

### Request example

```json
{
  "prompt": "Hello"
}
```

### Expected response

```json
{
  "response": "Hello! How can I help?"
}
```

## Local Development

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm start
```

Open `http://localhost:4200` in the browser.

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Notes

- The app uses Angular standalone components.
- The chat state is managed using a `BehaviorSubject` in the main component.
- The UI relies on `ngx-scrollbar` for a scrollable chat area.
