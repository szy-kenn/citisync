
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/auth/login' || path === '/auth/signup'
    const token = request.cookies.get('session')

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/auth/login',
        '/auth/signup',
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}