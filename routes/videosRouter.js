import express from 'express';

const videosRouter = express.Router();

videosRouter.get('/videos', (req, res) => {
  res.send({ message: 'videos' });
});

export default videosRouter;
