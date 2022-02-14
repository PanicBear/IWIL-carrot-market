import { useForm } from 'react-hook-form';

// Better validation
// Better Errors(set, clear, display)
// Have control over inputs
// Dont deal with events
// Easier Inputs

export default function Forms() {
  const { register, watch, handleSubmit } = useForm();
  console.log(watch('username'));
  console.log(watch());
  return (
    <form>
      <input {...register('username')} type="text" placeholder="Username" required minLength={5} />
      <input {...register('email')} type="email" placeholder="Email" required />
      <input {...register('password')} type="password" placeholder="Password" required />
      <input type="submit" value="Create Account" />
    </form>
  );
}
