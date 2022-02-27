import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { showMessage } from '../../redux/slices/message';
import { loginUser } from '../../redux/slices/user';
import { API_URL } from '../../utils/constants';

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user && user._id) {
      navigate('/');
    }
  }, [user]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const registerUser = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !password) {
      dispatch(
        showMessage({
          text: 'All fields are required',
          variant: 'error',
          timer: 3000,
        })
      );
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      dispatch(loginUser(data));
      dispatch(
        showMessage({
          text: 'Successfully Registered',
          variant: 'success',
          timer: 3000,
        })
      );
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      dispatch(
        showMessage({
          text: 'Something Went Wrong',
          variant: 'error',
          timer: 3000,
        })
      );
    }
  };

  return (
    <div className="login-form-container">
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <div className="form-item">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            className="form-input"
            placeholder="Enter Name ..."
          />
        </div>
        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            className="form-input"
            placeholder="Enter Email ..."
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="form-input"
            placeholder="Enter Password ..."
          />
        </div>
        <div className="form-item">
          <button type="submit" disabled={loading}>
            {loading ? <Loading height="20px" width="20px" /> : 'Register'}
          </button>
        </div>
      </form>
      <div className="text-center">
        Already have an account ? <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Register;
