import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useAppDispatch } from '../../redux/hooks';
import { showMessage } from '../../redux/slices/message';
import { API_URL } from '../../utils/constants';
import './search.css';

const Search = () => {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q'));

  const [videos, setVideos] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const fetchVideos = async () => {
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/video/search?query=${query}`
      );
      setVideos(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch(
        showMessage({
          text: 'Something went wrong',
          variant: 'error',
          timer: 300,
        })
      );
    }
  };
  useEffect(() => {
    setQuery(params.get('q'));
    fetchVideos();
  }, [params.get('q')]);
  return (
    <div>
      {loading ? (
        <div className="loading">
          <Loading height="30px" width="30px" />
        </div>
      ) : !videos.length ? (
        <div className="page-center">
          <div className="line-center">No Video Found</div>
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
                    <div className="title">
                      {video.title.length > 220
                        ? `${video.title.slice(0, 200)}...`
                        : video.title}
                    </div>
                    <div className="meta-details">
                      <div className="channel-name">{video.userName}</div>
                      <div className="createdAt">
                        {moment(video.createdAt).fromNow()}
                      </div>
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

export default Search;
