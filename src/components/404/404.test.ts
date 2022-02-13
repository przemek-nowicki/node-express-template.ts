// test base func
import { agent as request } from 'supertest';
import httpStatus from 'http-status';
import app from '@app';

describe('Bad requests', () => {
  test('should return 404 if no resource', async () => {
    await request(app)
      .get('/404/not-found-url')
      .send()
      .expect(httpStatus.NOT_FOUND);
  });
});
