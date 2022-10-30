import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../src/components/Navbar';
import colors from '../src/utils/colors';

function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`w-full overflow-auto min-h-screen bg-[${colors.primaryColor}]`}>
      <NavBar />
      <div className="pt-20 md:max-w-3xl mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
