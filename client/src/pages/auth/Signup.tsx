import React, { useCallback, useState } from 'react';
import { signupFields } from '../../utils/auth.utils';
import AuthHeader from './components/AuthHeader';
import AuthInput from './components/AuthInput';
import FormAction from './components/FormAction';

const fields = signupFields;
let fieldsState: Record<string, string> = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

const Signup: React.FC = () => {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSignupState((prevState) => ({ ...prevState, [e.target.id]: e.target.value })),
    [],
  );

  const handleSubmit = useCallback((e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAccount();
  }, []);

  //handle Signup API Integration here
  const createAccount = () => {};

  return (
    <div className="max-w-md h-full mx-auto py-20">
      <AuthHeader heading="Login to your account" paragraph="Already have an account? " linkName="Login" linkUrl="/auth/login" />

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <AuthInput
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
