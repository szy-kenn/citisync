'use client';
import { Input } from "@/components/ui/input";
import { SectionDivider } from "@/components/ui/section-divider";
import { useSignInWithGoogle, useSignInWithApple, useSignInWithFacebook } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Apple from '@/public/Apple.svg';
import Facebook from '@/public/Facebook.svg';
import Google from '@/public/gmail.svg';

export default function Login() {
    const router = useRouter();
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth);
    const [signInWithApple, appleUser, appleLoading, appleError] = useSignInWithApple(auth);

    useEffect(() => {
        if (googleUser || facebookUser || appleUser) {
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
                <h1 className="text-2xl text-blue-dark">Log In</h1>
                <Input placeholder="Email or Phone Number" />
                <Input placeholder="Enter your Password" type="password" />
                <span className="text-slate-500 flex justify-end text-sm cursor-pointer">
                    Forgot Password?
                </span>
                <button className="text-white h-12 rounded-xl mt-2 bg-blue">
                    Log In
                </button>
            </div>

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

            <div>
                <p className="text-center mt-8 text-slate-500 text-sm">
                    Don't have an account? 
                    <span className="text-blue-dark cursor-pointer underline ml-1">
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}