import { useWeb3React } from '@web3-react/core';
import { useNFTs } from '../api/useNFTs';
import NFTCard from './NFTCard';

const dummyCards = Array.from({ length: 6 }, (_, idx) => ({
  id: idx + 1,
  contract_address: '',
  logo_url: '',
  contract_name: '',
  contract_ticker_symbol: '',
}));

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
    <div className='grid grid-cols-3 gap-10'>
      {(isLoading ? dummyCards : nfts!).map((item, idx) => (
        <NFTCard key={idx} {...item} />
      ))}
    </div>
  );
}

export default NFTGrid;
