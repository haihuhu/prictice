import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;
  const isProtectedRoute =
    pathname === '/practice/week9' ||
    pathname.startsWith('/practice/week9/') ||
    pathname === '/practice/week10' ||
    pathname.startsWith('/practice/week10/');
  if (isProtectedRoute) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',

    '/practice/week9/(.*)',
    '/practice/week10/(.*)',
  ],
};
