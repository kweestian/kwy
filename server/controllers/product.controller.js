import Product from '../models/product';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

export function getProducts(req, res) {
  Product.find().sort('-dateAdded').exec((err, products) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ products });
  });
}

export function addProduct(req, res) {
  if (!req.body.Product.itemType && !req.body.Product.customerEmail && !req.body.Product.charge) {
    return res.status(403).end();
  }

  const newProduct = new Product(req.body.Product);

  itemType = sanitizeHtml(newProduct.itemType)
  color = sanitizeHtml(newProduct.color)
  size = sanitizeHtml(newProduct.size)
  image = sanitizeHtml(newProduct.image)
  price = sanitizeHtml(newProduct.price)

  newProduct.slug = slug(newProduct.type.toLowerCase(), { lowercase: true });
  newProduct.cuid = cuid();
  newProduct.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ Product: saved });
  });
}
