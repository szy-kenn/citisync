import { Card } from "@/components/ui/card"

export default function Final() {

    return (
        <Card className='py-8 flex flex-col px-5'>
            <div className='h-[300px] aspect-square bg-gray-300 mx-auto mb-10' />
            <h4 className='text-center text-gray-400 w-[400px] mt-12'>Congrats! Your information has been successfully submitted. Please continue to the app</h4>
        </Card>
    )
}