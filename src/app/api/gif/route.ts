import DailyStats from '@/modal/dailyStatsSchema'
import Gif from '@/modal/gifSchema'
import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  await connectMongoDB()
  const { likeBy, url, gifId, gifName } = await req.json()

  const gifExists = await Gif.findOne({ gifId })

  if (!gifExists) {
    const gif = await Gif.create({ url, gifId, likeBy, gifName })
    if (!gif) return Response.json({ message: 'Gif not liked' })
    await DailyStats.findOneAndUpdate(
      { date: new Date().toISOString().split('T')[0] },
      { $inc: { likes: 1 } },
      { upsert: true },
    )
    return Response.json({ message: 'Liked' })
  } else {
    if (gifExists.likeBy.includes(likeBy)) {
      return Response.json({ message: 'Already Liked' })
    } else {
      const updatedGif = await Gif.findOneAndUpdate(
        { gifId },
        { $push: { likeBy: likeBy } },
        { new: true },
      )
      await DailyStats.findOneAndUpdate(
        { date: new Date().toISOString().split('T')[0] },
        { $inc: { likes: 1 } },
        { upsert: true },
      )
      return Response.json({ message: 'Liked' })
    }
  }
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
