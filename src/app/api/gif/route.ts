import Gif from '@/modal/gifSchema'
import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  await connectMongoDB()
  const { userId, url, gifId } = await req.json()

  const gif = await Gif.create({ userId, url, gifId })

  if (!gif) return Response.json({ message: 'Gif not created' })

  return Response.json({ message: 'Gif created' })
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')
  await connectMongoDB()

  const likedGifs = await Gif.find({ userId })
  return Response.json(likedGifs)
}
