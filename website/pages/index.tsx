import type { NextPage } from 'next';
import NavBar from '../src/components/navbar';

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen bg-slate-400">
      <NavBar />
    </div>
  );
};

export default Home;
