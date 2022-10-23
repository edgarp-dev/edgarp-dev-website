import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../src/components/Navbar';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-gray-900">
      <NavBar />
      <div className="pt-20 min-w-full md:max-w-3xl mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
