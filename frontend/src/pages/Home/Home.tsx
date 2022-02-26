import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { showMessage } from '../../redux/slices/message';
import { loginUser } from '../../redux/slices/user';
import { API_URL, APP_NAME } from '../../utils/constants';
import './home.css';

const Home = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const login = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
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
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      dispatch(loginUser(data));
      dispatch(
        showMessage({
          text: 'Login Successful',
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
    <div>
      <div className="welcome-title">
        <h1 className="text-center">Welcome to {APP_NAME}</h1>
      </div>
      <div className="about-the-app">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur id
          inventore alias corrupti quidem! Veniam iusto maiores, laborum aut
          dignissimos assumenda non. Blanditiis accusamus sapiente perspiciatis
          maxime autem architecto quam neque minus deserunt aperiam modi
          officiis nam adipisci voluptate tenetur ipsa esse optio error ullam,
          eaque libero, deleniti assumenda! A, possimus? Excepturi fugiat sequi
          fuga. Aut fuga dicta aspernatur dolores adipisci animi distinctio
          laboriosam quisquam blanditiis earum, deleniti omnis laudantium.
        </p>
      </div>
      {/* login form */}
      {!user && (
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={login}>
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
                {loading ? <Loading height="20px" width="20px" /> : 'Login'}
              </button>
            </div>
          </form>
          <div className="text-center">
            Don&apos;t have an account ? <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
