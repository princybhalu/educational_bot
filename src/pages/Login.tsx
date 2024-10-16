import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../style/auth.css';
import { GetOAuthUrlApiCall, LoginApiCall } from '../services/api/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout, loginFailure } from '../store/userSlice';

// TODO: css Remaining
// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Login Data', data);
      const response = await LoginApiCall(data);
      console.log('login data : ', response);
      dispatch(loginSuccess(response.data));
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      // If there's an error, dispatch loginFailure with the error message
      dispatch(loginFailure('Login failed, please try again.'));
    }
  };

  const handleLoginByGoogle = async () => {
    try {
      await GetOAuthUrlApiCall();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`form-input ${errors.password ? 'input-error' : ''}`}
          />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className="btn-submit">
          Login
        </button>
        <button
          type="button"
          className="btn-google"
          onClick={handleLoginByGoogle}
        >
          Login with Google
        </button>

        {/* Redirection to Register Page */}
        <p className="redirect-text">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="redirect-link"
            onClick={() => navigate('/register')}
          >
            Register Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
