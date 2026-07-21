export { auth as middleware } from '@/auth'

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static  (Next.js static files)
     * - _next/image   (Next.js image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Public folder assets (svg, png, jpg, jpeg, gif, webp, ico, css, js)
     * - API routes (/api/...) — handled by their own auth inside the route handler
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$|api/).*)',
  ],
}
