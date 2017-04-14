import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const purchaseOrderSchema = new Schema({
  sku: { type: 'String' },
  itemType: { type: 'String', required: true },
  customerEmail: { type: 'String', required: true },
  charge: {
    shipping: { type: 'String' },
    pst: { type: 'String' },
    gst: { type: 'String' },
    total: { type: 'String' },
  },
  shirtSize: { type: 'String' },
  message: { type: 'String' },
  delivery: { type: 'Boolean' },
  address: { type: 'String' },
  slug: { type: 'String' },
  cuid: { type: 'String' },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);
