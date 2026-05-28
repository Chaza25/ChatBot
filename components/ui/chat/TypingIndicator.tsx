export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 rounded-2xl border bg-card px-4 py-3 shadow-sm">
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
      <div
        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
}