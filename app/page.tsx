"use client";
import { PiCaretLeftBold } from "react-icons/pi";
import { redirect } from "next/navigation";
import Map from "@/components/map";
import { MarkerType } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default function Page() {

  return (
    <div className="min-h-screen bg-[url('/background.svg')] bg-no-repeat bg-cover bg-blue-dark text-white">
      <div className='flex flex-col items-center pt-20'>
        <h1 className='text-5xl font-bold'>CitiSync</h1>
        <p className='text-sm'>Your City, Your Voice, Our Sync</p>
      </div>

      <div className="absolute right-8 bottom-20 bg-white rounded-[999px] flex gap-1 w-fit h-fit p-2 pl-4 justify-center items-center" 
          onClick={() => redirect("/feed")}>
        <p className="text-[#0061a8] font-bold">Get Started</p>
        <PiCaretLeftBold className='h-6 w-6 rotate-180 text-[#0061a8]' />
      </div>
    </div>
  )
}