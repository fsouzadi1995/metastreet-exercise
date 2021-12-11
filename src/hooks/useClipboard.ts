export function useClipboard() {
  const write = async (text: string) =>
    await navigator.clipboard.writeText(text);

  return { write };
}
