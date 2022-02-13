import { Request, Response } from 'express';
import httpStatus from 'http-status';

const createUser = (req: Request, res: Response) => {
  res.status(httpStatus.CREATED);
  res.send({ message: 'Created' });
};

const readUser = (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read' });
};

const updateUser = (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export { createUser, readUser, updateUser, deleteUser };
