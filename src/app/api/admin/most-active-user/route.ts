import User from '@/modal/userSchema'

export async function GET() {
  const topUsers = await User.find().sort({ searchCount: -1 }).limit(5)

  return Response.json(topUsers)
}
