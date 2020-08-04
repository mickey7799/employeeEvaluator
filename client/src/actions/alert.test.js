import { storeFactory } from '../../test/testUtils';
import { setAlert } from './alert';

test('setAlert: adds alert to state and remove it', () => {
  const msg = 'Profile updated';
  const alertType = 'success';
  const store = storeFactory();

  store.dispatch(setAlert(msg, alertType));
  const newState = store.getState().alert;

  expect(newState[0].alertType).toBe(alertType);
  expect(newState[0].msg).toBe(msg);
});
