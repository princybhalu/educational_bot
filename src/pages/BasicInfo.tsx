import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../style/basic-info.css';
import { BasicInfoApiCall } from '../services/api/user';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
  board: string;
  field: string;
  standard: number;
}

const validationSchema = Yup.object().shape({
  board: Yup.string().required('Board is required'),
  field: Yup.string().required('Field is required'),
  standard: Yup.number().typeError('Standard must be a number')
    .min(1, 'Standard must be at least 1')
    .max(12, 'Standard must be less than or equal to 12')
    .required('Standard is required'),
});

const BasicInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: IFormInputs) => {
    console.log(data);
    try {
      const res = await BasicInfoApiCall(data);
      navigate('/profiling');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="board">Board (University):</label>
          <input type="text" id="board" {...register('board')} />
          {errors.board && <p className="error">{errors.board.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="field">Field (Information Technology):</label>
          <input type="text" id="field" {...register('field')} />
          {errors.field && <p className="error">{errors.field.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="standard">Standard (5):</label>
          <input type="number" id="standard" {...register('standard')} />
          {errors.standard && (
            <p className="error">{errors.standard.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BasicInfo;
