import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as StripeController from '../controllers/stripe.controller';
import * as PurchaseOrderController from '../controllers/purchase_order.controller';
import * as ProductsController from '../controllers/product.controller';
import * as ContactController from '../controllers/contact.controller';
const router = new Router();

// Get all Posts
router.route('/getPosts').get(PostController.getPosts);

// Get Todays Posts for Feed
router.route('/getTodaysPosts').get(PostController.getTodaysPosts);

// Get one post by title
router.route('/getPost').get(PostController.getPost);

// Add a new Post
router.route('/addPost').post(PostController.addPost);

// Delete a Post
router.route('/deletePost').post(PostController.deletePost);

// Add a charge endpoint for stripe
router.route('/addCharge').post(StripeController.addCharge);

router.route('/addMonthlyCharge').post(StripeController.addMonthlyCharge);

// router.route('/addLukasCharge').post(StripeController.addLukasCharge);

// Add purchase orders when customers buy schwag
router.route('/addPurchaseOrder').post(PurchaseOrderController.addPurchaseOrder);

// Get them for admins
router.route('/getPurchaseOrders').get(PurchaseOrderController.getPurchaseOrders);

router.route('/getProducts').get(ProductsController.getProducts);

// send contact form
router.route('/sendContactForm').post(ContactController.sendContactForm);
router.route('/addMessage').post(ContactController.addMessage);
router.route('/getMessages').get(ContactController.getMessages);


export default router;
