'use client'
import { useScrollAware } from '@/hooks/useScrollAware'
import { BsSearch } from "react-icons/bs";
import { MdOutlineTune } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Status from './status';
import { stat } from 'fs';

export function TopBar() {
  const isVisible = useScrollAware()
  const [isScrolled, setIsScrolled] = useState(false)
  const status = usePathname().split('/feed/')[1]
  const status_display = status.charAt(0).toUpperCase() + status.slice(1)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const statusRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isStatusOpen &&
        statusRef.current &&
        buttonRef.current &&
        !statusRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsStatusOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isStatusOpen])

  const handleSettingsClick = () => {
    setIsStatusOpen(!isStatusOpen)
  }

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
          <div>
            <h1 className="text-lg font-bold">{status_display}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <BsSearch className="text-xl" />
            <div className='relative'>
              <div ref={buttonRef}>
                <MdOutlineTune className="text-2xl cursor-pointer" onClick={handleSettingsClick}/>
              </div>
              <div ref={statusRef}>
                {isStatusOpen && <Status current_status={status} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}