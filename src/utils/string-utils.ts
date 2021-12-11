export function shortenAddress(
  address: string,
  startLength: number = 5
): string {
  return `${address.substring(0, startLength)}...${address.substring(
    address.length - 4
  )}`;
}
