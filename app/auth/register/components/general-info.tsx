import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"


export default function GeneralInfo() {

    return (
        <Card className='py-8 flex flex-col px-5'>
            <div className='h-[120px] w-[120px] aspect-square bg-gray-300 mx-auto mb-10' />
            <div className='flex flex-col gap-4 items-center justify-center'>
                <div className='flex flex-col gap-2 w-[300px] h-[50px]'>
                    <h4>Full Name</h4>
                    <Input
                        type='text'
                    />
                </div>
                <div className="flex flex-col gap-2 w-[300px] h-[50px]">
                    <h4>Gender</h4>
                    <Input 
                        type="text"
                    />
                </div>
                <div className="flex flex-col gap-2 w-[300px] h-[50px]">
                    <h4>Date of Birth</h4>
                    <Input 
                        type="date"
                    />
                </div>
                <div className='flex flex-col gap-2 w-[300px] h-[50px]'>
                    <h4>Email</h4>
                    <Input
                        type='email'
                    />
                </div>
                <div className='flex flex-col gap-2 w-[300px] h-[50px]'>
                    <h4>Password</h4>
                    <Input
                        type='password'
                    />
                </div>
            </div>
        </Card>
    )
}