import BaseLayout from '../../../components/BaseLayout';
import { useEagerConnect } from '../../../hooks/useEagerConnect';
import GridPlaceholder from '../components/GridPlaceholder';
import NFTGrid from '../components/NFTGrid';

function Home(): JSX.Element {
  const tried = useEagerConnect();

  return (
    <BaseLayout>
      <GridPlaceholder />
      <NFTGrid />
    </BaseLayout>
  );
}

export default Home;
