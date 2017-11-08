import mongoose from 'mongoose';
const { Schema } = mongoose;

const recordSchema = new Schema({
  food: String
});

export default mongoose.model('Record', recordSchema);
