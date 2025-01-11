"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { PiCaretLeftBold } from 'react-icons/pi'

const BackButton = () => {

const router = useRouter();

  return (
    <PiCaretLeftBold className='h-6 w-6' onClick={() => router.back()} />
  )
}

export default BackButton