import express from 'express';

const videosRouter = express.Router();

videosRouter.get('/videos', (req, res) => {
  res.send({ message: 'videos', query: req.query.video });
});

export default videosRouter;
