import { AUTH_COOKIE_KEY } from './utils';
const emailLabel = 'email';
const usernameLabel = 'name';
const passwordLabel = 'password';
const confirmPasswordLabel = 'confirmPassword';

export interface LoginBody {
  [emailLabel]: string;
  [passwordLabel]: string;
}

export interface SignupBody extends LoginBody {
  [confirmPasswordLabel]: string;
  [usernameLabel]: string;
}

export const loginFields = [
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

export const signupFields = [
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

export function doesHttpOnlyCookieExist() {
  var d = new Date();
  d.setTime(d.getTime() + 1000);
  var expires = 'expires=' + d.toUTCString();

  document.cookie = AUTH_COOKIE_KEY + '=new_value;path=/;' + expires;
  return document.cookie.indexOf(AUTH_COOKIE_KEY + '=') == -1;
}
