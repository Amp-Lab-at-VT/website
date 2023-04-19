import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import tw from 'tailwind-styled-components';

const BoxWrapper = tw(motion.div)`
  relative
  w-full
  h-64
  rounded-md
  overflow-hidden
  cursor-pointer
  transition-all
  duration-500
  shadow-md
`;

const TextWrapper = tw(motion.div)`
  absolute
  inset-0
  flex
  items-center
  justify-center
  text-white
  text-2xl
  font-bold
  bg-black
  bg-opacity-75
  transition-all
  duration-500
`;

const MobileTextWrapper = tw(motion.div)`
  absolute
  inset-0
  flex
  items-center
  justify-center
  text-white
  text-xl
  font-bold
  bg-black
  bg-opacity-50
  filter
  blur-md
`;

const ImageWrapper = tw(Image)`
  w-full
  h-full
  object-cover
`;

const TitleWrapper = tw(motion.div)`
    absolute
    font-bold
    text-2xl
    text-white
    top-5
    left-5
    opacity-100
    transition-all
    z-10
`;

const Box = ({ imageUrl, text, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  var base = "tester";
  var branch = "main";

  var githubImageURL = "https://raw.githubusercontent.com/" + base + "/" + branch + "/hero.png";

  return (
    <Link href={link} passHref>
      <BoxWrapper
        whileHover={{ scale: 1 }}
        whileTap={{ scale: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isHovered && (<TitleWrapper>Title</TitleWrapper>)}

        <ImageWrapper src={imageUrl} alt="" width={640}
          height={480}/> 

        {isHovered && (
          <TextWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {text}
          </TextWrapper>
        )}

        <MobileTextWrapper>
          {text}
        </MobileTextWrapper>
      </BoxWrapper>
    </Link>
  );
};

export default Box;
