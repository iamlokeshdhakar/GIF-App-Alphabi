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
    fullname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dailyStats: { type: mongoose.Schema.Types.ObjectId, ref: 'DailyStats' },
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model<any>('User', userSchema)

export default User
