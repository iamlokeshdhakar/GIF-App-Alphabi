import Gif from '@/modal/gifSchema'
import { connectMongoDB } from '@/utils/db'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
  await connectMongoDB()

  //   const res = await Gif.find().sort({ likes: -1 }).limit(10)

  const topLikedGifs = await Gif.aggregate([
    {
      $group: {
        _id: '$gifId',
        totalLikes: { $sum: 1 },
      },
    },
    {
      $sort: { totalLikes: -1 },
    },
    {
      $lookup: {
        from: 'gifs',
        localField: '_id',
        foreignField: 'gifId',
        as: 'gifDetails',
      },
    },
    {
      $unwind: '$gifDetails',
    },
    {
      $project: {
        _id: 0,
        gifId: '$_id',
        totalLikes: 1,
        url: '$gifDetails.url',
      },
    },
    {
      $limit: 10,
    },
  ])

  //   await Gif.aggregate([
  //     {
  //       $group: {
  //         _id: '$gifId',
  //         totalLikes: { $sum: 1 },
  //       },
  //     },
  //     {
  //       $sort: { totalLikes: -1 },
  //     },
  //     {
  //       $lookup: {
  //         from: 'gifs',
  //         localField: '_id',
  //         foreignField: 'gifId',
  //         as: 'gifDetails',
  //       },
  //     },
  //     {
  //       $unwind: '$gifDetails',
  //     },
  //     {
  //       $project: {
  //         gifId: '$_id',
  //         totalLikes: 1,
  //         url: '$gifDetails.url',
  //       },
  //     },
  //     {
  //       $limit: 10,
  //     },
  //   ])

  return Response.json({ topLikedGifs })
}
