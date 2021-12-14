import Header from './Header';

type BaseLayourProps = {
  children: React.ReactNode;
};

function BaseLayout({ children }: BaseLayourProps): JSX.Element {
  return (
    <div className='min-h-screen bg-slate-800 text-slate-300 font-raleway'>
      <Header />
      <main className='max-w-2xl py-16 mx-auto'>{children}</main>
    </div>
  );
}

export default BaseLayout;
