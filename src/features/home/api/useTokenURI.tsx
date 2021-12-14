import { Contract } from 'ethers';
import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ITokenURI } from '../types';

const contractABI = ['function tokenURI(uint256 _tokenId) external view returns (string memory)'];

function getTokenURI() {
  return async (
    _: string,
    library: Web3Provider,
    contracts: Array<string>,
    tokenIds: Array<string>,
  ): Promise<Array<ITokenURI>> => {
    const contractObjects = contracts.map((c) => new Contract(c, contractABI, library));

    const tokenPromises = Promise.all(
      contractObjects.map((contract, idx) => {
        return contract
          .tokenURI(tokenIds[idx])
          .then((res: string) => ({ tokenId: tokenIds[idx], resourceUrl: res }));
      }),
    );

    const results = await tokenPromises;

    const filterByString = results.filter((res: ITokenURI) => typeof res.resourceUrl === 'string');

    // I only care about actual urls and not encoded json to keep it simple
    const filterBySchema = filterByString.filter((res: ITokenURI) => {
      if (res.resourceUrl.includes('data:application/json')) {
        return;
      }

      return res;
    });

    return filterBySchema;
  };
}

export function useTokenURI(contracts: Array<string>, tokenIds: Array<string>) {
  const { library } = useWeb3React<Web3Provider>();

  const shouldFetch = !!library && contracts?.length > 0 && tokenIds?.length > 0;

  const { data, error } = useSWR(
    shouldFetch ? ['GetTokenURI', library, contracts, tokenIds] : null,
    getTokenURI(),
  );

  return { isLoading: !data && !error, isError: error, uris: data };
}
