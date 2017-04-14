import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  emailFrom: { type: 'String' },
  title: { type: 'String' },
  message: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Message', messageSchema);
