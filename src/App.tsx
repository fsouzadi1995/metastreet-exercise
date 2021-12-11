import Home from './features/home/routes';
import AppProviders from './providers/AppProviders';
function App() {
  return (
    <AppProviders>
      <Home />
    </AppProviders>
  );
}

export default App;
