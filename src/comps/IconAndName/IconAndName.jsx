import styles from './iconAndName.module.css';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Link from 'next/link';
import { Children, cloneElement } from "react";

const Box = ({ icon, title, buttonTitle="Click here to begin", href, idname, children }) => {
  const childText = Children.count(children) > 0;
  return (
    <>
      <div className={styles.pop_in}>
        <div className="flex justify-center text-primary-50 text-8xl mb-[5px]"> {icon} </div>
        <div className="flex justify-center mb-[5px] font-bold"> {title} </div>
        {
          !children ?
            <Link className="text-center bg-primary-50 text-white  border-0  rounded-md  px-5 py-2  transition duration-300 ease-in-out hover:bg-gray-500 p-2 w-full font-normal" href={href}>{buttonTitle} </Link>
            : 
            <>
              <button id={idname + "-open"} className="text-center bg-primary-50 text-white  border-0  rounded-md  px-5 py-2  transition duration-300 ease-in-out hover:bg-gray-500 p-2 w-full font-normal">{buttonTitle} </button>
              <dialog id={idname}>
                {children}<hr></hr>
                <button id={idname + "-close"}>Close</button>
              </dialog>
            </>
        }
      </div>
    </>
  );
};

export default Box;