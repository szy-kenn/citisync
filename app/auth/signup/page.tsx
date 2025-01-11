import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function SignIn() {

    return (
        <div className="mt-32 min-h-screen px-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl text-blue-dark">Sign In</h1>
                <Input placeholder="Email or Phone Number" />
                <Input placeholder="Enter your Password" type="password" />
                <Button className="text-white h-12 rounded-xl mt-2 bg-blue">
                    Sign In
                </Button>
            </div>
        </div>
    )
}
    