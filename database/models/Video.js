import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userProfilePicture: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
