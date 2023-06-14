//https://react-icons.github.io/react-icons/icons?name=bs
import React, { useEffect } from "react";
import { promises as fs } from 'fs'
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import IconAndName from "@/comps/IconAndName/IconAndName";

import { GiSolderingIron, GiReturnArrow, GiSwipeCard } from 'react-icons/gi';
import { MdOutlineWavingHand } from 'react-icons/md';
import { FaReact } from 'react-icons/fa';
import { BsPrinterFill } from 'react-icons/bs';
import { RxDiscordLogo } from 'react-icons/rx';
import { BiPurchaseTagAlt } from 'react-icons/bi';

export default function GettingStarted({ new_members, returning_members }) {
  useEffect(() => {
    const getStartNew = document.getElementById('getstartnew')
    const getStartNew_open = document.getElementById('getstartnew-open')
    const getStartNew_close = document.getElementById('getstartnew-close') // All of these should be part of the IconAndName component but I was having issues with that so I just put them here for now
    getStartNew_open.addEventListener('click', () => { getStartNew.showModal() })
    getStartNew_close.addEventListener('click', () => { getStartNew.close() })

    const getStartReturn = document.getElementById('getstartreturn')
    const getStartReturn_open = document.getElementById('getstartreturn-open')
    const getStartReturn_close = document.getElementById('getstartreturn-close')
    getStartReturn_open.addEventListener('click', () => { getStartReturn.showModal() })
    getStartReturn_close.addEventListener('click', () => { getStartReturn.close() })

    const purchase = document.getElementById('purchase')
    const purchase_open = document.getElementById('purchase-open')
    const purchase_close = document.getElementById('purchase-close')
    purchase_open.addEventListener('click', () => { purchase.showModal() })
    purchase_close.addEventListener('click', () => { purchase.close() })
  })

  const discord_invite = "https://discord.gg/DjFCeQEMmE"
  const print_link = "https://github.com/Amp-Lab-at-VT/print-queue/issues/new?assignees=octocat&labels=3d-print&template=3d_print.yml&title=%5B3d-print%5D%3A+"
  const swipe_link = "https://docs.google.com/forms/d/12icOKHbNeDZ8ujELWmOtG40Jp1nv_s4Irs7IfWHoRPA/edit?ts=63d27e7e"

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="m-5">Getting Started:</h1>
        <p className="text-left m-5">Below is a list of options for you to engage with our lab. Select one to get started!</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>

        <IconAndName icon={<MdOutlineWavingHand />} title="Getting Started: New Members" idname="getstartnew">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{new_members}</ReactMarkdown>
        </IconAndName>

        <IconAndName icon={<GiReturnArrow />} title="Getting Started: Returning Members" idname="getstartreturn">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{returning_members}</ReactMarkdown>
        </IconAndName>

        <IconAndName icon={<RxDiscordLogo />} title="Join our Discord" href={discord_invite} />
        <IconAndName icon={<GiSolderingIron />} title="Solder Training Information" href="/soldering" />
        <IconAndName icon={<BsPrinterFill />} title="Get Something 3D Printed" buttonTitle="Click here to begin" href={print_link} />
        <IconAndName icon={<BiPurchaseTagAlt />} title="Submit a Purchase Request" idname="purchase">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            It is now easier than ever to get what you need! Just head on over to the Discord, and submit your bill of materials in the **purchase request** channel
          </ReactMarkdown>
        </IconAndName>
        <IconAndName href={swipe_link} icon={<GiSwipeCard />} title="Get Lab Swipe Access" />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const new_members = await fs.readFile(process.cwd() + '/markdowns/new_members.md', 'utf8')
  const returning_members = await fs.readFile(process.cwd() + '/markdowns/returning_members.md', 'utf8')

  return { props: { new_members, returning_members } }
}

