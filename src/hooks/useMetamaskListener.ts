import * as React from 'react';

export function useMetamaskListener() {
  React.useEffect(() => {
    if (!window.ethereum) {
      throw new Error('Metamask not found!');
    }
  }, []);
}
