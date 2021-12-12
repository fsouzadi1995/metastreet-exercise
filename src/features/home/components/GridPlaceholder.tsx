import { useWeb3React } from '@web3-react/core';

function GridPlaceholder(): JSX.Element | null {
  const { active } = useWeb3React();

  if (active) {
    return null;
  }

  return (
    <div className='mt-60'>
      <h2 className='text-3xl text-center text-slate-300'>Connect to access your token feed</h2>
    </div>
  );
}

export default GridPlaceholder;
