import mongoose from 'mongoose';
const { Schema } = mongoose;

const recordSchema = new Schema({
  timestamp: Number,
  food: String,
  foodGroup: String,
  homemade: Boolean,
  solid: Boolean,
  attributes: [String]
});

recordSchema.pre('save', function (next) {
  this.timestamp = Date.now();
  next();
});

export default mongoose.model('Record', recordSchema);
