import * as React from 'react';
import { useWeb3React } from '@web3-react/core';

import AccountDialog from './AccountDialog';
import AddressBadge from './AddressBadge';

function Header(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <header className='min-w-full bg-slate-700 py-4 px-6'>
      <div className='max-w-2xl mx-auto flex justify-between items-center'>
        <div className='py-1'>
          <a href='#'>🌐</a>
        </div>

        <AddressBadge onClick={() => setIsDialogOpen(true)} />
      </div>

      <AccountDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </header>
  );
}

export default Header;
