import httpStatus from 'http-status';
import { Router, Request, Response } from 'express';

const router: Router = Router();
const resBody = httpStatus[httpStatus.NOT_FOUND];
router.all('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json(resBody);
});

export default router;
