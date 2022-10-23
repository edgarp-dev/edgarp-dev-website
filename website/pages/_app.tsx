import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../src/components/Navbar';

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-slate-400">
      <NavBar />
      <div className="pt-14 min-w-full md:max-w-3xl mx-auto overflow-x-scroll bg-blue-600">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default App;
