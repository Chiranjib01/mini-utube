import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    channelProfilePicture: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const History =
  mongoose.models.History || mongoose.model('History', historySchema);

export default History;
