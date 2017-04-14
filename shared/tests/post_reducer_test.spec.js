import expect from 'expect';
import postReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

describe('postReducer tests', () => {
  it('action ADD_POST is working', () => {
    const stateBefore = { posts: ['foo'], post: null };
    const stateAfter = { posts: [{
      firstName: 'prank',
      lastName: 'first post',
      message: 'Hello world!',
      amount: '1000',
      _id: null,
      cuid: null,
      slug: 'first-post',
    }, 'foo'], post: null };

    const action = {
      type: ActionTypes.ADD_POST,
      firstName: 'prank',
      lastName: 'first post',
      message: 'Hello world!',
      amount: '1000',
      _id: null,
      cuid: null,
      slug: 'first-post',
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(postReducer(stateBefore, action));
  });

  it('action ADD_SELECTED_POST is working', () => {
    const stateBefore = {
      posts: [{
        firstName: 'prank',
        lastName: 'first post',
        message: 'Hello world!',
        amount: '1000',
        _id: null,
        slug: 'first-post',

      }],
      selectedPost: null,
    };

    const stateAfter = {
      posts: [{
        firstName: 'prank',
        lastName: 'first post',
        message: 'Hello world!',
        amount: '1000',
        _id: null,
        slug: 'first-post',
      }],
      post: {
        firstName: 'prank',
        lastName: 'second post',
        message: 'Hello world!',
        amount: '1000',
        _id: null,
        slug: 'second-post',
      },
    };

    const action = {
      type: ActionTypes.ADD_SELECTED_POST,
      post: {
        firstName: 'prank',
        lastName: 'second post',
        message: 'Hello world!',
        amount: '1000',
        _id: null,
        slug: 'second-post',
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(postReducer(stateBefore, action));
  });
});
