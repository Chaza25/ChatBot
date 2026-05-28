export type Intent = "sales" | "support" | "billing" | "general";

export function detectIntent(message: string): Intent {
  const normalizedMessage = message.toLowerCase();

  const salesKeywords = [
    "precio",
    "precios",
    "plan",
    "planes",
    "comprar",
    "contratar",
    "venta",
    "ventas",
    "demo",
  ];

  const supportKeywords = [
    "error",
    "problema",
    "bug",
    "no funciona",
    "ayuda",
    "soporte",
    "fallo",
    "pantalla",
  ];

  const billingKeywords = [
    "factura",
    "facturación",
    "pago",
    "pagos",
    "cobro",
    "tarjeta",
    "recibo",
    "suscripción",
  ];

  if (salesKeywords.some((keyword) => normalizedMessage.includes(keyword))) {
    return "sales";
  }

  if (supportKeywords.some((keyword) => normalizedMessage.includes(keyword))) {
    return "support";
  }

  if (billingKeywords.some((keyword) => normalizedMessage.includes(keyword))) {
    return "billing";
  }

  return "general";
}