import mongoose, { Schema, Document } from 'mongoose'

interface IGif extends Document {
  gifId?: string
  url: string
  likeBy: [{ type: String }]
  gifName: string
  dailyStats?: mongoose.Schema.Types.ObjectId
}

const gifSchema: Schema = new Schema(
  {
    likeBy: { type: Array },
    url: { type: String, required: true },
    gifId: { type: String, required: true },
    gifName: { type: String, required: true },
    dailyStats: { type: mongoose.Schema.Types.ObjectId, ref: 'DailyStats' },
  },

  { timestamps: true },
)

const Gif = mongoose.models.Gif || mongoose.model<any>('Gif', gifSchema)

export default Gif
