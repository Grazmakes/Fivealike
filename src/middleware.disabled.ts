// NOTE: This middleware is disabled for the static export build. Rename this file back to
// `middleware.ts` if you switch away from `output: 'export'` and need runtime middleware again.

import { NextRequest, NextResponse } from 'next/server'

// Simple rate limiting using Map (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100 // 100 requests per minute per IP

export function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'
  const now = Date.now()
  
  // Clean up old entries
  rateLimitMap.forEach((value, key) => {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key)
    }
  })
  
  // Check rate limit for this IP
  const rateLimitKey = `${ip}:${Math.floor(now / RATE_LIMIT_WINDOW)}`
  const currentLimit = rateLimitMap.get(rateLimitKey) || { count: 0, timestamp: now }
  
  if (currentLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    )
  }
  
  // Update rate limit
  rateLimitMap.set(rateLimitKey, {
    count: currentLimit.count + 1,
    timestamp: now
  })
  
  // Add security headers
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Rate-Limit-Remaining', String(RATE_LIMIT_MAX_REQUESTS - currentLimit.count))
  
  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
