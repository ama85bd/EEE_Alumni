import { Response, Request } from 'express';
import logger from '../utils/logger';
import {
  createUser,
  deleteOneUser,
  findActiveInactiveUsers,
  findUser,
  findUserById,
  updateUserActive,
} from '../service/user.service';
import { CreateUserInput, GetUserId } from '../schema/user.schema';
import transporter from '../utils/emailService';
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).json('Ok');
  } catch (error: any) {
    logger.error(error);
    // Check for duplicate key error using error.message
    if (error.message && error.message.includes('duplicate key error')) {
      return res.status(400).send({ message: 'Email already exists.' });
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: error.message });
    }

    // General error handling
    console.error(error); // Log the entire error for debugging
    res.status(500).send({ message: 'Server error.' });
  }
}

export async function getUserHandler(
  req: Request<GetUserId['params']>,
  res: Response
) {
  const _id = req.params.userId;
  const user = await findUserById({ _id });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}

export async function getInActiveUsersHandler(req: Request, res: Response) {
  const inActiveUsers = await findActiveInactiveUsers({ isActive: false });
  return res.send(inActiveUsers);
}

export async function getActiveUsersHandler(req: Request, res: Response) {
  const activeUsers = await findActiveInactiveUsers({ isActive: true });
  return res.send(activeUsers);
}

export async function updateActiveUserHandler(
  req: Request<GetUserId['params']>,
  res: Response
) {
  const _id = req.params.userId;
  const user = await findUserById({ _id });
  await updateUserActive({ _id: _id }, { isActive: !user.isActive });

  transporter
    .sendMail({
      to: user.email,
      subject: 'No reply (EEE IU Alumni Service)',
      html: `<h2>Dear ${user.name},</h2> 
      <h3>Your account has been ${
        !user.isActive ? 'activated' : 'disabled'
      }.</h3>
      `,
    })
    .then(() => {
      console.log('Email send');
    })
    .catch((err) => {
      console.log(err);
    });

  return res.status(200).json('Ok');
}

export async function deleteUserHandler(
  req: Request<GetUserId['params']>,
  res: Response
) {
  const _id = req.params.userId;
  const userfind = await findUserById({ _id });
  const user = await deleteOneUser(_id);

  transporter
    .sendMail({
      to: userfind.email,
      subject: 'No reply (EEE IU Alumni Service)',
      html: `<h2>Dear ${userfind.name},</h2> 
    <h3>Your account has been deleted.</h3>
    `,
    })
    .then(() => {
      console.log('Email send');
    })
    .catch((err) => {
      console.log(err);
    });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
}
