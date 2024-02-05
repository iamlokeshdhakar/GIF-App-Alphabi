import mongoose from 'mongoose'

export async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB:', error)
  }
}
