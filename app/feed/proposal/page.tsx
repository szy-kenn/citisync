'use client'

import { useState, useEffect, use } from 'react'
import BackButton  from '@/components/back-button'
import { Separator } from '@/components/ui/separator'
import { ProposalCard } from './components/proposal-card'
import { ProposalDetails } from './components/proposal-details'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import { useRouter } from "next/navigation"
import { getProposals } from '@/lib/firebase/posts'
import { Proposal } from '@/lib/types'

export default function Home() {
  const router = useRouter()
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)

useEffect(() => {
  async function fetchProposals() {
      const proposals = await getProposals();
      setProposals(proposals);
  }

  fetchProposals();
}, []);

  const handleBack = () => {
    router.back()
}

  return (
    <div className='p-2'>
    {selectedProposal === null && (
      <>
        <div className='flex gap-2 justify-between pb-2 cursor-pointer' onClick={handleBack}>
          <BackButton />
        </div>
        <Separator />
      </>
    )}
      <main className="flex min-h-screen flex-col items-center justify-center p-6 space-y-6">
        {selectedProposal === null ? (
          proposals.map((proposal) => (
            <div key={proposal.id} className="w-full max-w-md">
              <ProposalCard
                title={proposal.title}
                content={proposal.content}
                initialVotes={proposal.initialVotes}
                handleSelect={() => setSelectedProposal(proposal.id)}
              />
            </div>
          ))
        ) : (
          <>
            <Button onClick={() => setSelectedProposal(null)}>Back to Proposals</Button>
            <ProposalDetails {...proposals.find(p => p.id === selectedProposal)!} />
          </>
        )}
          <Link href={"/feed/proposal/add"}>
              <div className='bg-gradient-to-b from-[#2F3269] to-[#5D63CF] h-14 aspect-square text-white fixed bottom-14 right-0 p-2 flex justify-center items-center text-4xl rounded-full m-4'>
                  <BsPlus />
              </div>
          </Link>
      </main>
    </div>
  )
}

