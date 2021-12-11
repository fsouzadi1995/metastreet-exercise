import { Web3ReactProvider } from '@web3-react/core';
import { ToastContainer } from 'react-toastify';
import { getLibrary } from '../web3/getLibrary';
import 'react-toastify/dist/ReactToastify.css';

type AppProvidersProps = {
  children: React.ReactNode;
};

function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        closeButton={false}
        draggable={false}
        pauseOnHover={false}
        limit={3}
      />
    </Web3ReactProvider>
  );
}

export default AppProviders;
