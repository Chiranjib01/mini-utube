import express from 'express';
import db from '../database/config.js';
import User from '../database/models/User.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/auth.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ email: req.body.email });
    await db.disconnect();
    if (user && user._id) {
      return res.status(400).send({ message: 'user already exists' });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      });
      const user = await newUser.save();
      await db.disconnect();
      const token = signToken(user);
      return res.status(200).send({ ...user, token });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Error occured while creating user', error: err });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ email: req.body.email });
    await db.disconnect();
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken(user);
      return res.status(200).send(user);
    } else {
      await db.disconnect();
      return res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

export default userRouter;
