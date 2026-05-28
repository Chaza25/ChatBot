import { Bot, User } from "lucide-react";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground shadow-sm">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={`flex max-w-[80%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <span className="text-xs font-medium text-muted-foreground">
          {isUser ? "Tú" : "AI Support Assistant"}
        </span>

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isUser
              ? "rounded-tr-sm bg-primary text-primary-foreground"
              : "rounded-tl-sm border bg-card text-card-foreground"
          }`}
        >
          <p className="whitespace-pre-line">{content}</p>
        </div>
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-muted shadow-sm">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}