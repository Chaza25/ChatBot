"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  value: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onSendMessage: () => void;
};

export default function ChatInput({
  value,
  isLoading,
  onChange,
  onSendMessage,
}: ChatInputProps) {
  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSendMessage();
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto flex max-w-4xl gap-2">
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Escribí tu consulta..."
          disabled={isLoading}
          className="min-h-12 resize-none"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />

        <Button
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          className="h-12 px-4"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}