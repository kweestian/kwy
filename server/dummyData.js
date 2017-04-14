/* eslint-disable */
import Product from './models/product';
import User from './models/user';
import cuid from 'cuid';
import slug from 'slug';

export default function () {

  Product.count().exec((err, count) => {
    if (count > 0) {
      // Product.remove({}, (err) => {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     console.log('Success')
      //   }
      // })
      return
    };

    const bracelet = new Product({
      itemType: 'Bracelet',
      image: '/img/black_rose_anchor_miansai.jpg',
      price: '15',
      cuid: cuid(),
      slug: slug('bracelet'.toLowerCase(), { lowercase: true }),
    });

    bracelet.save();
    console.log('saved');

  });

  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const admin = new User({
      email: 'kidswithoutyachts@gmail.com',
      isAdmin: true,
      cuid: cuid(),
    });

    admin.password = admin.generateHash('fuckcancer');

    admin.save();
  });
}
