import { Button, Input, Layout } from '@components/index';
import { useMutation, useUser } from '@libs/client';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const [editProfile, { loading, data }] = useMutation<EditProfileResponse>('/api/users/me');
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  const onValid = ({ email, phone, name }: EditProfileForm) => {
    if (loading) return;
    if (!email && !phone && !name)
      return setError('formErrors', { message: 'Email or Phone number is required. Choose one, not both.' });
    editProfile({ email, phone, name });
  };

  useEffect(() => {
    setValue('name', user?.name ?? '');
    setValue('email', user?.email ?? '');
    setValue('phone', user?.phone ?? '');
  }, [user, setValue]);
  useEffect(() => {
    if (data && !data.ok) {
      setError('formErrors', { message: data?.error });
    }
  }, [data, setError]);

  return (
    <Layout title="Edit Profile" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input id="picture" type="file" className="hidden" accept="image/*" />
          </label>
        </div>
        <Input register={register('name', { required: true })} name="Name" label="name" type="text" required={true} />
        <Input
          register={register('email', {
            pattern: /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/,
          })}
          name="email"
          label="Email address"
          type="email"
          required={false}
        />
        <Input
          register={register('phone', {
            pattern: /[0-9]{2,3}[0-9]{3,4}[0-9]{4}/,
          })}
          name="phone"
          label="Phone number"
          kind="phone"
          type="tel"
          required={false}
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center block">{errors.formErrors.message}</span>
        ) : null}
        <Button text={loading ? 'Loading' : 'Update profile'} />
      </form>
    </Layout>
  );
};

export default EditProfile;
