'use client'
import { ProposalSubmissionForm } from "../components/proposal-submisstion"
import BackButton from '@/components/back-button'
import { Separator } from '@/components/ui/separator'
import { useRouter } from "next/navigation"

export default function Add() {

    const router = useRouter()

    const handleBack = () => {
        router.push('/feed/proposal')
    }

    return (
        <div className="py-2 px-4">
            <div className='flex gap-2 justify-between pb-2 cursor-pointer' onClick={handleBack}>
                <BackButton />
            </div>
            <Separator />
            <ProposalSubmissionForm />
        </div>
    )
}