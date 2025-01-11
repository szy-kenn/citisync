import React from 'react'
import { cn } from "@/lib/utils"

interface SectionDividerProps {
  text: string
  className?: string
  lineClassName?: string
  textClassName?: string
}

export function SectionDivider({
  text,
  className,
  lineClassName,
  textClassName
}: SectionDividerProps) {
  return (
    <div className={cn("flex items-center w-full my-4", className)}>
      <div className={cn("flex-grow h-px bg-slate-200", lineClassName)} />
      <span className={cn("px-4 text-md text-slate-200 font-medium", textClassName)}>
        {text}
      </span>
      <div className={cn("flex-grow h-px bg-slate-200", lineClassName)} />
    </div>
  )
}

