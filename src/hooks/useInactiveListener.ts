import * as React from 'react';

import { useWeb3React } from '@web3-react/core';
import { injected } from '../web3/connectors';

enum InjectorEvents {
  Connnect = 'connect',
  ChainChange = 'chainChanged',
  AccountChange = 'accountsChanged',
}

export function useInjectorListener(suppress: boolean = false) {
  const { active, error, activate } = useWeb3React();

  React.useEffect((): any => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        activate(injected);
      };

      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      ethereum.on(InjectorEvents.Connnect, handleConnect);
      ethereum.on(InjectorEvents.ChainChange, handleChainChanged);
      ethereum.on(InjectorEvents.AccountChange, handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener(InjectorEvents.Connnect, handleConnect);
          ethereum.removeListener(
            InjectorEvents.ChainChange,
            handleChainChanged
          );
          ethereum.removeListener(
            InjectorEvents.AccountChange,
            handleAccountsChanged
          );
        }
      };
    }
  }, [active, error, suppress, activate]);
}
