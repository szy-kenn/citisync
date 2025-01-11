import BackButton from '@/components/back-button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatTimestamp } from '@/lib/utils'
import React from 'react'
import { PiCaretLeftBold } from 'react-icons/pi'

const Page = () => {
  return (
    <div className='flex flex-col gap-2 p-4'>
        <div className='flex gap-2 justify-between pb-2'>
            <BackButton />
            <p className='font-bold'>Submit a New Report</p>
            <PiCaretLeftBold className='h-6 w-6 opacity-0' />
        </div>
        <Separator />
        <Card>
            <div className="flex items-center gap-4 p-4">
                <div className="relative h-10 w-10">
                    <div className="flex justify-center items-center bg-slate-500 h-12 aspect-square rounded-full">D</div>
                </div>
                <div className="space-y-1">
                    <div className="flex flex-col gap-1">
                        <span className="font-medium">{"user"}</span>
                        <p className="text-xs">{formatTimestamp(new Date())}</p>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  )
}

export default Page