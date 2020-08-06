const request = require('supertest');
const app = require('../../server');
const userInfo = require('../mock-data/user-login.json');

const endpointUrl = '/api/auth';

describe(endpointUrl, () => {
  it('POST ' + endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(userInfo);

    expect(response.statusCode).toBe(200);
    // expect(response.body.token).not.toBe(null);
  });
});
