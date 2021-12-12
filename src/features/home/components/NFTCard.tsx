import { shortenAddress } from '../../../utils/string-utils';
import { NFTItem } from '../types';
import { etherscanBaseUrl } from '../../../config/static.json';
import { FiArrowUpRight } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

type NFTCardProps = NFTItem;

function NFTCard(nft: NFTCardProps): JSX.Element | null {
  return (
    <TokenLink address={nft.contract_address}>
      <div className='min-w-full rounded-lg bg-slate-700 bg-opacity-30 transition-all group-hover:bg-opacity-60'>
        <div className='p-4 bg-slate-700 rounded-tl-lg rounded-tr-lg transition-all group-hover:bg-cyan-800'>
          <div className='font-roboto-mono flex gap-2 items-center text-slate-300 group-hover:text-slate-200'>
            {nft.contract_ticker_symbol ? (
              <>
                {nft.contract_ticker_symbol} <FiArrowUpRight />
              </>
            ) : (
              <Skeleton width={70} baseColor='#1e293b' highlightColor='#334155' />
            )}
          </div>
        </div>
        <div className='p-6'>
          {nft.logo_url ? (
            <img src={nft.logo_url} alt={nft.contract_name} className='w-16 h-16 mx-auto' />
          ) : (
            <Skeleton
              circle
              height={60}
              width={60}
              containerClassName='h-16 flex justify-center items-center'
              baseColor='#1e293b'
              highlightColor='#334155'
            />
          )}
        </div>

        <div className='mt-2 py-2 px-2 rounded-bl-lg rounded-br-lg text-slate-500 bg-slate-700 transition-all group-hover:text-slate-200'>
          <TokenAddress address={nft.contract_address} />
        </div>
      </div>
    </TokenLink>
  );
}

function TokenLink({ children, address }: { children: React.ReactNode; address: string }) {
  return (
    <a
      href={address ? `${etherscanBaseUrl}/${address}` : undefined}
      target='_blank'
      referrerPolicy='no-referrer'
      title='View on Explorer'
      className='group outline-none rounded-lg transition-all focus:ring-1 focus:ring-cyan-600 focus:ring-offset-2 focus:outline-none'
    >
      {children}
    </a>
  );
}

function TokenAddress({ address }: { address: string }) {
  return (
    <p className='font-xs'>
      {address ? (
        shortenAddress(address)
      ) : (
        <Skeleton width={70} baseColor='#5e6674' highlightColor='#334155' />
      )}
    </p>
  );
}

export default NFTCard;
