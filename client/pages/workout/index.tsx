import React, { useCallback, useState } from 'react';
import { createWorkout } from '../../api/workout';
import AuthInput from '../../components/auth/AuthInput';
import FormAction from '../../components/auth/FormAction';
import BaseNav from '../../components/nav/BaseNav';
import { WorkoutBodyInterface, WorkoutFields } from '../../config/workout.config';
import { useRouter } from 'next/router';
import { paths } from '../../config';
import ErrorAlert from '../../components/alert/ErrorAlert';
import { useSelector } from 'react-redux';
import { getUserName } from '../../store/features/user/user.selectors';

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
        .finally(() => {
          setLoading(false);
        });
      // .finally(() => setLoading(false));
    },
    [form, userName],
  );

  return (
    <div className="w-full h-full">
      <BaseNav />

      <form className="max-w-md mx-auto space-y-8 pt-10" onSubmit={handleSubmit}>
        {fields.map((field) => {
          return (
            <AuthInput {...{ ...field, key: field.id, handleChange, value: form[field.id as keyof WorkoutBodyInterface] }} />
          );
        })}

        <FormAction loading={false} handleSubmit={handleSubmit} text="Submit" />
      </form>
      <ErrorAlert msg={err} />
    </div>
  );
};

export default index;
