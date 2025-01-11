import { Card } from "@/components/ui/card"

export default function Confirmation() {

    return (
        <Card className='py-8 flex flex-col px-5'>
            <div className='h-[180px] aspect-square bg-gray-300 mx-auto mb-10' />
            <h4 className='text-center text-gray-400 w-[400px] mt-12'>Please wait for the verification process to check if you're eligible for additional discounts.</h4>
        </Card>
    )
}