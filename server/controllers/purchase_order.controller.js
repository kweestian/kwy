import PurchaseOrder from '../models/purchase_order';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

export function getPurchaseOrders(req, res) {
  PurchaseOrder.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

export function addPurchaseOrder(req, res) {
  if (!req.body.PurchaseOrder.itemType && !req.body.PurchaseOrder.customerEmail && !req.body.PurchaseOrder.charge) {
    return res.status(403).end();
  }

  const newPurchaseOrder = new PurchaseOrder(req.body.PurchaseOrder);

  // Let's sanitize inputs
  newPurchaseOrder.customerEmail = sanitizeHtml(newPurchaseOrder.customerEmail);
  newPurchaseOrder.charge = sanitizeHtml(newPurchaseOrder.charge);
  newPurchaseOrder.message = sanitizeHtml(newPurchaseOrder.message);
  newPurchaseOrder.itemType = sanitizeHtml(newPurchaseOrder.itemType);
  newPurchaseOrder.delivery = sanitizeHtml(newPurchaseOrder.delivery);
  newPurchaseOrder.address = sanitizeHtml(newPurchaseOrder.address);
  newPurchaseOrder.shirtSize = sanitizeHtml(newPurchaseOrder.shirtSize);

  newPurchaseOrder.slug = slug(newPurchaseOrder.type.toLowerCase(), { lowercase: true });
  newPurchaseOrder.cuid = cuid();
  newPurchaseOrder.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ PurchaseOrder: saved });
  });
}
