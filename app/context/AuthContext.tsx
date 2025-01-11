'use client'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/firebaseConfig"
import { createContext, useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: any;
    loading: boolean;
    error: Error | undefined;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children } : { children: React.ReactNode}) => {

    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [loading, user]);

    return (
        <AuthContext.Provider value={{ user, loading, error }}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
