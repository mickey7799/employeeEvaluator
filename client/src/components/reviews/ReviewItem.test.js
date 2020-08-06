import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import { UnconnectedReviewItem } from './ReviewItem';

test('calls `deleteReview` prop upon "deleteReview" button click', () => {
  const deleteReviewMock = jest.fn();
  const getReviewMock = jest.fn();
  const props = {
    review: {
      user: '5f24ee06a2c4e08896cd1b3c',
      text: 'R&D',
      rating: 5,
      _id: 1,
      feedbacks: [{ text: 'good', name: 'Amy' }],
      name: 'Amy',
      avatar: 'link',
      admin: '5f24ee06a2c4e08896cd1b3s',
      date: '2020/08/07'
    },
    auth: {
      isAuthenticated: true,
      loading: false,
      user: {
        isAdmin: true,
        _id: '5f24ee06a2c4e08896cd1b3s'
      }
    },
    showActions: true
  };

  const wrapper = shallow(
    <UnconnectedReviewItem
      {...props}
      deleteReview={deleteReviewMock}
      getReview={getReviewMock}
    />
  );
  // simulate click on button
  const deleteButton = findByTestAttr(wrapper, 'delete-button');
  deleteButton.simulate('click');
  const editButton = findByTestAttr(wrapper, 'edit-button');
  editButton.simulate('click');

  // expect the mock to have been called once
  expect(deleteReviewMock.mock.calls.length).toBe(1);
  expect(getReviewMock.mock.calls.length).toBe(1);
});
