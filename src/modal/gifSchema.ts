import mongoose, { Schema, Document } from 'mongoose'

interface IGif extends Document {
  gifId?: string
  url: string
  keyword: string[]
  likeCount: number
}

const gifSchema: Schema = new Schema(
  {
    gifId: String,
    url: String,
    keywords: [String],
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const Gif = mongoose.models.Gif || mongoose.model<IGif>('Gif', gifSchema)

export default Gif
