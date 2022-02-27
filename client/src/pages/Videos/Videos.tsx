import moment from 'moment';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useGetVideosQuery } from '../../redux/slices/videos';
import './videos.css';

const Videos = () => {
  const { data: videos, isLoading } = useGetVideosQuery();
  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <Loading height="30px" width="30px" />
        </div>
      ) : !videos.length ? (
        <div
          className="loading"
          style={{ marginLeft: '-30px', fontSize: '18px' }}
        >
          No Video Here
        </div>
      ) : (
        <div className="video-container">
          {videos.map((video: any) => (
            <Link to={`/video/${video._id}`} key={video._id}>
              <article>
                <img src={video.thumbnail} alt="" className="thumbnail" />
                <div className="details">
                  <img src={video.userProfilePicture} alt="" />
                  <div className="meta">
                    <div className="title">{video.title}</div>
                    <div className="createdAt">
                      {moment(video.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
