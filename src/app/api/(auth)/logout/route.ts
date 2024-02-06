// import { NextRequest, NextResponse } from 'next/server'

import { NextRequest, NextResponse } from 'next/server'

// export async function GET(req: NextRequest, res: NextResponse) {
//   req.cookies.clear()
//   return Response.json({ message: 'User logged out successfully' })
// }

export async function GET(req: NextRequest) {
  return Response.json({ message: 'User logged out successfully' })
}
