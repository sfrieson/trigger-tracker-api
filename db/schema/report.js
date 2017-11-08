import mongoose from 'mongoose';
const { Schema } = mongoose;

const reportSchema = new Schema({
  symptom: String
});

export default mongoose.model('Report', reportSchema);
