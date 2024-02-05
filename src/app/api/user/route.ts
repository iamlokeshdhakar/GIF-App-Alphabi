import User from '@/modal/userSchema'
import { connectMongoDB } from '@/utils/db'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('email')

  await connectMongoDB()

  const founUser = await User.findOne({ email })

  return Response.json({ user: founUser })
}
