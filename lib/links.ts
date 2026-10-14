import { JOIN_KEYWORD, PILOT_PHONE, type Action } from "@/content/site";

// Turn a displayed number into one a phone can dial.
// "+1-555-0100" -> "+15550100", "1-833-852-6262" -> "+18338526262", "988" -> "988".
export function dialable(number: string): string {
  const digits = number.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
}

export function telHref(number: string): string {
  return `tel:${dialable(number)}`;
}

// "?&body=" pre-fills the message on both phones:
// Android reads the "?" query, iPhone reads "&body=".
export function smsHref(number: string, body?: string): string {
  const query = body ? `?&body=${encodeURIComponent(body)}` : "";
  return `sms:${dialable(number)}${query}`;
}

export function actionHref(action: Action): string {
  return action.kind === "call" ? telHref(action.number) : smsHref(action.number, action.body);
}

export const joinHref = smsHref(PILOT_PHONE, JOIN_KEYWORD);
