import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// FIX: Changed '/bill(*)' to '/bill*' to match all subpaths (e.g., /bill, /bill/123, /bill/edit)
const isProtectedRoute = createRouteMatcher(['/my-pay-bills', '/add-bill', '/:path*'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}