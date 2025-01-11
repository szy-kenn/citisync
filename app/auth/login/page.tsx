'use client'
import { useState } from 'react';
import { auth } from '../../../lib/firebase/firebaseConfig';
import { useSignInWithGoogle, useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, loading, error] = useAuthState(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if (error || googleError) {
        return (
            <div>
                <p>Error: {error?.message || googleError?.message}</p>
            </div>
        );
    }

    if (loading || googleLoading) {
        return <p>Loading...</p>;
    }

   return (
        <div className='flex justify-center items-center h-screen'>
            <Card className='py-8 flex flex-col px-5'>
                <div className='h-[120px] w-[120px] aspect-square bg-gray-300 mx-auto mb-10' />
                
                <div className='flex flex-col gap-8 items-center justify-center'>
                    <div className='flex flex-col gap-2 w-[300px] h-[50px]'>
                        <h4>Email</h4>
                        <Input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                        />
                    </div>
                    <div className='flex flex-col gap-2 w-[300px] h-[50px]'>
                        <h4>Password</h4>
                        <Input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                        />
                    </div>
                    <h4>Don't have an Account? <Link href='/auth/register'><u>Sign Up</u></Link></h4>
                    <Button onClick={() => signInWithGoogle()} className='w-[300px] h-[50px] bg-[#4285F4] text-white'>Sign In with Google</Button>
                </div>
            </Card>
        </div>
   )
        
}

