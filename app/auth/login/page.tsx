'use client';
import { Input } from "@/components/ui/input";



export default function Login() {

    return (
        <div>
            <h1>Log In</h1>
            <form>
                <Input placeholder="Email or Phone Number"></Input>
                <Input placeholder="Enter your Password"></Input>
            </form>
        </div>
    )
}