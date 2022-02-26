import { useParams } from 'react-router-dom';
import './userprofile.css';

const UserProfile = () => {
  const { userId } = useParams();
  return <div>{userId}</div>;
};

export default UserProfile;
