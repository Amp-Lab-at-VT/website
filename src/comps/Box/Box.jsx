import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import tw from 'tailwind-styled-components';
import ReactMarkdown from "react-markdown";

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



const Box = ({ name, branch, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifference = (str1, str2) => {
    let diff = "";
    str2.split('').forEach(function (val, i) {
        if (val !== str1.charAt(i))
            diff += val;
    });
    return diff;
  }


  var diff = getDifference("https://github.com/", href)
  var fullSummary = "https://raw.githubusercontent.com/" + diff + "/" + branch + "/summary.md"
  var imgPath = "https://raw.githubusercontent.com/" + diff + "/" + branch + "/hero.png"


  // Pull text from fullSummary url
    const [text, setText] = useState("No Summary Avalible");
    const [summaryLoaded, setSummaryLoaded] = useState(false);

    fetch(fullSummary)
    .then((response) => {
        if (response.status < 300 && response.status >= 200){
            return response.text();
        }
    }).then((response) => {
        setText(response);
        setSummaryLoaded(true);
    }).catch((response) => {
        console.log("Project is not avalibe at that address. Warning: " + response)
    });

  return (
    
      <LinkWrapper className = "flex-none" href={href} passHref>
        <BoxWrapper
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered && (<TitleWrapper>{name}</TitleWrapper>)}

          <ImageWrapper src={imgPath} alt="" width={640}
            height={480}/> 

          {isHovered && (
            <TextWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReactMarkdown>{text}</ReactMarkdown>
            </TextWrapper>
          )}

          <MobileTextWrapper>
            <p className = "text-2xl bg-black text-white p-2">{name}</p>
            <div>
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
          </MobileTextWrapper>
        </BoxWrapper>
      </LinkWrapper>   
  );
};

Box.defaultProps = {
  name : "Sample", 
  branch: "main",
  href: "https://github.com/Amp-Lab-at-VT/SampleProject"
};

export default Box;
