import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../style/auth.css';
import { GetOAuthUrlApiCall, RegisterApiCall } from '../services/api/auth';
import { loginFailure, loginSuccess } from 'store/userSlice';
import { useDispatch } from 'react-redux';

// TODO : css remaning
// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
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
      const response = await RegisterApiCall(data);
      console.log('register data : ', response);
      dispatch(loginSuccess(response.data));
      navigate('/profiling');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterByGoogle = async () => {
    try {
      await GetOAuthUrlApiCall();
    } catch (err) {
      console.log(err);
      // If there's an error, dispatch loginFailure with the error message
      dispatch(loginFailure('Regitser failed, please try again.'));
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`form-input ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && (
            <span className="form-error">{errors.name.message}</span>
          )}
        </div>
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
          Register
        </button>
        <button
          type="button"
          className="btn-google"
          onClick={handleRegisterByGoogle}
        >
          Register with Google
        </button>

        {/* Redirection to Login Page */}
        <p className="redirect-text">
          Already have an account?{' '}
          <button
            type="button"
            className="redirect-link"
            onClick={() => navigate('/login')}
          >
            Login Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
