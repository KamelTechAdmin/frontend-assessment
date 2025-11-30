export const addCC = (email: string, ccList: string[]) => {
  if (!email.trim()) return ccList;

  const trimmed = email.trim();
  if (ccList.includes(trimmed)) return ccList;

  return [...ccList, trimmed];
};
