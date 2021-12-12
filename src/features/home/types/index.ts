type NFTItem = {
  contract_address: string;
  logo_url: string;
  contract_name: string;
  contract_ticker_symbol: string;
};

type NFTList = Array<NFTItem>;

export type { NFTItem, NFTList };
