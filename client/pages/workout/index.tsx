import React, { useCallback, useState } from 'react';
import { createWorkout } from '../../api/workout';
import AuthInput from '../../components/auth/AuthInput';
import FormAction from '../../components/auth/FormAction';
import BaseNav from '../../components/nav/BaseNav';
import { WorkoutBodyInterface, WorkoutFields, intensityLabel } from '../../config/workout.config';
import { useRouter } from 'next/router';
import { paths } from '../../config';
import ErrorAlert from '../../components/alert/ErrorAlert';
import { useSelector } from 'react-redux';
import { getUserName } from '../../store/features/user/user.selectors';
import Select from 'react-select';
import { Intensity } from '../../interfaces/intensity.enum';

const fields = WorkoutFields;

const index: React.FC = () => {
  const { push } = useRouter();
  const userName = useSelector(getUserName);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  const [form, setForm] = useState<WorkoutBodyInterface>(() =>
    fields.reduce((acc, field) => {
      return { ...acc, [field.id]: '' };
    }, {} as WorkoutBodyInterface),
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      createWorkout(form)
        .then((res) => {
          console.log('res: ', res);
          push(`${paths.PROFILE}${userName}`);
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    },
    [form, userName],
  );

  return (
    <div className="w-full h-full">
      <BaseNav />

      <form className="max-w-md mx-auto space-y-8 pt-10 text-black" onSubmit={handleSubmit}>
        {fields.map((field) => {
          return (
            <AuthInput {...{ ...field, key: field.id, handleChange, value: form[field.id as keyof WorkoutBodyInterface] }} />
          );
        })}
        <Select
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: 'hotpink',
              primary: 'black',
            },
          })}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: '0.375rem',
              outline: state.isFocused ? '#9333EA' : '',
              paddingTop: '0.2rem',
              paddingBottom: '0.2rem',
              paddingLeft: '0.1rem',
              paddingRight: '0.1rem',
            }),
          }}
          required
          onChange={(option) => {
            setForm((prevState) => ({ ...prevState, [intensityLabel]: option?.value ?? Intensity.Easy }));
          }}
          placeholder="The Intesity of the Workout"
          options={[
            { value: Intensity.Easy, label: 'Easy' },
            { value: Intensity.Moderate, label: 'Moderate' },
            { value: Intensity.High, label: 'High' },
          ]}
        />

        <FormAction loading={false} handleSubmit={handleSubmit} text="Submit" />
      </form>
      <ErrorAlert msg={err} />
    </div>
  );
};

export default index;
