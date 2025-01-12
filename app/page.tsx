"use client";
import { PiCaretLeftBold } from "react-icons/pi";
import { redirect } from "next/navigation";
import Map from "@/components/map";
import { MarkerType } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const dynamic = 'force-dynamic';

const InstallationPrompt = () => {

  const installPromptBtnRef = useRef<HTMLButtonElement>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const deferredEvent = useRef<any>(null);

  useEffect(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredEvent.current = e;
      });

      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
  }, []);

  useEffect(() => {

    if (installPromptBtnRef.current) {
      installPromptBtnRef.current.addEventListener('click', () => {
        if(deferredEvent) {
          deferredEvent.current.prompt();
        }
      });
    }

  }, [installPromptBtnRef]);

  return (
    <div className={`fixed bottom-0 left-0 w-full flex items-center justify-between gap-8 px-4 py-2 bg-[#262f69] text-white text-sm ${isInstalled ? 'hidden' : ''}`}> 
      <p>For better experience, you can install this app on your device.</p>
      <button ref={installPromptBtnRef} className="px-4 py-2 bg-white text-black rounded-lg">Install</button>
    </div>
  )
}

export default function Page() {

  return (
    <div className="min-h-screen bg-[url('https://vsbkxysdsqapomfudqih.supabase.co/storage/v1/object/public/chataptptpt/Background.svg')] bg-no-repeat bg-cover bg-blue-dark text-white">
      <div className='flex flex-col items-center pt-20'>
        <h1 className='text-5xl font-bold'>CitiSync</h1>
        <p className='text-sm'>Your City, Your Voice, Our Sync</p>
      </div>

      <div className="absolute right-8 bottom-20 bg-white rounded-[999px] flex gap-1 w-fit h-fit p-2 pl-4 justify-center items-center" 
          onClick={() => redirect("/feed")}>
        <p className="text-[#0061a8] font-bold">Get Started</p>
        <PiCaretLeftBold className='h-6 w-6 rotate-180 text-[#0061a8]' />
      </div>
      <InstallationPrompt />
    </div>
  )
}