import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  create,
  read,
  update,
  deleteById,
} from '@components/user/user.service';
import { IUser } from '@components/user/user.interface';

const createUser = (req: Request, res: Response) => {
  const user = req.body as IUser;
  create(user);
  res.status(httpStatus.CREATED);
  res.send({ message: 'Created' });
};

const readUser = (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: read(req.params.id) });
};

const updateUser = (req: Request, res: Response) => {
  const user = req.body as IUser;
  update(user);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteUser = (req: Request, res: Response) => {
  deleteById(req.params.email);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export { createUser, readUser, updateUser, deleteUser };
