
'use client'

import { useScrollAware } from '@/hooks/useScrollAware'
import { BsSearch } from "react-icons/bs";
import { MdOutlineTune } from "react-icons/md";

export function TopBar() {
  const isVisible = useScrollAware()

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white backdrop-blur-lg z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
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

