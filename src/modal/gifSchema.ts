import mongoose, { Schema, Document } from 'mongoose'

interface IGif extends Document {
  gifId?: string
  url: string
  keyword: string[]
  likeCount: number
}

const gifSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    url: { type: String, required: true },
    gifId: { type: String, required: true },
  },
  { timestamps: true },
)

const Gif = mongoose.models.Gif || mongoose.model<any>('Gif', gifSchema)

export default Gif
