import { Card } from "@/components/ui/card"
import { BsCheck } from "react-icons/bs"
import { useRouter } from "next/navigation"

export default function Status({ current_status } : { current_status: string | string[] }) {

    const router = useRouter()

    const handleStatusChange = (status: string) => {
        if (status === 'resolved') {
            router.push('/feed/resolved')
        } else {
            router.push('/feed/unresolved')
        }
    }

    return (
        <div className="absolute top-7 right-5 w-48 z-50">
            <Card className="flex flex-col gap-2 p-2">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleStatusChange('resolved')}>
                    <h2>Resolved</h2>
                    {current_status === 'resolved' && <BsCheck className=" text-2xl" />}
                </div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleStatusChange('unresolved')}>
                    <h2>Unresolved</h2>
                    {current_status === 'unresolved' && <BsCheck className="text-2xl" />}
                </div>
            </Card>
        </div>
    )
}