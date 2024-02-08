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
      aggregationPipeline.push(
        {
          $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        },
        {
          $sort: { date: 1 },
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateToString: {
                format: '%d-%m-%Y', // Format as day-month-year (e.g., 21-01-2024)
                date: '$date',
              },
            },
            userRegistrations: '$userRegistrations',
            keywordSearches: '$keywordSearches',
            likes: '$likes',
          },
        },
      )
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
            _id: { month: { $month: { $toDate: '$date' } }, year: { $year: { $toDate: '$date' } } },
            userRegistrations: { $sum: '$userRegistrations' },
            keywordSearches: { $sum: '$keywordSearches' },
            likes: { $sum: '$likes' },
          },
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateToString: {
                format: '%m-%Y',
                date: { $dateFromParts: { year: '$_id.year', month: '$_id.month', day: 1 } },
              },
            },
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
      aggregationPipeline.push(
        {
          $sort: { date: -1 },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateToString: {
                format: '%d-%m-%Y', // Format as day-month-year (e.g., 21-01-2024)
                date: '$date',
              },
            },
            userRegistrations: '$userRegistrations',
            keywordSearches: '$keywordSearches',
            likes: '$likes',
          },
        },
      )
    }

    const data = await DailyStats.aggregate(aggregationPipeline)

    if (data.length === 0) {
      return Response.json({ status: 404, message: 'No data found' })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ status: 500, message: 'Internal Server Error' })
  }
}
