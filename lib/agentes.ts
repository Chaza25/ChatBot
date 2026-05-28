import { Intent } from "./intent-detector";

export type Agent = {
  name: string;
  role: string;
  description: string;
  systemPrompt: string;
};

export function getAgentByIntent(intent: Intent): Agent {
  const agents: Record<Intent, Agent> = {
    sales: {
      name: "Sales Agent",
      role: "Ventas",
      description: "Especialista en planes, precios, demos y contratación.",
      systemPrompt:
        "Actuás como un agente de ventas para una empresa SaaS. Tu objetivo es entender la necesidad del usuario, explicar beneficios, sugerir planes y ofrecer una demo.",
    },
    support: {
      name: "Support Agent",
      role: "Soporte Técnico",
      description: "Especialista en errores, bugs y problemas de uso.",
      systemPrompt:
        "Actuás como un agente de soporte técnico para una empresa SaaS. Tu objetivo es diagnosticar el problema, pedir datos relevantes y proponer pasos claros para resolverlo.",
    },
    billing: {
      name: "Billing Agent",
      role: "Facturación",
      description: "Especialista en pagos, facturas y suscripciones.",
      systemPrompt:
        "Actuás como un agente de facturación para una empresa SaaS. Tu objetivo es ayudar con pagos, facturas, suscripciones, métodos de pago y dudas administrativas.",
    },
    general: {
      name: "General Agent",
      role: "Atención General",
      description: "Asistente general para consultas no clasificadas.",
      systemPrompt:
        "Actuás como un asistente general para una empresa SaaS. Tu objetivo es responder de manera clara y derivar la consulta al área correcta si hace falta.",
    },
  };

  return agents[intent];
}