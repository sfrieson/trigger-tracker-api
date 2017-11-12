import mongoose from 'mongoose'
const { Schema } = mongoose

const reportSchema = new Schema({
  timestamp: Number,
  symptom: String,
  attributes: [String]
})

reportSchema.pre('save', function (next) {
  this.timestamp = Date.now()
  next()
})

export default mongoose.model('Report', reportSchema)
