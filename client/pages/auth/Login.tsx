import { useRouter } from 'next/router';
import React, { useCallback, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../api/auth';
import ErrorAlert from '../../components/alert/ErrorAlert';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import FormAction from '../../components/auth/FormAction';
import FormExtra from '../../components/auth/FormExtra';
import { paths } from '../../config';
import { setAuthenticated } from '../../store/features/global/global.actions';
import { isOnServer } from '../../utils';
import { LoginBody, loginFields } from '../../utils/auth.utils';

const fields = loginFields;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginState, setLoginState] = useState<LoginBody>(() =>
    fields.reduce<LoginBody>((acc, field) => ({ ...acc, [field.id]: '' }), {} as LoginBody),
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setErr('');
    setLoginState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log('handleSubmit: ', isOnServer());

    signin(loginState)
      .then(() => {
        dispatch(setAuthenticated(true));
        push('/');
      })
      .catch((err) => setErr(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="py-20 mx-auto max-w-md">
      <AuthHeader
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl={paths.SIGNUP}
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
