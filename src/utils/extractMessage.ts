export function extractMessage(replyValue: any): string {
  return replyValue?.[0]?.children?.[0]?.text || "";
}
