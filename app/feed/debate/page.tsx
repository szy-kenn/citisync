'use client'

import { useState, useEffect, use } from 'react'
import BackButton  from '@/components/back-button'
import { Separator } from '@/components/ui/separator'
import { DebateCard } from './components/debate-card'
import { DebateDetails } from './components/debate-details'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import { useRouter } from "next/navigation"
import { getProposals } from '@/lib/firebase/posts'
import { Proposal } from '@/lib/types'

export default function Home() {
  const router = useRouter()
  const [debate, setDebate] = useState<Proposal[]>([])
  const [selectedDebate, setSelectedDebate] = useState<string | null>(null)

useEffect(() => {
  async function fetchProposals() {
      const debate = await getProposals();
      setDebate(debate);
  }

  fetchProposals();
}, []);

  const handleBack = () => {
    router.back()
}

  return (
    <div className='p-2'>
    {selectedDebate === null && (
      <>
        <div className='flex gap-2 justify-between pb-2 cursor-pointer' onClick={handleBack}>
          <BackButton />
        </div>
        <Separator />
      </>
    )}
      <main className="flex min-h-screen flex-col items-center justify-center p-6 space-y-6">
        {selectedDebate === null ? (
          debate.map((debate) => (
            <div key={debate.id} className="w-full max-w-md">
              <DebateCard
                title={debate.title}
                content={debate.content}
                initialVotes={debate.initialVotes}
                handleSelect={() => setSelectedDebate(debate.id)}
              />
            </div>
          ))
        ) : (
          <>
            <Button onClick={() => setSelectedDebate(null)}>Back to Debate</Button>
            <DebateDetails {...debate.find(p => p.id === selectedDebate)!} />
          </>
        )}
          <Link href={"/feed/debate/add"}>
              <div className='bg-gradient-to-b from-[#2F3269] to-[#5D63CF] h-14 aspect-square text-white fixed bottom-14 right-0 p-2 flex justify-center items-center text-4xl rounded-full m-4'>
                  <BsPlus />
              </div>
          </Link>
      </main>
    </div>
  )
}

