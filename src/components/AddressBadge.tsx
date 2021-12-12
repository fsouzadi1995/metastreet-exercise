import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../utils/string-utils';
import JazzIcon from './Jazzicon';

type AddressBadgeProps = {
  onClick: VoidFunction;
};

function AddressBadge({ onClick }: AddressBadgeProps): JSX.Element | null {
  const { account } = useWeb3React();

  if (!account) {
    return null;
  }

  return (
    <button
      type='button'
      className='bg-slate-800 text-cyan-400 rounded-md py-2 px-4 flex gap-2 items-center font-roboto-mono transition-all outline-none hover:ring-1 hover:ring-slate-400 focus:ring-1 focus:ring-slate-400'
      onClick={() => onClick()}
    >
      <div>
        <p>{shortenAddress(account ?? '')}</p>
      </div>
      <JazzIcon />
    </button>
  );
}

export default AddressBadge;
