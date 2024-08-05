'use server'

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {jwtDecode} from 'jwt-decode';
import userService from '@/service/user-service';

export async function middleware(request) {
    const accessToken = cookies().get('access_token');
    if (!accessToken) return handleRedirect(request);

    try {
        const validateToken = await userService.authValidate(accessToken.value);
        if (!validateToken) {
            return handleRedirect(request, "access_token");
        }

        const decodedToken = jwtDecode(accessToken.value);
        if (request.nextUrl.pathname.startsWith('/management') && decodedToken.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/list', request.url));
        }
    } catch (error) {
        console.error('Error validating token:', error);
        return handleRedirect(request, "access_token");
    }

    return NextResponse.next();
}

const handleRedirect = (request, removeCookie = null) => {
    let response = NextResponse.next();

    if (request.nextUrl.pathname.includes('my-user') || request.nextUrl.pathname.startsWith('/management')) {
        response = NextResponse.redirect(new URL('/list', request.url));
    }

    if (removeCookie) response.cookies.delete(removeCookie);

    return response;
}
