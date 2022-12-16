import React, { useCallback, useState } from 'react';
import { createWorkout } from '../../api/workout';
import AuthInput from '../../components/auth/AuthInput';
import FormAction from '../../components/auth/FormAction';
import BaseNav from '../../components/nav/BaseNav';
import { WorkoutBodyInterface, WorkoutFields } from '../../config/workout.config';

const fields = WorkoutFields;

const index: React.FC = () => {
  const [form, setForm] = useState<WorkoutBodyInterface>(() =>
    fields.reduce((acc, field) => {
      return { ...acc, [field.id]: '' };
    }, {} as WorkoutBodyInterface),
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
      console.log('called----');
      e.preventDefault();

      createWorkout(form).then(console.log).catch(console.error);
      // .finally(() => setLoading(false));
    },
    [form],
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
    </div>
  );
};

export default index;
