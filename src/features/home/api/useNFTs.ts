import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import axios from '../../../lib/axios';
import { NFTList, SupportedERCS } from '../types';
import { covalentBaseUrl } from '../../../config/static.json';
import { useTokenURI } from './useTokenURI';
import { useNFTMetadata } from './useNFTMetadata';

// Hardcoded address since I don't own any ERC-720/ERC-1155
function getNFTs() {
  return async (_: string, chainId: number): Promise<NFTList> => {
    const { data } = await axios.get<{ items: NFTList }>(
      `${covalentBaseUrl}/${chainId}/address/${'0x495f947276749ce646f68ac8c248420045cb7b5e'}/balances_v2/`,
      {
        params: {
          'quote-currency': 'USD',
          format: 'JSON',
          nft: true,
        },
      },
    );

    const filteredByType = data.items.filter((item) => item.type === 'nft');
    const filteredByNFTData = filteredByType.filter(
      (item) => item.nft_data && item.nft_data.length > 0,
    );

    // Intersect ERCs
    const filteredByERC = filteredByNFTData.filter((item) => {
      const setA = new Set(item.supports_erc);
      const setB = new Set([SupportedERCS.ERC721, SupportedERCS.ERC1155]);

      return new Set([...setA].filter((erc) => setB.has(erc)));
    });

    return filteredByERC;
  };
}

export function useNFTs() {
  const { chainId } = useWeb3React();

  const shouldFetch = typeof chainId === 'number';

  const { data, error: GetNFTError } = useSWR(shouldFetch ? ['GetNFTs', chainId] : null, getNFTs());

  const tokenIds = data ? data.map((nft) => nft.nft_data![0].token_id) : [];
  const addresses = data ? data.map((nft) => nft.contract_address) : [];

  const { uris, isError: GetTokenURIError } = useTokenURI(addresses, tokenIds);
  const { nftsWithMetadata, isError: GetNFTMetadataError } = useNFTMetadata(data ?? [], uris ?? []);

  const errors = [GetNFTError, GetTokenURIError, GetNFTMetadataError];

  return {
    isLoading: !nftsWithMetadata && !errors.every(Boolean),
    isError: errors.some(Boolean),
    nfts: nftsWithMetadata,
  };
}
