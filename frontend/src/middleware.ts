import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

export default withAuth(
  async function middleware(req: any) {
    const pathname = req.nextUrl.pathname;
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith('/login');

    // const sensitiveRoutes = ['/adminDashboard'];
    // const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
    //   pathname.startsWith(route)
    // );

    // if (isLoginPage) {
    //   if (isAuth && !req.nextauth.token?.userType[0]?.admin) {
    //     return NextResponse.redirect(new URL('/adminDashboard', req.url));
    //   }

    //   return NextResponse.next();
    // }

    // if (
    //   !isAuth &&
    //   !req.nextauth.token?.userType[0]?.admin &&
    //   isAccessingSensitiveRoute
    // ) {
    //   return NextResponse.redirect(new URL('/login', req.url));
    // }

    // if (pathname === '/') {
    //   return NextResponse.redirect(new URL('/adminDashboard', req.url));
    // }

    if (isLoginPage) {
      if (isAuth && !req.nextauth.token?.userType[0]?.admin) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }

      return NextResponse.next();
    }
    if (
      pathname.startsWith('/admin') &&
      !req.nextauth.token?.userType[0]?.admin
    ) {
      // return new NextResponse('You are not authorized');

      const message = 'Access to this page is restricted.';
      const helpUrl = '/'; // URL to provide assistance

      return NextResponse.redirect(
        new URL(
          `/restricted?message=${encodeURIComponent(
            message
          )}&helpUrl=${encodeURIComponent(helpUrl)}`,
          req.url
        )
      );
      // Create a response with JSON format
      // return NextResponse.json({ message, helpUrl }, { status: 403 });
    }
  },
  {
    callbacks: {
      async authorized(params) {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
