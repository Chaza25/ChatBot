"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hola, soy tu AI Support Assistant. Puedo ayudarte con ventas, soporte técnico, facturación o consultas generales.",
  },
];

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: inputValue,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content:
        "Entiendo tu consulta. En la próxima etapa voy a responder usando inteligencia artificial.",
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      assistantMessage,
    ]);

    setInputValue("");
    setIsLoading(false);
  };

  return (
    <section className="flex h-screen flex-col bg-background">
      <header className="border-b px-6 py-4">
        <p className="text-sm text-muted-foreground">AI Support Assistant</p>
        <h1 className="text-xl font-semibold">Centro de soporte inteligente</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          {isLoading && (
            <ChatMessage
              role="assistant"
              content="Analizando tu consulta..."
            />
          )}
        </div>
      </div>

      <ChatInput
        value={inputValue}
        isLoading={isLoading}
        onChange={setInputValue}
        onSendMessage={handleSendMessage}
      />
    </section>
  );
}