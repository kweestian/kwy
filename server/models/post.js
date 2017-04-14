import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  firstName: { type: 'String' },
  lastName: { type: 'String' },
  anonymous: { type: 'Boolean', default: true, required: true },
  amount: { type: 'String' },
  message: { type: 'String' },
  slug: { type: 'String' },
  cuid: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Post', postSchema);
