import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import tw from 'tailwind-styled-components';

const LinkWrapper = tw(motion.a)`
  sm:w-600
  lg:w-600
`;

const BoxWrapper = tw(motion.div)`
  relative
  h-96
  border-2
  border-slate-950
  rounded-md
  overflow-hidden
  cursor-pointer
  transition-all
  duration-500
  shadow-md
  m-2
  sm:h-80
  sm:border-0

`;

const TextWrapper = tw(motion.div)`
  absolute
  inset-0
  items-center
  justify-center
  text-white
  text-sm
  font-bold
  font 
  bg-black
  bg-opacity-75
  transition-all
  duration-500
  p-2
  hidden
  sm:block
`;

const MobileTextWrapper = tw(motion.div)`
  absolute
  inset-0
  items-center
  justify-center
  text-black
  text-sm
  font-bold
  bg-white
  bg-opacity-90
  filter
  p-1
  sm:hidden
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
    bg-black
    p-2
    hidden
    sm:block
`;



const Box = ({ name = "Sample", imgPath, owner, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-screen h-fit sm:w-6/12">
      <LinkWrapper className="flex-none" href={"https://github.com/" + owner} >
        <BoxWrapper
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)} >
          {!isHovered && (<TitleWrapper>{name}</TitleWrapper>)}

          <ImageWrapper src={imgPath} alt="" width={640} height={480} />
          {isHovered && (
            <TextWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} >
              <ReactMarkdown>{text}</ReactMarkdown>
            </TextWrapper>
          )}

          <MobileTextWrapper>
            <p className="text-2xl bg-black text-white p-2">{name}</p>
            <div> <ReactMarkdown>{text}</ReactMarkdown> </div>
          </MobileTextWrapper>
        </BoxWrapper>
      </LinkWrapper>
    </div>

  );
};

export default Box;
