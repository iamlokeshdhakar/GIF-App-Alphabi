import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  fullname?: string
  email: string
  password: string
  searchCount: number
  dailyStats?: mongoose.Schema.Types.ObjectId
}

const userSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dailyStats: { type: mongoose.Schema.Types.ObjectId, ref: 'DailyStats' },
    searchCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model<any>('User', userSchema)

export default User
