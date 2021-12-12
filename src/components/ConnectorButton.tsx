import * as React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injected } from '../web3/connectors';
import { FiRefreshCw, FiLogIn } from 'react-icons/fi';
import { CgSpinner } from 'react-icons/cg';

const getButtonLabel = (loading: boolean) => {
  if (!loading) {
    return (
      <div className='flex gap-2 items-center justify-center'>
        <p>Connect Wallet</p>
        <span>
          <FiLogIn />
        </span>
      </div>
    );
  }

  return (
    <div className='flex gap-2 items-center justify-center'>
      <p>Initializing</p>
      <span className='animate-spin'>
        <CgSpinner />
      </span>
    </div>
  );
};

function ConnectorButton(): JSX.Element | null {
  const { active, activate } = useWeb3React<Web3Provider>();
  const [loading, setIsLoading] = React.useState<boolean>(false);
  const [loginTriggered, setLoginTriggered] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    let mounted = true;

    if (!loginTriggered) {
      return;
    }

    setIsLoading(true);

    activate(injected, undefined, true)
      .then(() => {
        if (!mounted) {
          return;
        }

        setIsLoading(false);
      })
      .catch(() => {
        if (!mounted) {
          return;
        }

        setHasError(true);
        setIsLoading(false);
        setLoginTriggered(false);
      });

    return () => {
      mounted = false;
    };
  }, [loginTriggered]);

  const reset = () => {
    setHasError(false);
    setLoginTriggered(true);
  };

  if (active) {
    return null;
  }

  return (
    <>
      {hasError ? (
        <StyledButton onClick={reset}>
          Try again
          <span className='animate-spin-slow'>
            <FiRefreshCw />
          </span>
        </StyledButton>
      ) : (
        <StyledButton onClick={() => setLoginTriggered(true)}>
          {getButtonLabel(loading)}
        </StyledButton>
      )}
    </>
  );
}

type StyleButtonProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

function StyledButton({ children, ...props }: StyleButtonProps): JSX.Element {
  return (
    <button
      type='button'
      {...props}
      className='w-54 py-2 px-4 flex items-center justify-center gap-2 bg-slate-900 text-cyan-400 rounded-lg font-roboto-mono font-medium transition-all outline-none hover:bg-slate-800 focus:bg-slate-800 active:ring active:ring-slate-400'
    >
      {children}
    </button>
  );
}

export default ConnectorButton;
