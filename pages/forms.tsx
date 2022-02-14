import React, { useState } from 'react';

export default function Forms() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setUsername(value);
  };
  const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setEmail(value);
  };
  const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setPassword(value);
  };
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (username === '' || email === '' || password === '') {
      setFormErrors('All fields are required');
    }
    if (!email.includes('@')) {
      setEmailError('email is required');
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input value={username} onChange={onUsernameChange} type="text" placeholder="Username" required minLength={5} />
      <input value={email} onChange={onEmailChange} type="email" placeholder="Email" required />
      {emailError}
      <input value={password} onChange={onPasswordChange} type="password" placeholder="Password" required />
      <input type="submit" value="Create Account" />
    </form>
  );
}
