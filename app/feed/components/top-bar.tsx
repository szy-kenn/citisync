'use client'

import { useScrollAware } from '@/hooks/useScrollAware'
import { BsSearch } from "react-icons/bs";
import { MdOutlineTune } from "react-icons/md";
import { useState, useEffect } from 'react';

export function TopBar() {
  const isVisible = useScrollAware()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`top-0 left-0 right-0 bg-white backdrop-blur-lg transition-all duration-300 ease-in-out
        ${isScrolled 
          ? `fixed z-50 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`
          : 'relative'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className='flex items-center justify-center rounded-full bg-gray aspect-square h-10'>
                D
            </div>
          </div>
          <div className="flex items-center space-x-4">
                <BsSearch className="text-xl" />
                <MdOutlineTune className="text-2xl" />
          </div>
        </div>
      </div>
    </header>
  )
}