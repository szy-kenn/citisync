'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/firebaseConfig';
import { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { generateUsername } from 'unique-username-generator';

interface AuthContextType {
    user: any;
    loading: boolean;
    error: Error | undefined;
    username: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthGuardProps {
    children: ReactNode;
    loadingComponent?: ReactNode;
}

export const AuthProvider = ({
    children,
    loadingComponent = <div>Loading...</div>,
}: AuthGuardProps) => {
    const [user, loading, error] = useAuthState(auth);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const setSession = async () => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    // Fetch username from Firestore if user exists
                    setUsername(userDoc.data().username || null);
                } else {
                    // Generate a new username and save to Firestore
                    const newUsername = generateUsername();
                    await setDoc(userRef, {
                        username: newUsername,
                        email: user.email,
                        createdAt: new Date(),
                    });
                    setUsername(newUsername);
                }

                const token = await user.getIdToken();
                document.cookie = `session=${token}; path=/`;
            } else {
                document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                setUsername(null);
            }
        };

        const publicRoutes = ['/auth/login', '/auth/signup', '/'];
        const authRoutes = ['/auth/login', '/auth/signup'];
        const isPublicRoute = publicRoutes.includes(pathname);
        const isAuthRoute = authRoutes.includes(pathname);

        if (!loading) {
            setSession();

            if (user && isAuthRoute) {
                router.replace('/feed');
                return;
            }

            if (!user && !isPublicRoute) {
                router.replace('/auth/login');
                return;
            }
        }
    }, [user, loading, pathname]);

    // Show loading state until we're sure about authentication
    if (loading) {
        return <>{loadingComponent}</>;
    }

    // Don't render children until we're sure they should see the content
    const publicRoutes = ['/auth/login', '/auth/signup', '/'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
        return <>{loadingComponent}</>;
    }

    return (
        <AuthContext.Provider value={{ user, loading, error, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
