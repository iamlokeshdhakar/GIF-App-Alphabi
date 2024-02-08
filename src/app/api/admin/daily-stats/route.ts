// import DailyStats from '@/modal/dailyStatsSchema'
// import { connectMongoDB } from '@/utils/db'
// import { NextRequest } from 'next/server'

// export async function GET(req: NextRequest) {
//   try {
//     const searchParams = req.nextUrl.searchParams
//     const startDate = searchParams.get('startDate')
//     const endDate = searchParams.get('endDate')
//     await connectMongoDB()

//     if (startDate && endDate) {
//       const res = await DailyStats.find({ date: { $gte: startDate, $lte: endDate } }).sort({
//         date: 1,
//       })
//       if (res.length === 0) {
//         return Response.json({ status: 404, message: 'No data found' })
//       }
//       return Response.json(res)
//     } else {
//       const res = await DailyStats.aggregate([{ $sort: { date: -1 } }, { $limit: 5 }])
//       if (res.length === 0) {
//         return Response.json({ status: 404, message: 'No data found' })
//       }
//       return Response.json(res)
//     }
//   } catch (error) {
//     return Response.json({ status: 500, message: 'Internal Server Error' })
//   }
// }

import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'
import DailyStats from '@/modal/dailyStatsSchema'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const aggregationLevel = searchParams.get('aggregationLevel') || 'daily'

    await connectMongoDB()

    const aggregationPipeline: any[] = []

    if (aggregationLevel === 'daily' && startDate && endDate) {
      aggregationPipeline.push({
        $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } },
      })
    } else if (aggregationLevel === 'weekly') {
      aggregationPipeline.push({
        $group: {
          _id: { $isoWeek: { $toDate: '$date' } },
          userRegistrations: { $sum: '$userRegistrations' },
          keywordSearches: { $sum: '$keywordSearches' },
          likes: { $sum: '$likes' },
        },
      })
    } else if (aggregationLevel === 'monthly') {
      aggregationPipeline.push(
        {
          $group: {
            _id: { $month: { $toDate: '$date' } },
            userRegistrations: { $sum: '$userRegistrations' },
            keywordSearches: { $sum: '$keywordSearches' },
            likes: { $sum: '$likes' },
          },
        },
        {
          $project: {
            date: '$_id',
            userRegistrations: '$userRegistrations',
            keywordSearches: '$keywordSearches',
            likes: '$likes',
          },
        },
        {
          $sort: { date: 1 },
        },
      )
    } else {
      console.log('aggregationLevel', aggregationLevel)
      aggregationPipeline.push({ $sort: { date: -1 } }, { $limit: 5 })
    }

    const data = await DailyStats.aggregate(aggregationPipeline)
    console.log('data', data)

    if (data.length === 0) {
      return Response.json({ status: 404, message: 'No data found' })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ status: 500, message: 'Internal Server Error' })
  }
}
