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
    likeCount: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true },
)

const Gif = mongoose.models.Gif || mongoose.model<any>('Gif', gifSchema)

export default Gif
