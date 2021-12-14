import useSWR from 'swr';
import axios from '../../../lib/axios';
import { ERC721Metadata, ITokenURI, NFTList } from '../types';
import { normalizeUrl } from '../../../utils/string-utils';

function getNFTMetadata() {
  return async (_: string, nfts: NFTList, uris: Array<ITokenURI>) => {
    const mappedUris = uris.map(
      (uri) => ({ ...uri, resourceUrl: normalizeUrl(uri.resourceUrl) } as ITokenURI),
    );

    const promises = Promise.all<ERC721Metadata[] | any>(
      mappedUris.map((uri) =>
        axios.get<ERC721Metadata>(uri.resourceUrl, { params: { key: undefined } }),
      ),
    );

    const results = await promises;

    console.log(results);

    const intersectedResults = results.map((data: ERC721Metadata) => {
      if (!data.image) {
        return;
      }

      const match = nfts.find((nft) => {
        const [firstNft] = nft.nft_data!;
        const { token_id } = firstNft;

        // Hard to implement matching logic since most json schemas aren't normalized
        if (token_id === data.tokenId || data.name.includes(token_id)) {
          return nft;
        }

        return undefined;
      });

      return match ? { ...match, image: data.image } : null;
    });

    return intersectedResults.filter(Boolean) as NFTList;
  };
}

export function useNFTMetadata(nfts: NFTList, uris: Array<ITokenURI>) {
  const shouldFetch = nfts?.length > 0 && uris?.length > 0;

  const { data, error } = useSWR(
    shouldFetch ? ['GetNFTMetadata', nfts, uris] : null,
    getNFTMetadata(),
  );

  return { isLoading: !data && !error, isError: error, nftsWithMetadata: data };
}
