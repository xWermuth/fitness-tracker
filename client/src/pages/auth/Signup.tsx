import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/auth';
import ErrorAlert from '../../components/alert/ErrorAlert';
import { LoginBody, SignupBody, signupFields } from '../../utils/auth.utils';
import AuthHeader from './components/AuthHeader';
import AuthInput from './components/AuthInput';
import FormAction from './components/FormAction';

const fields = signupFields;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [err, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupState, setSignupState] = useState<SignupBody>(() =>
    fields.reduce<SignupBody>((acc, field) => ({ ...acc, [field.id]: '' }), {} as SignupBody),
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    setError('');
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      signup(signupState)
        .then(() => {
          navigate('/');
        })
        .catch((err) => setError(err.response.data.message))
        .finally(() => setLoading(false));
    },
    [signupState],
  );

  return (
    <div className="max-w-md h-full mx-auto py-20">
      <AuthHeader heading="Login to your account" paragraph="Already have an account? " linkName="Login" linkUrl="/auth/login" />

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="relative">
          {fields.map((field) => (
            <AuthInput
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id as keyof LoginBody]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              disabled={loading}
            />
          ))}
          <FormAction loading={loading} handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
      {err && <ErrorAlert msg={err} className="w-full mt-5" />}
    </div>
  );
};

export default Signup;
