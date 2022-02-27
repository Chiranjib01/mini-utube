import express from 'express';
import db from '../database/config.js';
import User from '../database/models/User.js';
import History from '../database/models/History.js';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/auth.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  try {
    await db.connect();
    const user = await User.findOne({ email: req.body.email });
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
      return res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        subscribers: user.subscribers,
        subscribed: user.subscribed,
        token,
      });
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
      return res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        subscribers: user.subscribers,
        subscribed: user.subscribed,
        token,
      });
    } else {
      await db.disconnect();
      return res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Something went wrong' });
  }
});

userRouter.get('/user/video', async (req, res) => {
  if (!req.query.userid) {
    return res.status(404).send({ message: 'Not Found' });
  }
  try {
    await db.connect();
    const videos = await Video.find({ userId: req.query.userid }).orderBy({
      createdAt: -1,
    });
    await db.disconnect();
    return res.status(200).send(videos);
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

userRouter.post('/user/history', async (req, res) => {
  try {
    await db.connect();
    const exist = new History().find().where('userId', req.body.userId);
    if (exist) {
      return res.status(200).send({ message: 'already exist' });
    }
    const newHistory = new History({
      title: req.body.title,
      userId: req.body.userId,
      videoId: req.body.videoId,
      channelProfilePicture: req.body.channelProfilePicture,
      thumbnail: req.body.thumbnail,
    });
    const history = await newHistory.save();
    await db.disconnect();
    return res.status(200).send(history);
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

userRouter.get('/user/history', async (req, res) => {
  if (!req.query.userid) {
    return res.status(404).send({ message: 'Not Found' });
  }
  try {
    await db.connect();
    const history = await History.find().where('userId', req.query.userid);
    await db.disconnect();
    return res.status(200).send(history);
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

export default userRouter;
