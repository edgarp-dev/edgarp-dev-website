import type { NextPage } from 'next';
import Image from 'next/image';
import GithubIcon from '../src/components/common/GithubIcon';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center h-80 w-full mb-4">
        <Image
          src="/profile.png"
          alt="Picture of the author"
          height="320"
          width="320"
          layout="intrinsic"
          className="rounded-full w-2 h-6"
        />
      </div>
      <div className="flex flex-col flex-grow items-center w-full">
        <p className="font-sans leading-loose mb-8">
          <span className="font-semibold text-4xl text-slate-200 antialiased">
            Edgar Perez
          </span>
          <br />
          <span className="font-normal text-2xl text-slate-200 antialiased">
            Sofware Developer
          </span>
        </p>
        <div className="flex justify-center w-full">
          <GithubIcon />
        </div>
      </div>
    </div>
  );
};

export default Home;
