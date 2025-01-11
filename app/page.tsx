"use client";
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from "@/lib/firebase/firebaseConfig"
import { useEffect, useRef, useState } from "react";

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
    <div className={`fixed bottom-0 left-0 w-full flex items-center justify-between gap-8 px-4 py-2 bg-white text-black text-sm ${isInstalled ? 'hidden' : ''}`}> 
      <p>For better experience, you can install this app on your device hehe</p>
      <button ref={installPromptBtnRef} className="px-4 py-2 bg-black text-white">Install</button>
    </div>
  )
}

export default function Home() {
  const [signOut, loading, error] = useSignOut(auth);
  
  return (
    <div>
      <button onClick={async () => {
          const success = await signOut();
          if (success) {
            alert('You are sign out');
          }
        }} className="px-4 py-2 bg-black text-white">Sign Out</button>
    </div>
  );
}
