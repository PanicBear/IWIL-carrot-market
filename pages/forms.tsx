import { FieldErrors, useForm } from 'react-hook-form';

// Better validation
// Better Errors(set, clear, display)
// Have control over inputs
// Dont deal with events
// Easier Inputs

export default function Forms() {
  const { register, watch, handleSubmit } = useForm();
  const onValid = () => {
    console.log('inputs validated');
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  console.log(watch('username'));
  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register('username', {
          required: true,
        })}
        type="text"
        placeholder="Username"
      />
      <input {...register('email', { required: true })} type="email" placeholder="Email" />
      <input {...register('password', { required: true })} type="password" placeholder="Password" />
      <input type="submit" value="Create Account" />
    </form>
  );
}
