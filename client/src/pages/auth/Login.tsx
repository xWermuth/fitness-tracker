import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../api/auth';
import ErrorAlert from '../../components/alert/ErrorAlert';
import { LoginBody, loginFields } from '../../utils/auth.utils';
import AuthHeader from './components/AuthHeader';
import AuthInput from './components/AuthInput';
import FormAction from './components/FormAction';
import FormExtra from './components/FormExtra';

const fields = loginFields;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState<LoginBody>(() =>
    fields.reduce<LoginBody>((acc, field) => ({ ...acc, [field.id]: '' }), {} as LoginBody),
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setErr('');
    setLoginState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      signin(loginState)
        .then(() => {
          navigate('/');
        })
        .catch((err) => setErr(err.response.data.message))
        .finally(() => setLoading(false));
    },
    [loginState, navigate],
  );

  return (
    <div className="py-20 mx-auto max-w-md">
      <AuthHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/auth/signup"
      />

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <AuthInput
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id as keyof LoginBody]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>

        <FormExtra />
        <FormAction loading={loading} handleSubmit={handleSubmit} text="Login" />
        {err && <ErrorAlert msg={err} className="w-full" />}
      </form>
    </div>
  );
};

export default Login;
