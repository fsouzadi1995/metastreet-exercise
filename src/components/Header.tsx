import * as React from 'react';

import AccountDialog from './AccountDialog';
import AddressBadge from './AddressBadge';
import ConnectorButton from './ConnectorButton';

function Header(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <header className='min-w-full bg-slate-700 py-4 px-6'>
      <div className='max-w-2xl mx-auto flex justify-between items-center'>
        <div className='py-1'>
          <a href='#'>🌐</a>
        </div>

        <ConnectorButton />
        <AddressBadge onClick={() => setIsDialogOpen(true)} />
      </div>

      <AccountDialog open={isDialogOpen} onClose={closeDialog} />
    </header>
  );
}

export default Header;
