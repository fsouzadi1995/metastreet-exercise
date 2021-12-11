import BaseLayout from '../../../components/BaseLayout';
import MetamaskConnector from '../components/MetamaskConnector';

function Home(): JSX.Element {
  return (
    <BaseLayout>
      <MetamaskConnector />
    </BaseLayout>
  );
}

export default Home;
