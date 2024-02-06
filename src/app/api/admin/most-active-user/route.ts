import User from '@/modal/userSchema'

export async function GET() {
  const res = await User.find()

  return Response.json({ res, message: 'Get' })
}
