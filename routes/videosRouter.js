import express from 'express';
import db from '../database/config.js';
import Video from '../database/models/Video.js';

const videosRouter = express.Router();

videosRouter.get('/videos', async (req, res) => {
  try {
    await db.connect();
    const videos = await Video.find();
    await db.disconnect();
    return res.status(200).send(videos);
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

videosRouter.get('/video', async (req, res) => {
  if (!req.query.videoid) {
    return res.status(404).send({ message: 'Not Found' });
  }
  try {
    await db.connect();
    const video = await Video.findById(req.query.videoid);
    await db.disconnect();
    if (video && video._id) {
      return res.status(200).send(video);
    } else {
      return res.status(404).send({ message: 'Video Not Found' });
    }
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

videosRouter.get('/video/search', async (req, res) => {
  if (!req.query.query) {
    return res.status(404).send({ message: 'Not Found' });
  }
  try {
    await db.connect();
    const videos = await Video.aggregate([
      {
        $search: {
          index: 'text',
          text: {
            query: req.query.query,
            path: {
              wildcard: '*',
            },
          },
        },
      },
    ]);
    await db.disconnect();
    return res.status(200).send(videos);
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong', error: err });
  }
});

videosRouter.post('/video', async (req, res) => {
  try {
    await db.connect();
    const {
      title,
      url,
      thumbnail,
      userId,
      userName,
      userProfilePicture,
      description,
      tags,
    } = req.body;
    const newVideo = new Video({
      title,
      url,
      userId,
      userName,
      thumbnail,
      userProfilePicture,
      description,
      tags,
    });
    const video = await newVideo.save();
    await db.disconnect();
    return res.status(200).send(video);
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong', error: err });
  }
});

videosRouter.delete('/video', async (req, res) => {
  if (!req.query.videoid) {
    return res.status(404).send({ message: 'Video id is required' });
  }
  try {
    await db.connect();
    const video = await Video.findById(req.query.videoid);
    if (!video) {
      return res.status(404).send({ message: 'video not found' });
    }
    await Video.findByIdAndDelete(req.query.videoid);
    await db.disconnect();
    return res.status(200).send({ message: 'video deleted successfully' });
  } catch (err) {
    await db.disconnect();
    res.status(500).send({ message: 'Something went wrong' });
  }
});

export default videosRouter;
