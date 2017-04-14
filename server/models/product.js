import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  itemType: { type: 'String' },
  color: {type: 'String'},
  size: {type: 'String'},
  image: {type: 'String'},
  price: { type: 'String' },
  slug: { type: 'String' },
  cuid: { type: 'String', },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Product', productSchema);
