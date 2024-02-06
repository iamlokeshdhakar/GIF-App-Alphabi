import Gif from '@/modal/gifSchema'
import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  await connectMongoDB()

  try {
    // const topLikedGifs = await Gif.find().sort({ likeBy: -1 }).limit(5)

    const topLikedGifs = await Gif.aggregate([
      {
        $project: {
          _id: 1,
          url: 1,
          gifId: 1,
          gifName: 1,
          likeCount: { $size: '$likeBy' },
        },
      },
      {
        $sort: { likeCount: -1 },
      },
      {
        $limit: 5,
      },
    ])

    return Response.json(topLikedGifs)
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal Server Error' })
  }
}
