import Post from '../models/post';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';
import { middleWareConnections } from '../middleware/sse';
import moment from 'moment';

export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

export function getTodaysPosts(req, res) {
  const startDate = moment().startOf('day');
  const endDate = moment(startDate).add(1, 'days');

  Post.find({ dateAdded: { $gte: startDate, $lt: endDate } }).sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

export function addPost(req, res) {
  if (!req.body.post.firstName && !req.body.post.lastName && !req.body.post.message && !req.body.post.amount) {
    return res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.firstName = sanitizeHtml(newPost.firstName);
  newPost.lastName = sanitizeHtml(newPost.lastName);
  newPost.message = sanitizeHtml(newPost.message);
  newPost.amount = sanitizeHtml(newPost.amount);

  newPost.slug = slug('donation');
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }

    for (let i = 0; i < middleWareConnections.length; i++) {
      middleWareConnections[i].sseSend('newPost');
    }

    return res.json({ post: saved });
  });
}

export function getPost(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Post.findOne({ cuid: newCuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post });
  });
}

export function deletePost(req, res) {
  const postId = req.body.postId;
  Post.findById(postId).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
