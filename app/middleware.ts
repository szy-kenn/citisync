import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/firebaseConfig'

export function middleware(request: NextRequest) {
    // Get the pathname of the request
    const path = request.nextUrl.pathname

    // Define public paths that don't require authentication
    const isPublicPath = path === '/auth/login' || path === '/auth/signup'

    // Get the user's auth state
    const [user, loading] = useAuthState(auth)

    // Redirect to login if user is not authenticated
    if (!isPublicPath && !user && !loading) {
        return NextResponse.redirect('/auth/login')
    }

    // if user is authenticated, continue to the next middleware
    return NextResponse.next()
  
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/profile',
    '/auth/login',
    '/auth/signup',
    '/protected/:path*'
  ]
}