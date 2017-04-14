/* eslint-disable */

import mocha from 'mocha';
import app from '../server';
import chai from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import Post from '../models/post';

const expect = chai.expect;

function connectDB(done) {
  if (mongoose.connection.name !== 'mern-test') {
    return done();
  }



  mongoose.connect((process.env.MONGO_URL_FOR_TESTS || 'mongodb://localhost:27017/mern-test'), function (err) {
    if (err) return done(err);
    done();
  });
}

function dropDB(done) {
  if (mongoose.connection.name !== 'mern-test') {
    return done();
  }



  mongoose.connection.db.dropDatabase(function (err) {
    mongoose.connection.close(done);
  });


}

describe('GET /api/getPosts', function () {

  beforeEach('connect and add two post entries', function (done) {

    connectDB(function () {
      var post1 = new Post({firstName: 'Foo', lastName: 'Hello Mern', message: "All cats meow 'mern!'", amount: '1000'});
      var post2 = new Post({firstName: 'Foo', lastName: 'Hello Mern', message: "All dogs bark 'mern!'", amount: '1000'});

      Post.create([post1, post2], function (err, saved) {
        done();
      });
    });
  });

  afterEach(function (done) {
    dropDB(done);
  });

  it('Should correctly give number of Posts', function (done) {

    request(app)
      .get('/api/getPosts')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        Post.find().exec(function (err, posts) {
          expect(posts.length).to.equal(res.body.posts.length);
          done();
        });
      });
  });
});

describe('GET /api/getPost', function () {

  beforeEach('connect and add one Post entry', function(done){

    connectDB(function () {
      var post = new Post({firstName: 'Foo', lastName: 'Bar', message: "All cats meow 'mern!'", amount: '1000', slug: 'bar', cuid: 'f34gb2bh24b24b5'});


      post.save(function (err, saved) {
        done();
      });
    });
  });

  afterEach(function (done) {
    dropDB(done);
  });

  it('Should send correct data when queried against a title', function (done) {

    request(app)
      .get('/api/getPost?slug=bar-f34gb2bh24b24b5')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        Post.findOne({ cuid: 'f34gb2bh24b24b5' }).exec(function (err, post) {
          expect(post.firstName).to.equal('Foo');
          done();
        });
      });
  });

});

describe('POST /api/addPost', function () {

  beforeEach('connect and add a post', function (done) {

    connectDB(function () {
      done();
    });
  });

  afterEach(function (done) {
    dropDB(done);
  });

  it('Should send correctly add a post', function (done) {

    request(app)
      .post('/api/addPost')
      .send({ post: {firstName: 'Foo', lastName: 'Bar', message: "All cats meow 'mern!'", amount: '1000'} })
      .set('Accept', 'application/json')
      .end(function (err, res) {
        Post.findOne({ firstName: 'Foo' }).exec(function (err, post) {
          expect(post.firstName).to.equal('Foo');
          done();
        });
      });
  });

});

describe('POST /api/deletePost', function () {
  var postId;

  beforeEach('connect and add one Post entry', function(done){

    connectDB(function () {
      var post = new Post({ firstName: 'Foo', lastName: 'Bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', message: 'Hello Mern says Foo', amount: '1000' });

      post.save(function (err, saved) {
        postId = saved._id;
        done();
      });
    });
  });

  afterEach(function (done) {
    dropDB(done);
  });

  it('Should connect and delete a post', function (done) {

    // Check if post is saved in DB
    Post.findById(postId).exec(function (err, post) {
      expect(post.firstName).to.equal('Foo')
    });

    request(app)
      .post('/api/deletePost')
      .send({ postId: postId})
      .set('Accept', 'application/json')
      .end(function () {

        // Check if post is removed from DB
        Post.findById(postId).exec(function (err, post) {
          expect(post).to.equal(null);
          done();
        });
      });
  })
});
