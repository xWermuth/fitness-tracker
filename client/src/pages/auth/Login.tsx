import React, { useCallback, useState } from 'react';
import { loginFields } from '../../utils/auth.utils';
import AuthHeader from './components/AuthHeader';
import AuthInput from './components/AuthInput';
import FormAction from './components/FormAction';
import FormExtra from './components/FormExtra';

interface LoginProps {}

const fields = loginFields;
let fieldsState: Record<string, string> = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

const Login: React.FC<LoginProps> = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setLoginState({ ...loginState, [e.target.id]: e.target.value }),
    [],
  );

  const handleSubmit = useCallback((e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticateUser();
  }, []);

  const authenticateUser = () => {};

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
              value={loginState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Login" />
      </form>
    </div>
  );
};

export default Login;
