import type { NextPage } from 'next';
import Image, { StaticImageData } from 'next/image';
import profileImage from '../public/profile.jpg';
import GithubIcon from '../src/components/common/GithubIcon';
import colors from '../src/utils/colors';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center h-80 w-full mb-4">
        <Image
          src={profileImage as unknown as StaticImageData}
          alt="Picture of the author"
          width={320}
          layout="intrinsic"
          className="rounded-full w-2 h-6"
        />
      </div>
      <div className="flex flex-col flex-grow items-center w-full">
        <p className="font-sans leading-loose mb-8">
          <span
            className={`font-semibold text-4xl ${colors.textColor} antialiased`}>
            Edgar Perez
          </span>
          <br />
          <span
            className={`font-normal text-2xl ${colors.textColor} antialiased`}>
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
