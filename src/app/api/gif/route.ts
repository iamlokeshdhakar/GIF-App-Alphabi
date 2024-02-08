import DailyStats from '@/modal/dailyStatsSchema'
import Gif from '@/modal/gifSchema'
import User from '@/modal/userSchema'
import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  await connectMongoDB()
  const { likeBy, url, gifId, gifName } = await req.json()

  const result = await Gif.findOneAndUpdate(
    { gifId },
    {
      $setOnInsert: { url, gifId, gifName },
      $addToSet: { likeBy },
    },
    { upsert: true, new: true },
  )

  // if (result.likeBy.includes(likeBy)) {
  //   return Response.json({ message: 'Liked' })
  // }

  await DailyStats.findOneAndUpdate(
    { date: new Date().toISOString().split('T')[0] },
    { $inc: { likes: 1 } },
    { upsert: true },
  )

  await User.findOneAndUpdate(
    { _id: likeBy },
    { $inc: { likeCount: 1 } },
    { upsert: false, new: false },
  )

  return Response.json({ message: 'Liked' })
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId')
  await connectMongoDB()

  const likedGifs = await Gif.find({ likeBy: userId })
  return Response.json(likedGifs)
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const gifId = searchParams.get('gifId')

  await connectMongoDB()

  const gif = await Gif.findByIdAndDelete(gifId)

  if (!gif) return Response.json({ message: 'Gif not found', gifId, gif })
  return Response.json({ message: 'Gif deleted', gifId, gif })
}
