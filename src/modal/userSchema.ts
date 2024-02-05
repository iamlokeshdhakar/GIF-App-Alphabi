import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  fullname?: string
  email: string
  password: string
  likes: string[]
}

const userSchema: Schema = new Schema(
  {
    fullname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    likes: [{ type: String }],
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
