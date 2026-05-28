import { Conversation } from "@/types/chat";
import { MessageSquarePlus, Sparkles } from "lucide-react";

type SidebarProps = {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
};

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onCreateConversation,
}: SidebarProps) {
  return (
    <aside className="hidden w-72 border-r bg-card/40 backdrop-blur md:flex md:flex-col">
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              AI Support Assistant
            </h2>

            <p className="text-xs text-muted-foreground">
              SaaS AI Platform
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={onCreateConversation}
          className="flex w-full items-center gap-2 rounded-xl border bg-background px-4 py-3 text-sm font-medium transition hover:bg-muted"
        >
          <MessageSquarePlus className="h-4 w-4" />
          Nueva conversación
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full rounded-xl border p-3 text-left transition ${
              activeConversationId === conversation.id
                ? "border-primary bg-muted"
                : "bg-background hover:bg-muted"
            }`}
          >
            <p className="truncate text-sm font-medium">
              {conversation.title}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {conversation.createdAt}
            </p>
          </button>
        ))}
      </div>
    </aside>
  );
}