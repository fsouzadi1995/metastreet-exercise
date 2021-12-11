import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import generateIdenticon from '@metamask/jazzicon';

function JazzIcon(): JSX.Element {
  const { account } = useWeb3React();
  const jazziconRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (account && jazziconRef.current) {
      jazziconRef.current!.innerHTML = '';

      const icon = generateIdenticon(16, parseInt(account.slice(2, 10), 16));

      jazziconRef.current.appendChild(icon);
    }
  }, [account]);

  return <div ref={jazziconRef} className='flex h-4 w-4 rounded-full' />;
}

export default JazzIcon;
