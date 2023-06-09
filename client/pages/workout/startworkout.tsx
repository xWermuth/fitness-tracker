import React, { useCallback, useState } from 'react';
import { WorkoutBodyInterface, WorkoutFields, intensityLabel } from '../../config/workout.config';
import { getUserName } from '../../store/features/user/user.selectors';
import { useSelector } from 'react-redux';
import { createWorkout } from '../../api/workout';
import AuthInput from '../../components/auth/AuthInput';
import Select from 'react-select';
import { Intensity } from '../../interfaces/intensity.enum';
import FormAction from '../../components/auth/FormAction';
import ErrorAlert from '../../components/alert/ErrorAlert';

const fields = WorkoutFields;

interface Props {
  next(): void;
}

const Startworkout: React.FC<Props> = ({ next }) => {
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
          next();
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    },
    [form, userName, next],
  );

  return (
    <>
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
              primary25: '#d8b4fe',
              primary: '#A755F7',
            },
          })}
          styles={{
            option: (baseStyles, state) => ({
              ...baseStyles,
              // outline: state.isSelected ? '#A755F7' : '',
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: '0.375rem',
              outlineColor: state.isFocused ? 'white' : '',
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

        <FormAction loading={false} handleSubmit={handleSubmit} text="Next" />
      </form>
      <ErrorAlert msg={err} />;
    </>
  );
};

export default Startworkout;
