import { useParams } from 'react-router-dom';
import './editprofile.css';

const EditProfile = () => {
  const { userId } = useParams();
  return <div>{userId}</div>;
};

export default EditProfile;
