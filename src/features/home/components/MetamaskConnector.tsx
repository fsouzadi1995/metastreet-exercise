import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { injected } from '../../../web3/connectors';
import Button from '../../../components/Button';

function MetamaskConnector(): JSX.Element {
  const { activate } = useWeb3React<Web3Provider>();

  return (
    <div className='min-w-full flex justify-center'>
      <Button onClick={() => activate(injected)}>
        Connect to Metamask &nbsp;&nbsp;🦊
      </Button>
    </div>
  );
}

export default MetamaskConnector;
