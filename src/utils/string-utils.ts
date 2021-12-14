export function shortenAddress(address: string, startLength: number = 5): string {
  return `${address.substring(0, startLength)}...${address.substring(address.length - 4)}`;
}

export function normalizeUrl(url: string) {
  if (url.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${url.substring(7)}`;
  }

  if (url.startsWith('http://')) {
    return `https://${url.substring(7)}`;
  }

  return url;
}
