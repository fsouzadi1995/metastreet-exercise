enum SupportedERCS {
  ERC20 = 'erc20',
  ERC721 = 'erc20',
  ERC1155 = 'erc1155',
}

// Only taking into account the properties that we actually care about
interface AbstractToken {
  contract_address: string;
  contract_name: string;
  contract_ticker_symbol: string;
  supports_erc: Array<SupportedERCS>;
  nft_data: null | NFTData[];
  type: 'nft' | 'cryptocurrency' | 'dust';
}

interface NFTItem extends AbstractToken {
  type: 'nft';
  resourceUrl: string;
  image?: string;
}

type NFTData = {
  token_id: string;
  token_url: string;
};

type NFTList = Array<NFTItem>;

// Once again, skipping unneeded fields for this specific use case
type ERC721Metadata = {
  name: string;
  tokenId?: string;
  image?: string;
};

interface ITokenURI {
  tokenId: string;
  resourceUrl: string;
}

export type { AbstractToken, NFTItem, NFTList, ERC721Metadata, ITokenURI };
export { SupportedERCS };
