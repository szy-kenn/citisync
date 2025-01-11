'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SectionDivider } from "@/components/ui/section-divider"
import { useSignInWithGoogle, useSignInWithApple, useSignInWithFacebook, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/firebaseConfig"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Apple from '@/public/Apple.svg'
import Facebook from '@/public/Facebook.svg'
import Google from '@/public/gmail.svg'


export default function SignIn() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword, user] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);
    const [signInWithApple, appleUser, appleLoading, appleError] = useSignInWithApple(auth);

    useEffect(() => {
        if (googleUser || facebookUser || appleUser || user) {
            router.push('/');
        }
    }, [googleUser, facebookUser, appleUser]);

    const providers = [
        {
            name: 'Apple',
            icon: Apple,
            signIn: () => signInWithApple(),
            loading: appleLoading,
            error: appleError
        },
        {
            name: 'Facebook',
            icon: Facebook,
            signIn: () => signInWithFacebook(),
            loading: facebookLoading,
            error: facebookError
        },
        {
            name: 'Google',
            icon: Google,
            signIn: () => signInWithGoogle(),
            loading: googleLoading,
            error: googleError
        }
    ];

    return (
        <div className="mt-32 min-h-screen px-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl text-blue-dark">Sign In</h1>
                <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                        htmlFor="terms1"
                        className="text-sm text-blue-dark font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                            You agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
                <Button className="text-white h-12 rounded-xl mt-2 bg-blue" onClick={() => createUserWithEmailAndPassword(email, password)}>
                    Sign In
                </Button>
               <SectionDivider text="or" className="mt-8" />
               
                           <div className="flex gap-6 mt-4 justify-center">
                               {providers.map((provider, index) => (
                                   <button
                                       key={index}
                                       className="border-slate-200 border-2 h-12 aspect-square rounded-lg flex justify-center items-center hover:bg-slate-50 transition-colors disabled:opacity-50"
                                       onClick={() => provider.signIn()}
                                       disabled={provider.loading}
                                   >
                                       <Image 
                                           src={provider.icon} 
                                           alt={`${provider.name} login`}
                                           className={provider.loading ? 'opacity-50' : ''}
                                       />
                                   </button>
                               ))}
                           </div>
               
                           {providers.map(provider => 
                               provider.error && (
                                   <p key={provider.name} className="text-red-500 text-sm text-center mt-2">
                                       {provider.error.message}
                                   </p>
                               )
                           )}
            </div>
        </div>
    )
}
    