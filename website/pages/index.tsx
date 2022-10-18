import type { NextPage } from 'next';
import Image from 'next/image';
import profilePic from '../public/profile.jpg';
import NavBar from '../src/components/Navbar';
import GithubIcon from '../src/components/common/GithubIcon';

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen bg-slate-400">
      <NavBar />
      <div className="flex flex-col w-screen mt-14">
        <div className="flex justify-center h-80 w-full">
          <Image
            src={profilePic}
            alt="Picture of the author"
            width={320}
            layout="intrinsic"
            className="rounded-full w-2 h-6"
          />
        </div>
        <div className="flex flex-col flex-grow items-center w-full">
          <p className="font-sans leading-loose mb-8">
            <span className="font-semibold text-4xl">Edgar Perez</span> <br />
            <span className="font-normal text-2xl">Sofware Developer</span>
          </p>
          <div className="flex justify-center w-full">
            <GithubIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
