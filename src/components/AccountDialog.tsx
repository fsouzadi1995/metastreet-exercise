import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import { FiCopy, FiArrowUpRight, FiX } from 'react-icons/fi';
import Dialog from './Dialog';
import JazzIcon from './Jazzicon';
import { shortenAddress } from '../utils/string-utils';
import { useClipboard } from '../hooks/useClipboard';
import { ToastContainer, toast } from 'react-toastify';

const ETHERSCAN_URL = 'https://etherscan.io/address';

type AccountDialogProps = {
  open: boolean;
  onClose: VoidFunction;
};

function AccountDialog(props: AccountDialogProps): JSX.Element | null {
  const [text, setText] = React.useState<string | null>(null);
  const { account } = useWeb3React();
  const { write } = useClipboard();

  React.useEffect(() => {
    if (!text) {
      return;
    }

    write(text)
      .then(() => toast.info('Address copied to clipboard!'))
      .then(() => setText(null));
  }, [text]);

  if (!account) {
    return null;
  }

  return (
    <Dialog {...props}>
      <div className='p-4'>
        <Dialog.Title as='div'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-slate-300'>Account</h2>
            </div>
            <div>
              <button
                type='button'
                aria-label='Close dialog'
                className='group flex text-2xl outline-none rounded-lg transition-all hover:ring-1 hover:ring-slate-500 focus:ring-1 focus:ring-slate-500'
                onClick={() => props.onClose()}
              >
                <FiX className='transition-all group-hover:text-cyan-500 group-focus:text-cyan-500' />
              </button>
            </div>
          </div>
        </Dialog.Title>
        <Dialog.Description as='div'>
          <div className='mt-4'>
            <div className='flex flex-col gap-4 ring-1 ring-slate-400 rounded-xl p-4'>
              <div className='text-slate-400 text-xs'>
                Connected with Metamask
              </div>
              <div className='flex gap-3 items-center'>
                <div>
                  <JazzIcon />
                </div>

                <div>
                  <p className='font-roboto-mono text-2xl'>
                    {shortenAddress(account ?? '', 6)}
                  </p>
                </div>
              </div>

              <div className='flex gap-8'>
                <div>
                  <button
                    className='group flex items-center py-2 px-2 rounded-lg text-left gap-2 transition-all outline-none hover:ring-1 hover:ring-slate-500 focus:ring-1 focus:ring-slate-500 active:ring-slate-400'
                    onClick={() => setText(account)}
                  >
                    <FiCopy className='text-md transition-all group-hover:text-cyan-500 group-focus:text-cyan-500' />
                    <span className='text-sm'>Copy to clipboard</span>
                  </button>
                </div>
                <div>
                  <a
                    href={`${ETHERSCAN_URL}/${account}`}
                    target='_blank'
                    referrerPolicy='no-referrer'
                    className='group flex items-center py-2 px-2 rounded-lg text-left gap-2 transition-all outline-none hover:ring-1 hover:ring-slate-500 focus:ring-1 focus:ring-slate-500'
                  >
                    <FiArrowUpRight className='text-md transition-all group-hover:text-cyan-500 group-focus:text-cyan-500' />
                    <span className='text-sm'>View on Explorer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Description>
      </div>
    </Dialog>
  );
}

export default AccountDialog;
