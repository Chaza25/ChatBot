import { NextResponse } from "next/server";
import { detectIntent } from "@/lib/intent-detector";
import { getAgentByIntent } from "@/lib/agentes";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const lastMessage = messages[messages.length - 1];

    const detectedIntent = detectIntent(lastMessage.content);

    const selectedAgent = getAgentByIntent(detectedIntent);

    return NextResponse.json({
      message: `[${selectedAgent.role}] ${selectedAgent.description}

Respuesta simulada para: "${lastMessage.content}"`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}