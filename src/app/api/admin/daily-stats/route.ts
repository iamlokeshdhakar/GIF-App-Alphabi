import { connectMongoDB } from '@/utils/db'
import { NextRequest } from 'next/server'
import DailyStats from '@/modal/dailyStatsSchema'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const searchParams = await req.nextUrl.searchParams
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
                format: '%d-%m-%Y',
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
      aggregationPipeline.push(
        {
          $project: {
            _id: 0,
            date: {
              $dateToString: {
                format: '%m-%Y',
                date: '$date',
              },
            },
            week: {
              $add: [
                1,
                {
                  $floor: {
                    $divide: [
                      {
                        $subtract: [
                          '$date',
                          {
                            $dateFromParts: {
                              year: { $year: '$date' },
                              month: { $month: '$date' },
                              day: 1,
                            },
                          },
                        ],
                      },
                      1000 * 60 * 60 * 24 * 7,
                    ],
                  },
                },
              ],
            },
            userRegistrations: '$userRegistrations',
            keywordSearches: '$keywordSearches',
            likes: '$likes',
          },
        },
        {
          $group: {
            _id: {
              week: '$week',
              monthYear: '$date',
            },
            userRegistrations: { $sum: '$userRegistrations' },
            keywordSearches: { $sum: '$keywordSearches' },
            likes: { $sum: '$likes' },
          },
        },
        {
          $sort: { _id: 1 },
        },
      )
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

    if (data?.length === 0) {
      return Response.json({ status: 404, message: 'No data found' })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Error:', error)
    return Response.json({ status: 500, message: 'Internal Server Error' })
  }
}
