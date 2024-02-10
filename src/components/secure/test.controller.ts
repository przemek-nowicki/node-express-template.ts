import { Request, Response } from 'express';
import httpStatus from 'http-status';

const secureTestData = (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ status: 'OK', data: 'Secure data protected by mTLS' });
};

export default secureTestData;
