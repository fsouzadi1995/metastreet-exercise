import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import axios from '../../../lib/axios';
import { NFTList } from '../types';

function getNFTs() {
  return async (_: string, chainId: number, address: string): Promise<NFTList> => {
    const { data } = await axios.get<{ items: NFTList }>(
      `${chainId}/address/${address}/balances_v2/`,
      {
        params: {
          'quote-currency': 'USD',
          format: 'JSON',
          nft: true,
        },
      },
    );

    return data.items;
  };
}

export function useNFTs() {
  const { account, chainId } = useWeb3React();

  const shouldFetch = typeof account === 'string' && typeof chainId === 'number';

  const { data, error } = useSWR(shouldFetch ? ['GetNFTs', chainId, account] : null, getNFTs());

  return { isLoading: !data && !error, isError: error, nfts: data };
}
