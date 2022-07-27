const emailLabel = 'email';
const usernameLabel = 'name';
const passwordLabel = 'password';
const confirmPasswordLabel = 'confirmPassword';

export interface LoginBody {
  [emailLabel]: string;
  [passwordLabel]: string;
  [usernameLabel]: string;
}

export interface SignupBody extends LoginBody {
  [confirmPasswordLabel]: string;
}

const loginFields = [
  {
    labelText: 'Email address',
    labelFor: emailLabel,
    id: emailLabel,
    name: emailLabel,
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: passwordLabel,
    id: passwordLabel,
    name: passwordLabel,
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
];

const signupFields = [
  {
    labelText: 'Username',
    labelFor: usernameLabel,
    id: usernameLabel,
    name: usernameLabel,
    type: 'text',
    autoComplete: 'username',
    isRequired: true,
    placeholder: 'Username',
  },
  {
    labelText: 'Email address',
    labelFor: emailLabel,
    id: emailLabel,
    name: emailLabel,
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: passwordLabel,
    id: passwordLabel,
    name: passwordLabel,
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
  {
    labelText: 'Confirm Password',
    labelFor: confirmPasswordLabel,
    id: confirmPasswordLabel,
    name: confirmPasswordLabel,
    type: 'password',
    autoComplete: 'confirm-password',
    isRequired: true,
    placeholder: 'Confirm Password',
  },
];

export { loginFields, signupFields };
