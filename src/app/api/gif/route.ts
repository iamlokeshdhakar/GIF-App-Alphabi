import Gif from '@/modal/gifSchema'
import User from '@/modal/userSchema'
import { connectMongoDB } from '@/utils/db'

export async function POST(req: Request) {
  await connectMongoDB()
  const data = await req.json()

  const user = await User.findOne({ email: data.userEmail })

  const gif = await Gif.create({ url: data.url, gifId: data.gifId, userId: user.id })

  if (!gif) return Response.json({ message: 'Gif not created' })

  //   const userUpdate = await User.findOneAndUpdate({ email: data.userEmail }, { likes: gif })

  return Response.json({ message: 'Gif created' })
}
