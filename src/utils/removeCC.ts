export function removeCC(index: number, list: string[]) {
  return list.filter((_, i) => i !== index);
}
