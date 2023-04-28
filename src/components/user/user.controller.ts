import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {
  create,
  read,
  update,
  deleteById,
} from '@components/user/user.service';
import { IUser } from '@components/user/user.interface';

const createUser = async (req: Request, res: Response) => {
  const user = req.body as IUser;
  await create(user);
  res.status(httpStatus.CREATED);
  return res.send({ message: 'Created' });
};

const readUser = async (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ message: 'Read', output: await read(req.params.id) });
};

const updateUser = async (req: Request, res: Response) => {
  const user = req.body as IUser;
  await update(user);
  res.status(httpStatus.OK);
  res.send({ message: 'Updated' });
};

const deleteUser = async (req: Request, res: Response) => {
  await deleteById(req.params.email);
  res.status(httpStatus.ACCEPTED);
  res.send({ message: 'Removed' });
};

export { createUser, readUser, updateUser, deleteUser };
