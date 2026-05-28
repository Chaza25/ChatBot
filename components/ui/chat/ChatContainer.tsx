"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Sparkles } from "lucide-react";
import TypingIndicator from "./TypingIndicator";
import Sidebar from "../layout/Sidebar";
import { Conversation, Message } from "@/types/chat";

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hola, soy tu AI Support Assistant. Puedo ayudarte con ventas, soporte técnico, facturación o consultas generales.",
  },
];

const initialConversations: Conversation[] = [
  {
    id: "1",
    title: "Nueva conversación",
    createdAt: "Ahora",
    messages: initialMessages,
  },
];

export default function ChatContainer() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] =
    useState("1");
  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
    );
  const [isMounted, setIsMounted] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedConversations = localStorage.getItem(
            "ai-support-conversations"
        );

        if (storedConversations) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setConversations(JSON.parse(storedConversations));
        }

        setIsMounted(true);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [activeConversation?.messages, isLoading]);

    useEffect(() => {
        if (!isMounted) return;

        localStorage.setItem(
            "ai-support-conversations",
            JSON.stringify(conversations)
        );
    }, [conversations, isMounted]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputValue,
    };

    setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
            conversation.id === activeConversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, userMessage],
                }
            : conversation
        )
    );
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...(activeConversation?.messages || []), userMessage],
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message,
      };

      setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
            conversation.id === activeConversationId
            ? {
                ...conversation,
                messages: [
                    ...conversation.messages,
                    assistantMessage,
                ],
                }
            : conversation
        )
      );
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Ocurrió un error al procesar tu consulta.",
      };

      setConversations((prevConversations) =>
        prevConversations.map((conversation) =>
            conversation.id === activeConversationId
            ? {
                ...conversation,
                messages: [
                    ...conversation.messages,
                    errorMessage,
                ],
                }
            : conversation
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateConversation = () => {
    const newConversation: Conversation = {
        id: crypto.randomUUID(),
        title: "Nueva conversación",
        createdAt: "Ahora",
        messages: [
        {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
            "Hola, soy tu AI Support Assistant. ¿Cómo puedo ayudarte hoy?",
        },
        ],
    };

    setConversations((prevConversations) => [
        newConversation,
        ...prevConversations,
    ]);

    setActiveConversationId(newConversation.id);
  };

  return (
    <section className="flex h-screen bg-background">
        <Sidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            onSelectConversation={setActiveConversationId}
            onCreateConversation={handleCreateConversation}
        />

        <div className="flex flex-1 flex-col">
        <header className="border-b bg-card/50 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <Sparkles className="h-5 w-5" />
                </div>

                <div>
                    <h1 className="text-lg font-semibold">
                        AI Support Assistant
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Intelligent SaaS customer support orchestration
                    </p>
                </div>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto">
            <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
            {activeConversation?.messages.map((message) => (
                <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                />
            ))}

            {isLoading && (
                <div className="flex justify-start">
                    <TypingIndicator />
                </div>
            )}

            <div ref={bottomRef} />
            </div>
        </div>

        <div className="border-t bg-card/30 backdrop-blur">
            <ChatInput
                value={inputValue}
                isLoading={isLoading}
                onChange={setInputValue}
                onSendMessage={handleSendMessage}
            />
        </div>
        </div>
    </section>
    );
}