import { useWeb3React } from '@web3-react/core';
import { useNFTs } from '../api/useNFTs';
import { NFTList, SupportedERCS } from '../types';
import NFTCard from './NFTCard';

const dummyCards = Array.from({ length: 6 }, (_, idx) => ({
  id: idx + 1,
  contract_address: '',
  logo_url: '',
  contract_name: '',
  contract_ticker_symbol: '',
  resourceUrl: '',
  nft_data: null,
  type: 'nft',
  supports_erc: [SupportedERCS.ERC721, SupportedERCS.ERC1155],
})) as NFTList;

function NFTGrid(): JSX.Element | null {
  const { active } = useWeb3React();
  const { nfts, isLoading, isError } = useNFTs();

  if (!active) {
    return null;
  }

  if (isError) {
    return <div>An error has ocurred</div>;
  }

  return (
    <div className='px-6 grid gap-10 grid-cols-1 xs:grid-cols-2 md:grid-cols-3'>
      {(isLoading ? dummyCards : nfts!).map((item, idx) => (
        <NFTCard key={idx} {...item} />
      ))}
    </div>
  );
}

export default NFTGrid;
