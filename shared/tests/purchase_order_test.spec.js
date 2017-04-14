import expect from 'expect';
import purchaseOrderReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

describe('purchaseOrderReducer tests', () => {
  it('action ADD_PURCHASE_ORDER is working', () => {
    const stateBefore = { purchaseOrders: ['foo'], purchaseOrder: null };
    const stateAfter = { purchaseOrders: [{
      itemType: 'Bracelet',
      customerEmail: 'chris@hot.com',
      charge: '1000',
      shirtSize: 'M',
      message: 'Lorem Hipster',
      delivery: false,
      address: '',
      slug: 'prank-order',
      cuid: null,
      _id: null,
    }, 'foo'], purchaseOrder: null };

    const action = {
      type: ActionTypes.ADD_PURCHASE_ORDER,
      itemType: 'Bracelet',
      customerEmail: 'chris@hot.com',
      charge: '1000',
      shirtSize: 'M',
      message: 'Lorem Hipster',
      delivery: false,
      address: '',
      slug: 'prank-order',
      cuid: null,
      _id: null,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(purchaseOrderReducer(stateBefore, action));
  });
});
