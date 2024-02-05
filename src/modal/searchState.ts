import mongoose, { Schema, Document } from 'mongoose'

interface IsearchState extends Document {
  keyword: String
  searchCount: Number
  likeCount: Number
}

const searchStateSchema: Schema = new Schema({
  keyword: String,
  searchCount: Number,
  likeCount: { type: Number, default: 0 },
})

const searchState =
  mongoose.models.searchState || mongoose.model<IsearchState>('searchState', searchStateSchema)

export default searchState
