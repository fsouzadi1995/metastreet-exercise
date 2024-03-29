import { shortenAddress } from '../../../utils/string-utils';
import { NFTItem } from '../types';
import { etherscanBaseUrl } from '../../../config/static.json';
import { FiArrowUpRight } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import { normalizeUrl } from '../../../utils/string-utils';

type NFTCardProps = NFTItem;

function NFTCard(nft: NFTCardProps): JSX.Element | null {
  const tokenId = nft.nft_data ? nft.nft_data[0].token_id : null;

  return (
    <TokenLink address={nft.contract_address}>
      <div className='min-w-full relative rounded-lg bg-slate-700 bg-opacity-30 transition-all group-hover:bg-opacity-60'>
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
          {nft.image ? (
            <img
              src={normalizeUrl(nft.image)}
              alt={nft.contract_name}
              className='w-32 h-32 mx-auto'
            />
          ) : (
            <Skeleton
              circle
              height={120}
              width={120}
              containerClassName='h-32 flex justify-center items-center'
              baseColor='#1e293b'
              highlightColor='#334155'
            />
          )}
        </div>

        <div className='absolute w-full top-20 flex justify-center'>
          {tokenId && (
            <div className='w-32 px-2 bg-black bg-opacity-50 py-1'>
              <p className='text-xs font-roboto-mono'>#{tokenId}</p>
            </div>
          )}
        </div>

        <div className='mt-2 py-2 px-2 font-mono rounded-bl-lg rounded-br-lg text-slate-500 bg-slate-700 transition-all group-hover:text-slate-200'>
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
