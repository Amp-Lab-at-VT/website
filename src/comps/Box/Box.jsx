import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import tw from 'tailwind-styled-components';
import ReactMarkdown from "react-markdown";

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
  m-10
`;

const TextWrapper = tw(motion.div)`
  absolute
  inset-0
  items-center
  justify-center
  text-white
  text-sm
  font-bold
  bg-black
  bg-opacity-75
  transition-all
  duration-500
  p-2
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
    bg-black
    p-2
`;


{/* <ProjectBox key = {key} name={key} branch={projects[key]['branch']} href={projects[key]['url']}/> */}

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
    <Link href={href} passHref>
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

        {/* <MobileTextWrapper>
          {text}
        </MobileTextWrapper> */}
      </BoxWrapper>
    </Link>
  );
};

export default Box;
