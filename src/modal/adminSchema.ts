import mongoose, { Schema, Document } from 'mongoose'

interface IAdmin extends Document {
  email: string
  password: string
}

const adminSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin
