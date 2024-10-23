import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../store/userSlice';
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdPerson,
  MdSchool,
  MdSubject,
  MdGrade,
} from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { GetOAuthUrlApiCall, RegisterApiCall } from '../services/api/auth';
import { BasicInfoApiCall } from '../services/api/user';
import illustration from '../assets/landing-page/illustration.jpg';

// Registration validation schema
const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// Basic info validation schema
const basicInfoValidationSchema = Yup.object().shape({
  board: Yup.string().required('Board is required'),
  field: Yup.string().required('Field is required'),
  standard: Yup.number()
    .typeError('Standard must be a number')
    .min(1, 'Standard must be at least 1')
    .max(12, 'Standard must be less than or equal to 12')
    .required('Standard is required'),
});

interface RegisterInputs {
  name: string;
  email: string;
  password: string;
}

interface BasicInfoInputs {
  board: string;
  field: string;
  standard: number;
}

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showBasicInfo, setShowBasicInfo] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Register form
  const registerForm = useForm<RegisterInputs>({
    resolver: yupResolver(registerValidationSchema),
  });

  // Basic info form
  const basicInfoForm = useForm<BasicInfoInputs>({
    resolver: yupResolver(basicInfoValidationSchema),
  });

  const handleRegister: SubmitHandler<RegisterInputs> = async (data) => {
    try {
      const response = await RegisterApiCall(data);
      setRegisteredUser(response.data);
      dispatch(loginSuccess(response.data));
      setShowBasicInfo(true);
    } catch (err) {
      dispatch(loginFailure('Registration failed, please try again.'));
    }
  };

  const handleBasicInfo: SubmitHandler<BasicInfoInputs> = async (data) => {
    try {
      await BasicInfoApiCall(data);
      navigate('/profiling');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterByGoogle = async () => {
    try {
      await GetOAuthUrlApiCall();
    } catch (err) {
      dispatch(loginFailure('Register failed, please try again.'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:flex-row">
      <div className="min-h-screen flex flex-col items-center justify-center w-full md:w-1/2 p-8 bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          {!showBasicInfo ? (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create an account
              </h2>
              <p className="text-gray-600 mb-8">Join us today to get started</p>

              <form
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="space-y-6"
              >
                {/* Name Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      {...registerForm.register('name')}
                      className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {registerForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      {...registerForm.register('email')}
                      type="email"
                      className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      {...registerForm.register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="text-xl" />
                      ) : (
                        <MdVisibility className="text-xl" />
                      )}
                    </button>
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Create Account
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRegisterByGoogle}
                  className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-3 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
                >
                  <FcGoogle className="text-xl" />
                  Sign up with Google
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Your Profile
              </h2>
              <p className="text-gray-600 mb-8">Tell us about your education</p>

              <form
                onSubmit={basicInfoForm.handleSubmit(handleBasicInfo)}
                className="space-y-6"
              >
                {/* Board Field */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Board (University)
                  </label>
                  <div className="relative">
                    <MdSchool className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      {...basicInfoForm.register('board')}
                      className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your board/university"
                    />
                  </div>
                  {basicInfoForm.formState.errors.board && (
                    <p className="mt-1 text-sm text-red-600">
                      {basicInfoForm.formState.errors.board.message}
                    </p>
                  )}
                </div>

                {/* Field Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study
                  </label>
                  <div className="relative">
                    <MdSubject className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      {...basicInfoForm.register('field')}
                      className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Information Technology"
                    />
                  </div>
                  {basicInfoForm.formState.errors.field && (
                    <p className="mt-1 text-sm text-red-600">
                      {basicInfoForm.formState.errors.field.message}
                    </p>
                  )}
                </div>

                {/* Standard Input */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard
                  </label>
                  <div className="relative">
                    <MdGrade className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="number"
                      {...basicInfoForm.register('standard')}
                      className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your standard (1-12)"
                    />
                  </div>
                  {basicInfoForm.formState.errors.standard && (
                    <p className="mt-1 text-sm text-red-600">
                      {basicInfoForm.formState.errors.standard.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Complete Profile
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="hidden min-h-screen md:flex md:w-1/2 bg-white items-center justify-center p-8">
        <div className="max-w-xl w-full">
          <img
            src={illustration}
            alt="Login illustration"
            className="w-full max-w-xl h-auto mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
