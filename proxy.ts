import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard', '/integrations']
const publicRoutes = ['/login', '/signup', '/']

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path);

    const accessToken = req.cookies.get("access_token")?.value;
    const refreshToken = req.cookies.get("refresh_token")?.value;

    let isAuthenticated = false;
    let response = NextResponse.next();

    if (accessToken) {
        try {
            const verifyRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/accounts/verify/`,
                {
                    method: "POST",
                    headers: {
                        Cookie: `access_token=${accessToken}`,
                    },
                }
            );

            isAuthenticated = verifyRes.ok;

            if (!isAuthenticated && refreshToken) {
                const refreshRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/accounts/refresh/`,
                    {
                        method: "POST",
                        headers: {
                            Cookie: `refresh_token=${refreshToken}`,
                        },
                    }
                );

                if (refreshRes.ok) {
                    isAuthenticated = true;

                    const setCookie = refreshRes.headers.get("set-cookie");

                    if (setCookie) {
                        response.headers.set("set-cookie", setCookie);
                    }
                }
            }
        } catch {
            isAuthenticated = false;
        }
    }

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isPublicRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};