import { agent as request } from 'supertest';
import httpStatus from 'http-status';

import app from '@app';

describe('Helathcheck API', () => {
  describe('GET /api/health', () => {
    test('should return 200 status if all OK', async () => {
      await request(app).get('/api/health').send().expect(httpStatus.OK);
    });
  });
});
